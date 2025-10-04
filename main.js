let publications = [];

// Make everything async for safe loading
async function initApp() {
  await firebase.initializeApp(firebaseConfig); // Wait for Firebase (alternative to listener)

  // Load CSV
  const response = await fetch('data/SB_publication_PMC.csv');
  const csv = await response.text();
  const rows = csv.split('\n').slice(1);
  publications = rows.map(row => {
    const [title, link] = row.split(',');
    return { title, link, year: extractYear(title), organism: extractOrganism(title), topic: extractTopic(title) };
  });

  // Upload after data loads (safe now)
  await uploadToFirestore(publications);

  // Or load from Firestore instead
  // await loadFromFirestore();

  populateFilters();
  displayResults(publications);
}

initApp(); // Start the app

function extractYear(title) { return title.match(/\d{4}/)?.[0] || 'Unknown'; }
function extractOrganism(title) {
  if (title.includes('Arabidopsis')) return 'Arabidopsis thaliana';
  if (title.includes('mouse')) return 'Mouse';
  return 'Unknown';
}
function extractTopic(title) {
  if (title.includes('microgravity')) return 'Microgravity';
  return 'General';
}

async function uploadToFirestore(data) {
  try {
    for (const pub of data) {
      await db.collection('publications').doc(pub.title.replace(/[^a-zA-Z0-9]/g, '_')).set(pub);
    }
    console.log('Data uploaded to Firestore!');
  } catch (error) {
    console.error('Firestore upload error:', error);
  }
}

async function loadFromFirestore() {
  const snapshot = await db.collection('publications').get();
  publications = snapshot.docs.map(doc => doc.data());
  displayResults(publications);
}

function populateFilters() {
  const years = [...new Set(publications.map(p => p.year))].sort();
  document.getElementById('yearFilter').innerHTML = `<option>All Years</option>` + years.map(y => `<option>${y}</option>`).join('');
  // Add for organism, topic similarly
}

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = data.map(pub => `
    <div class="bg-gray-800 p-4 rounded shadow">
      <h3 class="text-xl font-bold">${pub.title}</h3>
      <p>Year: ${pub.year} | Organism: ${pub.organism}</p>
      <a href="${pub.link}" target="_blank" class="text-blue-400">Full Text</a>
      <button onclick="showSummary('${pub.title}')">View Summary</button>
    </div>
  `).join('');
}

document.getElementById('searchInput').addEventListener('input', filterResults);
document.getElementById('yearFilter').addEventListener('change', filterResults);
document.getElementById('resetBtn').addEventListener('click', () => displayResults(publications));

function filterResults() {
  let filtered = publications;
  const query = document.getElementById('searchInput').value.toLowerCase();
  if (query) filtered = filtered.filter(p => p.title.toLowerCase().includes(query));
  const year = document.getElementById('yearFilter').value;
  if (year !== 'All Years') filtered = filtered.filter(p => p.year === year);
  displayResults(filtered);
}

async function showSummary(title) {
  const pub = publications.find(p => p.title === title);
  let text = await extractTextFromPDF(pub.link);
  const summary = `TL;DR: Key findings from ${title}. (Extracted: ${text.slice(0, 100)}...)`; // Mock or Hugging Face
  alert(summary); // Or modal
}

async function extractTextFromPDF(url) {
  try {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    let text = '';
    for (let i = 1; i <= Math.min(5, pdf.numPages); i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ');
    }
    return text;
  } catch (error) {
    console.error('PDF.js error:', error);
    return 'Error loading PDF - Open link directly.'; // Fallback
  }
}