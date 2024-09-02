// --------------------------------------
//  Canvas
// --------------------------------------

const svg20 = d3
  .select("#chart7")
  .append("svg")
  .attr("viewBox", [0, 0, width2, height2]);

const innerChart20 = svg20
  .append("g")
  .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------

const data20 = d3
  .csv("../data/heatmap.csv", (d) => {
    return {
      group: d.group,
      variable: d.variable,
      value: +d.value,
    };
  })
  .then((data20) => {
    let data = data20.filter((d) => d.value > 0);
    console.log(data);

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

    innerChart20.call(tooltip);

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
      .range([0, innerwidth2])
      .padding(0.05);

    let y = d3
      .scaleBand()
      .domain(myVars)
      .range([innerheight2, 0])
      .padding(0.05);

    let c = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.value))
      .range(["#06D6A0", "#F20666"]);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart20
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight2})`)
      .call(d3.axisBottom(x).ticks(0).tickSize(0).tickPadding(10));

    innerChart20
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(0, 5)`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(10).ticks(0));

    // --------------------------------------
    // Rect drawing
    // --------------------------------------

    innerChart20
      .selectAll(".heatmap")
      .data(data)
      .join("rect")
      .attr("class", "heatmap")
      .attr("x", (d) => x(d.group))
      .attr("y", (d) => y(d.variable))
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => c(d.value))
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);
  });
