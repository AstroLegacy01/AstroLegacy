function drawTimeline(data) {
  const svg = d3.select('#timelineChart').append('svg').attr('width', 800).attr('height', 300);
  // Group by year, draw bars (standard D3 code - copy from docs)
  const yearsData = d3.group(data, d => d.year);
  // ... (implement bars for count per year)
}
drawTimeline(publications);
function drawGraph() {
  const nodes = publications.map(p => ({ id: p.title, group: p.topic }));
  const links = []; // Heuristic: link if shared organism
  const svg = d3.select('#graphViz').append('svg').attr('width', 800).attr('height', 400);
  const simulation = d3.forceSimulation(nodes).force('link', d3.forceLink(links));
  // Draw nodes/links (D3 force example from docs)
}
function drawGraph() {
  const width = 800, height = 400;
  const svg = d3.select('#graphViz').append('svg').attr('width', width).attr('height', height);
  const nodes = publications.slice(0, 10).map(p => ({ id: p.title, group: p.topic })); // Sample 10
  const links = []; // Add logic: e.g., link if same organism
  for (let i = 0; i < nodes.length - 1; i++) links.push({ source: nodes[i].id, target: nodes[i+1].id });
  
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));
  
  const link = svg.append('g').selectAll('line').data(links).enter().append('line').attr('stroke', '#999');
  const node = svg.append('g').selectAll('circle').data(nodes).enter().append('circle')
    .attr('r', 5).attr('fill', d => d.group === 'Microgravity' ? 'blue' : 'red');
  
  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('cx', d => d.x).attr('cy', d => d.y);
  });
}
drawGraph();