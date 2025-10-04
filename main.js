let publications = [];
let timelineChart = null;
let topicChart = null;

// Initialize Firebase and start app
async function initApp() {
  try {
    // Initialize Firebase once
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    storage = firebase.storage();
    console.log('Firebase initialized successfully');

    // Load CSV with error handling
    try {
      const response = await fetch('SB_publication_PMC.csv');
      if (!response.ok) throw new Error('CSV file not found');
      
      const csv = await response.text();
      const rows = csv.split('\n').slice(1).filter(row => row.trim());
      
      publications = rows.map(row => {
        const [title, link] = row.split(',').map(s => s.trim());
        return { 
          title, 
          link, 
          year: extractYear(title), 
          organism: extractOrganism(title), 
          topic: extractTopic(title) 
        };
      });

      console.log(`Loaded ${publications.length} publications`);

      // Upload to Firestore (comment out after first run)
      // await uploadToFirestore(publications);

      // Load from Firestore instead (uncomment after first upload)
      // await loadFromFirestore();

    } catch (csvError) {
      console.error('CSV loading error:', csvError);
      // Try loading from Firestore as fallback
      await loadFromFirestore();
    }

    populateFilters();
    displayResults(publications);
    generateInsights();
    drawCharts();

  } catch (error) {
    console.error('App initialization error:', error);
    document.getElementById('results').innerHTML = 
      '<p class="text-red-500">Error loading application. Check console for details.</p>';
  }
}

initApp();

// Improved extraction functions with better regex
function extractYear(title) {
  const match = title.match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : 'Unknown';
}

function extractOrganism(title) {
  const lower = title.toLowerCase();
  if (lower.includes('arabidopsis') || lower.includes('a. thaliana')) return 'Arabidopsis thaliana';
  if (lower.includes('mouse') || lower.includes('mice') || lower.includes('murine')) return 'Mouse';
  if (lower.includes('rat') || lower.includes('rattus')) return 'Rat';
  if (lower.includes('c. elegans') || lower.includes('caenorhabditis')) return 'C. elegans';
  if (lower.includes('drosophila') || lower.includes('fruit fly')) return 'Drosophila';
  if (lower.includes('human') || lower.includes('homo sapiens')) return 'Human';
  if (lower.includes('yeast') || lower.includes('saccharomyces')) return 'Yeast';
  if (lower.includes('zebrafish') || lower.includes('danio')) return 'Zebrafish';
  if (lower.includes('bacteria') || lower.includes('e. coli')) return 'Bacteria';
  return 'Other';
}

function extractTopic(title) {
  const lower = title.toLowerCase();
  if (lower.includes('microgravity') || lower.includes('weightless')) return 'Microgravity';
  if (lower.includes('radiation') || lower.includes('cosmic ray')) return 'Radiation';
  if (lower.includes('bone') || lower.includes('osteo')) return 'Bone Health';
  if (lower.includes('muscle') || lower.includes('skeletal')) return 'Muscle';
  if (lower.includes('cardiovascular') || lower.includes('heart')) return 'Cardiovascular';
  if (lower.includes('immune') || lower.includes('immunity')) return 'Immune System';
  if (lower.includes('plant') || lower.includes('crop')) return 'Plant Biology';
  if (lower.includes('cell') || lower.includes('cellular')) return 'Cell Biology';
  if (lower.includes('gene') || lower.includes('genetic')) return 'Genetics';
  return 'General';
}

// Batch upload to Firestore (efficient for 608 docs)
async function uploadToFirestore(data) {
  try {
    const batchSize = 500;
    let batch = db.batch();
    let count = 0;

    for (const pub of data) {
      const docRef = db.collection('publications').doc(pub.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 100));
      batch.set(docRef, pub);
      count++;

      if (count % batchSize === 0) {
        await batch.commit();
        console.log(`Uploaded ${count} documents`);
        batch = db.batch();
      }
    }

    if (count % batchSize !== 0) {
      await batch.commit();
    }

    console.log(`Total ${count} documents uploaded to Firestore!`);
  } catch (error) {
    console.error('Firestore upload error:', error);
  }
}

async function loadFromFirestore() {
  try {
    const snapshot = await db.collection('publications').get();
    publications = snapshot.docs.map(doc => doc.data());
    console.log(`Loaded ${publications.length} publications from Firestore`);
    populateFilters();
    displayResults(publications);
    generateInsights();
    drawCharts();
  } catch (error) {
    console.error('Firestore load error:', error);
  }
}

