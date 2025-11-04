// ============================================
// Scene 4: LTSS Is Not Only for Older Adults
// Purpose: Show age distribution of LTSS users
// Key Insight: 56% under 65, 44% age 65+
// Visualization: Side-by-side vertical bars with person icons
// ============================================

function drawScene4() {
    const chart = d3.select('#chart');
    chart.selectAll('*').remove();

    // Load age distribution data
    const data = window.ltssApp?.ltssData?.scene4?.ageGroups || [
        { label: 'Under 65', percent: 56, color: '#667eea' },
        { label: 'Age 65+', percent: 44, color: '#764ba2' }
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
        .text('Not Just Older Adults')
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
        .text('Age Distribution of LTSS Users')
        .transition()
        .duration(800)
        .delay(300)
        .style('opacity', 1);

    // === BAR CHART SETUP ===
    // Two bars side-by-side showing age groups
    const barWidth = 180;
    const maxBarHeight = 300;           // Maximum height for 100%
    const barSpacing = 100;
    const centerX = 400;
    const baseY = 480;                  // Baseline where bars start

    // === CREATE EACH BAR ===
    // Loop through Under 65 and Age 65+
    data.forEach((d, i) => {
        const barX = centerX - barWidth - barSpacing / 2 + (i * (barWidth + barSpacing));
        const barHeight = (d.percent / 100) * maxBarHeight;  // Scale to percentage

        const barGroup = svg.append('g');

        // Background bar (ghost bar showing max height)
        barGroup.append('rect')
            .attr('x', barX)
            .attr('y', baseY - maxBarHeight)
            .attr('width', barWidth)
            .attr('height', maxBarHeight)
            .attr('fill', 'rgba(255, 255, 255, 0.1)')
            .attr('rx', 8);

        // Animated foreground bar (grows from bottom to top)
        const bar = barGroup.append('rect')
            .attr('x', barX)
            .attr('y', baseY)                   // Start at baseline
            .attr('width', barWidth)
            .attr('height', 0)                  // Start at zero height
            .attr('fill', d.color)
            .attr('rx', 8);

        // Animate bar growing upward
        bar.transition()
            .duration(1200)
            .delay(i * 400 + 800)              // Staggered timing
            .attr('y', baseY - barHeight)       // Move top edge up
            .attr('height', barHeight);         // Increase height

        // Percentage text inside the bar
        const percentText = barGroup.append('text')
            .attr('x', barX + barWidth / 2)
            .attr('y', baseY - barHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('font-size', '56px')
            .style('font-weight', '700')
            .style('fill', 'white')
            .style('opacity', 0)
            .text(`${d.percent}%`);

        percentText.transition()
            .duration(800)
            .delay(i * 400 + 1500)
            .style('opacity', 1);

        // Age group label below the bar
        const label = barGroup.append('text')
            .attr('x', barX + barWidth / 2)
            .attr('y', baseY + 30)
            .attr('text-anchor', 'middle')
            .style('font-size', '20px')
            .style('font-weight', '600')
            .style('fill', 'white')
            .style('opacity', 0)
            .text(d.label);

        label.transition()
            .duration(800)
            .delay(i * 400 + 1700)
            .style('opacity', 1);

        // === PERSON ICON ===
        // Simple person silhouette above each bar
        const iconY = baseY - maxBarHeight - 60;

        const personGroup = svg.append('g')
            .attr('transform', `translate(${barX + barWidth / 2}, ${iconY})`)
            .style('opacity', 0);

        // Head (circle)
        personGroup.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 15)
            .attr('fill', d.color);

        // Body (rounded rectangle)
        personGroup.append('rect')
            .attr('x', -12)
            .attr('y', 15)
            .attr('width', 24)
            .attr('height', 30)
            .attr('rx', 5)
            .attr('fill', d.color);

        personGroup.transition()
            .duration(600)
            .delay(i * 400 + 1900)
            .style('opacity', 0.9);
    });

    // === INSIGHT TEXT ===
    // Bottom text explaining the significance
    svg.append('text')
        .attr('x', 400)
        .attr('y', 555)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('fill', 'rgba(255, 255, 255, 0.9)')
        .style('opacity', 0)
        .text('More than half are younger adults with disabilities or complex needs')
        .transition()
        .duration(800)
        .delay(2400)
        .style('opacity', 1);
}
