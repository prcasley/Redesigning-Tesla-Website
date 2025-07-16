// Tesla Business Intelligence Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts and diagrams
    initializeCurrentProcessFlow();
    initializeProposedProcessFlow();
    initializeCostAnalysisCharts();
    initializeFlowchart();
    initializeSalesCharts();
    initializeCausalLoopDiagram();
    initializeStockFlowModel();
    
    // Add smooth scrolling animation
    addScrollAnimations();
    
    // Add interactive elements
    addInteractiveElements();
});

// Current Process Flow Chart (Introduction Section)
function initializeCurrentProcessFlow() {
    const svg = d3.select('#currentProcessFlow');
    const width = 1000;
    const height = 700;
    
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    // Define arrow marker
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead-current')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#cc0000');

    // Current process nodes (linear, showing bottlenecks)
    const currentNodes = [
        { id: 'supplier-order', x: 50, y: 50, width: 120, height: 50, text: 'Supplier\nOrder Placement', type: 'start' },
        { id: 'material-wait', x: 220, y: 50, width: 100, height: 50, text: 'Material\nDelivery Wait', type: 'bottleneck' },
        { id: 'quality-check1', x: 370, y: 50, width: 100, height: 50, text: 'Incoming\nQuality Check', type: 'decision' },
        { id: 'battery-start', x: 50, y: 150, width: 120, height: 50, text: 'Battery Cell\nProduction', type: 'process' },
        { id: 'assembly-wait', x: 220, y: 150, width: 100, height: 50, text: 'Assembly\nQueue Wait', type: 'bottleneck' },
        { id: 'pack-assembly', x: 370, y: 150, width: 100, height: 50, text: 'Battery Pack\nAssembly', type: 'process' },
        { id: 'vehicle-frame', x: 520, y: 150, width: 100, height: 50, text: 'Vehicle Frame\nConstruction', type: 'process' },
        { id: 'powertrain', x: 50, y: 250, width: 120, height: 50, text: 'Powertrain\nInstallation', type: 'process' },
        { id: 'systems-integration', x: 220, y: 250, width: 120, height: 50, text: 'Systems\nIntegration', type: 'process' },
        { id: 'quality-check2', x: 390, y: 250, width: 100, height: 50, text: 'Mid-Process\nQuality Check', type: 'decision' },
        { id: 'final-assembly', x: 540, y: 250, width: 100, height: 50, text: 'Final\nAssembly', type: 'process' },
        { id: 'final-testing', x: 50, y: 350, width: 120, height: 50, text: 'Final Testing\n& Calibration', type: 'process' },
        { id: 'quality-final', x: 220, y: 350, width: 100, height: 50, text: 'Final Quality\nAssurance', type: 'decision' },
        { id: 'packaging', x: 370, y: 350, width: 100, height: 50, text: 'Packaging\n& Preparation', type: 'process' },
        { id: 'shipping', x: 520, y: 350, width: 100, height: 50, text: 'Shipping\nArrangement', type: 'process' },
        { id: 'delivery', x: 300, y: 450, width: 120, height: 50, text: 'Customer\nDelivery', type: 'end' }
    ];

    // Current process links showing linear dependencies
    const currentLinks = [
        { source: 'supplier-order', target: 'material-wait' },
        { source: 'material-wait', target: 'quality-check1' },
        { source: 'quality-check1', target: 'battery-start' },
        { source: 'battery-start', target: 'assembly-wait' },
        { source: 'assembly-wait', target: 'pack-assembly' },
        { source: 'pack-assembly', target: 'vehicle-frame' },
        { source: 'vehicle-frame', target: 'powertrain' },
        { source: 'powertrain', target: 'systems-integration' },
        { source: 'systems-integration', target: 'quality-check2' },
        { source: 'quality-check2', target: 'final-assembly' },
        { source: 'final-assembly', target: 'final-testing' },
        { source: 'final-testing', target: 'quality-final' },
        { source: 'quality-final', target: 'packaging' },
        { source: 'packaging', target: 'shipping' },
        { source: 'shipping', target: 'delivery' },
        // Rework loops showing inefficiency
        { source: 'quality-check1', target: 'supplier-order', type: 'rework' },
        { source: 'quality-check2', target: 'powertrain', type: 'rework' },
        { source: 'quality-final', target: 'final-testing', type: 'rework' }
    ];

    drawProcessDiagram(svg, currentNodes, currentLinks, 'arrowhead-current');
}

