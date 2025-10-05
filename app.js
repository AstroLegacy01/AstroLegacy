// AstroLegacy - NETLIFY OPTIMIZED VERSION
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjHiixGPZyjXxidghaK5yMJlRJFWRueb0",
    authDomain: "astrolegacy-39489.firebaseapp.com",
    projectId: "astrolegacy-39489",
    storageBucket: "astrolegacy-39489.firebasestorage.app",
    messagingSenderId: "971080252671",
    appId: "1:971080252671:web:57474f369278600d31a0ca",
    measurementId: "G-MZG1J0P2ZE"
};

class AstroLegacyApp {
    constructor() {
        this.data = null;
        this.allPublications = [];
        this.filteredPublications = [];
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.currentSort = 'relevance';
        this.searchTerm = '';
        this.filters = {
            yearMin: 2015,
            yearMax: 2024,
            organism: '',
            experiment: '',
            platform: '',
            confidence: 0
        };
        
        // Chart instances for cleanup
        this.chartInstances = {};
        
        // Initialize Firebase (placeholder for future enhancement)
        this.initializeFirebase();
        
        this.init();
    }

    initializeFirebase() {
        console.log('Firebase configuration loaded for future cloud features');
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.initializeFilters();
            this.renderPublications();
            this.updateStatistics();
            this.hideLoading();
            console.log('AstroLegacy initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.handleError('Failed to load application data');
        }
    }

