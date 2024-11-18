// --------------------------------------
// Data loading
// --------------------------------------

const data22 = d3
  .csv("../data/multiline.csv", (d) => {
    return {
      year: +d.year,
      sex: d.sex,
      name: d.name,
      n: +d.n,
      prop: +d.prop,
    };
  })
  .then((data22) => {
    let data = data22.filter((d) => d.n > 0);

    const sumstat = d3.group(data, (d) => d.name);
    // console.log(sumstat);

    const svg_linechart_smallmulti = d3
      .select("#chart_linechart_smallmulti")
      .selectAll("uniqueChart")
      .data(sumstat)
      .join("svg")
      .attr("width", width3 + margin3.left + margin3.right)
      .attr("height", height3 + margin3.top + margin3.bottom)
      .append("g")
      .attr("transform", `translate(${margin3.left},${margin3.top})`);

    // --------------------------------------
    // Scales
    // --------------------------------------

    let x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year))
      .range([0, width3]);

    // console.log(x(2000));

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.n)])
      .range([height3, 0]);

    // console.log(y(50));

    let c = d3
      .scaleOrdinal()
      .range([
        "#e41a1c",
        "#377eb8",
        "#4daf4a",
        "#984ea3",
        "#ff7f00",
        "#ffff33",
        "#a65628",
        "#f781bf",
        "#999999",
      ]);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    svg_linechart_smallmulti
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, 200)`)
      .call(d3.axisBottom(x).ticks(2).tickSize(0).tickPadding(0));

    svg_linechart_smallmulti
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(0, 0)`)
      .call(
        d3
          .axisLeft(y)
          .tickValues([25000, 50000, 75000])
          .tickSize(0)
          .tickPadding(0)
      );

    // --------------------------------------
    // Line and area drawing
    // --------------------------------------

    svg_linechart_smallmulti
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => c(d[0]))
      .attr("d", (d) =>
        d3
          .line()
          .x((d) => x(d.year))
          .y((d) => y(d.n))(d[1])
      );

    svg_linechart_smallmulti
      .append("text")
      .attr("text-anchor", "start")
      .attr("y", -5)
      .attr("x", 0)
      .text((d) => d[0])
      .style("fill", (d) => c(d[0]));
  });
