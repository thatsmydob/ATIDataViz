// ============================================
// Stadium Metaphor Scene
// Purpose: Convey scale of 5.6M LTSS users through ~70 stadium icons
// ============================================

/* global d3 */

import {
    GRID_COLS,
    GRID_ROWS,
    TOTAL,
    COLORS,
    DUR,
    EASE,
    COPY,
    COUNTER_TARGET,
    NFL_COUNT,
    EXTRA_COUNT
} from './stadium_config.js';

const easeLookup = {
    [EASE.in]: d3[EASE.in] || d3.easeLinear,
    [EASE.out]: d3[EASE.out] || d3.easeLinear,
    [EASE.inOut]: d3[EASE.inOut] || d3.easeLinear
};

const toFill = (value, alpha) => {
    const c = d3.color(value);
    if (c) {
        c.opacity = alpha;
        return c.formatRgb();
    }
    return value;
};

function drawSceneStadium(svg, data) {
    const totalSlots = data?.totalSlots ?? TOTAL;
    const firstWave = data?.firstWave ?? NFL_COUNT;
    const secondWave = data?.secondWave ?? EXTRA_COUNT;
    const holdSlots = data?.holdSlots ?? Math.max(0, totalSlots - (firstWave + secondWave));

    const colors = {
        background: data?.colors?.background ?? COLORS.bg,
        active: data?.colors?.active ?? COLORS.gold,
        inactive: data?.colors?.inactive ?? COLORS.outline,
        placeholder: data?.colors?.placeholder ?? COLORS.outline,
        text: data?.colors?.text ?? COLORS.text
    };

    const textSequence = [
        data?.text?.[0] ?? COPY.lead1,
        data?.text?.[1] ?? COPY.lead2,
        data?.text?.[2] ?? COPY.lead3,
        data?.text?.[3] ?? COPY.final
    ];

    const timing = {
        initialDelay: data?.timing?.initialDelay ?? DUR.pause,
        firstWaveDelay: data?.timing?.firstWaveDelay ?? DUR.stagger,
        secondWaveDelay: data?.timing?.secondWaveDelay ?? DUR.stagger,
        holdDelay: data?.timing?.holdDelay ?? DUR.pause,
        glowDuration: data?.timing?.glowDuration ?? DUR.ripple,
        counterDuration: data?.timing?.counterDuration ?? DUR.fade * 4
    };

    const config = {
        totalUsers: data?.totalUsers ?? COUNTER_TARGET,
        totalSlots,
        firstWave,
        secondWave,
        holdSlots,
        colors,
        text: textSequence,
        timing
    };

    const activeLimit = Math.max(0, Math.min(config.totalSlots - config.holdSlots, config.firstWave + config.secondWave));
    const firstWaveCount = Math.min(config.firstWave, activeLimit);
    const secondWaveCount = Math.max(0, activeLimit - firstWaveCount);
    const holdCount = Math.max(0, Math.min(config.holdSlots, config.totalSlots - activeLimit));
    const holdStartIndex = config.totalSlots - holdCount;

    const activeFillColor = toFill(config.colors.active, 0.25);
    const placeholderFillColor = toFill(config.colors.placeholder, 0.15);

    svg
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 800 600')
        .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.append('rect')
        .attr('class', 'stadium-background')
        .attr('width', 800)
        .attr('height', 600)
        .attr('fill', config.colors.background);

    const gridGroup = svg.append('g').attr('transform', 'translate(0, 20)');

    const cols = GRID_COLS;
    const rows = Math.max(GRID_ROWS, Math.ceil(config.totalSlots / GRID_COLS));
    const padding = { top: 60, right: 90, bottom: 160, left: 90 };
    const gridWidth = 800 - padding.left - padding.right;
    const gridHeight = 600 - padding.top - padding.bottom;
    const cellWidth = gridWidth / cols;
    const cellHeight = gridHeight / rows;

    const baseIcon = {
        width: 100,
        height: 70,
        path: 'M10,50 Q40,20 70,50 L70,60 Q40,80 10,60 Z M20,50 Q40,35 60,50 L60,54 Q40,65 20,54 Z'
    };

    const iconScale = Math.min(cellWidth / baseIcon.width, cellHeight / baseIcon.height) * 0.9;
    const iconYOffset = baseIcon.height * iconScale * 0.5;
    const iconXOffset = baseIcon.width * iconScale * 0.5;

    const slots = d3.range(config.totalSlots).map((index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        return {
            index,
            x: padding.left + cellWidth * (col + 0.5),
            y: padding.top + cellHeight * (row + 0.5)
        };
    });

    const iconGroups = gridGroup.selectAll('.stadium-slot')
        .data(slots)
        .enter()
        .append('g')
        .attr('class', 'stadium-slot')
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    iconGroups.append('title')
        .text('Stadium representing ~80,000 people who rely on LTSS');

    const icons = iconGroups.append('path')
        .attr('class', 'stadium-icon')
        .attr('d', baseIcon.path)
        .attr('transform', `translate(${-iconXOffset}, ${-iconYOffset}) scale(${iconScale})`)
        .style('stroke', config.colors.inactive)
        .style('fill', 'none')
        .style('opacity', 0);

    icons
        .transition()
        .delay((d) => config.timing.initialDelay + d.index * DUR.stagger)
        .duration(DUR.fade)
        .ease(easeLookup[EASE.out])
        .style('opacity', (d) => (d.index >= holdStartIndex ? 0.6 : 0.85))
        .style('stroke', (d) => (d.index >= holdStartIndex ? config.colors.placeholder : config.colors.inactive));

    const firstWaveSelection = icons.filter((d) => d.index < firstWaveCount);
    const secondWaveSelection = icons.filter((d) => d.index >= firstWaveCount && d.index < firstWaveCount + secondWaveCount);
    const holdSelection = icons.filter((d) => d.index >= holdStartIndex);

    firstWaveSelection
        .transition()
        .delay((d, i) => config.timing.initialDelay + i * config.timing.firstWaveDelay)
        .duration(config.timing.glowDuration)
        .ease(easeLookup[EASE.inOut])
        .style('stroke', config.colors.active)
        .style('fill', activeFillColor)
        .style('opacity', 1);

    const secondWaveStart = config.timing.initialDelay + firstWaveCount * config.timing.firstWaveDelay;

    secondWaveSelection
        .transition()
        .delay((d, i) => secondWaveStart + i * config.timing.secondWaveDelay)
        .duration(config.timing.glowDuration)
        .ease(easeLookup[EASE.inOut])
        .style('stroke', config.colors.active)
        .style('fill', activeFillColor)
        .style('opacity', 1);

    const secondWaveEnd = secondWaveStart + secondWaveCount * config.timing.secondWaveDelay + config.timing.glowDuration;

    holdSelection
        .transition()
        .delay(secondWaveEnd + config.timing.holdDelay)
        .duration(config.timing.glowDuration)
        .ease(easeLookup[EASE.in])
        .style('stroke', config.colors.placeholder)
        .style('fill', placeholderFillColor)
        .style('opacity', 0.6);

    const overlayGroup = svg.append('g')
        .attr('transform', 'translate(400, 440)');

    config.text.slice(0, 3).forEach((line, i) => {
        overlayGroup.append('text')
            .attr('class', 'stadium-subcaption')
            .attr('y', i * 28)
            .attr('fill', colors.text)
            .style('opacity', 0)
            .text(line)
            .transition()
            .delay(1000 + i * DUR.stagger * 6)
            .duration(DUR.fade)
            .ease(easeLookup[EASE.out])
            .style('opacity', 1);
    });

    const counterText = overlayGroup.append('text')
        .attr('class', 'stadium-counter')
        .attr('y', 120)
        .attr('fill', colors.active)
        .text('0')
        .style('opacity', 0);

    const finalText = overlayGroup.append('text')
        .attr('class', 'stadium-caption')
        .attr('y', 170)
        .attr('fill', colors.text)
        .style('opacity', 0)
        .text(config.text[3]);

    counterText
        .transition()
        .delay(1800)
        .duration(DUR.fade)
        .ease(easeLookup[EASE.out])
        .style('opacity', 1)
        .on('end', () => {
            if (window.ltssApp?.animateCounter) {
                window.ltssApp.animateCounter(counterText.node(), 0, config.totalUsers, config.timing.counterDuration);
            } else {
                counterText.text(config.totalUsers.toLocaleString());
            }

            finalText
                .transition()
                .duration(DUR.fade)
                .ease(easeLookup[EASE.inOut])
                .style('opacity', 1);
        });
}

function renderSceneStadium() {
    const chart = d3.select('#chart');
    chart.selectAll('*').remove();

    const data = window.ltssApp?.ltssData?.scene1;
    const svg = chart.append('svg');

    drawSceneStadium(svg, data);

    chart.append('div')
        .attr('class', 'scene-caption')
        .text('Each golden stadium  80,000 lives.');
}

window.drawSceneStadium = drawSceneStadium;
window.renderSceneStadium = renderSceneStadium;

if (window.ltssApp) {
    window.ltssApp.renderSceneStadium = renderSceneStadium;
    window.ltssApp.drawSceneStadium = drawSceneStadium;
}

export { drawSceneStadium, renderSceneStadium };
