// --------------------------------------
//  Canvas
// --------------------------------------

const svg7 = d3.select("#chart7")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart7 = svg7
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
