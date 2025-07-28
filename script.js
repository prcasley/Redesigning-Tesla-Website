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
    
    // Initialize new Operation Analysis visualizations
    initializePowerBIDashboard();
    initializeTQCCharts();
    initializeDecisionTree();
    
    // Add smooth scrolling animation
    addScrollAnimations();
    
    // Add interactive elements
    addInteractiveElements();
    
    // Add download buttons to all charts and diagrams
    setTimeout(addDownloadButtons, 1000); // Delay to ensure all charts are rendered
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
        .attr('fill', '#e53e3e');

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
                .style('stroke', '#e53e3e')
                .style('stroke-width', 3)
                .style('fill', 'none')
                .style('stroke-dasharray', '8,4')
                .attr('marker-end', `url(#${markerId})`);
        } else {
            // Straight line
            linkGroup.append('line')
                .attr('x1', sourceNode.x + sourceNode.width/2)
                .attr('y1', sourceNode.y + sourceNode.height)
                .attr('x2', targetNode.x + targetNode.width/2)
                .attr('y2', targetNode.y)
                .style('stroke', '#2d3748')
                .style('stroke-width', 3)
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
                case 'bottleneck': return '#fed7d7';
                case 'decision': return '#fffbeb';
                case 'ai': return '#e6fffa';
                case 'flexible': return '#ebf8ff';
                case 'continuous': return '#faf5ff';
                default: return '#ffffff';
            }
        })
        .style('stroke', d => {
            switch(d.type) {
                case 'start': case 'end': return '#2c5282';
                case 'bottleneck': return '#e53e3e';
                case 'decision': return '#f59e0b';
                case 'ai': return '#38a169';
                case 'flexible': return '#3182ce';
                case 'continuous': return '#805ad5';
                default: return '#2d3748';
            }
        })
        .style('stroke-width', 2);

    nodeElements.append('text')
        .attr('x', d => d.width/2)
        .attr('y', d => d.height/2 - 5)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'central')
        .style('font-size', '13px')
        .style('font-weight', '700')
        .style('font-family', 'Times New Roman, serif')
        .style('fill', d => (d.type === 'start' || d.type === 'end') ? '#ffffff' : '#008080')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            
            const lineHeight = 14;
            const totalHeight = lines.length * lineHeight;
            const startY = (d.height/2 - 5) - totalHeight/2 + lineHeight/2;
            
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', d.width/2)
                    .attr('y', startY + i * lineHeight)
                    .style('fill', d => (d.type === 'start' || d.type === 'end') ? '#ffffff' : '#008080')
                    .style('font-family', 'Times New Roman, serif')
                    .style('font-weight', '700')
                    .style('text-anchor', 'middle')
                    .style('dominant-baseline', 'central')
                    .text(line);
            });
        });
}

