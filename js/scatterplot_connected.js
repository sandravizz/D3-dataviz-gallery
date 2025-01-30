// --------------------------------------
//  Canvas
// --------------------------------------

const svg_scatterplot_connected = d3
  .select("#chart_scatterplot_connected")
  .append("svg")
  .attr("viewBox", [0, 0, width2, height2]);

const innerChart_scatterplot_connected = svg_scatterplot_connected
  .append("g")
  .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

// --------------------------------------
// Preparation
// --------------------------------------

var count = 0;

function uid(name) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}

function Id(id) {
  this.id = id;
  this.href = new URL(`#${id}`, location) + "";
}

Id.prototype.toString = function () {
  return "url(" + this.href + ")";
};

// --------------------------------------
// Data loading
// --------------------------------------

const data_scatterplot_connected = d3
  .csv("../data/metros.csv", (d) => {
    return {
      POP_1980: +d.POP_1980,
      POP_2015: +d.POP_2015,
      R90_10_1980: +d.R90_10_1980,
      R90_10_2015: +d.R90_10_2015,
      highlight: +d.highlight,
      nyt_display: d.nyt_display,
    };
  })
  .then((data) => {
    // console.log(data);

    const startColor = d3.schemeCategory10[2];
    // console.log(startColor);
    const endColor = d3.schemeCategory10[4];
    // console.log(endColor);
    const gradientIds = data.map(() => uid("gradient"));
    // console.log(gradientIds);
    // const arrowId = DOM.uid("arrow");
    // console.log(arrowId);

    // --------------------------------------
    //  Scales
    // --------------------------------------

    const x = d3
      .scaleLog()
      .domain(d3.extent(data.flatMap((d) => [d.POP_1980, d.POP_2015])))
      .range([0, innerwidth2]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data.flatMap((d) => [d.R90_10_1980, d.R90_10_2015])))
      .range([innerheight2, 0]);

    // --------------------------------------
    //  Axes
    // --------------------------------------

    innerChart_scatterplot_connected
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerheight2})`)
      .call(d3.axisBottom(x).ticks(5).tickSize(0).tickPadding(10));

    innerChart_scatterplot_connected
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(0, 5)`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(10).ticks(3));

    // --------------------------------------
    // Line and circle drawing
    // --------------------------------------

    innerChart_scatterplot_connected
      .append("defs")
      .selectAll()
      .data(data)
      .join("linearGradient")
      .attr("id", (d, i) => gradientIds[i].id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d) => x(d.POP_1980))
      .attr("x2", (d) => x(d.POP_2015))
      .attr("y1", (d) => y(d.R90_10_1980))
      .attr("y2", (d) => y(d.R90_10_2015))
      .call((g) =>
        g.append("stop").attr("stop-color", "#F20666").attr("stop-opacity", 0.3)
      )
      .call((g) =>
        g.append("stop").attr("offset", "100%").attr("stop-color", "#06D6A0")
      );

    innerChart_scatterplot_connected
      .selectAll()
      .data(data)
      .join("circle")
      .attr("r", 0.1)
      .attr("fill", "#F20666")
      .attr("cx", (d) => x(d.POP_1980))
      .attr("cy", (d) => y(d.R90_10_1980));

    innerChart_scatterplot_connected
      .selectAll()
      .data(data)
      .join("circle")
      .attr("r", 1)
      .attr("fill", "#06D6A0")
      .attr("cx", (d) => x(d.POP_2015))
      .attr("cy", (d) => y(d.R90_10_2015));

    innerChart_scatterplot_connected
      .selectAll()
      .data(data.filter((d) => d.highlight))
      .join("text")
      .attr("class", "text")
      .attr("fill", "white")
      .attr("dy", (d) => (d.R90_10_1980 > d.R90_10_2015 ? "1.2em" : "-0.5em"))
      .attr("dx", (d) => "-1.5em")
      .attr("x", (d) => x(d.POP_2015))
      .attr("y", (d) => y(d.R90_10_2015))
      .text((d) => d.nyt_display);

    function arc(x1, y1, x2, y2) {
      const r = Math.hypot(x1 - x2, y1 - y2) * 2;
      return `M${x1},${y1} A${r},${r} 0,0,1 ${x2},${y2}`;
    }

    innerChart_scatterplot_connected
      .append("g")
      .attr("fill", "none")
      .selectAll()
      .data(data)
      .join("path")
      .attr("stroke", "green")
      .attr("stroke-width", "0.5")
      .attr(
        "stroke",
        (d, i) => /*console.log(gradientIds[i]) ||*/ gradientIds[i]
      )
      .attr("d", (d) =>
        arc(x(d.POP_1980), y(d.R90_10_1980), x(d.POP_2015), y(d.R90_10_2015))
      );
  });