function populateFilters() {
  // Years
  const years = [...new Set(publications.map(p => p.year))].sort().reverse();
  document.getElementById('yearFilter').innerHTML = 
    `<option value="">All Years</option>` + 
    years.map(y => `<option value="${y}">${y}</option>`).join('');

  // Organisms
  const organisms = [...new Set(publications.map(p => p.organism))].sort();
  document.getElementById('organismFilter').innerHTML = 
    `<option value="">All Organisms</option>` + 
    organisms.map(o => `<option value="${o}">${o}</option>`).join('');

  // Topics
  const topics = [...new Set(publications.map(p => p.topic))].sort();
  document.getElementById('topicFilter').innerHTML = 
    `<option value="">All Topics</option>` + 
    topics.map(t => `<option value="${t}">${t}</option>`).join('');
}

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  
  if (data.length === 0) {
    resultsDiv.innerHTML = '<p class="col-span-full text-center text-gray-400">No results found</p>';
    return;
  }

  // SHOW ALL RESULTS - No limit
  resultsDiv.innerHTML = data.map(pub => `
    <div class="bg-gray-800 p-4 rounded shadow hover:bg-gray-700 transition">
      <h3 class="text-lg font-bold mb-2 line-clamp-2">${pub.title}</h3>
      <p class="text-sm text-gray-400 mb-2">
        <span class="inline-block bg-blue-900 px-2 py-1 rounded mr-2">${pub.year}</span>
        <span class="inline-block bg-green-900 px-2 py-1 rounded">${pub.organism}</span>
      </p>
      <p class="text-sm text-gray-400 mb-3">${pub.topic}</p>
      <div class="flex space-x-2">
        <a href="${pub.link}" target="_blank" class="text-blue-400 hover:underline text-sm">Full Text</a>
        <a href="paper-detail.html?title=${encodeURIComponent(pub.title)}" class="text-green-400 hover:underline text-sm">View Detail</a>
      </div>
    </div>
  `).join('');

  resultsDiv.innerHTML += `<p class="col-span-full text-center text-gray-400 mt-4">Showing all ${data.length} results</p>`;
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', filterResults);
document.getElementById('yearFilter').addEventListener('change', filterResults);
document.getElementById('organismFilter').addEventListener('change', filterResults);
document.getElementById('topicFilter').addEventListener('change', filterResults);
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('yearFilter').value = '';
  document.getElementById('organismFilter').value = '';
  document.getElementById('topicFilter').value = '';
  displayResults(publications);
  drawCharts();
});

function filterResults() {
  let filtered = publications;
  
  const query = document.getElementById('searchInput').value.toLowerCase();
  if (query) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.organism.toLowerCase().includes(query) ||
      p.topic.toLowerCase().includes(query)
    );
  }
  
  const year = document.getElementById('yearFilter').value;
  if (year) filtered = filtered.filter(p => p.year === year);
  
  const organism = document.getElementById('organismFilter').value;
  if (organism) filtered = filtered.filter(p => p.organism === organism);
  
  const topic = document.getElementById('topicFilter').value;
  if (topic) filtered = filtered.filter(p => p.topic === topic);
  
  displayResults(filtered);
}

// Generate insights based on data
function generateInsights() {
  const insightsDiv = document.getElementById('insights');
  
  const topicCounts = {};
  const yearCounts = {};
  const organismCounts = {};
  
  publications.forEach(pub => {
    topicCounts[pub.topic] = (topicCounts[pub.topic] || 0) + 1;
    yearCounts[pub.year] = (yearCounts[pub.year] || 0) + 1;
    organismCounts[pub.organism] = (organismCounts[pub.organism] || 0) + 1;
  });
  
  const topTopic = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0];
  const topOrganism = Object.entries(organismCounts).sort((a, b) => b[1] - a[1])[0];
  const recentYears = Object.entries(yearCounts).filter(([y]) => y !== 'Unknown' && parseInt(y) >= 2020);
  const recentCount = recentYears.reduce((sum, [, count]) => sum + count, 0);
  
  insightsDiv.innerHTML = `
    <ul class="space-y-2">
      <li>📊 Most researched topic: <strong>${topTopic[0]}</strong> (${topTopic[1]} publications)</li>
      <li>🔬 Most studied organism: <strong>${topOrganism[0]}</strong> (${topOrganism[1]} publications)</li>
      <li>📅 Publications since 2020: <strong>${recentCount}</strong></li>
      <li>🚀 Total publications analyzed: <strong>${publications.length}</strong></li>
    </ul>
  `;
}

// Draw charts using Chart.js
function drawCharts() {
  drawTimelineChart();
  drawTopicChart();
}

function drawTimelineChart() {
  const ctx = document.getElementById('timelineChart');
  
  // Count by year
  const yearCounts = {};
  publications.forEach(pub => {
    if (pub.year !== 'Unknown') {
      yearCounts[pub.year] = (yearCounts[pub.year] || 0) + 1;
    }
  });
  
  const years = Object.keys(yearCounts).sort();
  const counts = years.map(y => yearCounts[y]);
  
  // Destroy existing chart
  if (timelineChart) {
    timelineChart.destroy();
  }
  
  timelineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'Publications per Year',
        data: counts,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#E5E7EB'
          }
        },
        title: {
          display: true,
          text: 'Publications Timeline',
          color: '#E5E7EB',
          font: {
            size: 16
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#9CA3AF'
          },
          grid: {
            color: '#4B5563'
          }
        },
        x: {
          ticks: {
            color: '#9CA3AF',
            maxRotation: 45,
            minRotation: 45
          },
          grid: {
            color: '#4B5563'
          }
        }
      }
    }
  });
}

function drawTopicChart() {
  const ctx = document.getElementById('topicChart');
  
  // Count by topic
  const topicCounts = {};
  publications.forEach(pub => {
    topicCounts[pub.topic] = (topicCounts[pub.topic] || 0) + 1;
  });
  
  const topics = Object.keys(topicCounts);
  const counts = topics.map(t => topicCounts[t]);
  
  // Destroy existing chart
  if (topicChart) {
    topicChart.destroy();
  }
  
  topicChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: topics,
      datasets: [{
        label: 'Publications by Topic',
        data: counts,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(99, 102, 241, 0.8)'
        ],
        borderColor: '#1F2937',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#E5E7EB',
            padding: 10
          }
        },
        title: {
          display: true,
          text: 'Topic Distribution',
          color: '#E5E7EB',
          font: {
            size: 16
          }
        }
      }
    }
  });
}