// Cost Analysis Charts
function initializeCostAnalysisCharts() {
    // Cost-Benefit Analysis Chart (for Proposed Model section)
    const costBenefitCtx = document.getElementById('costBenefitChart');
    if (costBenefitCtx) {
        new Chart(costBenefitCtx.getContext('2d'), {
            type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [{
                label: 'Implementation Costs',
                data: [-2100, -900, -400, -200, -100],
                borderColor: '#cc0000',
                backgroundColor: 'rgba(204, 0, 0, 0.1)',
                tension: 0.4,
                fill: false
            }, {
                label: 'Operational Savings',
                data: [800, 2200, 4100, 6300, 8800],
                borderColor: '#38a169',
                backgroundColor: 'rgba(56, 161, 105, 0.1)',
                tension: 0.4,
                fill: false
            }, {
                label: 'Net Benefit',
                data: [-1300, 1300, 3700, 6100, 8700],
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
    }

    // Operational Efficiency Chart  
    const efficiencyCtx = document.getElementById('efficiencyChart');
    if (efficiencyCtx) {
        new Chart(efficiencyCtx.getContext('2d'), {
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

    // Cost Analysis Efficiency Chart
    const costAnalysisEfficiencyCtx = document.getElementById('costAnalysisEfficiencyChart');
    if (costAnalysisEfficiencyCtx) {
        new Chart(costAnalysisEfficiencyCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Manufacturing Costs', 'Supply Chain', 'Quality Control', 'Logistics', 'R&D Investment'],
                datasets: [{
                    label: 'Current Costs (Millions $)',
                    data: [3200, 1800, 450, 650, 900],
                    backgroundColor: '#cc0000',
                    borderColor: '#aa0000',
                    borderWidth: 2
                }, {
                    label: 'Optimized Costs (Millions $)',
                    data: [2850, 1620, 380, 580, 850],
                    backgroundColor: '#38a169',
                    borderColor: '#2f855a',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cost Analysis by Category'
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cost (Millions USD)'
                        }
                    }
                }
            }
        });
    }

    // Cost Analysis Benefit Chart (for Cost Analysis section)
    const costAnalysisBenefitCtx = document.getElementById('costAnalysisBenefitChart');
    if (costAnalysisBenefitCtx) {
        new Chart(costAnalysisBenefitCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: [{
                    label: 'Total Investment',
                    data: [2100, 900, 400, 200, 100],
                    borderColor: '#cc0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.1)',
                    tension: 0.4,
                    fill: false
                }, {
                    label: 'Cumulative Savings',
                    data: [800, 2200, 4100, 6300, 8800],
                    borderColor: '#38a169',
                    backgroundColor: 'rgba(56, 161, 105, 0.1)',
                    tension: 0.4,
                    fill: false
                }, {
                    label: 'Net Benefit',
                    data: [-1300, 1300, 3700, 6100, 8700],
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
                        text: 'Cost-Benefit Analysis Over 5 Years (Millions USD)'
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
    }
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
        .attr('fill', '#2d3748');

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
}

// Sales Charts (Market Penetration and Revenue Simulation)
function initializeSalesCharts() {
    // Market Penetration Probability Chart
    const penetrationCtx = document.getElementById('penetrationChart');
    if (penetrationCtx) {
        new Chart(penetrationCtx.getContext('2d'), {
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
    }

    // Revenue Simulation Chart
    const revenueCtx = document.getElementById('revenueSimulation');
    if (revenueCtx) {
        // Generate Monte Carlo simulation data
        const simulationData = generateMonteCarloData();
        
        new Chart(revenueCtx.getContext('2d'), {
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
        .style('fill', '#f7fafc')
        .style('stroke', '#1a365d')
        .style('stroke-width', 2);

    causalNodeElements.append('text')
        .attr('x', 40)
        .attr('y', 15)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'central')
        .style('font-size', '11px')
        .style('font-weight', '700')
        .style('font-family', 'Times New Roman, serif')
        .style('fill', '#008080')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            
            const lineHeight = 12;
            const totalHeight = lines.length * lineHeight;
            const startY = 15 - totalHeight/2 + lineHeight/2;
            
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', 40)
                    .attr('y', startY + i * lineHeight)
                    .style('fill', '#008080')
                    .style('font-family', 'Times New Roman, serif')
                    .style('font-weight', '700')
                    .style('text-anchor', 'middle')
                    .style('dominant-baseline', 'central')
                    .text(line);
            });
        });
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
        .attr('y', d => d.height/2 - 5)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'central')
        .style('font-size', '12px')
        .style('font-weight', '700')
        .style('font-family', 'Times New Roman, serif')
        .style('fill', '#008080')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            
            const lineHeight = 13;
            const totalHeight = lines.length * lineHeight;
            const startY = (d.height/2 - 5) - totalHeight/2 + lineHeight/2;
            
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', d.width/2)
                    .attr('y', startY + i * lineHeight)
                    .style('fill', '#008080')
                    .style('font-family', 'Times New Roman, serif')
                    .style('font-weight', '700')
                    .style('text-anchor', 'middle')
                    .style('dominant-baseline', 'central')
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
            .style('font-size', '9px')
            .style('font-weight', '500')
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
        .attr('y', -3)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'central')
        .style('font-size', '10px')
        .style('font-weight', '700')
        .style('font-family', 'Times New Roman, serif')
        .style('fill', '#008080')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            
            const lineHeight = 11;
            const totalHeight = lines.length * lineHeight;
            const startY = -3 - totalHeight/2 + lineHeight/2;
            
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', 0)
                    .attr('y', startY + i * lineHeight)
                    .style('fill', '#008080')
                    .style('font-family', 'Times New Roman, serif')
                    .style('font-weight', '700')
                    .style('text-anchor', 'middle')
                    .style('dominant-baseline', 'central')
                    .text(line);
            });
        });
}

// Download Chart Function
function downloadChart(chartId, filename) {
    const canvas = document.getElementById(chartId);
    if (canvas) {
        const link = document.createElement('a');
        link.download = filename || 'chart.png';
        link.href = canvas.toDataURL();
        link.click();
    }
}

// Download SVG Function
function downloadSVG(svgId, filename) {
    const svg = document.getElementById(svgId);
    if (svg) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename || 'diagram.svg';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Add Download Buttons
function addDownloadButtons() {
    // Chart download buttons
    const chartContainers = document.querySelectorAll('.chart-container, .viz-container, .tqc-chart-container');
    chartContainers.forEach(container => {
        const canvas = container.querySelector('canvas');
        if (canvas) {
            const downloadBtn = document.createElement('button');
            downloadBtn.innerHTML = '⬇️ Download';
            downloadBtn.className = 'download-btn';
            downloadBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #008080; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; z-index: 10;';
            downloadBtn.onclick = () => downloadChart(canvas.id, `${canvas.id || 'chart'}.png`);
            container.style.position = 'relative';
            container.appendChild(downloadBtn);
        }
    });

    // SVG diagram download buttons
    const svgContainers = document.querySelectorAll('.flowchart-container, .diagram-container, .tree-diagram-container');
    svgContainers.forEach(container => {
        const svg = container.querySelector('svg');
        if (svg) {
            const downloadBtn = document.createElement('button');
            downloadBtn.innerHTML = '⬇️ Download';
            downloadBtn.className = 'download-btn';
            downloadBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #008080; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; z-index: 10;';
            downloadBtn.onclick = () => downloadSVG(svg.id, `${svg.id || 'diagram'}.svg`);
            container.style.position = 'relative';
            container.appendChild(downloadBtn);
        }
    });
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

// Power BI Dashboard Initialization
function initializePowerBIDashboard() {
    // Revenue Projection Chart
    const revenueProjectionCtx = document.getElementById('revenueProjectionChart');
    if (revenueProjectionCtx) {
        new Chart(revenueProjectionCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2024', '2025', '2026', '2027', '2028'],
                datasets: [{
                    label: 'Revenue (Billions $)',
                    data: [118.4, 145.2, 178.6, 218.3, 267.9],
                    borderColor: '#cc0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Gross Profit (Billions $)',
                    data: [25.7, 34.0, 44.3, 56.5, 71.0],
                    borderColor: '#38a169',
                    backgroundColor: 'rgba(56, 161, 105, 0.1)',
                    tension: 0.4,
                    fill: false
                }, {
                    label: 'EBITDA (Billions $)',
                    data: [19.2, 25.9, 34.1, 44.3, 57.3],
                    borderColor: '#1a365d',
                    backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Five-Year Financial Performance Trajectory'
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (Billions USD)'
                        }
                    }
                }
            }
        });
    }

    // Manufacturing Efficiency Chart
    const manufacturingEfficiencyCtx = document.getElementById('manufacturingEfficiencyChart');
    if (manufacturingEfficiencyCtx) {
        new Chart(manufacturingEfficiencyCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Production Volume', 'Equipment Efficiency', 'Quality Control', 'Cycle Time', 'Cost Reduction', 'Automation Level'],
                datasets: [{
                    label: 'Current Performance (2023)',
                    data: [70, 78, 85, 65, 72, 68],
                    borderColor: '#cc0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.2)',
                    pointBackgroundColor: '#cc0000'
                }, {
                    label: 'Target Performance (2028)',
                    data: [95, 94, 98, 92, 89, 95],
                    borderColor: '#38a169',
                    backgroundColor: 'rgba(56, 161, 105, 0.2)',
                    pointBackgroundColor: '#38a169'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
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

    // Market Share Chart
    const marketShareCtx = document.getElementById('marketShareChart');
    if (marketShareCtx) {
        new Chart(marketShareCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2023', '2024', '2025', '2026', '2027', '2028'],
                datasets: [{
                    label: 'Global EV Market Share (%)',
                    data: [17.7, 19.8, 21.4, 23.1, 24.6, 25.8],
                    borderColor: '#cc0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Premium Segment Share (%)',
                    data: [42.3, 45.7, 48.2, 51.1, 53.8, 56.2],
                    borderColor: '#1a365d',
                    backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 15,
                        max: 60,
                        title: {
                            display: true,
                            text: 'Market Share (%)'
                        }
                    }
                }
            }
        });
    }

    // Investment Allocation Chart
    const investmentAllocationCtx = document.getElementById('investmentAllocationChart');
    if (investmentAllocationCtx) {
        // Register the datalabels plugin
        Chart.register(ChartDataLabels);
        
        new Chart(investmentAllocationCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Manufacturing & Automation', 'R&D & Innovation', 'International Expansion', 'Infrastructure Development', 'Technology Integration', 'Working Capital'],
                datasets: [{
                    data: [32, 24, 18, 12, 9, 5],
                    backgroundColor: [
                        '#cc0000',
                        '#38a169',
                        '#1a365d',
                        '#f59e0b',
                        '#805ad5',
                        '#2d3748'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Strategic Investment Allocation (% of $8.4B Total)'
                    },
                    legend: {
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            boxWidth: 12,
                            padding: 8,
                            usePointStyle: true,
                            font: {
                                size: 11
                            }
                        },
                        maxWidth: 600,
                        itemsPerRow: 3
                    },
                    datalabels: {
                        display: true,
                        color: '#008080',
                        font: {
                            weight: 'bold',
                            size: 13
                        },
                        formatter: function(value, context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return value + '\n(' + percentage + '%)';
                        },
                        textAlign: 'center'
                    }
                },
                layout: {
                    padding: {
                        bottom: 60  // Space for 2-row legend
                    }
                }
            }
        });
    }
}

