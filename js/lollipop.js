// --------------------------------------
//  Canvas
// --------------------------------------

const svg_lollipop = d3
  .select("#chart_lollipop")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart_lollipop = svg_lollipop
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------

const data_lollipop = d3
  .csv("./data/data_all.csv", (d) => {
    return {
      Gini: +d.gdiincj992,
      Country: d.country,
      Region: d.region,
      Region2: d.region2,
      Year: parseDate(d.year),
    };
  })
  .then((data_lollipop) => {
    let data = data_lollipop.filter((d) => d.Country == "DE");

    // --------------------------------------
    //  Scales
    // --------------------------------------

    let x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Year))
      .range([0, innerwidth]);

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Gini)])
      .range([innerheight, 0]);

    let r1 = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d) => d.Gini)])
      .range([0, 6]);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart_lollipop
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues([
            parseDate(1980),
            parseDate(1985),
            parseDate(1990),
            parseDate(1995),
            parseDate(2000),
            parseDate(2005),
            parseDate(2010),
            parseDate(2015),
            parseDate(2020),
          ])
          .tickSize(0)
          .tickFormat(formatDate)
          .tickPadding(10)
      );

    // --------------------------------------
    //  data drawing
    // --------------------------------------

    innerChart_lollipop
      .selectAll(".line")
      .data(data)
      .join("line")
      .attr("class", "line_lollipop")
      .attr("x1", (d) => x(d.Year))
      .attr("x2", (d) => x(d.Year))
      .attr("y1", innerheight)
      .attr("y2", innerheight)
      .attr("stroke", "#06D6A0")
      .attr("stroke-width", 1)
      .attr("opacity", 1)
      .transition()
      .delay((d) => 500 + x(d.Year) * 3.6)
      .duration(1000)
      .attr("y2", (d) => y(d.Gini) + r1(d.Gini));

    innerChart_lollipop
      .selectAll(".cost_circle")
      .data(data)
      .join("circle")
      .attr("class", "cost_circle")
      .attr("cx", (d) => x(d.Year))
      .attr("cy", (d) => y(d.Gini))
      .attr("r", 0)
      .attr("fill", "#06D6A0")
      .attr("fill-opacity", 1)
      .attr("stroke", "#06D6A0")
      .attr("stroke-width", 1)
      .transition()
      .delay((d) => 500 + x(d.Year) * 5)
      .duration(1000)
      .attr("r", (d) => r1(d.Gini));
  });
