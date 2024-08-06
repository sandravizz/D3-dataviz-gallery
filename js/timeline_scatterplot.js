// --------------------------------------
//  Canvas
// --------------------------------------

const svg9 = d3
  .select("#chart3")
  .append("svg")
  .attr("viewBox", [0, 0, width2, height2]);

const innerChart9 = svg9
  .append("g")
  .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------

const data9 = d3
  .csv("../data/data_all.csv", (d) => {
    return {
      Gini: +d.gdiincj992,
      Country: d.country,
      Region: d.region,
      Year: parseDate(d.year),
    };
  })
  .then((data9) => {
    let data = data9.filter((d) => d.Gini > 0);

    // --------------------------------------
    //  Scales
    // --------------------------------------

    let y = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Year))
      .range([0, innerheight2]);

    let x = d3.scaleLinear().domain([0, 1]).range([0, innerwidth2]);

    let c = d3
      .scaleOrdinal()
      .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
      .range(["#06d6a0", "#f20666", "#662e9b", "#9EF211", "#1155F2"]);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart9
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight2})`)
      .call(
        d3.axisBottom(x).tickValues([0.2, 0.8]).tickSize(0).tickPadding(10)
      );

    innerChart9
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(0, 5)`)
      .call(
        d3
          .axisRight(y)
          .tickSize(0)
          .tickFormat(formatDate)
          .tickPadding(0)
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

    innerChart9
      .selectAll(".rect")
      .data(data)
      .join("rect")
      .attr("class", "rect")
      .attr("x", (d) => x(d.Gini))
      .attr("y", (d) => y(d.Year))
      .attr("width", 2.5)
      .attr("height", 7.5)
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
        backgroundcolor: "#1155F2",
      },
    ];

    d3.select("#filters")
      .selectAll(".filter")
      .data(filters)
      .join("button")
      .attr("id", (d) => d.id)
      .text((d) => d.label)
      .style("color", "#00161f")
      .style("background-color", (d) => d.backgroundcolor);
  });
