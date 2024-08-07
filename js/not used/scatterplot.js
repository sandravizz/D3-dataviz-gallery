// --------------------------------------
//  Canvas
// --------------------------------------

const svg4 = d3
  .select("#chart4")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart4 = svg4
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Data loading
// --------------------------------------

const data4 = d3
  .csv("../data/scatter_2.csv", d3.autoType)
  .then(function (data4) {
    // --------------------------------------
    //  Scales
    // --------------------------------------

    var x = d3
      .scaleLinear()
      .domain([0, d3.max(data4, (d) => d.home_score)])
      .range([0, innerwidth]);

    var y = d3
      .scaleLinear()
      .domain([0, d3.max(data4, (d) => d.away_score)])
      .range([innerheight, 0]);

    // --------------------------------------
    //  Data drawing
    // --------------------------------------

    innerChart4
      .selectAll("circle")
      .data(data4)
      .join("circle")
      .attr("cx", (d) => x(d.home_score))
      .attr("cy", (d) => y(d.away_score))
      .attr("r", 6)
      .attr("fill", "#ccff99")
      .attr("opacity", 0.2);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart4
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight})`)
      .call(d3.axisBottom(x).ticks(10).tickPadding(15));

    innerChart4
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisLeft(y).ticks(10).tickPadding(15));

    // --------------------------------------
    //  Interactivity click
    // --------------------------------------

    d3.select("#start").on("click", function () {
      // --------------------------------------
      // Data loading
      // --------------------------------------

      const data5 = d3
        .csv("../data/scatter_1.csv", d3.autoType)
        .then(function (data5) {
          // --------------------------------------
          //  Scales
          // --------------------------------------

          x.domain([0, d3.max(data5, (d) => d.home_score)]);
          y.domain([0, d3.max(data5, (d) => d.away_score)]);

          // --------------------------------------
          //  Data drawing
          // --------------------------------------

          innerChart4
            .selectAll("circle")
            .data(data5)
            .transition()
            .duration(1000)
            .attr("cx", (d) => x(d.home_score))
            .attr("cy", (d) => y(d.away_score))
            .attr("r", 6)
            .attr("fill", "#0C82F5")
            .attr("opacity", 0.3);

          // --------------------------------------
          //  Axes
          // --------------------------------------

          innerChart4
            .select(".x-axis")
            .transition()
            .duration(2000)
            .call(d3.axisBottom(x).ticks(10).tickPadding(15));

          innerChart4
            .select(".y-axis")
            .transition()
            .duration(2000)
            .call(d3.axisLeft(y).ticks(10).tickPadding(15));
        });
    });
  });
