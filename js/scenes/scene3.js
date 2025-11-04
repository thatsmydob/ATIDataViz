// ============================================
// Scene 3: Most People Receive Care at Home
// Purpose: Show distribution of LTSS care settings
// Key Insight: 72% HCBS, 24% Institutional, 4% Both
// Visualization: Horizontal stacked bar chart with icons
// ============================================

function drawScene3() {
    const chart = d3.select('#chart');
    chart.selectAll('*').remove();

    // Load care setting data (HCBS, Institutional, Both)
    const data = window.ltssApp?.ltssData?.scene3?.categories || [
        { name: 'HCBS', label: 'Home & Community-Based', percent: 72, color: '#10b981' },
        { name: 'Institutional', label: 'Institutional', percent: 24, color: '#ef4444' },
        { name: 'Both', label: 'Both', percent: 4, color: '#f59e0b' }
    ];

    // Create SVG canvas
    const svg = chart.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 800 600')
        .attr('preserveAspectRatio', 'xMidYMid meet');

    // Title
    svg.append('text')
        .attr('x', 400)
        .attr('y', 80)
        .attr('class', 'chart-title')
        .attr('text-anchor', 'middle')
        .style('font-size', '28px')
        .style('opacity', 0)
        .text('Where People Receive Care')
        .transition()
        .duration(800)
        .style('opacity', 1);

    // Subtitle
    svg.append('text')
        .attr('x', 400)
        .attr('y', 115)
        .attr('class', 'chart-subtitle')
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('opacity', 0)
        .text('Distribution of LTSS Care Settings (2020)')
        .transition()
        .duration(800)
        .delay(300)
        .style('opacity', 1);

    // === STACKED BAR SETUP ===
    // Define dimensions for the horizontal bar
    const barHeight = 80;
    const barY = 280;
    const barMaxWidth = 700;
    const barX = 50;

    // Calculate cumulative positions for stacking
    // Each segment starts where the previous one ended
    let cumulative = 0;
    const barData = data.map(d => {
        const segment = {
            ...d,
            start: cumulative,                          // Where this segment starts
            end: cumulative + d.percent,                // Where it ends
            width: (d.percent / 100) * barMaxWidth      // Pixel width
        };
        cumulative += d.percent;
        return segment;
    });

    // Create group for all bar segments
    const barGroup = svg.append('g')
        .attr('class', 'stacked-bar');

    // === DRAW EACH SEGMENT ===
    // Loop through HCBS, Institutional, and Both
    barData.forEach((d, i) => {
        const segmentX = barX + (d.start / 100) * barMaxWidth;

        // Bar segment rectangle
        const segment = barGroup.append('rect')
            .attr('x', segmentX)
            .attr('y', barY)
            .attr('width', 0)                           // Start at zero width
            .attr('height', barHeight)
            .attr('fill', d.color)
            .attr('rx', 4);                             // Rounded corners

        // Animate bar growing left to right
        segment.transition()
            .duration(1000)
            .delay(i * 300 + 800)                      // Staggered timing
            .attr('width', d.width);

        // Percentage label inside the bar
        const labelGroup = barGroup.append('g')
            .style('opacity', 0);

        labelGroup.append('text')
            .attr('x', segmentX + d.width / 2)
            .attr('y', barY + barHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('font-size', '28px')
            .style('font-weight', '700')
            .style('fill', 'white')
            .text(`${d.percent}%`);

        labelGroup.transition()
            .duration(600)
            .delay(i * 300 + 1400)
            .style('opacity', 1);

        // Category label below the bar
        const categoryLabel = svg.append('text')
            .attr('x', segmentX + d.width / 2)
            .attr('y', barY + barHeight + 40)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('font-weight', '600')
            .style('fill', d.color)
            .style('opacity', 0)
            .text(d.label);

        categoryLabel.transition()
            .duration(600)
            .delay(i * 300 + 1600)
            .style('opacity', 1);

        // Icon above the bar (home, building, or checkmark)
        let iconPath;
        if (d.name === 'HCBS') {
            iconPath = 'M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z';  // House icon
        } else if (d.name === 'Institutional') {
            iconPath = 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z';  // Building icon
        } else {
            iconPath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';  // Checkmark icon (both)
        }

        const icon = svg.append('path')
            .attr('d', iconPath)
            .attr('transform', `translate(${segmentX + d.width / 2 - 12}, ${barY - 50}) scale(1.5)`)
            .attr('fill', d.color)
            .style('opacity', 0);

        icon.transition()
            .duration(600)
            .delay(i * 300 + 1800)
            .style('opacity', 0.8);
    });

    // === INSIGHT TEXT ===
    // Bottom text explaining the significance
    svg.append('text')
        .attr('x', 400)
        .attr('y', 480)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('fill', 'white')
        .style('opacity', 0)
        .text('Most LTSS users receive care at home')
        .transition()
        .duration(800)
        .delay(2200)
        .style('opacity', 1);

    svg.append('text')
        .attr('x', 400)
        .attr('y', 510)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('fill', 'rgba(255, 255, 255, 0.8)')
        .style('opacity', 0)
        .text('reflecting a shift toward aging in place & independence')
        .transition()
        .duration(800)
        .delay(2400)
        .style('opacity', 1);
}
