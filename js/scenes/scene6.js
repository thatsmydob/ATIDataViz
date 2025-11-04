// ============================================
// Scene 6: Closing Message & Call to Action
// Purpose: Humanize the data with emotional closing message
// Key Message: Behind every datapoint is a person
// Visualization: Centered text with decorative person icons
// ============================================

function drawScene6() {
    const chart = d3.select('#chart');
    chart.selectAll('*').remove();

    // Create SVG canvas
    const svg = chart.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 800 600')
        .attr('preserveAspectRatio', 'xMidYMid meet');

    // === VIGNETTE BACKGROUND ===
    // Subtle radial gradient to focus attention on center
    const defs = svg.append('defs');
    const radialGradient = defs.append('radialGradient')
        .attr('id', 'vignette')
        .attr('cx', '50%')
        .attr('cy', '50%');

    // Gradient goes from light center to darker edges
    radialGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'rgba(255, 255, 255, 0.15)');

    radialGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'rgba(0, 0, 0, 0.2)');

    // Apply vignette with fade-in
    svg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'url(#vignette)')
        .style('opacity', 0)
        .transition()
        .duration(1500)
        .style('opacity', 1);

    // === CENTRAL MESSAGE ===
    // Group containing the main text message
    const messageGroup = svg.append('g')
        .attr('transform', 'translate(400, 280)');

    // Main message line 1: "Behind every datapoint"
    const message1 = messageGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -40)
        .style('font-size', '32px')
        .style('font-weight', '600')
        .style('fill', 'white')
        .style('opacity', 0)
        .text('Behind every datapoint');

    message1.transition()
        .duration(1000)
        .delay(500)
        .style('opacity', 1);

    // Main message line 2: "is a person"
    const message2 = messageGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 0)
        .style('font-size', '32px')
        .style('font-weight', '600')
        .style('fill', 'white')
        .style('opacity', 0)
        .text('is a person');

    message2.transition()
        .duration(1000)
        .delay(900)
        .style('opacity', 1);

    // Decorative horizontal line separator
    messageGroup.append('line')
        .attr('x1', -60)
        .attr('y1', 40)
        .attr('x2', 60)
        .attr('y2', 40)
        .attr('stroke', 'rgba(255, 255, 255, 0.5)')
        .attr('stroke-width', 2)
        .style('opacity', 0)
        .transition()
        .duration(800)
        .delay(1300)
        .style('opacity', 1);

    // Supporting text line 1: "A family."
    const supporting1 = messageGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 80)
        .style('font-size', '20px')
        .style('fill', 'rgba(255, 255, 255, 0.9)')
        .style('opacity', 0)
        .text('A family.');

    supporting1.transition()
        .duration(800)
        .delay(1600)
        .style('opacity', 1);

    // Supporting text line 2: "A life with dignity and independence."
    const supporting2 = messageGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 110)
        .style('font-size', '20px')
        .style('fill', 'rgba(255, 255, 255, 0.9)')
        .style('opacity', 0)
        .text('A life with dignity and independence.');

    supporting2.transition()
        .duration(800)
        .delay(1900)
        .style('opacity', 1);

    // === DECORATIVE PERSON ICONS ===
    // Four corner person silhouettes for visual balance
    const iconPositions = [
        { x: 150, y: 150, delay: 2200 },     // Top-left
        { x: 650, y: 150, delay: 2400 },     // Top-right
        { x: 150, y: 450, delay: 2600 },     // Bottom-left
        { x: 650, y: 450, delay: 2800 }      // Bottom-right
    ];

    iconPositions.forEach(pos => {
        const iconGroup = svg.append('g')
            .attr('transform', `translate(${pos.x}, ${pos.y})`)
            .style('opacity', 0);

        // Simple person silhouette (head + body)
        // Head (circle)
        iconGroup.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 12)
            .attr('fill', 'rgba(255, 255, 255, 0.3)');

        // Body (rounded rectangle)
        iconGroup.append('rect')
            .attr('x', -10)
            .attr('y', 12)
            .attr('width', 20)
            .attr('height', 25)
            .attr('rx', 4)
            .attr('fill', 'rgba(255, 255, 255, 0.3)');

        // Fade in with staggered timing
        iconGroup.transition()
            .duration(800)
            .delay(pos.delay)
            .style('opacity', 1);
    });

    // === HEART ICON ===
    // Centered heart symbol representing compassion and humanity
    const heartGroup = svg.append('g')
        .attr('transform', 'translate(400, 400)')
        .style('opacity', 0);

    const heartPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

    heartGroup.append('path')
        .attr('d', heartPath)
        .attr('transform', 'translate(-12, -12) scale(1.5)')
        .attr('fill', 'rgba(255, 255, 255, 0.4)');

    heartGroup.transition()
        .duration(1000)
        .delay(2200)
        .style('opacity', 1);

    // === NOTE ===
    // CTA buttons (Explore, Replay, Download) are in the HTML step content
    // Keeping them in HTML makes them interactive and properly styled
}
