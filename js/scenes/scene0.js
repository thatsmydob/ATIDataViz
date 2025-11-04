// ============================================
// Scene 0: Title / Context with fade-in animation
// Purpose: Introduces the story with an elegant title screen
// ============================================

function drawScene0() {
    // Select the chart container where we'll render our visualization
    const chart = d3.select('#chart');

    // Clear any previous content from other scenes to start fresh
    chart.selectAll('*').remove();

    // Create the SVG canvas with responsive sizing
    // viewBox maintains aspect ratio, preserveAspectRatio centers content
    const svg = chart.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 800 600')
        .attr('preserveAspectRatio', 'xMidYMid meet');

    // === CREATE RADIAL GRADIENT BACKGROUND ===
    // This adds depth and draws attention to the center
    const defs = svg.append('defs');
    const gradient = defs.append('radialGradient')
        .attr('id', 'scene0-gradient')
        .attr('cx', '50%')  // Center horizontally
        .attr('cy', '50%'); // Center vertically

    // Gradient starts bright in center (20% white opacity)
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'rgba(255, 255, 255, 0.2)');

    // Fades to transparent at edges
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'rgba(255, 255, 255, 0)');

    // Apply the gradient as a large circle with fade-in animation
    svg.append('circle')
        .attr('cx', 400)   // Center X
        .attr('cy', 300)   // Center Y
        .attr('r', 300)    // Radius covers most of the screen
        .attr('fill', 'url(#scene0-gradient)')
        .style('opacity', 0)  // Start invisible
        .transition()          // Animate
        .duration(1500)        // Over 1.5 seconds
        .style('opacity', 1);  // Fade to fully visible

    // === MAIN TITLE ===
    // "Medicaid LTSS" - the primary text element
    const title = svg.append('text')
        .attr('class', 'chart-title')
        .attr('x', 400)      // Center horizontally
        .attr('y', 280)      // Position slightly above center
        .style('font-size', '36px')
        .style('opacity', 0) // Start invisible
        .text('Medicaid LTSS');

    // Animate title to fade in with slight delay after gradient
    title.transition()
        .duration(1000)     // 1 second fade
        .delay(300)         // Wait 300ms before starting
        .style('opacity', 1);

    // === SUBTITLE ===
    // "A Visual Story" - supporting text
    const subtitle = svg.append('text')
        .attr('class', 'chart-subtitle')
        .attr('x', 400)      // Center horizontally
        .attr('y', 320)      // Position below title
        .style('font-size', '20px')
        .style('opacity', 0) // Start invisible
        .text('A Visual Story');

    // Animate subtitle to fade in after title
    subtitle.transition()
        .duration(1000)
        .delay(600)         // Longer delay creates sequential effect
        .style('opacity', 1);

    // === DECORATIVE DOTS ===
    // Four corner dots that animate in sequence for visual interest
    const dots = [
        { x: 200, y: 200, delay: 800 },  // Top-left
        { x: 600, y: 200, delay: 1000 }, // Top-right
        { x: 200, y: 400, delay: 1200 }, // Bottom-left
        { x: 600, y: 400, delay: 1400 }  // Bottom-right
    ];

    // Create each dot with a scale-up animation
    dots.forEach(dot => {
        svg.append('circle')
            .attr('cx', dot.x)
            .attr('cy', dot.y)
            .attr('r', 0)    // Start at zero radius (invisible)
            .attr('fill', 'rgba(255, 255, 255, 0.6)')
            .transition()
            .duration(800)
            .delay(dot.delay) // Each dot appears after the previous one
            .attr('r', 8)     // Grow to radius of 8px
            .style('opacity', 0.8);
    });
}
