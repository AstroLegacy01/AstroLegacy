// AstroLegacy Webapp - Main JavaScript
class AstroLegacyApp {
    constructor() {
        this.data = null;
        this.filteredPublications = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.charts = {};
        this.knowledgeGraph = null;
        this.searchTimeout = null;
        
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.initializeApp();
            this.hideLoading();
        } catch (error) {
            this.showError('Failed to initialize application: ' + error.message);
        }
    }

    async loadData() {
        // Simulate loading the complete dataset
        this.data = {
            publications: this.generatePublications(),
            organisms: [
                {"name": "Mouse", "count": 150, "type": "Mammal"},
                {"name": "Rat", "count": 120, "type": "Mammal"},
                {"name": "Arabidopsis", "count": 80, "type": "Plant"},
                {"name": "Human", "count": 75, "type": "Mammal"},
                {"name": "Drosophila", "count": 60, "type": "Arthropod"},
                {"name": "Plant", "count": 50, "type": "Plant"},
                {"name": "Bacteria", "count": 40, "type": "Microorganism"},
                {"name": "Mixed/Unknown", "count": 20, "type": "Mixed"},
                {"name": "Yeast", "count": 10, "type": "Fungus"},
                {"name": "Cell Culture", "count": 2, "type": "Cell Line"}
            ],
            platforms: [
                {"name": "ISS/Spaceflight", "count": 300, "type": "Space-based"},
                {"name": "Ground-based", "count": 200, "type": "Earth-based"},
                {"name": "Ground Simulation", "count": 80, "type": "Simulated"},
                {"name": "Parabolic Flight", "count": 27, "type": "Microgravity"}
            ],
            experiment_types: [
                {"name": "General Research", "count": 150},
                {"name": "Cell Biology", "count": 107},
                {"name": "Gene Expression", "count": 76},
                {"name": "Radiation Biology", "count": 105},
                {"name": "Tissue Analysis", "count": 68},
                {"name": "Protein Analysis", "count": 24},
                {"name": "Behavioral Studies", "count": 9},
                {"name": "Metabolism", "count": 68}
            ],
            statistics: {
                total_publications: 607,
                unique_organisms: 10,
                platforms_used: 4,
                experiment_types: 8,
                average_confidence: 0.867,
                years_covered: "2015-2024",
                top_research_areas: [
                    "Gene Expression Analysis",
                    "Cell Biology Studies", 
                    "Radiation Biology",
                    "Protein Analysis",
                    "Tissue Biology"
                ]
            },
            research_trends: [
                {"year": 2015, "publications": 45},
                {"year": 2016, "publications": 52},
                {"year": 2017, "publications": 58},
                {"year": 2018, "publications": 64},
                {"year": 2019, "publications": 71},
                {"year": 2020, "publications": 75},
                {"year": 2021, "publications": 68},
                {"year": 2022, "publications": 72},
                {"year": 2023, "publications": 65},
                {"year": 2024, "publications": 37}
            ]
        };

        this.filteredPublications = [...this.data.publications];
    }

    generatePublications() {
        const publications = [];
        const organisms = ["Mouse", "Rat", "Arabidopsis", "Human", "Drosophila", "Plant", "Bacteria", "Mixed/Unknown", "Yeast", "Cell Culture"];
        const platforms = ["ISS/Spaceflight", "Ground-based", "Ground Simulation", "Parabolic Flight"];
        const experiments = ["General Research", "Cell Biology", "Gene Expression", "Radiation Biology", "Tissue Analysis", "Protein Analysis", "Behavioral Studies", "Metabolism"];
        const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

        for (let i = 1; i <= 607; i++) {
            const organism = organisms[Math.floor(Math.random() * organisms.length)];
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            const experiment = experiments[Math.floor(Math.random() * experiments.length)];
            const year = years[Math.floor(Math.random() * years.length)];
            
            publications.push({
                id: i,
                title: this.generateTitle(organism, experiment, platform),
                authors: this.generateAuthors(),
                year: year,
                doi: `10.1000/nasa.${i}`,
                abstract: this.generateAbstract(organism, experiment, platform),
                organism: organism,
                experiment_type: experiment,
                platform: platform,
                confidence_score: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
                ai_summary: this.generateSummary(organism, experiment, platform),
                key_findings: this.generateFindings(),
                mission_implications: this.generateImplications(platform),
                sections: {
                    introduction: `Understanding ${organism} biology in space environments is crucial for successful long-duration missions...`,
                    methods: `Experiments were conducted using ${platform} facilities following established protocols for ${experiment} studies...`,
                    results: `${experiment} analysis revealed significant findings with implications for space biology research...`,
                    conclusion: `These results provide important insights for ${platform} applications and future space exploration missions...`
                },
                entities: [organism, platform, experiment],
                pmid: `PMC${4136787 + i}`,
                link: `https://www.ncbi.nlm.nih.gov/pmc/articles/PMC${4136787 + i}/`,
                categories: ["Microgravity/Spaceflight", "Radiation Biology"]
            });
        }

        return publications;
    }

    generateTitle(organism, experiment, platform) {
        const templates = [
            `${organism} responses to ${platform} conditions: ${experiment} analysis`,
            `Effects of microgravity on ${organism} in ${experiment} studies`,
            `${experiment} investigation of ${organism} adaptation to ${platform}`,
            `Space biology research: ${organism} ${experiment} during ${platform} missions`,
            `Molecular mechanisms of ${organism} response to ${platform} environment`
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    generateAuthors() {
        const firstNames = ["John", "Sarah", "Michael", "Emma", "David", "Lisa", "Robert", "Anna"];
        const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
        const count = Math.floor(Math.random() * 5) + 1;
        const authors = [];
        
        for (let i = 0; i < count; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            authors.push(`${firstName} ${lastName}`);
        }
        
        return authors;
    }

    generateAbstract(organism, experiment, platform) {
        return `This study investigates ${organism} responses under ${platform} conditions using ${experiment} approaches. The research provides critical insights into biological adaptation mechanisms relevant to space exploration and human spaceflight. Our findings demonstrate significant changes in cellular processes and molecular pathways that could impact mission success and crew health during long-duration space missions.`;
    }

    generateSummary(organism, experiment, platform) {
        return `Comprehensive biological study investigating ${organism} responses to ${platform} environment conditions through ${experiment} methodologies.`;
    }

    generateFindings() {
        const findings = [
            "Multiple biological systems affected by microgravity conditions",
            "Complex interaction patterns identified between cellular pathways",
            "Novel adaptation mechanisms discovered in space environment",
            "Significant changes in gene expression profiles observed",
            "Metabolic alterations detected during extended exposure",
            "Structural modifications in cellular components noted"
        ];
        return findings.slice(0, Math.floor(Math.random() * 3) + 2);
    }

    generateImplications(platform) {
        const implications = [
            `Critical insights for ${platform.toLowerCase()} mission planning`,
            "Informs health monitoring protocols in space environments",
            "Supports development of countermeasures for long-duration missions",
            "Contributes to risk assessment for space exploration",
            "Advances understanding of biological adaptation to extreme environments"
        ];
        return implications.slice(0, Math.floor(Math.random() * 3) + 2);
    }

    initializeApp() {
        this.populateFilters();
        this.renderPublications();
        this.updateHeaderStats();
        this.initializeInsights();
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Search and filters
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => this.debounceSearch(e.target.value));
        
        document.getElementById('clear-search').addEventListener('click', () => this.clearSearch());
        document.getElementById('organism-filter').addEventListener('change', () => this.applyFilters());
        document.getElementById('platform-filter').addEventListener('change', () => this.applyFilters());
        document.getElementById('experiment-filter').addEventListener('change', () => this.applyFilters());
        document.getElementById('year-filter').addEventListener('input', (e) => this.updateYearFilter(e.target.value));
        document.getElementById('sort-select').addEventListener('change', () => this.applySorting());

        // Export
        document.getElementById('export-results').addEventListener('click', () => this.exportResults());

        // Knowledge graph controls
        document.getElementById('show-organisms').addEventListener('change', () => this.updateKnowledgeGraph());
        document.getElementById('show-platforms').addEventListener('change', () => this.updateKnowledgeGraph());
        document.getElementById('show-experiments').addEventListener('change', () => this.updateKnowledgeGraph());
        document.getElementById('reset-graph').addEventListener('click', () => this.resetKnowledgeGraph());

        // Modal close on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    debounceSearch(query) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }

    performSearch(query) {
        try {
            if (!query.trim()) {
                this.filteredPublications = [...this.data.publications];
            } else {
                const searchTerm = query.toLowerCase();
                this.filteredPublications = this.data.publications.filter(pub => 
                    pub.title.toLowerCase().includes(searchTerm) ||
                    pub.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
                    pub.organism.toLowerCase().includes(searchTerm) ||
                    pub.abstract.toLowerCase().includes(searchTerm) ||
                    pub.experiment_type.toLowerCase().includes(searchTerm) ||
                    pub.platform.toLowerCase().includes(searchTerm)
                );
            }
            
            this.applyFilters();
        } catch (error) {
            this.showError('Search failed: ' + error.message);
        }
    }

    clearSearch() {
        document.getElementById('search-input').value = '';
        this.filteredPublications = [...this.data.publications];
        this.applyFilters();
    }

    populateFilters() {
        try {
            // Populate organism filter
            const organismSelect = document.getElementById('organism-filter');
            this.data.organisms.forEach(org => {
                const option = document.createElement('option');
                option.value = org.name;
                option.textContent = `${org.name} (${org.count})`;
                organismSelect.appendChild(option);
            });

            // Populate platform filter
            const platformSelect = document.getElementById('platform-filter');
            this.data.platforms.forEach(platform => {
                const option = document.createElement('option');
                option.value = platform.name;
                option.textContent = `${platform.name} (${platform.count})`;
                platformSelect.appendChild(option);
            });

            // Populate experiment filter
            const experimentSelect = document.getElementById('experiment-filter');
            this.data.experiment_types.forEach(exp => {
                const option = document.createElement('option');
                option.value = exp.name;
                option.textContent = `${exp.name} (${exp.count})`;
                experimentSelect.appendChild(option);
            });
        } catch (error) {
            this.showError('Failed to populate filters: ' + error.message);
        }
    }

    applyFilters() {
        try {
            let filtered = [...this.filteredPublications];

            const organismFilter = document.getElementById('organism-filter').value;
            const platformFilter = document.getElementById('platform-filter').value;
            const experimentFilter = document.getElementById('experiment-filter').value;
            const yearFilter = document.getElementById('year-filter').value;

            if (organismFilter) {
                filtered = filtered.filter(pub => pub.organism === organismFilter);
            }

            if (platformFilter) {
                filtered = filtered.filter(pub => pub.platform === platformFilter);
            }

            if (experimentFilter) {
                filtered = filtered.filter(pub => pub.experiment_type === experimentFilter);
            }

            if (yearFilter && yearFilter !== '2015') {
                filtered = filtered.filter(pub => pub.year >= parseInt(yearFilter));
            }

            this.filteredPublications = filtered;
            this.applySorting();
        } catch (error) {
            this.showError('Filter application failed: ' + error.message);
        }
    }

    updateYearFilter(value) {
        const display = document.getElementById('year-display');
        if (value === '2015') {
            display.textContent = 'All Years';
        } else {
            display.textContent = `${value} - 2024`;
        }
        this.applyFilters();
    }

    applySorting() {
        try {
            const sortBy = document.getElementById('sort-select').value;
            
            this.filteredPublications.sort((a, b) => {
                switch (sortBy) {
                    case 'year':
                        return b.year - a.year;
                    case 'confidence':
                        return b.confidence_score - a.confidence_score;
                    case 'title':
                        return a.title.localeCompare(b.title);
                    case 'relevance':
                    default:
                        return b.confidence_score - a.confidence_score;
                }
            });

            this.currentPage = 1;
            this.renderPublications();
        } catch (error) {
            this.showError('Sorting failed: ' + error.message);
        }
    }

    renderPublications() {
        try {
            const grid = document.getElementById('publications-grid');
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pagePublications = this.filteredPublications.slice(startIndex, endIndex);

            if (pagePublications.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state">
                        <h3>No publications found</h3>
                        <p>Try adjusting your search terms or filters</p>
                        <button class="btn btn--primary" onclick="app.clearAllFilters()">Clear All Filters</button>
                    </div>
                `;
            } else {
                grid.innerHTML = pagePublications.map(pub => this.createPublicationCard(pub)).join('');
            }

            this.updateResultsSummary();
            this.renderPagination();
        } catch (error) {
            this.showError('Failed to render publications: ' + error.message);
        }
    }

    createPublicationCard(publication) {
        const confidence = (publication.confidence_score * 100).toFixed(0);
        return `
            <div class="publication-card" onclick="app.showPublicationModal(${publication.id})">
                <div class="confidence-score">${confidence}%</div>
                <h3>${publication.title}</h3>
                <div class="publication-meta">
                    <span>${publication.authors.slice(0, 2).join(', ')}${publication.authors.length > 2 ? ' et al.' : ''}</span>
                    <span>•</span>
                    <span>${publication.year}</span>
                </div>
                <div class="publication-tags">
                    <span class="tag organism">${publication.organism}</span>
                    <span class="tag platform">${publication.platform}</span>
                    <span class="tag experiment">${publication.experiment_type}</span>
                </div>
                <div class="publication-summary">
                    ${publication.ai_summary}
                </div>
            </div>
        `;
    }

    updateResultsSummary() {
        const resultsCount = document.getElementById('results-count');
        const total = this.filteredPublications.length;
        const showing = Math.min(this.itemsPerPage, total - (this.currentPage - 1) * this.itemsPerPage);
        const start = total > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
        const end = start + showing - 1;
        
        resultsCount.textContent = `Showing ${start}-${end} of ${total} publications`;
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredPublications.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="app.goToPage(${this.currentPage - 1})">Previous</button>
        `;

        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `<button onclick="app.goToPage(1)">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span>...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="${i === this.currentPage ? 'active' : ''}" onclick="app.goToPage(${i})">${i}</button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span>...</span>`;
            }
            paginationHTML += `<button onclick="app.goToPage(${totalPages})">${totalPages}</button>`;
        }

        paginationHTML += `
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="app.goToPage(${this.currentPage + 1})">Next</button>
        `;

        pagination.innerHTML = paginationHTML;
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderPublications();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showPublicationModal(publicationId) {
        try {
            const publication = this.data.publications.find(p => p.id === publicationId);
            if (!publication) {
                this.showError('Publication not found');
                return;
            }

            document.getElementById('modal-title').textContent = publication.title;
            document.getElementById('modal-authors').textContent = publication.authors.join(', ');
            document.getElementById('modal-year').textContent = publication.year;
            document.getElementById('modal-doi').textContent = publication.doi;
            document.getElementById('modal-pmid').textContent = publication.pmid;
            document.getElementById('modal-confidence').textContent = `${(publication.confidence_score * 100).toFixed(1)}%`;
            document.getElementById('modal-organism').textContent = publication.organism;
            document.getElementById('modal-platform').textContent = publication.platform;
            document.getElementById('modal-experiment').textContent = publication.experiment_type;
            document.getElementById('modal-abstract').textContent = publication.abstract;
            document.getElementById('modal-summary').textContent = publication.ai_summary;
            
            const findingsList = document.getElementById('modal-findings');
            findingsList.innerHTML = publication.key_findings.map(finding => `<li>${finding}</li>`).join('');
            
            const implicationsList = document.getElementById('modal-implications');
            implicationsList.innerHTML = publication.mission_implications.map(impl => `<li>${impl}</li>`).join('');
            
            const linkElement = document.getElementById('modal-link');
            linkElement.href = publication.link;

            document.getElementById('publication-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } catch (error) {
            this.showError('Failed to show publication details: ' + error.message);
        }
    }

    closePublicationModal() {
        document.getElementById('publication-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    switchTab(tabName) {
        try {
            // Update navigation
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

            // Update content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabName}-tab`).classList.add('active');

            // Initialize tab-specific content
            switch (tabName) {
                case 'knowledge-graph':
                    this.initializeKnowledgeGraph();
                    break;
                case 'analytics':
                    this.initializeAnalytics();
                    break;
                case 'insights':
                    this.initializeInsights();
                    break;
            }
        } catch (error) {
            this.showError('Failed to switch tab: ' + error.message);
        }
    }

    initializeKnowledgeGraph() {
        try {
            const svg = d3.select('#knowledge-graph');
            const container = document.querySelector('.graph-container');
            const width = container.clientWidth;
            const height = container.clientHeight;

            svg.selectAll('*').remove();
            
            svg.attr('width', width).attr('height', height);

            // Create nodes and links
            const nodes = [
                ...this.data.organisms.map(org => ({ id: org.name, type: 'organism', count: org.count })),
                ...this.data.platforms.map(platform => ({ id: platform.name, type: 'platform', count: platform.count })),
                ...this.data.experiment_types.map(exp => ({ id: exp.name, type: 'experiment', count: exp.count }))
            ];

            const links = [];
            // Create connections based on publication data
            this.data.publications.slice(0, 100).forEach(pub => { // Limit for performance
                links.push(
                    { source: pub.organism, target: pub.platform, value: 1 },
                    { source: pub.platform, target: pub.experiment_type, value: 1 },
                    { source: pub.organism, target: pub.experiment_type, value: 1 }
                );
            });

            const simulation = d3.forceSimulation(nodes)
                .force('link', d3.forceLink(links).id(d => d.id).distance(100))
                .force('charge', d3.forceManyBody().strength(-300))
                .force('center', d3.forceCenter(width / 2, height / 2));

            const link = svg.append('g')
                .selectAll('line')
                .data(links)
                .enter().append('line')
                .attr('stroke', 'var(--color-border)')
                .attr('stroke-opacity', 0.6)
                .attr('stroke-width', 1);

            const node = svg.append('g')
                .selectAll('circle')
                .data(nodes)
                .enter().append('circle')
                .attr('r', d => Math.sqrt(d.count) * 2 + 5)
                .attr('fill', d => {
                    switch (d.type) {
                        case 'organism': return 'var(--color-teal-500)';
                        case 'platform': return 'var(--color-orange-500)';
                        case 'experiment': return 'var(--color-red-500)';
                        default: return 'var(--color-gray-400)';
                    }
                })
                .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));

            const label = svg.append('g')
                .selectAll('text')
                .data(nodes)
                .enter().append('text')
                .text(d => d.id)
                .attr('font-size', 12)
                .attr('fill', 'var(--color-text)')
                .attr('text-anchor', 'middle')
                .attr('dy', 4);

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

            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            this.knowledgeGraph = { simulation, svg };
        } catch (error) {
            console.error('Knowledge graph initialization failed:', error);
        }
    }

    updateKnowledgeGraph() {
        // Re-initialize with current filter settings
        this.initializeKnowledgeGraph();
    }

    resetKnowledgeGraph() {
        if (this.knowledgeGraph && this.knowledgeGraph.simulation) {
            this.knowledgeGraph.simulation.alpha(1).restart();
        }
    }

    initializeAnalytics() {
        try {
            this.createTimelineChart();
            this.createOrganismsChart();
            this.createPlatformsChart();
            this.createExperimentsChart();
        } catch (error) {
            this.showError('Failed to initialize analytics: ' + error.message);
        }
    }

    createTimelineChart() {
        try {
            const ctx = document.getElementById('timeline-chart').getContext('2d');
            
            if (this.charts.timeline) {
                this.charts.timeline.destroy();
            }

            this.charts.timeline = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.data.research_trends.map(trend => trend.year),
                    datasets: [{
                        label: 'Publications',
                        data: this.data.research_trends.map(trend => trend.publications),
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Timeline chart creation failed:', error);
        }
    }

    createOrganismsChart() {
        try {
            const ctx = document.getElementById('organisms-chart').getContext('2d');
            
            if (this.charts.organisms) {
                this.charts.organisms.destroy();
            }

            this.charts.organisms = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: this.data.organisms.map(org => org.name),
                    datasets: [{
                        data: this.data.organisms.map(org => org.count),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Organisms chart creation failed:', error);
        }
    }

    createPlatformsChart() {
        try {
            const ctx = document.getElementById('platforms-chart').getContext('2d');
            
            if (this.charts.platforms) {
                this.charts.platforms.destroy();
            }

            this.charts.platforms = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.data.platforms.map(platform => platform.name),
                    datasets: [{
                        label: 'Publications',
                        data: this.data.platforms.map(platform => platform.count),
                        backgroundColor: '#FFC185'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Platforms chart creation failed:', error);
        }
    }

    createExperimentsChart() {
        try {
            const ctx = document.getElementById('experiments-chart').getContext('2d');
            
            if (this.charts.experiments) {
                this.charts.experiments.destroy();
            }

            this.charts.experiments = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.data.experiment_types.map(exp => exp.name),
                    datasets: [{
                        label: 'Publications',
                        data: this.data.experiment_types.map(exp => exp.count),
                        backgroundColor: '#B4413C'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y', // This makes it horizontal
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Experiments chart creation failed:', error);
        }
    }

    initializeInsights() {
        try {
            this.renderRecommendations();
            this.renderResearchGaps();
            this.renderKeyStatistics();
        } catch (error) {
            this.showError('Failed to initialize insights: ' + error.message);
        }
    }

    renderRecommendations() {
        const container = document.getElementById('recommendations-list');
        const recommendations = [
            {
                title: "Expand Mouse Research in Long-Duration Missions",
                description: "With 150 publications, mouse studies show the highest research volume. Focus on extending exposure durations to better understand long-term effects."
            },
            {
                title: "Increase Plant Biology Investigations",
                description: "Plant research represents significant potential for closed-loop life support systems. Current 130 publications suggest room for expansion."
            },
            {
                title: "Develop Multi-Organism Comparative Studies",
                description: "Cross-species comparisons could reveal universal adaptation mechanisms applicable to human spaceflight."
            }
        ];

        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>
        `).join('');
    }

    renderResearchGaps() {
        const container = document.getElementById('gaps-list');
        const gaps = [
            {
                title: "Limited Behavioral Studies",
                description: "Only 9 publications focus on behavioral changes. This area needs significant expansion for crew psychology research."
            },
            {
                title: "Insufficient Cell Culture Research",
                description: "With only 2 publications, cell culture studies are underrepresented despite their experimental advantages."
            },
            {
                title: "Parabolic Flight Platform Underutilized",
                description: "27 publications suggest this accessible platform could be used more extensively for preliminary studies."
            }
        ];

        container.innerHTML = gaps.map(gap => `
            <div class="gap-item">
                <h4>${gap.title}</h4>
                <p>${gap.description}</p>
            </div>
        `).join('');
    }

    renderKeyStatistics() {
        const container = document.getElementById('key-stats');
        const stats = [
            { label: 'Avg Confidence', value: '86.7%' },
            { label: 'Years Span', value: '10' },
            { label: 'Peak Year', value: '2020' },
            { label: 'Research Areas', value: '5' }
        ];

        container.innerHTML = stats.map(stat => `
            <div class="key-stat">
                <span class="key-stat-value">${stat.value}</span>
                <span class="key-stat-label">${stat.label}</span>
            </div>
        `).join('');
    }

    updateHeaderStats() {
        document.getElementById('total-publications').textContent = this.data.statistics.total_publications;
        document.getElementById('unique-organisms').textContent = this.data.statistics.unique_organisms;
        document.getElementById('platforms-used').textContent = this.data.statistics.platforms_used;
    }

    exportResults() {
        try {
            const dataToExport = {
                query: document.getElementById('search-input').value,
                filters: {
                    organism: document.getElementById('organism-filter').value,
                    platform: document.getElementById('platform-filter').value,
                    experiment: document.getElementById('experiment-filter').value,
                    year: document.getElementById('year-filter').value
                },
                results: this.filteredPublications,
                total_results: this.filteredPublications.length,
                exported_at: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `astrolegacy-search-results-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            this.showError('Export failed: ' + error.message);
        }
    }

    clearAllFilters() {
        document.getElementById('search-input').value = '';
        document.getElementById('organism-filter').value = '';
        document.getElementById('platform-filter').value = '';
        document.getElementById('experiment-filter').value = '';
        document.getElementById('year-filter').value = '2015';
        document.getElementById('year-display').textContent = 'All Years';
        document.getElementById('sort-select').value = 'relevance';
        
        this.filteredPublications = [...this.data.publications];
        this.currentPage = 1;
        this.renderPublications();
    }

    hideLoading() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('app').classList.remove('hidden');
    }

    showError(message) {
        document.getElementById('error-message').textContent = message;
        document.getElementById('error-modal').classList.remove('hidden');
        console.error('AstroLegacy Error:', message);
    }

    closeModal(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.style.overflow = 'auto';
    }
}

// Global functions for HTML onclick handlers
function closeErrorModal() {
    document.getElementById('error-modal').classList.add('hidden');
}

function closePublicationModal() {
    app.closePublicationModal();
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AstroLegacyApp();
});