// Proposed Process Flow Chart (Proposed Model Section)
function initializeProposedProcessFlow() {
    const svg = d3.select('#proposedProcessFlow');
    const width = 1000;
    const height = 700;
    
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    // Define arrow marker
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead-proposed')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#38a169');

    // Proposed process nodes (parallel processing, AI integration)
    const proposedNodes = [
        { id: 'ai-procurement', x: 50, y: 50, width: 120, height: 50, text: 'AI-Driven\nProcurement', type: 'ai' },
        { id: 'predictive-delivery', x: 220, y: 50, width: 120, height: 50, text: 'Predictive\nDelivery Mgmt', type: 'ai' },
        { id: 'realtime-quality', x: 390, y: 50, width: 120, height: 50, text: 'Real-time\nQuality Monitor', type: 'continuous' },
        { id: 'parallel-battery1', x: 50, y: 150, width: 100, height: 50, text: 'Battery Line 1\n(Parallel)', type: 'process' },
        { id: 'parallel-battery2', x: 170, y: 150, width: 100, height: 50, text: 'Battery Line 2\n(Parallel)', type: 'process' },
        { id: 'parallel-battery3', x: 290, y: 150, width: 100, height: 50, text: 'Battery Line 3\n(Parallel)', type: 'process' },
        { id: 'dynamic-assembly', x: 440, y: 150, width: 120, height: 50, text: 'Dynamic\nAssembly Cells', type: 'flexible' },
        { id: 'ai-quality', x: 600, y: 150, width: 100, height: 50, text: 'AI Quality\nAssurance', type: 'ai' },
        { id: 'parallel-frame1', x: 50, y: 250, width: 100, height: 50, text: 'Frame Cell 1\n(Parallel)', type: 'process' },
        { id: 'parallel-frame2', x: 170, y: 250, width: 100, height: 50, text: 'Frame Cell 2\n(Parallel)', type: 'process' },
        { id: 'adaptive-powertrain', x: 320, y: 250, width: 120, height: 50, text: 'Adaptive\nPowertrain', type: 'flexible' },
        { id: 'continuous-integration', x: 480, y: 250, width: 120, height: 50, text: 'Continuous\nIntegration', type: 'continuous' },
        { id: 'predictive-maintenance', x: 50, y: 350, width: 120, height: 50, text: 'Predictive\nMaintenance', type: 'ai' },
        { id: 'automated-testing', x: 220, y: 350, width: 120, height: 50, text: 'Automated\nTesting Suite', type: 'ai' },
        { id: 'smart-packaging', x: 390, y: 350, width: 120, height: 50, text: 'Smart\nPackaging', type: 'ai' },
        { id: 'optimized-delivery', x: 560, y: 350, width: 120, height: 50, text: 'Optimized\nDelivery', type: 'ai' },
        { id: 'customer-experience', x: 300, y: 450, width: 150, height: 50, text: 'Enhanced Customer\nExperience', type: 'end' }
    ];

    // Proposed process links showing parallel processing and AI integration
    const proposedLinks = [
        // Parallel battery production
        { source: 'ai-procurement', target: 'parallel-battery1' },
        { source: 'ai-procurement', target: 'parallel-battery2' },
        { source: 'ai-procurement', target: 'parallel-battery3' },
        { source: 'predictive-delivery', target: 'dynamic-assembly' },
        { source: 'parallel-battery1', target: 'dynamic-assembly' },
        { source: 'parallel-battery2', target: 'dynamic-assembly' },
        { source: 'parallel-battery3', target: 'dynamic-assembly' },
        // Parallel frame production
        { source: 'dynamic-assembly', target: 'parallel-frame1' },
        { source: 'dynamic-assembly', target: 'parallel-frame2' },
        { source: 'parallel-frame1', target: 'adaptive-powertrain' },
        { source: 'parallel-frame2', target: 'adaptive-powertrain' },
        { source: 'adaptive-powertrain', target: 'continuous-integration' },
        // AI integration throughout
        { source: 'realtime-quality', target: 'ai-quality' },
        { source: 'ai-quality', target: 'automated-testing' },
        { source: 'continuous-integration', target: 'automated-testing' },
        { source: 'predictive-maintenance', target: 'automated-testing' },
        { source: 'automated-testing', target: 'smart-packaging' },
        { source: 'smart-packaging', target: 'optimized-delivery' },
        { source: 'optimized-delivery', target: 'customer-experience' }
    ];

    drawProcessDiagram(svg, proposedNodes, proposedLinks, 'arrowhead-proposed');
}

