// ============================================
// Scene 2: Small Share, Big Spending Impact
// Purpose: Show disparity between enrollment (6%) and spending (37%)
// Key Insight: LTSS users are resource-intensive
// Animation: Icon grid → Donut chart morph
// ============================================

function drawScene2() {
    const chart = d3.select('#chart');
    chart.selectAll('*').remove();

    // Load data with fallback defaults
    const data = window.ltssApp?.ltssData?.scene2 || {
        enrollmentPercent: 6,
        spendingPercent: 37,
        totalPeople: 100,
        ltssUsers: 6
    };

    // Create SVG canvas
    const svg = chart.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 800 600')
        .attr('preserveAspectRatio', 'xMidYMid meet');

    // Title with fade-in
    svg.append('text')
        .attr('x', 400)
        .attr('y', 60)
        .attr('class', 'chart-title')
        .attr('text-anchor', 'middle')
        .style('font-size', '28px')
        .style('opacity', 0)
        .text('Small Share, Big Impact')
        .transition()
        .duration(800)
        .style('opacity', 1);

    // === STAGE 1: ICON GRID (100 people, 6 highlighted) ===
    // Create 10x10 grid to represent 100 Medicaid enrollees
    const gridSize = 10;
    const iconSize = 12;
    const iconSpacing = 35;
    const gridStartX = 400 - (gridSize * iconSpacing) / 2;
    const gridStartY = 150;

    const iconGroup = svg.append('g')
        .attr('id', 'icon-grid')
        .attr('transform', `translate(${gridStartX}, ${gridStartY})`);

    // Create 100-person grid with first 6 highlighted in yellow
    for (let i = 0; i < 100; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        const isHighlighted = i < data.ltssUsers;  // First 6 are LTSS users

        iconGroup.append('circle')
            .attr('cx', col * iconSpacing)
            .attr('cy', row * iconSpacing)
            .attr('r', 0)
            .attr('class', isHighlighted ? 'icon-person highlight' : 'icon-person')
            .attr('fill', isHighlighted ? '#fbbf24' : 'rgba(255, 255, 255, 0.6)')
            .transition()
            .duration(30)
            .delay(i * 10 + 500)  // Staggered appearance
            .attr('r', iconSize / 2);
    }

    // Label explaining the 6% enrollment
    const enrollmentLabel = svg.append('text')
        .attr('x', 400)
        .attr('y', 530)
        .attr('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('fill', 'white')
        .style('opacity', 0)
        .text(`${data.enrollmentPercent}% of enrollees use LTSS`);

    enrollmentLabel.transition()
        .duration(800)
        .delay(1500)
        .style('opacity', 1);

    // === STAGE 2: MORPH TO DONUT ===
    // After 3.5 seconds, transition to donut chart showing spending disparity
    setTimeout(() => {
        morphToDonut(svg, data);
    }, 3500);
}

// ============================================
// Helper function: Morph icon grid into donut chart
// Shows spending percentage (37%) in donut format
// ============================================
function morphToDonut(svg, data) {
    // Fade out and remove the icon grid
    svg.select('#icon-grid')
        .transition()
        .duration(800)
        .style('opacity', 0)
        .remove();

    // Remove the enrollment label
    svg.selectAll('text')
        .filter(function() {
            return d3.select(this).text().includes('enrollees');
        })
        .transition()
        .duration(800)
        .style('opacity', 0)
        .remove();

    // === CREATE DONUT CHART ===
    // Donut shows LTSS spending (37%) vs other spending (63%)
    const width = 800;
    const height = 600;
    const radius = 140;

    const donutData = [
        { label: 'LTSS Spending', value: data.spendingPercent, color: '#fbbf24' },
        { label: 'Other Spending', value: 100 - data.spendingPercent, color: 'rgba(255, 255, 255, 0.3)' }
    ];

    // D3 pie layout generator
    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);  // Don't sort, keep data order

    // Arc generator for donut shape (hollow center)
    const arc = d3.arc()
        .innerRadius(radius * 0.6)  // 60% inner radius creates the hole
        .outerRadius(radius);

    const donutGroup = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .style('opacity', 0);

    // Draw donut segments
    const segments = donutGroup.selectAll('path')
        .data(pie(donutData))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => d.data.color)
        .attr('stroke', '#667eea')
        .attr('stroke-width', 2)
        .each(function(d) { this._current = d; });  // Store for transitions

    // Animate donut group fade-in
    donutGroup.transition()
        .duration(1000)
        .style('opacity', 1);

    // Animate segments drawing (arc grows from 0 to full size)
    segments.transition()
        .duration(1200)
        .attrTween('d', function(d) {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function(t) {
                return arc(interpolate(t));
            };
        });

    // Center text showing spending percentage (37%)
    donutGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -10)
        .style('font-size', '56px')
        .style('font-weight', '700')
        .style('fill', '#fbbf24')
        .style('opacity', 0)
        .text(`${data.spendingPercent}%`)
        .transition()
        .duration(800)
        .delay(1200)
        .style('opacity', 1);

    // Label below percentage
    donutGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 20)
        .style('font-size', '18px')
        .style('fill', 'white')
        .style('opacity', 0)
        .text('of spending')
        .transition()
        .duration(800)
        .delay(1400)
        .style('opacity', 1);

    // Bottom insight text explaining the disparity
    svg.append('text')
        .attr('x', 400)
        .attr('y', 530)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('fill', 'rgba(255, 255, 255, 0.9)')
        .style('opacity', 0)
        .text(`Just ${data.enrollmentPercent}% of enrollees account for ${data.spendingPercent}% of Medicaid spending`)
        .transition()
        .duration(800)
        .delay(1600)
        .style('opacity', 1);
}
