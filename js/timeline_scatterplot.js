// --------------------------------------
//  Canvas
// --------------------------------------

const svg_scatterplot_time = d3
  .select("#chart_scatterplot_time")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart_scatterplot_time = svg_scatterplot_time
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------

const data_scatterplot_time = d3
  .csv("../data/data_all.csv", (d) => {
    return {
      Gini: +d.gdiincj992,
      Country: d.country,
      Region: d.region,
      Year: parseDate(d.year),
    };
  })
  .then((data_scatterplot_time) => {
    let data = data_scatterplot_time.filter((d) => d.Gini > 0);

    // --------------------------------------
    //  Scales
    // --------------------------------------

    let y = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Year))
      .range([0, innerheight]);

    let x = d3.scaleLinear().domain([0.1, 0.7]).range([0, innerwidth]);

    let c = d3
      .scaleOrdinal()
      .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
      .range(["#06d6a0", "#f20666", "#662e9b", "#9EF211", "#1E96FC"]);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart_scatterplot_time
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight})`)
      .call(
        d3.axisBottom(x).tickValues([0.2, 0.6]).tickSize(0).tickPadding(10)
      );

    innerChart_scatterplot_time
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(0, 5)`)
      .call(
        d3
          .axisRight(y)
          .tickSize(0)
          .tickFormat(formatDate)
          .tickPadding(-15)
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
      );

    // --------------------------------------
    //  Data drawing
    // --------------------------------------

    innerChart_scatterplot_time
      .selectAll(".rect")
      .data(data)
      .join("rect")
      .attr("class", "rect")
      .attr("x", (d) => x(d.Gini))
      .attr("y", (d) => y(d.Year))
      .attr("width", 1.5)
      .attr("height", 1.5)
      .attr("fill", (d) => c(d.Region));

    // --------------------------------------
    //  Buttons
    // --------------------------------------

    const filters = [
      {
        id: "Asia",
        label: "Asia",
        isActive: false,
        backgroundcolor: "#06d6a0",
      },
      {
        id: "Europe",
        label: "Europe",
        isActive: false,
        backgroundcolor: "#f20666",
      },
      {
        id: "Africa",
        label: "Africa",
        isActive: false,
        backgroundcolor: "#662e9b",
      },
      {
        id: "Americas",
        label: "Americas",
        isActive: false,
        backgroundcolor: "#9EF211",
      },
      {
        id: "Oceania",
        label: "Oceania",
        isActive: false,
        backgroundcolor: "#1E96FC",
      },
    ];

    d3.select("#filters")
      .selectAll(".filter")
      .data(filters)
      .join("button")
      .attr("id", (d) => d.id)
      .text((d) => d.label)
      .style("color", (d) => d.backgroundcolor)
      .style("background-color", "#131B26");
  });