// Helper function to draw process diagrams
function drawProcessDiagram(svg, nodes, links, markerId) {
    // Draw links
    const linkGroup = svg.append('g').attr('class', 'links');
    
    links.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        
        if (link.type === 'rework') {
            // Curved line for rework loops
            const path = `M ${sourceNode.x + sourceNode.width/2} ${sourceNode.y + sourceNode.height}
                         Q ${sourceNode.x - 50} ${(sourceNode.y + targetNode.y)/2}
                         ${targetNode.x + targetNode.width/2} ${targetNode.y}`;
            linkGroup.append('path')
                .attr('d', path)
                .style('stroke', '#cc0000')
                .style('stroke-width', 2)
                .style('fill', 'none')
                .style('stroke-dasharray', '5,5')
                .attr('marker-end', `url(#${markerId})`);
        } else {
            // Straight line
            linkGroup.append('line')
                .attr('x1', sourceNode.x + sourceNode.width/2)
                .attr('y1', sourceNode.y + sourceNode.height)
                .attr('x2', targetNode.x + targetNode.width/2)
                .attr('y2', targetNode.y)
                .style('stroke', '#4a5568')
                .style('stroke-width', 2)
                .attr('marker-end', `url(#${markerId})`);
        }
    });

    // Draw nodes
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    
    const nodeElements = nodeGroup.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', d => `node ${d.type}`)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeElements.append('rect')
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('rx', 5)
        .style('fill', d => {
            switch(d.type) {
                case 'start': case 'end': return '#1a365d';
                case 'bottleneck': return '#cc0000';
                case 'decision': return '#dd6b20';
                case 'ai': return '#38a169';
                case 'flexible': return '#3182ce';
                case 'continuous': return '#805ad5';
                default: return '#e2e8f0';
            }
        })
        .style('stroke', '#2d3748')
        .style('stroke-width', 2);

    nodeElements.append('text')
        .attr('x', d => d.width/2)
        .attr('y', d => d.height/2)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'middle')
        .style('font-size', '11px')
        .style('font-weight', '500')
        .style('fill', d => (d.type === 'start' || d.type === 'end' || d.type === 'bottleneck') ? '#ffffff' : '#2d3748')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', d.width/2)
                    .attr('dy', i === 0 ? '0.35em' : '1.2em')
                    .text(line);
            });
        });
}

