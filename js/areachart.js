// --------------------------------------
//  Canvas
// --------------------------------------

const svg0 = d3
  .select("#chart_area_gradient")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart0 = svg0
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Color gradient
// --------------------------------------

let areaGradient = innerChart0
  .append("defs")
  .append("linearGradient")
  .attr("id", "areaGradient")
  .attr("x1", "100%")
  .attr("y1", "10%")
  .attr("x2", "0%")
  .attr("y2", "100%");

areaGradient
  .append("stop")
  .attr("offset", 0.2)
  .attr("stop-color", "#F20666")
  .attr("stop-opacity", 1);

areaGradient
  .append("stop")
  .attr("offset", 1)
  .attr("stop-color", "#06D6A0")
  .attr("stop-opacity", 1);

// --------------------------------------
// Data loading
// --------------------------------------

const data0 = d3
  .csv("../data/data_all.csv", (d) => {
    return {
      Gini: +d.gdiincj992,
      Country: d.country,
      Region: d.region,
      Region2: d.region2,
      Year: parseDate(d.year),
    };
  })
  .then((data0) => {
    let data = data0.filter((d) => d.Country == "DE");

    // --------------------------------------
    // Scales
    // --------------------------------------

    let x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Year))
      .range([0, innerwidth]);

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Gini)])
      .range([innerheight, 0]);

    // --------------------------------------
    // Generators
    // --------------------------------------

    let line = d3
      .line()
      .defined((d) => d.Gini > 0)
      .curve(d3.curveNatural)
      .x((d) => x(d.Year))
      .y((d) => y(d.Gini));

    // console.log(line(data));

    let area = d3
      .area()
      .defined((d) => d.Gini > 0)
      .curve(d3.curveNatural)
      .x((d) => x(d.Year))
      .y0(y(0))
      .y1((d) => y(d.Gini));

    // console.log(area(data));

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart0
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
          .tickSize(5)
          .tickFormat(formatDate)
          .tickPadding(0)
      );

    // --------------------------------------
    // Line and area drawing
    // --------------------------------------

    innerChart0
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

    innerChart0
      .append("path")
      .datum(data)
      .attr("class", "area")
      .style("fill", "url(#areaGradient)")
      .attr("d", area);
  });
