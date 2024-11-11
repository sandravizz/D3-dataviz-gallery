// --------------------------------------
//  Canvas
// --------------------------------------

const svg21 = d3
  .select("#chart8")
  .append("svg")
  .attr("viewBox", [0, 0, width2, height2]);

const innerChart21 = svg21
  .append("g")
  .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

// --------------------------------------
// Data loading
// --------------------------------------

const data21 = d3
  .csv("../data/multiline.csv", (d) => {
    return {
      year: +d.year,
      sex: d.sex,
      name: d.name,
      n: +d.n,
      prop: +d.prop,
    };
  })
  .then((data21) => {
    let data = data21.filter((d) => d.n > 0);
    // console.log(data);

    const sumstat = d3.group(data, (d) => d.name);
    // console.log(sumstat);

    // --------------------------------------
    // Scales
    // --------------------------------------

    let x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year))
      .range([0, innerwidth2]);

    // console.log(x(2000));

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.n)])
      .range([innerheight2, 0]);

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

    innerChart21
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight2})`)
      .call(d3.axisBottom(x).ticks(5).tickSize(0).tickPadding(0));

    innerChart21
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

    innerChart21
      .selectAll(".line")
      .data(sumstat)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", (d) => c(d[0]))
      .attr("d", (d) =>
        d3
          .line()
          .x((d) => x(d.year))
          .y((d) => y(d.n))(d[1])
      );
  });