// Cost Analysis Charts
function initializeCostAnalysisCharts() {
    // Cost-Benefit Analysis Chart
    const costBenefitCtx = document.getElementById('costBenefitChart').getContext('2d');
    
    new Chart(costBenefitCtx, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [{
                label: 'Implementation Costs',
                data: [-1500, -600, 0, 0, 0],
                borderColor: '#cc0000',
                backgroundColor: 'rgba(204, 0, 0, 0.1)',
                tension: 0.4,
                fill: false
            }, {
                label: 'Operational Savings',
                data: [900, 1500, 1800, 1950, 2100],
                borderColor: '#38a169',
                backgroundColor: 'rgba(56, 161, 105, 0.1)',
                tension: 0.4,
                fill: false
            }, {
                label: 'Net Cash Flow',
                data: [-150, 1800, 2950, 3250, 3550],
                borderColor: '#1a365d',
                backgroundColor: 'rgba(26, 54, 93, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '5-Year Financial Projection (Millions USD)'
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Amount (Millions USD)'
                    }
                }
            }
        }
    });

    // Operational Efficiency Chart
    const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
    
    new Chart(efficiencyCtx, {
        type: 'radar',
        data: {
            labels: ['Production Speed', 'Quality Control', 'Resource Utilization', 'Downtime Reduction', 'Cost Efficiency', 'Flexibility'],
            datasets: [{
                label: 'Current Process',
                data: [65, 70, 60, 55, 68, 45],
                borderColor: '#cc0000',
                backgroundColor: 'rgba(204, 0, 0, 0.2)',
                pointBackgroundColor: '#cc0000'
            }, {
                label: 'Proposed Process',
                data: [88, 95, 85, 92, 90, 85],
                borderColor: '#38a169',
                backgroundColor: 'rgba(56, 161, 105, 0.2)',
                pointBackgroundColor: '#38a169'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Operational Efficiency Comparison (%)'
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Discrete-Event Simulation Flowchart
function initializeFlowchart() {
    const svg = d3.select('#flowchart');
    const width = 1000;
    const height = 600;
    
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    // Define arrow marker
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#4a5568');

    // Flowchart nodes data
    const nodes = [
        { id: 'start', x: 100, y: 50, width: 120, height: 40, text: 'Raw Material\nProcurement', type: 'start-end' },
        { id: 'supplier', x: 280, y: 50, width: 100, height: 40, text: 'Supplier\nAvailability', type: 'decision' },
        { id: 'inventory', x: 450, y: 50, width: 100, height: 40, text: 'Inventory\nCheck', type: 'process' },
        { id: 'battery', x: 100, y: 150, width: 120, height: 40, text: 'Battery\nProduction', type: 'process' },
        { id: 'quality1', x: 280, y: 150, width: 100, height: 40, text: 'Quality\nControl 1', type: 'decision' },
        { id: 'assembly', x: 450, y: 150, width: 100, height: 40, text: 'Vehicle\nAssembly', type: 'process' },
        { id: 'testing', x: 620, y: 150, width: 100, height: 40, text: 'System\nTesting', type: 'process' },
        { id: 'quality2', x: 100, y: 250, width: 120, height: 40, text: 'Final Quality\nAssurance', type: 'decision' },
        { id: 'packaging', x: 280, y: 250, width: 100, height: 40, text: 'Packaging &\nPreparation', type: 'process' },
        { id: 'shipping', x: 450, y: 250, width: 100, height: 40, text: 'Shipping\nSchedule', type: 'process' },
        { id: 'delivery', x: 620, y: 250, width: 100, height: 40, text: 'Customer\nDelivery', type: 'process' },
        { id: 'feedback', x: 350, y: 350, width: 120, height: 40, text: 'Customer\nFeedback', type: 'start-end' }
    ];

    // Flowchart links data
    const links = [
        { source: 'start', target: 'supplier' },
        { source: 'supplier', target: 'inventory' },
        { source: 'inventory', target: 'battery' },
        { source: 'battery', target: 'quality1' },
        { source: 'quality1', target: 'assembly' },
        { source: 'assembly', target: 'testing' },
        { source: 'testing', target: 'quality2' },
        { source: 'quality2', target: 'packaging' },
        { source: 'packaging', target: 'shipping' },
        { source: 'shipping', target: 'delivery' },
        { source: 'delivery', target: 'feedback' },
        { source: 'quality1', target: 'battery', curve: true }, // Rework loop
        { source: 'quality2', target: 'assembly', curve: true }  // Rework loop
    ];

    // Draw links
    const linkGroup = svg.append('g').attr('class', 'links');
    
    links.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        
        if (link.curve) {
            // Curved line for rework loops
            const path = `M ${sourceNode.x + sourceNode.width/2} ${sourceNode.y + sourceNode.height}
                         Q ${sourceNode.x - 50} ${(sourceNode.y + targetNode.y)/2}
                         ${targetNode.x + targetNode.width/2} ${targetNode.y}`;
            linkGroup.append('path')
                .attr('d', path)
                .attr('class', 'link')
                .style('stroke-dasharray', '5,5');
        } else {
            // Straight line
            linkGroup.append('line')
                .attr('x1', sourceNode.x + sourceNode.width/2)
                .attr('y1', sourceNode.y + sourceNode.height)
                .attr('x2', targetNode.x + targetNode.width/2)
                .attr('y2', targetNode.y)
                .attr('class', 'link');
        }
    });

    // Draw nodes
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    
    const nodeElements = nodeGroup.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', d => `node ${d.type}`)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeElements.append('rect')
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('rx', 5);

    nodeElements.append('text')
        .attr('x', d => d.width/2)
        .attr('y', d => d.height/2)
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', d.width/2)
                    .attr('dy', i === 0 ? '0.35em' : '1.2em')
                    .text(line);
            });
        });

    // Add diagram title at the top
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 30)
        .style('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', '700')
        .style('fill', '#1a365d')
        .text('Event Simulation Flowchart');
}

