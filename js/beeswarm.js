// --------------------------------------
//  Canvas
// --------------------------------------

const svg_chart_beeswarm = d3
  .select("#chart5")
  .append("svg")
  .attr("viewBox", [0, 0, width2, height2]);

const innerChart_beeswarm = svg_chart_beeswarm
  .append("g")
  .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

// --------------------------------------
// Data
// --------------------------------------

const data_beeswarm = d3
  .csv("../data/data_all.csv", (d) => {
    return {
      Gini: +d.gdiincj992,
      Country: d.country,
      Region: d.region,
      Year: parseDate(d.year),
    };
  })
  .then((data_beeswarm) => {
    let data = data_beeswarm.filter((d) => d.Gini > 0 && d.region !== null);

    let region = d3.groups(data_beeswarm, (d) => d.Region).map((d) => d[0]);
    // console.log(region);

    // --------------------------------------
    //  Scales
    // --------------------------------------

    let c = d3
      .scaleOrdinal()
      .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
      .range(["#06d6a0", "#f20666", "#662e9b", "#9EF211", "#1E96FC"]);

    let r = d3
      .scaleSqrt()
      .domain(d3.extent(data, (d) => d.Gini))
      .range([0.01, 4]);

    let y = d3.scaleBand().domain(region).range([innerheight2, 0]);

    let x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Year))
      .range([0, innerwidth2]);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart_beeswarm
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight2})`)
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

    innerChart_beeswarm
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(-20, 0)`)
      .call(d3.axisLeft(y).ticks(5).tickPadding(10));

    // --------------------------------------
    //  Simulation
    // --------------------------------------

    const simulation = d3
      .forceSimulation(data)
      .force("x", d3.forceX((d) => x(d.Year)).strength(0.09))
      .force("y", d3.forceY((d) => y(d.Region)).strength(0.6))
      .force("collide", d3.forceCollide((d) => r(d.Gini) + 0.1).strength(6));

    for (let i = 0; i < 20; i++) {
      simulation.tick();
    }

    // --------------------------------------
    //  Drawing circles
    // --------------------------------------

    innerChart_beeswarm
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => r(d.Gini))
      .attr("fill", (d) => c(d.Region));
  });
