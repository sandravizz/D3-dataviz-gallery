// --------------------------------------
//  Canvas
// --------------------------------------

const svg_stacked_barchart = d3
  .select("#chart_lollipop")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart_stacked_barchart = svg_stacked_barchart
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------