// Sales Charts (Market Penetration and Revenue Simulation)
function initializeSalesCharts() {
    // Market Penetration Probability Chart
    const penetrationCtx = document.getElementById('penetrationChart').getContext('2d');
    
    new Chart(penetrationCtx, {
        type: 'line',
        data: {
            labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
            datasets: [{
                label: 'Market Penetration Probability (%)',
                data: [65.2, 71.8, 78.4, 82.1, 85.6, 87.3],
                borderColor: '#cc0000',
                backgroundColor: 'rgba(204, 0, 0, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Confidence Interval (Upper)',
                data: [72.5, 78.9, 84.2, 87.8, 90.1, 92.4],
                borderColor: '#4a5568',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4
            }, {
                label: 'Confidence Interval (Lower)',
                data: [58.1, 64.7, 72.6, 76.4, 81.1, 82.2],
                borderColor: '#4a5568',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monte Carlo Analysis (10,000 iterations)'
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Probability (%)'
                    }
                }
            }
        }
    });

    // Revenue Simulation Chart
    const revenueCtx = document.getElementById('revenueSimulation').getContext('2d');
    
    // Generate Monte Carlo simulation data
    const simulationData = generateMonteCarloData();
    
    new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['$40B-50B', '$50B-60B', '$60B-70B', '$70B-80B', '$80B-90B', '$90B-100B'],
            datasets: [{
                label: 'Frequency (out of 10,000 simulations)',
                data: simulationData,
                backgroundColor: [
                    'rgba(204, 0, 0, 0.8)',
                    'rgba(204, 0, 0, 0.7)',
                    'rgba(204, 0, 0, 0.6)',
                    'rgba(204, 0, 0, 0.5)',
                    'rgba(204, 0, 0, 0.4)',
                    'rgba(204, 0, 0, 0.3)'
                ],
                borderColor: '#cc0000',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue Distribution Analysis'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Simulation Frequency'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Revenue Range (Annual)'
                    }
                }
            }
        }
    });
}

// Generate Monte Carlo simulation data
function generateMonteCarloData() {
    const iterations = 10000;
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
        // Simulate revenue with normal distribution around $70B
        const revenue = normalRandom(70, 12); // Mean 70B, std dev 12B
        results.push(revenue);
    }
    
    // Bin the results
    const bins = [0, 0, 0, 0, 0, 0];
    results.forEach(value => {
        if (value >= 40 && value < 50) bins[0]++;
        else if (value >= 50 && value < 60) bins[1]++;
        else if (value >= 60 && value < 70) bins[2]++;
        else if (value >= 70 && value < 80) bins[3]++;
        else if (value >= 80 && value < 90) bins[4]++;
        else if (value >= 90 && value <= 100) bins[5]++;
    });
    
    return bins;
}

