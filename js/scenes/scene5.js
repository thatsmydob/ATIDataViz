// ============================================
// Scene 5: Home-Based Care Is Accelerating
// Purpose: Show trend of HCBS growth over time (2010-2021)
// Key Insight: HCBS increased from 58% to 86%
// Visualization: Line chart with area fill showing diverging trends
// ============================================

function drawScene5() {
    const chart = d3.select('#chart');
    chart.selectAll('*').remove();

    // Load trend data showing HCBS vs Institutional percentages over time
    const data = window.ltssApp?.ltssData?.scene5?.trendData || [
        { year: 2010, hcbs: 58, institutional: 42 },
        { year: 2012, hcbs: 62, institutional: 38 },
        { year: 2014, hcbs: 66, institutional: 34 },
        { year: 2016, hcbs: 70, institutional: 30 },
        { year: 2018, hcbs: 75, institutional: 25 },
        { year: 2020, hcbs: 80, institutional: 20 },
        { year: 2021, hcbs: 86, institutional: 14 }
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
        .attr('y', 60)
        .attr('class', 'chart-title')
        .attr('text-anchor', 'middle')
        .style('font-size', '28px')
        .style('opacity', 0)
        .text('The Shift to Home-Based Care')
        .transition()
        .duration(800)
        .style('opacity', 1);

    // Subtitle
    svg.append('text')
        .attr('x', 400)
        .attr('y', 95)
        .attr('class', 'chart-subtitle')
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('opacity', 0)
        .text('Percentage of LTSS Users by Care Setting (2010-2021)')
        .transition()
        .duration(800)
        .delay(300)
        .style('opacity', 1);

    // === CHART SETUP ===
    // Define margins and calculate inner dimensions
    const margin = { top: 120, right: 80, bottom: 80, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // === D3 SCALES ===
    // X scale maps years to horizontal pixel positions
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))    // [2010, 2021]
        .range([0, width]);                      // Map to chart width

    // Y scale maps percentages to vertical pixel positions
    const yScale = d3.scaleLinear()
        .domain([0, 100])                        // 0% to 100%
        .range([height, 0]);                     // Inverted (SVG coordinates)

    // === AXES ===
    // Create axis generators
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('d'))              // Format as integers (no decimals)
        .ticks(6);

    const yAxis = d3.axisLeft(yScale)
        .tickFormat(d => d + '%');               // Add % symbol

    // Draw X axis at bottom
    const xAxisGroup = chartGroup.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${height})`)
        .style('opacity', 0)
        .call(xAxis);

    xAxisGroup.transition()
        .duration(800)
        .delay(800)
        .style('opacity', 1);

    // Draw Y axis on left
    const yAxisGroup = chartGroup.append('g')
        .attr('class', 'axis')
        .style('opacity', 0)
        .call(yAxis);

    yAxisGroup.transition()
        .duration(800)
        .delay(800)
        .style('opacity', 1);

    // === LINE GENERATORS ===
    // Create D3 line generators for smooth curves
    const hcbsLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.hcbs))
        .curve(d3.curveMonotoneX);               // Smooth interpolation

    const institutionalLine = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.institutional))
        .curve(d3.curveMonotoneX);

    // === AREA GENERATORS ===
    // Create area fills below the lines
    const hcbsArea = d3.area()
        .x(d => xScale(d.year))
        .y0(height)                              // Bottom baseline
        .y1(d => yScale(d.hcbs))                 // Top edge follows line
        .curve(d3.curveMonotoneX);

    const institutionalArea = d3.area()
        .x(d => xScale(d.year))
        .y0(height)
        .y1(d => yScale(d.institutional))
        .curve(d3.curveMonotoneX);

    // === DRAW HCBS TREND ===
    // Area fill (light green background)
    const hcbsAreaPath = chartGroup.append('path')
        .datum(data)
        .attr('class', 'area area-hcbs')
        .attr('d', hcbsArea)
        .style('opacity', 0);

    hcbsAreaPath.transition()
        .duration(1500)
        .delay(1000)
        .style('opacity', 0.3);

    // Line (green stroke)
    const hcbsPath = chartGroup.append('path')
        .datum(data)
        .attr('class', 'line line-hcbs')
        .attr('d', hcbsLine)
        .attr('stroke', '#10b981')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    // Animate line drawing from left to right using dash offset technique
    const hcbsLength = hcbsPath.node().getTotalLength();
    hcbsPath
        .attr('stroke-dasharray', hcbsLength)
        .attr('stroke-dashoffset', hcbsLength)   // Start hidden
        .transition()
        .duration(2000)
        .delay(1200)
        .attr('stroke-dashoffset', 0);           // Draw to visible

    // === DRAW INSTITUTIONAL TREND ===
    // Area fill (light red background)
    const instAreaPath = chartGroup.append('path')
        .datum(data)
        .attr('class', 'area area-institutional')
        .attr('d', institutionalArea)
        .style('opacity', 0);

    instAreaPath.transition()
        .duration(1500)
        .delay(1000)
        .style('opacity', 0.3);

    // Line (red stroke)
    const instPath = chartGroup.append('path')
        .datum(data)
        .attr('class', 'line line-institutional')
        .attr('d', institutionalLine)
        .attr('stroke', '#ef4444')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    // Animate line drawing
    const instLength = instPath.node().getTotalLength();
    instPath
        .attr('stroke-dasharray', instLength)
        .attr('stroke-dashoffset', instLength)
        .transition()
        .duration(2000)
        .delay(1200)
        .attr('stroke-dashoffset', 0);

    // === LEGEND ===
    // Show which line is which
    const legend = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top - 60})`);

    // HCBS legend (green line + text)
    legend.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 40)
        .attr('y2', 0)
        .attr('stroke', '#10b981')
        .attr('stroke-width', 3)
        .style('opacity', 0)
        .transition()
        .duration(600)
        .delay(2800)
        .style('opacity', 1);

    legend.append('text')
        .attr('x', 50)
        .attr('y', 5)
        .style('font-size', '14px')
        .style('fill', '#10b981')
        .style('opacity', 0)
        .text('Home & Community-Based')
        .transition()
        .duration(600)
        .delay(2800)
        .style('opacity', 1);

    // Institutional legend (red line + text)
    legend.append('line')
        .attr('x1', 280)
        .attr('y1', 0)
        .attr('x2', 320)
        .attr('y2', 0)
        .attr('stroke', '#ef4444')
        .attr('stroke-width', 3)
        .style('opacity', 0)
        .transition()
        .duration(600)
        .delay(3000)
        .style('opacity', 1);

    legend.append('text')
        .attr('x', 330)
        .attr('y', 5)
        .style('font-size', '14px')
        .style('fill', '#ef4444')
        .style('opacity', 0)
        .text('Institutional')
        .transition()
        .duration(600)
        .delay(3000)
        .style('opacity', 1);

    // === HIGHLIGHT 2021 VALUES ===
    // Add dots and labels for the final year
    const lastData = data[data.length - 1];

    // HCBS endpoint dot
    chartGroup.append('circle')
        .attr('cx', xScale(lastData.year))
        .attr('cy', yScale(lastData.hcbs))
        .attr('r', 0)
        .attr('fill', '#10b981')
        .transition()
        .duration(600)
        .delay(3200)
        .attr('r', 6);

    // HCBS percentage label
    chartGroup.append('text')
        .attr('x', xScale(lastData.year) + 15)
        .attr('y', yScale(lastData.hcbs) + 5)
        .style('font-size', '18px')
        .style('font-weight', '700')
        .style('fill', '#10b981')
        .style('opacity', 0)
        .text(`${lastData.hcbs}%`)
        .transition()
        .duration(600)
        .delay(3400)
        .style('opacity', 1);

    // Institutional endpoint dot
    chartGroup.append('circle')
        .attr('cx', xScale(lastData.year))
        .attr('cy', yScale(lastData.institutional))
        .attr('r', 0)
        .attr('fill', '#ef4444')
        .transition()
        .duration(600)
        .delay(3200)
        .attr('r', 6);

    // Institutional percentage label
    chartGroup.append('text')
        .attr('x', xScale(lastData.year) + 15)
        .attr('y', yScale(lastData.institutional) + 5)
        .style('font-size', '18px')
        .style('font-weight', '700')
        .style('fill', '#ef4444')
        .style('opacity', 0)
        .text(`${lastData.institutional}%`)
        .transition()
        .duration(600)
        .delay(3400)
        .style('opacity', 1);
}
