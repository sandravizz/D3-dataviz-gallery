// --------------------------------------
//  Canvas
// --------------------------------------

const svg8 = d3.select("#chart0")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart8 = svg8
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
    .domain(d3.extent(data, d => d.x))
    .range([margin.left, w - margin.right]);

y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y))
    .rangeRound([h - margin.bottom, margin.top]);

r = d3.scaleSqrt()
    .domain(d3.extent(data, d => d.y))
    .range([5, 40]);

c = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y))
    .range(["#06d6a0", "#f20666"]);

// --------------------------------------
// Line and area drawing
// --------------------------------------

svg.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r",  d => r(d.y))
    .attr("fill", d => c(d.y));

svg.selectAll("text")
    .data(data)
    .join("text")
    .filter(d => d.y > 200)
    .text(d => d.name.replace(/ .*/,'')) 
    .attr("x", d => x(d.x))
    .attr("y", d => y(d.y));
 
});