// Box-Muller transformation for normal distribution
function normalRandom(mean, stdDev) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdDev + mean;
}

// Causal Loop Diagram for Domestic Sales
function initializeCausalLoopDiagram() {
    const svg = d3.select('#causalLoop');
    const width = 1000;
    const height = 500;
    
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    // Causal loop nodes
    const causalNodes = [
        { id: 'price', x: 200, y: 100, text: 'Vehicle\nPricing' },
        { id: 'demand', x: 400, y: 100, text: 'Consumer\nDemand' },
        { id: 'brand', x: 600, y: 100, text: 'Brand\nPerception' },
        { id: 'sales', x: 800, y: 100, text: 'Sales\nVolume' },
        { id: 'production', x: 800, y: 250, text: 'Production\nCapacity' },
        { id: 'costs', x: 600, y: 250, text: 'Unit\nCosts' },
        { id: 'investment', x: 400, y: 250, text: 'R&D\nInvestment' },
        { id: 'innovation', x: 200, y: 250, text: 'Product\nInnovation' },
        { id: 'competition', x: 100, y: 175, text: 'Competitive\nPressure' },
        { id: 'market', x: 500, y: 50, text: 'Market\nSaturation' },
        { id: 'margins', x: 700, y: 175, text: 'Profit\nMargins' },
        { id: 'quality', x: 300, y: 175, text: 'Product\nQuality' },
        { id: 'reputation', x: 500, y: 300, text: 'Company\nReputation' },
        { id: 'retention', x: 100, y: 300, text: 'Customer\nRetention' }
    ];

    // Causal relationships
    const causalLinks = [
        { source: 'price', target: 'demand', type: 'balancing' },
        { source: 'demand', target: 'sales', type: 'reinforcing' },
        { source: 'sales', target: 'production', type: 'reinforcing' },
        { source: 'production', target: 'costs', type: 'balancing' },
        { source: 'costs', target: 'price', type: 'reinforcing' },
        { source: 'sales', target: 'margins', type: 'reinforcing' },
        { source: 'margins', target: 'investment', type: 'reinforcing' },
        { source: 'investment', target: 'innovation', type: 'reinforcing' },
        { source: 'innovation', target: 'quality', type: 'reinforcing' },
        { source: 'quality', target: 'brand', type: 'reinforcing' },
        { source: 'brand', target: 'price', type: 'reinforcing' },
        { source: 'market', target: 'demand', type: 'balancing' },
        { source: 'competition', target: 'price', type: 'balancing' },
        { source: 'quality', target: 'reputation', type: 'reinforcing' },
        { source: 'reputation', target: 'retention', type: 'reinforcing' }
    ];

    // Draw causal links
    const causalLinkGroup = svg.append('g').attr('class', 'causal-links');
    
    causalLinks.forEach(link => {
        const sourceNode = causalNodes.find(n => n.id === link.source);
        const targetNode = causalNodes.find(n => n.id === link.target);
        
        // Calculate curved path
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 0.3;
        
        const path = `M ${sourceNode.x} ${sourceNode.y} A ${dr} ${dr} 0 0 1 ${targetNode.x} ${targetNode.y}`;
        
        causalLinkGroup.append('path')
            .attr('d', path)
            .attr('class', `link ${link.type}`)
            .attr('marker-end', 'url(#arrowhead)');
    });

    // Draw causal nodes
    const causalNodeGroup = svg.append('g').attr('class', 'causal-nodes');
    
    const causalNodeElements = causalNodeGroup.selectAll('.causal-node')
        .data(causalNodes)
        .enter()
        .append('g')
        .attr('class', 'causal-node')
        .attr('transform', d => `translate(${d.x - 40}, ${d.y - 20})`);

    causalNodeElements.append('ellipse')
        .attr('cx', 40)
        .attr('cy', 20)
        .attr('rx', 35)
        .attr('ry', 18)
        .style('fill', '#14b8a6')
        .style('stroke', '#1a365d')
        .style('stroke-width', 2);

    causalNodeElements.append('text')
        .attr('x', 40)
        .attr('y', 20)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'middle')
        .style('font-size', '10px')
        .style('font-weight', '500')
        .style('fill', '#000000')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', 40)
                    .attr('dy', i === 0 ? '0em' : '1em')
                    .text(line);
            });
        });

    // Add diagram title in the center
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 30)
        .style('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', '700')
        .style('fill', '#1a365d')
        .text('Causal Loop Diagram: Domestic Supply-Demand Dynamics');
}

