// --------------------------------------
//  Canvas
// --------------------------------------

const svg9 = d3.select("#chart")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart9 = svg9
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
   
// --------------------------------------
// Data loading
// --------------------------------------

const data0 = d3.csv("../data/3.csv", d3.autoType)
      .then(function(data0){ 

  let data = data0
      .filter(d => d.country == "DE"); 

// --------------------------------------
// Scales
// --------------------------------------

x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([margin.left, width - margin.right]);

y = d3.scaleBand()
    .domain(data.map(d => d.age))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);

// --------------------------------------
// Line and area drawing
// --------------------------------------

innerChart9
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.value) - 0.75)
      .attr("y", d => y(d.age))
      .attr("width", 1.7)
      .attr("height", y.bandwidth());
 
});