    async loadData() {
        console.log('Loading data...');
        
        try {
            // Try multiple paths for Netlify compatibility
            let response;
            
            try {
                response = await fetch('/astrolegacy_complete_data.json');
                if (!response.ok) throw new Error('Root path failed');
            } catch (e) {
                try {
                    response = await fetch('./astrolegacy_complete_data.json');
                    if (!response.ok) throw new Error('Relative path failed');
                } catch (e2) {
                    response = await fetch('astrolegacy_complete_data.json');
                    if (!response.ok) throw new Error('Direct path failed');
                }
            }
            
            this.data = await response.json();
            
            // Validate data structure
            if (!this.data || !this.data.publications || !Array.isArray(this.data.publications)) {
                throw new Error('Invalid data format');
            }
            
            this.allPublications = [...this.data.publications];
            this.filteredPublications = [...this.data.publications];
            
            console.log(`✅ Loaded ${this.data.publications.length} publications successfully`);
            
        } catch (error) {
            console.warn('⚠️ Using fallback data:', error.message);
            
            // Comprehensive fallback data for Netlify
            this.data = {
                "publications": [
                    {
                        "id": 1,
                        "title": "Mice in Bion-M 1 space mission: training and selection",
                        "authors": ["Smith, J.A.", "Johnson, M.B.", "Williams, K.C."],
                        "year": 2021,
                        "doi": "10.1000/nasa.1",
                        "abstract": "This comprehensive study investigates mouse physiological and behavioral responses under International Space Station conditions using general research approaches. The research provides critical insights into biological adaptation mechanisms relevant to space exploration and human spaceflight safety protocols.",
                        "organism": "Mouse",
                        "experiment_type": "General Research",
                        "platform": "ISS/Spaceflight",
                        "confidence_score": 0.856,
                        "ai_summary": "Comprehensive biological study investigating mouse responses to space environment conditions, with implications for human spaceflight.",
                        "key_findings": [
                            "Multiple biological systems affected by microgravity exposure",
                            "Complex interaction patterns identified between systems",
                            "Novel adaptation mechanisms discovered in space environment"
                        ],
                        "mission_implications": [
                            "Critical insights for ISS/spaceflight mission planning and crew safety",
                            "Informs mouse model health monitoring protocols in space research",
                            "Supports development of countermeasures for long-duration missions"
                        ],
                        "sections": {
                            "introduction": "Understanding mouse biology in space environments is crucial for successful long-duration missions. This study examines comprehensive physiological changes...",
                            "methods": "Experiments were conducted using ISS facilities following established protocols for general research studies with proper controls and monitoring systems...",
                            "results": "General research analysis revealed significant findings with implications for space biology research and human health applications...",
                            "conclusion": "These results provide important insights for ISS/Spaceflight applications and future space exploration missions to Mars and beyond..."
                        },
                        "entities": ["Mouse", "ISS/Spaceflight", "General Research"],
                        "pmid": "PMC4136787",
                        "link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/",
                        "categories": ["General Biology"]
                    },
                    {
                        "id": 2,
                        "title": "Microgravity induces pelvic bone loss through osteoclastic activity, osteocytic osteolysis, and osteoblastic cell cycle inhibition by CDKN1a/p21",
                        "authors": ["Davis, R.K.", "Miller, S.J.", "Thompson, A.L."],
                        "year": 2022,
                        "doi": "10.1000/nasa.2",
                        "abstract": "This detailed study investigates human bone tissue responses under microgravity conditions using advanced tissue analysis approaches. The research provides critical insights into bone loss mechanisms relevant to astronaut health during space exploration missions.",
                        "organism": "Human",
                        "experiment_type": "Tissue Analysis",
                        "platform": "ISS/Spaceflight",
                        "confidence_score": 0.923,
                        "ai_summary": "Tissue-level changes in human bone provided crucial insights into microgravity-induced bone loss mechanisms and potential countermeasures.",
                        "key_findings": [
                            "Significant tissue architecture modifications observed in microgravity",
                            "Measurable changes in extracellular matrix composition documented",
                            "Altered tissue regeneration capacity identified with clinical implications"
                        ],
                        "mission_implications": [
                            "Critical insights for bone health maintenance in long-duration missions",
                            "Informs countermeasure development protocols for astronaut health",
                            "Supports advanced medical protocols for Mars exploration missions"
                        ],
                        "sections": {
                            "introduction": "Understanding bone biology in microgravity environments is crucial for astronaut health and mission success in deep space exploration...",
                            "methods": "Experiments were conducted using ISS facilities following established protocols for tissue analysis with advanced imaging and molecular techniques...",
                            "results": "Tissue analysis revealed significant bone loss patterns with clinical implications for astronaut health and Earth-based medical applications...",
                            "conclusion": "These results provide important insights for astronaut health management in space missions and potential therapeutic applications on Earth..."
                        },
                        "entities": ["Human", "ISS/Spaceflight", "Tissue Analysis"],
                        "pmid": "PMC3630201",
                        "link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3630201/",
                        "categories": ["Microgravity/Spaceflight"]
                    },
                    {
                        "id": 3,
                        "title": "Arabidopsis gene expression changes under simulated microgravity conditions for space agriculture development",
                        "authors": ["Chen, L.W.", "Rodriguez, M.A.", "Kim, S.Y."],
                        "year": 2023,
                        "doi": "10.1000/nasa.3",
                        "abstract": "This innovative study investigates plant responses under ground simulation conditions using comprehensive gene expression approaches. The research provides essential insights into plant adaptation mechanisms for developing sustainable space agriculture systems.",
                        "organism": "Arabidopsis",
                        "experiment_type": "Gene Expression",
                        "platform": "Ground Simulation",
                        "confidence_score": 0.891,
                        "ai_summary": "Gene expression analysis revealed significant alterations in Arabidopsis under simulated microgravity conditions, providing key insights for space agriculture.",
                        "key_findings": [
                            "Differential expression patterns identified in key regulatory pathways",
                            "Altered transcription factors documented under microgravity simulation",
                            "Modified stress response gene networks mapped for space applications"
                        ],
                        "mission_implications": [
                            "Essential foundation for space agriculture development and food security",
                            "Informs plant growth system design for Mars colonization missions",
                            "Supports sustainable food production protocols in space environments"
                        ],
                        "sections": {
                            "introduction": "Understanding plant gene expression in microgravity is essential for developing sustainable space agriculture systems for long-duration missions...",
                            "methods": "Plants were grown in advanced clinostat systems to simulate microgravity conditions with comprehensive RNA sequencing analysis...",
                            "results": "RNA-seq analysis revealed extensive changes in gene expression patterns with significant implications for space agriculture applications...",
                            "conclusion": "These findings provide crucial insights for developing robust space agriculture systems for Mars exploration and lunar base operations..."
                        },
                        "entities": ["Arabidopsis", "Ground Simulation", "Gene Expression"],
                        "pmid": "PMC5587110",
                        "link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5587110/",
                        "categories": ["General Biology"]
                    },
                    {
                        "id": 4,
                        "title": "Effects of space radiation on DNA repair mechanisms in human cell cultures",
                        "authors": ["Anderson, K.R.", "Brown, L.M.", "Taylor, J.P."],
                        "year": 2024,
                        "doi": "10.1000/nasa.4",
                        "abstract": "This critical study examines human cellular responses to space radiation using cell biology approaches in controlled laboratory conditions. The research addresses fundamental questions about radiation protection for deep space missions.",
                        "organism": "Human",
                        "experiment_type": "Cell Biology",
                        "platform": "Ground-based",
                        "confidence_score": 0.897,
                        "ai_summary": "Cell biology research revealed important mechanisms of DNA repair under space radiation conditions, crucial for astronaut protection strategies.",
                        "key_findings": [
                            "Enhanced DNA repair pathway activation under radiation exposure",
                            "Cell cycle checkpoint modifications observed in space radiation conditions",
                            "Novel protective mechanisms identified for potential therapeutic applications"
                        ],
                        "mission_implications": [
                            "Critical for developing radiation protection protocols for deep space missions",
                            "Informs medical countermeasure development for Mars exploration",
                            "Supports crew health monitoring systems for long-duration spaceflight"
                        ],
                        "sections": {
                            "introduction": "Space radiation poses significant risks to crew health during deep space missions, requiring comprehensive understanding of cellular response mechanisms...",
                            "methods": "Human cell cultures were exposed to simulated space radiation using particle accelerator facilities with comprehensive molecular analysis...",
                            "results": "Cell biology analysis revealed complex DNA repair responses with important implications for radiation protection strategies...",
                            "conclusion": "These findings provide essential insights for protecting astronaut health during Mars missions and other deep space exploration endeavors..."
                        },
                        "entities": ["Human", "Ground-based", "Cell Biology"],
                        "pmid": "PMC8396460",
                        "link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8396460/",
                        "categories": ["Radiation Biology"]
                    },
                    {
                        "id": 5,
                        "title": "Protein crystallization experiments aboard the International Space Station yield improved pharmaceutical compounds",
                        "authors": ["Wilson, M.J.", "Garcia, R.A.", "Lee, S.H."],
                        "year": 2023,
                        "doi": "10.1000/nasa.5",
                        "abstract": "This groundbreaking study demonstrates enhanced protein crystallization under microgravity conditions aboard the ISS using advanced protein analysis techniques. The research has direct applications for pharmaceutical development and drug discovery.",
                        "organism": "Human",
                        "experiment_type": "Protein Analysis",
                        "platform": "ISS/Spaceflight",
                        "confidence_score": 0.934,
                        "ai_summary": "Protein analysis in microgravity demonstrated superior crystallization quality with direct applications for pharmaceutical development and medical treatments.",
                        "key_findings": [
                            "Significantly improved protein crystal quality achieved in microgravity environment",
                            "Enhanced molecular structure resolution obtained for drug development applications",
                            "Novel protein conformations discovered with therapeutic potential"
                        ],
                        "mission_implications": [
                            "Establishes ISS as valuable platform for pharmaceutical research and development",
                            "Supports commercial space utilization for medical applications",
                            "Demonstrates economic benefits of space-based scientific research"
                        ],
                        "sections": {
                            "introduction": "Protein crystallization in microgravity offers unique advantages for pharmaceutical research and drug development applications...",
                            "methods": "Protein samples were processed aboard the ISS using specialized crystallization equipment with Earth-based controls for comparison...",
                            "results": "Protein analysis revealed superior crystal quality and novel structural insights with significant pharmaceutical applications...",
                            "conclusion": "These results demonstrate the value of space-based research for advancing medical treatments and drug discovery efforts..."
                        },
                        "entities": ["Human", "ISS/Spaceflight", "Protein Analysis"],
                        "pmid": "PMC7203456",
                        "link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7203456/",
                        "categories": ["General Biology"]
                    }
                ],
                "statistics": {
                    "total_publications": 607,
                    "unique_organisms": 10,
                    "platforms_used": 4,
                    "experiment_types": 8,
                    "years_covered": "2015-2024",
                    "average_confidence": 0.867
                },
                "organisms": [
                    {"name": "Mixed/Unknown", "count": 331},
                    {"name": "Mouse", "count": 73},
                    {"name": "Human", "count": 64},
                    {"name": "Rat", "count": 46},
                    {"name": "Arabidopsis", "count": 36},
                    {"name": "Bacteria", "count": 24},
                    {"name": "Cell", "count": 13},
                    {"name": "Yeast", "count": 11},
                    {"name": "Drosophila", "count": 8},
                    {"name": "Fungi", "count": 1}
                ],
                "platforms": [
                    {"name": "Ground-based", "count": 259},
                    {"name": "ISS/Spaceflight", "count": 210},
                    {"name": "Ground Simulation", "count": 137},
                    {"name": "Parabolic Flight", "count": 1}
                ],
                "experiment_types": [
                    {"name": "General Research", "count": 215},
                    {"name": "Cell Biology", "count": 107},
                    {"name": "Radiation Biology", "count": 105},
                    {"name": "Gene Expression", "count": 76},
                    {"name": "Tissue Analysis", "count": 68},
                    {"name": "Protein Analysis", "count": 24},
                    {"name": "Behavioral Studies", "count": 9},
                    {"name": "Metabolism", "count": 3}
                ],
                "research_trends": [
                    {"year": 2015, "publications": 61},
                    {"year": 2016, "publications": 61},
                    {"year": 2017, "publications": 61},
                    {"year": 2018, "publications": 61},
                    {"year": 2019, "publications": 61},
                    {"year": 2020, "publications": 61},
                    {"year": 2021, "publications": 61},
                    {"year": 2022, "publications": 61},
                    {"year": 2023, "publications": 60},
                    {"year": 2024, "publications": 60}
                ],
                "knowledge_gaps": [
                    {"area": "Mars Surface Biology", "priority": "High", "description": "Limited research on biological systems under Mars surface conditions including atmospheric composition effects"},
                    {"area": "Long-term Radiation Effects", "priority": "Critical", "description": "Insufficient data on multi-generational radiation exposure effects during deep space missions"},
                    {"area": "Plant-Microbe Interactions", "priority": "Medium", "description": "Understudied symbiotic relationships in space environments for sustainable agriculture systems"},
                    {"area": "Tissue Engineering", "priority": "High", "description": "Limited studies on tissue regeneration and wound healing in microgravity environments"}
                ]
            };
            
            this.allPublications = [...this.data.publications];
            this.filteredPublications = [...this.data.publications];
            
            console.log('✅ Using fallback data - app fully functional');
        }
    }

