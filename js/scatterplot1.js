// --------------------------------------
//  Canvas
// --------------------------------------

const svg8 = d3
  .select("#chart4")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart8 = svg8
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Data loading
// --------------------------------------

const data4 = d3
  .csv("../data/data_all.csv", d3.autoType)
  .then(function (data4) {
    // console.log(data4);

    let data = data4.filter(
      (d) => d.year === 2022 && d.gptincj992 > 0 && d.gdiincj992 > 0
    );
    // console.log(data);

    // --------------------------------------
    // Scales
    // --------------------------------------

    let x = d3.scaleLinear().domain([0.2, 0.8]).range([0, innerwidth]);
    let y = d3.scaleLinear().domain([0.2, 0.8]).range([innerheight, 0]);
    let r = d3
      .scaleSqrt()
      .domain(d3.extent(data, (d) => d.gptincj992))
      .range([1, 8]);
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
        d3
          .axisBottom(x)
          .tickValues([0.2, 0.4, 0.6, 0.8])
          .tickSize(0)
          .tickPadding(10)
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
    // Line and area drawing
    // --------------------------------------

    innerChart8
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.gptincj992))
      .attr("cy", (d) => y(d.gdiincj992))
      .attr("r", (d) => r(d.gptincj992))
      .attr("fill", (d) => c(d.region));

    // innerChart8
    //   .selectAll("text")
    //   .data(data)
    //   .join("text")
    //   .filter((d) => d.gptincj992 > 0.7)
    //   .text((d) => d.country)
    //   .attr("fill", "white")
    //   .attr("class", "label")
    //   .attr("x", (d) => x(d.gptincj992))
    //   .attr("y", (d) => y(d.gdiincj992));
  });
