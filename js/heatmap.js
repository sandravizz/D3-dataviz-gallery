// --------------------------------------
//  Canvas
// --------------------------------------

const svg_heat = d3
  .select("#chart_heatmap")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart_heat = svg_heat
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------

const data_heat = d3
  .csv("./data/heatmap.csv", (d) => {
    return {
      group: d.group,
      variable: d.variable,
      value: +d.value,
    };
  })
  .then((data_heat) => {
    let data = data_heat.filter((d) => d.value > 0);
    // console.log(data);

    // --------------------------------------
    // Tooltip
    // --------------------------------------

    const tooltip = d3
      .tip()
      .attr("class", "tooltip")
      .html(
        (event, d) =>
          `<div>Cat1 ${d.group}<br>Cat2 ${d.variable}</br>Value ${d.value}</div>`
      );

    innerChart_heat.call(tooltip);

    // --------------------------------------
    // Scales
    // --------------------------------------

    const myGroups = Array.from(new Set(data.map((d) => d.group)));
    const myVars = Array.from(new Set(data.map((d) => d.variable)));
    // console.log(myGroups);
    // console.log(myVars);

    let x = d3
      .scaleBand()
      .domain(myGroups)
      .range([0, innerwidth])
      .padding(0.05);

    let y = d3.scaleBand().domain(myVars).range([innerheight, 0]).padding(0.05);

    let c = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.value))
      .range(["#f20666", "#06d6a0"]);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart_heat
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight})`)
      .call(d3.axisBottom(x).ticks(0).tickSize(0).tickPadding(10));

    innerChart_heat
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(0, 5)`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(10).ticks(0));

    // --------------------------------------
    // Rect drawing
    // --------------------------------------

    innerChart_heat
      .selectAll(".heatmap")
      .data(data)
      .join("rect")
      .attr("class", "heatmap")
      .attr("x", (d) => x(d.group))
      .attr("y", (d) => y(d.variable))
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => c(d.value))
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);
  });