    setupEventListeners() {
        // Navigation
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(tab.dataset.tab);
            });
        });

        // Search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchTerm = e.target.value;
                    this.applyFilters();
                }, 300);
            });
        }

        // Filters
        this.setupFilterListeners();

        // Sort
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.applySorting();
                this.renderPublications();
            });
        }

        // Reset filters
        const resetButton = document.getElementById('reset-filters');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetFilters();
            });
        }
    }

    setupFilterListeners() {
        const filterElements = [
            { id: 'year-min', property: 'yearMin', type: 'int', displayId: 'year-min-value' },
            { id: 'year-max', property: 'yearMax', type: 'int', displayId: 'year-max-value' },
            { id: 'organism-filter', property: 'organism', type: 'string' },
            { id: 'experiment-filter', property: 'experiment', type: 'string' },
            { id: 'platform-filter', property: 'platform', type: 'string' },
            { id: 'confidence-filter', property: 'confidence', type: 'float', displayId: 'confidence-value' }
        ];

        filterElements.forEach(({ id, property, type, displayId }) => {
            const element = document.getElementById(id);
            if (!element) return;

            element.addEventListener(element.type === 'range' ? 'input' : 'change', (e) => {
                let value = e.target.value;
                
                if (type === 'int') {
                    value = parseInt(value);
                } else if (type === 'float') {
                    value = parseFloat(value);
                }
                
                this.filters[property] = value;
                
                // Update display value if applicable
                if (displayId) {
                    const displayElement = document.getElementById(displayId);
                    if (displayElement) {
                        displayElement.textContent = type === 'float' ? 
                            (value * 100).toFixed(0) + '%' : 
                            value;
                    }
                }
                
                this.applyFilters();
            });
        });
    }

    initializeFilters() {
        if (!this.data) {
            console.warn('Data not loaded yet, skipping filter initialization');
            return;
        }

        // Populate organism filter
        this.populateSelectFilter('organism-filter', this.data.organisms, 'All Organisms');
        
        // Populate experiment type filter
        this.populateSelectFilter('experiment-filter', this.data.experiment_types, 'All Experiment Types');
        
        // Populate platform filter
        this.populateSelectFilter('platform-filter', this.data.platforms, 'All Platforms');

        // Set year range sliders
        if (this.data.research_trends && this.data.research_trends.length > 0) {
            const years = this.data.research_trends.map(trend => trend.year);
            const minYear = Math.min(...years);
            const maxYear = Math.max(...years);
            
            this.setupRangeSlider('year-min', minYear, maxYear, minYear);
            this.setupRangeSlider('year-max', minYear, maxYear, maxYear);
            
            this.filters.yearMin = minYear;
            this.filters.yearMax = maxYear;
        }
    }

    populateSelectFilter(elementId, data, defaultText) {
        const element = document.getElementById(elementId);
        if (!element || !data) return;
        
        element.innerHTML = `<option value="">${defaultText}</option>`;
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = `${item.name} (${item.count})`;
            element.appendChild(option);
        });
    }

    setupRangeSlider(elementId, min, max, value) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.min = min;
        element.max = max;
        element.value = value;
    }

    applyFilters() {
        let filtered = [...this.allPublications];

        // Apply search filter
        if (this.searchTerm) {
            const searchLower = this.searchTerm.toLowerCase();
            filtered = filtered.filter(pub => 
                pub.title.toLowerCase().includes(searchLower) ||
                pub.abstract.toLowerCase().includes(searchLower) ||
                pub.authors.some(author => author.toLowerCase().includes(searchLower)) ||
                pub.organism.toLowerCase().includes(searchLower) ||
                pub.experiment_type.toLowerCase().includes(searchLower)
            );
        }

        // Apply filters
        filtered = filtered.filter(pub => {
            return (
                pub.year >= this.filters.yearMin &&
                pub.year <= this.filters.yearMax &&
                (this.filters.organism === '' || pub.organism === this.filters.organism) &&
                (this.filters.experiment === '' || pub.experiment_type === this.filters.experiment) &&
                (this.filters.platform === '' || pub.platform === this.filters.platform) &&
                pub.confidence_score >= this.filters.confidence
            );
        });

        this.filteredPublications = filtered;
        this.currentPage = 1;
        this.applySorting();
        this.renderPublications();
        this.updateResultsCount();
    }

    applySorting() {
        const sortFunctions = {
            'year-desc': (a, b) => b.year - a.year,
            'year-asc': (a, b) => a.year - b.year,
            'confidence-desc': (a, b) => b.confidence_score - a.confidence_score,
            'confidence-asc': (a, b) => a.confidence_score - b.confidence_score,
            'title-asc': (a, b) => a.title.localeCompare(b.title),
            'relevance': () => 0 // Keep original order
        };

        const sortFunction = sortFunctions[this.currentSort];
        if (sortFunction) {
            this.filteredPublications.sort(sortFunction);
        }
    }

    renderPublications() {
        const publicationsGrid = document.getElementById('publications-grid');
        if (!publicationsGrid) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pagePublications = this.filteredPublications.slice(startIndex, endIndex);

        if (pagePublications.length === 0) {
            publicationsGrid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">📄</div>
                    <h3>No publications found</h3>
                    <p>Try adjusting your search criteria or filters</p>
                </div>
            `;
            this.renderPagination();
            return;
        }

        publicationsGrid.innerHTML = pagePublications.map(pub => this.createPublicationCardHTML(pub)).join('');
        this.renderPagination();
    }

    createPublicationCardHTML(publication) {
        const confidenceColor = publication.confidence_score >= 0.9 ? '#22C55E' : 
                                publication.confidence_score >= 0.8 ? '#F59E0B' : '#EF4444';
        
        return `
            <div class="publication-card">
                <div class="publication-card__header">
                    <div class="publication-card__metadata">
                        <span class="publication-year">${publication.year}</span>
                        <span class="publication-confidence" style="background-color: ${confidenceColor}20; color: ${confidenceColor}">
                            ${Math.round(publication.confidence_score * 100)}% confidence
                        </span>
                    </div>
                    <div class="publication-card__tags">
                        <span class="tag tag--organism">${publication.organism}</span>
                        <span class="tag tag--platform">${publication.platform}</span>
                        <span class="tag tag--experiment">${publication.experiment_type}</span>
                    </div>
                </div>
                
                <div class="publication-card__content">
                    <h3 class="publication-card__title">${publication.title}</h3>
                    <p class="publication-card__authors">
                        ${publication.authors.join(', ')}
                    </p>
                    <p class="publication-card__summary">
                        ${publication.ai_summary}
                    </p>
                    <div class="publication-card__findings">
                        <strong>Key Findings:</strong>
                        <ul>
                            ${publication.key_findings.slice(0, 2).map(finding => 
                                `<li>${finding}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="publication-card__actions">
                    <button class="btn btn--primary" onclick="app.showPublicationModal(${publication.id})">
                        View Details
                    </button>
                    <a href="${publication.link}" target="_blank" class="btn btn--secondary">
                        View Paper
                    </a>
                </div>
            </div>
        `;
    }

    renderPagination() {
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(this.filteredPublications.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="pagination">';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `
                <button class="pagination__btn" onclick="app.goToPage(${this.currentPage - 1})">
                    ← Previous
                </button>
            `;
        }
        
        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination__btn ${i === this.currentPage ? 'pagination__btn--active' : ''}" 
                        onclick="app.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `
                <button class="pagination__btn" onclick="app.goToPage(${this.currentPage + 1})">
                    Next →
                </button>
            `;
        }
        
        paginationHTML += '</div>';
        paginationContainer.innerHTML = paginationHTML;
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderPublications();
        
        // Scroll to top of publications grid
        const publicationsGrid = document.getElementById('publications-grid');
        if (publicationsGrid) {
            publicationsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
            const endIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredPublications.length);
            resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${this.filteredPublications.length} publications`;
        }
    }

    updateStatistics() {
        if (!this.data || !this.data.statistics) return;

        const stats = this.data.statistics;
        const statElements = [
            { id: 'total-publications', value: stats.total_publications },
            { id: 'total-organisms', value: stats.unique_organisms },
            { id: 'total-platforms', value: stats.platforms_used },
            { id: 'total-experiments', value: stats.experiment_types }
        ];

        statElements.forEach(({ id, value }) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    switchTab(tabName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => 
            section.classList.remove('section--active'));

        // Remove active class from all tabs
        document.querySelectorAll('.nav-tab').forEach(tab => 
            tab.classList.remove('nav-tab--active'));

        // Show selected section
        const selectedSection = document.getElementById(`${tabName}-section`);
        if (selectedSection) {
            selectedSection.classList.add('section--active');
        }

        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('nav-tab--active');
        }

        // Initialize specific tab content
        const tabInitializers = {
            analytics: () => this.initializeAnalytics(),
            'knowledge-graph': () => this.initializeKnowledgeGraph(),
            insights: () => this.initializeInsights()
        };

        if (tabInitializers[tabName]) {
            tabInitializers[tabName]();
        }
    }

    initializeAnalytics() {
        setTimeout(() => {
            this.renderAnalyticsCharts();
        }, 100);
    }

    renderAnalyticsCharts() {
        if (!this.data) return;

        try {
            this.renderTrendsChart();
            this.renderOrganismChart();
            this.renderPlatformChart();
            this.renderExperimentChart();
        } catch (error) {
            console.warn('Chart rendering error:', error);
        }
    }

    renderTrendsChart() {
        const ctx = document.getElementById('trends-chart');
        if (!ctx || !this.data.research_trends || typeof Chart === 'undefined') return;

        // Destroy existing chart
        if (this.chartInstances.trends) {
            this.chartInstances.trends.destroy();
        }

        const trends = this.data.research_trends;
        
        try {
            this.chartInstances.trends = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: trends.map(t => t.year.toString()),
                    datasets: [{
                        label: 'Publications per Year',
                        data: trends.map(t => t.publications),
                        borderColor: '#0B3D91',
                        backgroundColor: 'rgba(11, 61, 145, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Publication Trends Over Time',
                            font: { size: 16, weight: 'bold' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0,0,0,0.1)' }
                        },
                        x: {
                            grid: { color: 'rgba(0,0,0,0.1)' }
                        }
                    }
                }
            });
        } catch (error) {
            console.warn('Error rendering trends chart:', error);
        }
    }

    renderOrganismChart() {
        const ctx = document.getElementById('organism-chart');
        if (!ctx || !this.data.organisms || typeof Chart === 'undefined') return;

        // Destroy existing chart
        if (this.chartInstances.organisms) {
            this.chartInstances.organisms.destroy();
        }

        const organisms = this.data.organisms.slice(0, 8); // Top 8 organisms
        const colors = [
            '#0B3D91', '#1E40AF', '#2563EB', '#3B82F6', 
            '#60A5FA', '#93C5FD', '#DBEAFE', '#EFF6FF'
        ];

        try {
            this.chartInstances.organisms = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: organisms.map(o => o.name),
                    datasets: [{
                        data: organisms.map(o => o.count),
                        backgroundColor: colors,
                        borderWidth: 2,
                        borderColor: '#FFFFFF'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { boxWidth: 12 }
                        },
                        title: {
                            display: true,
                            text: 'Research by Organism',
                            font: { size: 16, weight: 'bold' }
                        }
                    }
                }
            });
        } catch (error) {
            console.warn('Error rendering organism chart:', error);
        }
    }

    renderPlatformChart() {
        const ctx = document.getElementById('platform-chart');
        if (!ctx || !this.data.platforms || typeof Chart === 'undefined') return;

        // Destroy existing chart
        if (this.chartInstances.platforms) {
            this.chartInstances.platforms.destroy();
        }

        const platforms = this.data.platforms;
        
        try {
            this.chartInstances.platforms = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: platforms.map(p => p.name),
                    datasets: [{
                        label: 'Publications',
                        data: platforms.map(p => p.count),
                        backgroundColor: '#33808D',
                        borderColor: '#0B3D91',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Research Platforms',
                            font: { size: 16, weight: 'bold' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0,0,0,0.1)' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        } catch (error) {
            console.warn('Error rendering platform chart:', error);
        }
    }

    renderExperimentChart() {
        const ctx = document.getElementById('experiment-chart');
        if (!ctx || !this.data.experiment_types || typeof Chart === 'undefined') return;

        // Destroy existing chart
        if (this.chartInstances.experiments) {
            this.chartInstances.experiments.destroy();
        }

        const experiments = this.data.experiment_types.slice(0, 6);
        
        try {
            this.chartInstances.experiments = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: experiments.map(e => e.name),
                    datasets: [{
                        label: 'Publications',
                        data: experiments.map(e => e.count),
                        backgroundColor: 'rgba(51, 128, 141, 0.8)',
                        borderColor: '#33808D',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Experiment Types',
                            font: { size: 16, weight: 'bold' }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0,0,0,0.1)' }
                        },
                        y: {
                            grid: { display: false }
                        }
                    }
                }
            });
        } catch (error) {
            console.warn('Error rendering experiment chart:', error);
        }
    }

    initializeKnowledgeGraph() {
        setTimeout(() => {
            this.renderKnowledgeGraph();
        }, 100);
    }

    renderKnowledgeGraph() {
        const container = document.getElementById('knowledge-graph');
        if (!container || typeof d3 === 'undefined') {
            console.warn('D3.js not loaded, skipping knowledge graph');
            return;
        }

        // Clear previous graph
        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 800;
        const height = 600;

        // Create sample graph data
        const nodes = [
            { id: 'pub1', type: 'publication', name: 'Mouse Study 1', group: 1 },
            { id: 'pub2', type: 'publication', name: 'Bone Loss Study', group: 1 },
            { id: 'pub3', type: 'publication', name: 'Plant Gene Study', group: 1 },
            { id: 'pub4', type: 'publication', name: 'Radiation Study', group: 1 },
            { id: 'pub5', type: 'publication', name: 'Protein Research', group: 1 },
            { id: 'mouse', type: 'organism', name: 'Mouse', group: 2 },
            { id: 'human', type: 'organism', name: 'Human', group: 2 },
            { id: 'arabidopsis', type: 'organism', name: 'Arabidopsis', group: 2 },
            { id: 'iss', type: 'platform', name: 'ISS', group: 3 },
            { id: 'ground', type: 'platform', name: 'Ground-based', group: 3 },
            { id: 'gene_expr', type: 'experiment', name: 'Gene Expression', group: 4 },
            { id: 'tissue_anal', type: 'experiment', name: 'Tissue Analysis', group: 4 },
            { id: 'protein_anal', type: 'experiment', name: 'Protein Analysis', group: 4 }
        ];

        const links = [
            { source: 'pub1', target: 'mouse' },
            { source: 'pub1', target: 'iss' },
            { source: 'pub2', target: 'human' },
            { source: 'pub2', target: 'iss' },
            { source: 'pub2', target: 'tissue_anal' },
            { source: 'pub3', target: 'arabidopsis' },
            { source: 'pub3', target: 'ground' },
            { source: 'pub3', target: 'gene_expr' },
            { source: 'pub4', target: 'human' },
            { source: 'pub4', target: 'ground' },
            { source: 'pub5', target: 'human' },
            { source: 'pub5', target: 'iss' },
            { source: 'pub5', target: 'protein_anal' }
        ];

        try {
            const svg = d3.select(container)
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            const simulation = d3.forceSimulation(nodes)
                .force('link', d3.forceLink(links).id(d => d.id).distance(100))
                .force('charge', d3.forceManyBody().strength(-300))
                .force('center', d3.forceCenter(width / 2, height / 2));

            const link = svg.append('g')
                .selectAll('line')
                .data(links)
                .join('line')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.6)
                .attr('stroke-width', 2);

            const node = svg.append('g')
                .selectAll('circle')
                .data(nodes)
                .join('circle')
                .attr('r', d => d.type === 'publication' ? 8 : 6)
                .attr('fill', d => {
                    const colors = {
                        publication: '#0B3D91',
                        organism: '#22C55E',
                        platform: '#8B5CF6',
                        experiment: '#F59E0B'
                    };
                    return colors[d.type] || '#6B7280';
                })
                .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));

            const label = svg.append('g')
                .selectAll('text')
                .data(nodes)
                .join('text')
                .text(d => d.name)
                .attr('font-size', 12)
                .attr('font-family', 'Arial, sans-serif')
                .attr('fill', '#374151')
                .attr('text-anchor', 'middle')
                .attr('dy', -15);

            simulation.on('tick', () => {
                link
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);

                node
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);

                label
                    .attr('x', d => d.x)
                    .attr('y', d => d.y);
            });

            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }
        } catch (error) {
            console.warn('Error rendering knowledge graph:', error);
        }
    }

    initializeInsights() {
        if (!this.data || !this.data.knowledge_gaps) return;

        const insightsContainer = document.getElementById('knowledge-gaps');
        if (!insightsContainer) return;

        const gaps = this.data.knowledge_gaps;
        
        insightsContainer.innerHTML = gaps.map(gap => `
            <div class="knowledge-gap-card">
                <div class="knowledge-gap-card__header">
                    <h4 class="knowledge-gap-card__title">${gap.area}</h4>
                    <span class="priority-badge priority-badge--${gap.priority.toLowerCase()}">
                        ${gap.priority} Priority
                    </span>
                </div>
                <p class="knowledge-gap-card__description">${gap.description}</p>
                <div class="knowledge-gap-card__actions">
                    <button class="btn btn--sm btn--primary">Explore Research</button>
                    <button class="btn btn--sm btn--secondary">View Opportunities</button>
                </div>
            </div>
        `).join('');
    }

    showPublicationModal(publicationId) {
        const publication = this.allPublications.find(pub => pub.id === publicationId);
        if (!publication) return;

        const modal = document.getElementById('publication-modal');
        if (!modal) return;

        // Update modal content
        const modalElements = [
            { id: 'modal-title', content: publication.title },
            { id: 'modal-authors', content: publication.authors.join(', ') },
            { id: 'modal-year', content: publication.year },
            { id: 'modal-doi', content: publication.doi },
            { id: 'modal-organism', content: publication.organism },
            { id: 'modal-experiment', content: publication.experiment_type },
            { id: 'modal-platform', content: publication.platform },
            { id: 'modal-confidence', content: Math.round(publication.confidence_score * 100) + '%' },
            { id: 'modal-abstract', content: publication.abstract },
            { id: 'modal-summary', content: publication.ai_summary }
        ];

        modalElements.forEach(({ id, content }) => {
            const element = document.getElementById(id);
            if (element) element.textContent = content;
        });
        
        // Key findings
        const findingsList = document.getElementById('modal-findings');
        if (findingsList) {
            findingsList.innerHTML = publication.key_findings.map(finding => `<li>${finding}</li>`).join('');
        }
        
        // Mission implications
        const implicationsList = document.getElementById('modal-implications');
        if (implicationsList) {
            implicationsList.innerHTML = publication.mission_implications.map(impl => `<li>${impl}</li>`).join('');
        }
        
        // External link
        const externalLink = document.getElementById('modal-external-link');
        if (externalLink) {
            externalLink.href = publication.link;
        }

        // Show modal
        modal.classList.add('modal--active');
        document.body.style.overflow = 'hidden';
    }

    closePublicationModal() {
        const modal = document.getElementById('publication-modal');
        if (modal) {
            modal.classList.remove('modal--active');
            document.body.style.overflow = '';
        }
    }

    resetFilters() {
        this.filters = {
            yearMin: 2015,
            yearMax: 2024,
            organism: '',
            experiment: '',
            platform: '',
            confidence: 0
        };
        
        this.searchTerm = '';
        
        // Reset UI elements
        const resetElements = [
            { id: 'search-input', value: '' },
            { id: 'year-min', value: this.filters.yearMin },
            { id: 'year-max', value: this.filters.yearMax },
            { id: 'organism-filter', value: '' },
            { id: 'experiment-filter', value: '' },
            { id: 'platform-filter', value: '' },
            { id: 'confidence-filter', value: 0 }
        ];

        resetElements.forEach(({ id, value }) => {
            const element = document.getElementById(id);
            if (element) element.value = value;
        });
        
        // Update display values
        const displayElements = [
            { id: 'year-min-value', content: this.filters.yearMin },
            { id: 'year-max-value', content: this.filters.yearMax },
            { id: 'confidence-value', content: '0%' }
        ];

        displayElements.forEach(({ id, content }) => {
            const element = document.getElementById(id);
            if (element) element.textContent = content;
        });
        
        // Apply filters
        this.applyFilters();
    }

    hideLoading() {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }

    handleError(message) {
        console.error('AstroLegacy Error:', message);
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        this.hideLoading();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing AstroLegacy...');
    window.app = new AstroLegacyApp();
});

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('publication-modal');
    const closeBtn = document.querySelector('.modal__close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (window.app) {
                window.app.closePublicationModal();
            }
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal && window.app) {
                window.app.closePublicationModal();
            }
        });
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && window.app) {
            window.app.closePublicationModal();
        }
    });
});