// --------------------------------------
//  Canvas
// --------------------------------------

const svg_linechart_multi_annia = d3

  .select("#chart_linechart_annia")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart_linechart_multi_annia = svg_linechart_multi_annia 
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Data loading
// --------------------------------------

const data_linechart_multi_annia = d3
  .csv("./data/data_annia.csv", (d) => {
    return {
      year: parseDate(d.year),
      name: d.name,
      values: +d.values,
    };
  })
  .then((data_linechart_multi_annia) => {
    let data = data_linechart_multi_annia.filter((d) => d.values > 0);
    console.log("data", data);

    const sumstat = d3.group(data, (d) => d.name);
    console.log("sumstat", sumstat);

    // --------------------------------------
    // Scales
    // --------------------------------------

    let x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.year))
      .range([0, innerwidth]);
      console.log("x", x(2015));

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.values)])
      .range([innerheight, 0]);
      console.log("y", y(387701));

    let names = data.map(d => d.name);
    console.log("names", names);

    let uniqueNames = [...new Set(names)];
    console.log("uniqueNames", uniqueNames);

//     let c = d3
//       .scaleOrdinal()
//       .domain(["Ashley", "Patricia", "Jessica", "Deborah", "Linda"])
//       .range(["#06d6a0", "#f20666", "#662e9b", "#9EF211", "#1E96FC"]);

//     // --------------------------------------
//     //  Axes
//     // --------------------------------------

//     innerChart_linechart_multi
//       .append("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(0, ${innerheight})`)
//       .call(d3.axisBottom(x).ticks(5).tickSize(0).tickPadding(10));

//     innerChart_linechart_multi
//       .append("g")
//       .attr("class", "y-axis")
//       .attr("transform", `translate(0, 0)`)
//       .call(
//         d3
//           .axisLeft(y)
//           .tickValues([25000, 50000, 75000])
//           .tickSize(0)
//           .tickPadding(0)
//       );

//     // --------------------------------------
//     // Line drawing
//     // --------------------------------------

innerChart_linechart_multi_annia
      .selectAll(".line1")
      .data(sumstat)
      .join("path")
      .attr("class", "line1")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("d", (d) =>
        d3
          .line()
          .x((d) => x(d.year))
          .y((d) => y(d.values))(d[1])
      );
   
  });