// TQC Charts Initialization
function initializeTQCCharts() {
    // Quality Trend Analysis Chart
    const qualityTrendCtx = document.getElementById('qualityTrendChart');
    if (qualityTrendCtx) {
        new Chart(qualityTrendCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
                datasets: [{
                    label: 'Defect Rate (per 1000 units)',
                    data: [3.2, 2.8, 2.5, 2.3, 2.0, 1.8],
                    borderColor: '#cc0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                }, {
                    label: 'Customer Satisfaction Score',
                    data: [4.4, 4.5, 4.55, 4.6, 4.65, 4.7],
                    borderColor: '#38a169',
                    backgroundColor: 'rgba(56, 161, 105, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Defect Rate'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Satisfaction Score'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                        min: 4.0,
                        max: 5.0
                    }
                }
            }
        });
    }

    // Cost of Quality Chart
    const costOfQualityCtx = document.getElementById('costOfQualityChart');
    if (costOfQualityCtx) {
        new Chart(costOfQualityCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Prevention', 'Appraisal', 'Internal Failure', 'External Failure'],
                datasets: [{
                    label: 'Current Costs (Millions $)',
                    data: [145, 98, 234, 167],
                    backgroundColor: '#cc0000',
                    borderColor: '#aa0000',
                    borderWidth: 2
                }, {
                    label: 'Target Costs (Millions $)',
                    data: [189, 127, 89, 45],
                    backgroundColor: '#38a169',
                    borderColor: '#2f855a',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cost of Quality Categories'
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cost (Millions USD)'
                        }
                    }
                }
            }
        });
    }

    // TQC Implementation Maturity Chart
    const tqcMaturityCtx = document.getElementById('tqcMaturityChart');
    if (tqcMaturityCtx) {
        new Chart(tqcMaturityCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Quality Planning', 'Supplier QA', 'Process Control', 'Final Validation', 'Continuous Improvement', 'Customer Experience'],
                datasets: [{
                    label: 'Current Maturity Level',
                    data: [75, 82, 78, 88, 71, 79],
                    borderColor: '#cc0000',
                    backgroundColor: 'rgba(204, 0, 0, 0.2)',
                    pointBackgroundColor: '#cc0000'
                }, {
                    label: 'Target Maturity Level',
                    data: [92, 95, 94, 97, 89, 93],
                    borderColor: '#38a169',
                    backgroundColor: 'rgba(56, 161, 105, 0.2)',
                    pointBackgroundColor: '#38a169'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
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
}

// Decision Tree Visualization
function initializeDecisionTree() {
    const svg = d3.select('#decisionTree');
    const width = 1000;
    const height = 600;
    
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    // Define arrow marker
    svg.append('defs').append('marker')
        .attr('id', 'decision-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#2d3748');

    // Decision tree nodes
    const decisionNodes = [
        { id: 'investment-decision', x: 100, y: 100, width: 140, height: 60, text: 'Investment\nDecision', type: 'decision' },
        { id: 'full-impl', x: 300, y: 50, width: 120, height: 50, text: 'Full\nImplementation', type: 'alternative' },
        { id: 'phased-impl', x: 300, y: 120, width: 120, height: 50, text: 'Phased\nImplementation', type: 'alternative' },
        { id: 'minimal-impl', x: 300, y: 190, width: 120, height: 50, text: 'Minimal\nInvestment', type: 'alternative' },
        { id: 'status-quo', x: 300, y: 260, width: 120, height: 50, text: 'Status Quo\nMaintenance', type: 'alternative' },
        
        // Full Implementation outcomes
        { id: 'full-high', x: 500, y: 20, width: 100, height: 40, text: 'High Success\n$8.9B NPV', type: 'outcome-success' },
        { id: 'full-mod', x: 500, y: 70, width: 100, height: 40, text: 'Moderate\n$4.7B NPV', type: 'outcome-moderate' },
        { id: 'full-low', x: 500, y: 120, width: 100, height: 40, text: 'Challenge\n$1.2B NPV', type: 'outcome-challenge' },
        
        // Phased Implementation outcomes
        { id: 'phased-high', x: 500, y: 170, width: 100, height: 40, text: 'High Success\n$4.8B NPV', type: 'outcome-success' },
        { id: 'phased-mod', x: 500, y: 220, width: 100, height: 40, text: 'Moderate\n$2.9B NPV', type: 'outcome-moderate' },
        
        // Expected values
        { id: 'full-ev', x: 700, y: 50, width: 120, height: 50, text: 'Expected Value:\n$4.1B', type: 'expected-value' },
        { id: 'phased-ev', x: 700, y: 195, width: 120, height: 50, text: 'Expected Value:\n$2.7B', type: 'expected-value' },
        { id: 'minimal-ev', x: 500, y: 290, width: 120, height: 50, text: 'Expected Value:\n$1.2B', type: 'expected-value' },
        { id: 'status-ev', x: 500, y: 350, width: 120, height: 50, text: 'Expected Value:\n-$1.4B', type: 'expected-negative' }
    ];

    // Decision tree links
    const decisionLinks = [
        // Main decision branches
        { source: 'investment-decision', target: 'full-impl', probability: '' },
        { source: 'investment-decision', target: 'phased-impl', probability: '' },
        { source: 'investment-decision', target: 'minimal-impl', probability: '' },
        { source: 'investment-decision', target: 'status-quo', probability: '' },
        
        // Full implementation outcomes
        { source: 'full-impl', target: 'full-high', probability: '34.7%' },
        { source: 'full-impl', target: 'full-mod', probability: '52.6%' },
        { source: 'full-impl', target: 'full-low', probability: '12.7%' },
        
        // Phased implementation outcomes
        { source: 'phased-impl', target: 'phased-high', probability: '41.2%' },
        { source: 'phased-impl', target: 'phased-mod', probability: '58.8%' },
        
        // Expected value connections
        { source: 'full-high', target: 'full-ev', probability: '' },
        { source: 'full-mod', target: 'full-ev', probability: '' },
        { source: 'full-low', target: 'full-ev', probability: '' },
        { source: 'phased-high', target: 'phased-ev', probability: '' },
        { source: 'phased-mod', target: 'phased-ev', probability: '' },
        { source: 'minimal-impl', target: 'minimal-ev', probability: '' },
        { source: 'status-quo', target: 'status-ev', probability: '' }
    ];

    // Draw decision tree links
    const linkGroup = svg.append('g').attr('class', 'decision-links');
    
    decisionLinks.forEach(link => {
        const sourceNode = decisionNodes.find(n => n.id === link.source);
        const targetNode = decisionNodes.find(n => n.id === link.target);
        
        const line = linkGroup.append('line')
            .attr('x1', sourceNode.x + sourceNode.width)
            .attr('y1', sourceNode.y + sourceNode.height/2)
            .attr('x2', targetNode.x)
            .attr('y2', targetNode.y + targetNode.height/2)
            .style('stroke', '#2d3748')
            .style('stroke-width', 2)
            .attr('marker-end', 'url(#decision-arrow)');
        
        // Add probability labels
        if (link.probability) {
            const midX = (sourceNode.x + sourceNode.width + targetNode.x) / 2;
            const midY = (sourceNode.y + sourceNode.height/2 + targetNode.y + targetNode.height/2) / 2;
            
            linkGroup.append('text')
                .attr('x', midX)
                .attr('y', midY - 5)
                .style('text-anchor', 'middle')
                .style('font-size', '10px')
                .style('font-weight', '600')
                .style('fill', '#cc0000')
                .text(link.probability);
        }
    });

    // Draw decision tree nodes
    const nodeGroup = svg.append('g').attr('class', 'decision-nodes');
    
    const nodeElements = nodeGroup.selectAll('.decision-node')
        .data(decisionNodes)
        .enter()
        .append('g')
        .attr('class', d => `decision-node ${d.type}`)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeElements.append('rect')
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('rx', 5)
        .style('fill', d => {
            switch(d.type) {
                case 'decision': return '#f8f9fa';
                case 'alternative': return '#f1f5f9';
                case 'outcome-success': return '#f0fdf4';
                case 'outcome-moderate': return '#fefce8';
                case 'outcome-challenge': return '#fef2f2';
                case 'expected-value': return '#eff6ff';
                case 'expected-negative': return '#fef2f2';
                default: return '#ffffff';
            }
        })
        .style('stroke', d => {
            switch(d.type) {
                case 'decision': return '#64748b';
                case 'alternative': return '#64748b';
                case 'outcome-success': return '#64748b';
                case 'outcome-moderate': return '#64748b';
                case 'outcome-challenge': return '#64748b';
                case 'expected-value': return '#64748b';
                case 'expected-negative': return '#64748b';
                default: return '#64748b';
            }
        })
        .style('stroke-width', 2);

    nodeElements.append('text')
        .attr('x', d => d.width/2)
        .attr('y', d => d.height/2)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'central')
        .style('font-size', '10px')
        .style('font-weight', '600')
        .style('font-family', 'Arial, sans-serif')
        .style('fill', '#654321')
        .text(d => d.text)
        .each(function(d) {
            const text = d3.select(this);
            const lines = d.text.split('\n');
            text.text('');
            
            const lineHeight = 12;
            const totalHeight = lines.length * lineHeight;
            const startY = d.height/2 - totalHeight/2 + lineHeight/2;
            
            lines.forEach((line, i) => {
                text.append('tspan')
                    .attr('x', d.width/2)
                    .attr('y', startY + i * lineHeight)
                    .style('fill', '#654321')
                    .style('font-family', 'Arial, sans-serif')
                    .style('text-anchor', 'middle')
                    .style('dominant-baseline', 'central')
                    .text(line);
            });
        });
}

// Dashboard Filter Functionality
function initializeDashboardFilters() {
    const categoryFilter = document.getElementById('metricCategory');
    const timeframeFilter = document.getElementById('timeframe');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterDashboardMetrics(this.value);
        });
    }
    
    if (timeframeFilter) {
        timeframeFilter.addEventListener('change', function() {
            updateTimeframeView(this.value);
        });
    }
}