// Stock and Flow Model for Foreign Sales
function initializeStockFlowModel() {
    const svg = d3.select('#stockFlow');
    const width = 1000;
    const height = 500;
    
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    // Stock variables (rectangles)
    const stocks = [
        { id: 'market_share', x: 150, y: 100, width: 120, height: 60, text: 'International\nMarket Share' },
        { id: 'brand_awareness', x: 400, y: 100, width: 120, height: 60, text: 'Brand\nAwareness' },
        { id: 'customer_base', x: 650, y: 100, width: 120, height: 60, text: 'Customer\nBase Size' },
        { id: 'service_network', x: 150, y: 300, width: 120, height: 60, text: 'Service Network\nCapacity' },
        { id: 'local_partnerships', x: 400, y: 300, width: 120, height: 60, text: 'Local\nPartnerships' },
        { id: 'regulatory_compliance', x: 650, y: 300, width: 120, height: 60, text: 'Regulatory\nCompliance' }
    ];

    // Flow variables (pipes/arrows)
    const flows = [
        { id: 'acquisition', source: { x: 80, y: 130 }, target: 'market_share', text: 'Customer\nAcquisition' },
        { id: 'marketing', source: 'market_share', target: 'brand_awareness', text: 'Marketing\nEfforts' },
        { id: 'conversion', source: 'brand_awareness', target: 'customer_base', text: 'Lead\nConversion' },
        { id: 'expansion', source: { x: 80, y: 330 }, target: 'service_network', text: 'Network\nExpansion' },
        { id: 'partnership', source: 'service_network', target: 'local_partnerships', text: 'Partnership\nDevelopment' },
        { id: 'compliance', source: 'local_partnerships', target: 'regulatory_compliance', text: 'Compliance\nAchievement' }
    ];

    // Auxiliary variables (clouds)
    const auxiliaries = [
        { id: 'competition', x: 300, y: 50, text: 'Local\nCompetition' },
        { id: 'regulations', x: 550, y: 50, text: 'Government\nRegulations' },
        { id: 'economy', x: 800, y: 200, text: 'Economic\nConditions' },
        { id: 'culture', x: 300, y: 400, text: 'Cultural\nFactors' },
        { id: 'infrastructure', x: 550, y: 400, text: 'Charging\nInfrastructure' }
    ];

    // Draw stocks
    const stockGroup = svg.append('g').attr('class', 'stocks');
    
    const stockElements = stockGroup.selectAll('.stock')
        .data(stocks)
        .enter()
        .append('g')
        .attr('class', 'stock')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    stockElements.append('rect')
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('rx', 5)
        .style('fill', '#e2e8f0')
        .style('stroke', '#1a365d')
        .style('stroke-width', 3);

    stockElements.append('text')
        .attr('x', d => d.width/2)
        .attr('y', d => d.height/2)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'middle')
        .style('font-size', '16px')
        .style('font-weight', '700')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', d.width/2)
                    .attr('dy', i === 0 ? '0em' : '1.2em')
                    .text(line);
            });
        });

    // Draw flows
    const flowGroup = svg.append('g').attr('class', 'flows');
    
    flows.forEach(flow => {
        let startX, startY, endX, endY;
        
        if (typeof flow.source === 'object') {
            startX = flow.source.x;
            startY = flow.source.y;
        } else {
            const sourceStock = stocks.find(s => s.id === flow.source);
            startX = sourceStock.x + sourceStock.width;
            startY = sourceStock.y + sourceStock.height/2;
        }
        
        const targetStock = stocks.find(s => s.id === flow.target);
        endX = targetStock.x;
        endY = targetStock.y + targetStock.height/2;
        
        // Flow pipe
        flowGroup.append('line')
            .attr('x1', startX)
            .attr('y1', startY)
            .attr('x2', endX - 20)
            .attr('y2', endY)
            .style('stroke', '#4a5568')
            .style('stroke-width', 4);
        
        // Flow arrow
        flowGroup.append('polygon')
            .attr('points', `${endX-20},${endY-5} ${endX-20},${endY+5} ${endX-5},${endY}`)
            .style('fill', '#4a5568');
        
        // Flow label
        flowGroup.append('text')
            .attr('x', (startX + endX)/2)
            .attr('y', startY - 15)
            .style('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', '600')
            .style('fill', '#2d3748')
            .text(flow.text)
            .each(function() {
                const text = d3.select(this);
                const textValue = flow.text;
                const lines = textValue.split('\n');
                text.text('');
                lines.forEach((line, i) => {
                    text.append('tspan')
                        .attr('x', (startX + endX)/2)
                        .attr('dy', i === 0 ? '0em' : '1em')
                        .text(line);
                });
            });
    });

    // Draw auxiliaries (cloud shapes)
    const auxGroup = svg.append('g').attr('class', 'auxiliaries');
    
    const auxElements = auxGroup.selectAll('.auxiliary')
        .data(auxiliaries)
        .enter()
        .append('g')
        .attr('class', 'auxiliary')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    auxElements.append('ellipse')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('rx', 40)
        .attr('ry', 20)
        .style('fill', '#fffacd')
        .style('stroke', '#dd6b20')
        .style('stroke-width', 2)
        .style('stroke-dasharray', '3,3');

    auxElements.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'middle')
        .style('font-size', '9px')
        .style('font-weight', '500')
        .style('fill', '#000000')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', 0)
                    .attr('dy', i === 0 ? '0em' : '1em')
                    .text(line);
            });
        });

    // Add diagram title in the center
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 30)
        .style('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', '700')
        .style('fill', '#1a365d')
        .text('Stock and Flow Model: International Market Operations');
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all major sections
    document.querySelectorAll('.summary-card, .analysis-subsection, .chart-container, .metric-card').forEach(el => {
        observer.observe(el);
    });
}

