// ============================================
// Scene 1: 8 Washington D.C.s Worth of People
// Purpose: Use geographic metaphor to show scale of 5.6M LTSS users
// Key Insight: 5.6 million = 8 × Washington D.C.'s population
// Visualization: Animated map with D.C. flash cycle, zoom, and multiplication
// ============================================

function drawScene1() {
    const chart = d3.select('#chart');
    chart.selectAll('*').remove();

    // === LOAD DATA ===
    const data = window.ltssApp?.ltssData?.scene1 || {
        totalUsers: 5600000,
        dcPopulation: 700000,
        dcMultiplier: 8,
        dcCoordinates: { lat: 38.9072, lon: -77.0369 },
        dotScale: 1000,
        dotsPerFlash: 88,
        timing: {
            flashInterval: 500,
            flashCount: 8,
            zoomDuration: 800,
            counterDuration: 1500
        }
    };

    // === CREATE SVG CANVAS ===
    const svg = chart.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 800 600')
        .attr('preserveAspectRatio', 'xMidYMid meet');

    // Create main group for all content (enables zoom transforms)
    const mainGroup = svg.append('g').attr('class', 'main-group');

    // === SIMPLIFIED U.S. MAP OUTLINE ===
    // Fallback simplified U.S. outline (lower 48 states boundary)
    // This is a very simplified path for performance - represents continental US
    const usMapPath = 'M 50,200 L 150,150 L 250,160 L 350,140 L 450,150 L 550,145 L 650,160 L 700,200 L 720,280 L 700,350 L 650,400 L 600,420 L 500,430 L 400,425 L 300,420 L 200,410 L 150,380 L 100,350 L 70,300 L 50,200 Z';

    // D.C. SKYLINE SVG PATH DATA
    // Simplified D.C. skyline silhouette with iconic buildings
    const dcSkylineData = [
        { x: 0, width: 30, height: 60, label: 'Building' },      // Left building
        { x: 35, width: 25, height: 90, label: 'Monument' },     // Washington Monument (tall)
        { x: 65, width: 40, height: 70, label: 'Capitol' },      // Capitol building
        { x: 110, width: 20, height: 50, label: 'Building' },    // Right building 1
        { x: 135, width: 25, height: 55, label: 'Building' }     // Right building 2
    ];

    // === COORDINATE TRANSFORMATION ===
    // Map D.C. coordinates to SVG space
    // D.C. is roughly in the middle-right of eastern US
    const dcSvgX = 550;  // X position on our simplified map
    const dcSvgY = 240;  // Y position on our simplified map

    // === PHASE 1: MAP INTRODUCTION ===
    function drawPhase1_MapIntro() {
        // Draw U.S. map outline
        const mapOutline = mainGroup.append('path')
            .attr('d', usMapPath)
            .attr('fill', 'none')
            .attr('stroke', 'rgba(255, 255, 255, 0.4)')
            .attr('stroke-width', 2)
            .style('opacity', 0);

        // Animate map drawing
        const pathLength = mapOutline.node().getTotalLength();
        mapOutline
            .attr('stroke-dasharray', pathLength)
            .attr('stroke-dashoffset', pathLength)
            .style('opacity', 1)
            .transition()
            .duration(800)
            .attr('stroke-dashoffset', 0);

        // Add D.C. marker
        const dcMarker = mainGroup.append('circle')
            .attr('cx', dcSvgX)
            .attr('cy', dcSvgY)
            .attr('r', 0)
            .attr('fill', '#fbbf24')
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

        dcMarker.transition()
            .duration(600)
            .delay(800)
            .attr('r', 8)
            .style('opacity', 1);

        // Pulse animation for D.C. marker
        function pulseDCMarker() {
            dcMarker.transition()
                .duration(1000)
                .attr('r', 12)
                .style('opacity', 0.6)
                .transition()
                .duration(1000)
                .attr('r', 8)
                .style('opacity', 1)
                .on('end', pulseDCMarker);
        }
        setTimeout(pulseDCMarker, 1400);

        // Title text
        mainGroup.append('text')
            .attr('x', 400)
            .attr('y', 60)
            .attr('text-anchor', 'middle')
            .style('font-size', '32px')
            .style('font-weight', '700')
            .style('fill', 'white')
            .style('opacity', 0)
            .text('5.6 Million Americans')
            .transition()
            .duration(800)
            .delay(200)
            .style('opacity', 1);

        // Trigger Phase 2 after Phase 1 completes
        setTimeout(() => drawPhase2_FlashCycle(), 1000);
    }

    // === PHASE 2: D.C. FLASH CYCLE ===
    function drawPhase2_FlashCycle() {
        // Create group for dots
        const dotsGroup = mainGroup.append('g')
            .attr('class', 'dc-dots')
            .attr('transform', `translate(${dcSvgX}, ${dcSvgY})`);

        // Create counter display
        const counter = mainGroup.append('text')
            .attr('x', 400)
            .attr('y', 120)
            .attr('text-anchor', 'middle')
            .style('font-size', '48px')
            .style('font-weight', '700')
            .style('fill', '#fbbf24')
            .style('opacity', 0)
            .text('0');

        counter.transition()
            .duration(400)
            .delay(200)
            .style('opacity', 1);

        // Flash cycle: 8 iterations
        let currentCount = 0;
        let totalDots = 0;
        const flashCount = data.timing.flashCount;
        const flashInterval = data.timing.flashInterval;
        const dotsPerFlash = data.dotsPerFlash;

        function executeFlash(flashIndex) {
            if (flashIndex >= flashCount) {
                // All flashes complete, move to Phase 3
                setTimeout(() => drawPhase3_DCDetail(dotsGroup, counter), 500);
                return;
            }

            // Flash effect on D.C. marker
            mainGroup.select('circle')
                .transition()
                .duration(250)
                .attr('r', 15)
                .attr('fill', '#fef3c7')
                .transition()
                .duration(250)
                .attr('r', 8)
                .attr('fill', '#fbbf24');

            // Add dots for this flash
            const newDotCount = dotsPerFlash;
            for (let i = 0; i < newDotCount; i++) {
                // Arrange dots in a circle around D.C. point
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 15;  // Random radius within 15px
                const dotX = Math.cos(angle) * radius;
                const dotY = Math.sin(angle) * radius;

                dotsGroup.append('circle')
                    .attr('cx', dotX)
                    .attr('cy', dotY)
                    .attr('r', 0)
                    .attr('fill', 'rgba(255, 255, 255, 0.8)')
                    .transition()
                    .duration(300)
                    .delay(i * 3)
                    .attr('r', 1.5);

                totalDots++;
            }

            // Update counter
            currentCount += data.dcPopulation / flashCount;
            counter.transition()
                .duration(300)
                .tween('text', function() {
                    const i = d3.interpolateNumber(+this.textContent.replace(/,/g, ''), currentCount);
                    return function(t) {
                        this.textContent = Math.floor(i(t)).toLocaleString();
                    };
                });

            // Schedule next flash
            setTimeout(() => executeFlash(flashIndex + 1), flashInterval);
        }

        // Start flash cycle
        setTimeout(() => executeFlash(0), 400);
    }

    // === PHASE 3: D.C. DETAIL REVEAL ===
    function drawPhase3_DCDetail(dotsGroup, counter) {
        // Add label for D.C. population
        const dcLabel = mainGroup.append('text')
            .attr('x', 400)
            .attr('y', 180)
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('fill', 'rgba(255, 255, 255, 0.9)')
            .style('opacity', 0)
            .text('Population of Washington, D.C.');

        dcLabel.transition()
            .duration(600)
            .style('opacity', 1);

        // Draw skyline silhouette
        const skylineGroup = mainGroup.append('g')
            .attr('class', 'dc-skyline')
            .attr('transform', `translate(${dcSvgX - 80}, ${dcSvgY + 25})`)
            .style('opacity', 0);

        // Create skyline buildings
        dcSkylineData.forEach(building => {
            skylineGroup.append('rect')
                .attr('x', building.x)
                .attr('y', -building.height)
                .attr('width', building.width)
                .attr('height', building.height)
                .attr('fill', 'rgba(100, 100, 100, 0.3)')
                .attr('stroke', 'rgba(255, 255, 255, 0.2)')
                .attr('stroke-width', 1);
        });

        // Add dome to Capitol building (building index 2)
        skylineGroup.append('ellipse')
            .attr('cx', 85)
            .attr('cy', -70)
            .attr('rx', 15)
            .attr('ry', 10)
            .attr('fill', 'rgba(120, 120, 120, 0.4)')
            .attr('stroke', 'rgba(255, 255, 255, 0.2)')
            .attr('stroke-width', 1);

        skylineGroup.transition()
            .duration(800)
            .delay(400)
            .style('opacity', 1);

        // Trigger Phase 4 after detail reveal
        setTimeout(() => drawPhase4_Multiplication(counter), 1400);
    }

    // === PHASE 4: MULTIPLICATION ANIMATION ===
    function drawPhase4_Multiplication(counter) {
        // Add multiplication symbol
        const multiplySymbol = mainGroup.append('text')
            .attr('x', 250)
            .attr('y', 125)
            .attr('text-anchor', 'middle')
            .style('font-size', '72px')
            .style('font-weight', '700')
            .style('fill', '#fbbf24')
            .style('opacity', 0)
            .text('×8');

        multiplySymbol.transition()
            .duration(600)
            .style('opacity', 1)
            .attr('transform', 'scale(1)')
            .transition()
            .duration(300)
            .attr('transform', 'scale(1.2)')
            .transition()
            .duration(300)
            .attr('transform', 'scale(1)');

        // Animate counter from 700K to 5.6M
        setTimeout(() => {
            counter.transition()
                .duration(data.timing.counterDuration)
                .tween('text', function() {
                    const i = d3.interpolateNumber(data.dcPopulation, data.totalUsers);
                    return function(t) {
                        this.textContent = Math.floor(i(t)).toLocaleString();
                    };
                })
                .style('font-size', '56px')
                .on('end', () => {
                    // Add equals sign and final number
                    mainGroup.append('text')
                        .attr('x', 400)
                        .attr('y', 220)
                        .attr('text-anchor', 'middle')
                        .style('font-size', '20px')
                        .style('fill', 'rgba(255, 255, 255, 0.8)')
                        .style('opacity', 0)
                        .text('700,000 × 8 = 5,600,000')
                        .transition()
                        .duration(600)
                        .style('opacity', 1);
                });
        }, 800);

        // Trigger Phase 5 after multiplication
        setTimeout(() => drawPhase5_ZoomOut(), 3200);
    }

    // === PHASE 5: ZOOM OUT REVEAL ===
    function drawPhase5_ZoomOut() {
        // Fade out skyline and detail elements
        mainGroup.selectAll('.dc-skyline, text')
            .transition()
            .duration(600)
            .style('opacity', 0)
            .remove();

        // Keep only counter (reposition and update)
        const finalCounter = mainGroup.append('text')
            .attr('x', 400)
            .attr('y', 80)
            .attr('text-anchor', 'middle')
            .style('font-size', '42px')
            .style('font-weight', '700')
            .style('fill', '#fbbf24')
            .text('5,600,000 people')
            .style('opacity', 0);

        finalCounter.transition()
            .duration(800)
            .delay(600)
            .style('opacity', 1);

        // Create 8 D.C.-sized clusters across the map
        const clusterPositions = [
            { x: dcSvgX, y: dcSvgY },  // Original D.C. (already has dots)
            { x: 200, y: 200 },         // Northwest
            { x: 450, y: 180 },         // North central
            { x: 320, y: 280 },         // Central
            { x: 150, y: 350 },         // Southwest
            { x: 500, y: 330 },         // South central
            { x: 600, y: 260 },         // East
            { x: 380, y: 380 }          // South
        ];

        // Reveal clusters (skip first one - already exists)
        clusterPositions.forEach((pos, index) => {
            if (index === 0) return; // Skip D.C. (already drawn)

            const clusterGroup = mainGroup.append('g')
                .attr('transform', `translate(${pos.x}, ${pos.y})`)
                .style('opacity', 0);

            // Add ~88 dots per cluster
            for (let i = 0; i < 88; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 15;
                const dotX = Math.cos(angle) * radius;
                const dotY = Math.sin(angle) * radius;

                clusterGroup.append('circle')
                    .attr('cx', dotX)
                    .attr('cy', dotY)
                    .attr('r', 1.5)
                    .attr('fill', 'rgba(255, 255, 255, 0.7)');
            }

            // Fade in each cluster with stagger
            clusterGroup.transition()
                .duration(600)
                .delay(800 + index * 150)
                .style('opacity', 1);
        });

        // Final message
        const finalMessage = mainGroup.append('text')
            .attr('x', 400)
            .attr('y', 520)
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('font-weight', '600')
            .style('fill', 'white')
            .style('opacity', 0)
            .text('8 Washington D.C.s worth of people');

        finalMessage.transition()
            .duration(800)
            .delay(2200)
            .style('opacity', 1);

        // Subtitle
        const subtitle = mainGroup.append('text')
            .attr('x', 400)
            .attr('y', 555)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('fill', 'rgba(255, 255, 255, 0.8)')
            .style('opacity', 0)
            .text('rely on Medicaid LTSS for daily support');

        subtitle.transition()
            .duration(800)
            .delay(2600)
            .style('opacity', 1);
    }

    // === START ANIMATION SEQUENCE ===
    // Begin with Phase 1
    drawPhase1_MapIntro();
}