function filterDashboardMetrics(category) {
    console.log(`Filtering dashboard by category: ${category}`);
    
    // Get all visualization containers
    const containers = document.querySelectorAll('.viz-container');
    
    // Show/hide containers based on category
    containers.forEach(container => {
        const title = container.querySelector('h4').textContent.toLowerCase();
        
        switch(category) {
            case 'manufacturing':
                container.style.display = title.includes('manufacturing') || title.includes('efficiency') ? 'flex' : 'none';
                break;
            case 'financial':
                container.style.display = title.includes('revenue') || title.includes('profitability') || title.includes('investment') ? 'flex' : 'none';
                break;
            case 'customer':
                container.style.display = title.includes('customer') || title.includes('satisfaction') ? 'flex' : 'none';
                break;
            case 'market':
                container.style.display = title.includes('market') || title.includes('share') ? 'flex' : 'none';
                break;
            case 'all':
            default:
                container.style.display = 'flex';
                break;
        }
    });
    
    // Update grid layout based on visible containers
    const grid = document.querySelector('.visualization-grid');
    const visibleContainers = document.querySelectorAll('.viz-container[style*="flex"]');
    
    if (visibleContainers.length <= 2) {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(400px, 1fr))';
    } else {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
}

function updateTimeframeView(timeframe) {
    console.log(`Updating timeframe view: ${timeframe}`);
    
    // This would typically update the data in the charts
    // For now, we'll show a visual indicator
    const containers = document.querySelectorAll('.viz-container h4');
    containers.forEach(title => {
        const originalText = title.textContent.replace(/ \([^)]*\)$/, ''); // Remove existing timeframe
        title.textContent = `${originalText} (${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} View)`;
    });
    
    // Add animation effect
    const grid = document.querySelector('.visualization-grid');
    grid.style.opacity = '0.7';
    setTimeout(() => {
        grid.style.opacity = '1';
    }, 500);
}

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Tesla BI Website loaded successfully');
    
    // Initialize dashboard filters
    initializeDashboardFilters();
    
    // Initialize Customer Relations and HR Charts
    initializeCustomerRelationsCharts();
    initializeHRCharts();
    
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Customer Relations Charts
function initializeCustomerRelationsCharts() {
    // Customer Satisfaction Metrics Chart
    const customerSatCtx = document.getElementById('customerSatisfactionChart');
    if (customerSatCtx) {
        new Chart(customerSatCtx, {
            type: 'doughnut',
            data: {
                labels: ['Brand Recognition', 'Net Promoter Score', 'Market Share', 'Repurchase Intent'],
                datasets: [{
                    data: [67, 96, 11, 92],
                    backgroundColor: [
                        '#FF6B6B',  // Bright Red
                        '#4ECDC4',  // Bright Teal
                        '#45B7D1',  // Bright Blue
                        '#FFA726'   // Bright Orange
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    title: {
                        display: true,
                        text: 'Tesla Customer Satisfaction Metrics (%)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    // Revenue Growth Projections Chart
    const revenueGrowthCtx = document.getElementById('revenueGrowthChart');
    if (revenueGrowthCtx) {
        new Chart(revenueGrowthCtx, {
            type: 'bar',
            data: {
                labels: ['Premium Luxury', 'Mass Market', 'Commercial Fleet'],
                datasets: [
                    {
                        label: 'Current Share (%)',
                        data: [34.7, 8.3, 12.1],
                        backgroundColor: '#FF6B6B',  // Bright Red
                        borderColor: '#E53E3E',
                        borderWidth: 2
                    },
                    {
                        label: 'Target Share (%)',
                        data: [48.2, 23.1, 31.6],
                        backgroundColor: '#38D9A9',  // Bright Green
                        borderColor: '#20C997',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Market Share (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Market Segments'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Market Segment Expansion Analysis',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }
}

// Human Resources Charts
function initializeHRCharts() {
    // Employee Satisfaction vs Industry Chart
    const empSatCtx = document.getElementById('employeeSatisfactionChart');
    if (empSatCtx) {
        new Chart(empSatCtx, {
            type: 'radar',
            data: {
                labels: ['Compensation', 'Work-Life Balance', 'Innovation Culture', 'Career Growth', 'Mission Alignment', 'Management Quality'],
                datasets: [
                    {
                        label: 'Tesla',
                        data: [85, 65, 95, 80, 90, 70],
                        borderColor: '#FF6B6B',  // Bright Red
                        backgroundColor: 'rgba(255, 107, 107, 0.2)',
                        borderWidth: 3,
                        pointBackgroundColor: '#FF6B6B',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Industry Average',
                        data: [70, 75, 65, 70, 60, 75],
                        borderColor: '#D69E2E',  // Bright Yellow/Brown
                        backgroundColor: 'rgba(214, 158, 46, 0.2)',
                        borderWidth: 3,
                        pointBackgroundColor: '#D69E2E',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Tesla vs Industry Average Employee Satisfaction',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    // OODA Performance Chart
    const oodaCtx = document.getElementById('oodaPerformanceChart');
    if (oodaCtx) {
        new Chart(oodaCtx, {
            type: 'line',
            data: {
                labels: ['Observe', 'Orient', 'Decide', 'Act', 'Feedback Loop'],
                datasets: [
                    {
                        label: 'Response Time (Hours)',
                        data: [2, 4, 1.5, 3, 0.5],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#e74c3c',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    },
                    {
                        label: 'Industry Benchmark (Hours)',
                        data: [4, 8, 6, 12, 2],
                        borderColor: '#95a5a6',
                        backgroundColor: 'rgba(149, 165, 166, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: false,
                        pointBackgroundColor: '#95a5a6',
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Response Time (Hours)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'OODA Loop Phases'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'OODA Loop Decision Response Time Analysis',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }
}