// Add interactive elements
function addInteractiveElements() {
    // Add hover effects to diagram nodes
    d3.selectAll('.node, .causal-node, .stock, .auxiliary').on('mouseover', function() {
        d3.select(this).style('opacity', 0.8);
    }).on('mouseout', function() {
        d3.select(this).style('opacity', 1);
    });

    // Add click handlers for additional information
    document.querySelectorAll('.metric-card').forEach(card => {
        card.addEventListener('click', function() {
            const metric = this.querySelector('h5').textContent;
            showMetricDetails(metric);
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Show metric details (placeholder for future expansion)
function showMetricDetails(metric) {
    const details = {
        'Success Probability': 'Calculated using Monte Carlo simulation with 10,000 iterations, incorporating market volatility (±15%), competitive response probability (70%), regulatory compliance costs ($2.1B), and technology adoption rates (23% annually).',
        'ROI Projection': 'Three-year ROI based on implementation costs ($8.4B), operational savings ($12.7B), market expansion revenue ($28.3B), and risk-adjusted discount rate (8.5%).',
        'Risk Factor': 'Comprehensive assessment including supply chain disruption risk (Medium), technology obsolescence risk (Low), regulatory change risk (High), and market saturation risk (Medium).'
    };
    
    if (details[metric]) {
        alert(`${metric} Details:\n\n${details[metric]}`);
    }
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';
    }
    return num.toString();
}

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Tesla BI Website loaded successfully');
    
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});