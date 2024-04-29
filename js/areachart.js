// --------------------------------------
//  Canvas
// --------------------------------------

const svg0 = d3.select("#chart0")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart0 = svg0
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Color gradient
// --------------------------------------

let areaGradient = innerChart0
    .append("defs")
    .append("linearGradient")
    .attr("id", "areaGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

  areaGradient
    .append("stop")
    .attr("offset", 0.5)
    .attr("stop-color","#05C7F2")
    .attr("stop-opacity", 1);

  areaGradient
    .append("stop")
    .attr("offset", 1)
    .attr("stop-color", "#05C7F2")
    .attr("stop-opacity", 0);
    
// --------------------------------------
// Data loading
// --------------------------------------

const data0 = d3.csv("../data/home_year.csv", d3.autoType)
      .then(function(data0){ 

// --------------------------------------
// Scales
// --------------------------------------

let x = d3.scaleTime()
    .domain(d3.extent(data0, d => d.Year))
    .range([0, innerwidth]);

let y = d3.scaleLinear()
  .domain([0, d3.max(data0, (d) => d.home_score)])
  .range([innerheight, 0]);

// --------------------------------------
// Generators
// --------------------------------------
  
let line = d3.line()
  .defined((d) => d.home_score > 0)
  .curve(d3.curveNatural)
  .x((d) => x(d.Year))
  .y((d) => y(d.home_score))

let area = d3.area()
  .defined((d) => d.home_score > 0)
  .curve(d3.curveNatural)
  .x((d) => x(d.Year))
  .y0(y(0))
  .y1((d) => y(d.home_score))

// --------------------------------------
// Line and area drawing
// --------------------------------------

innerChart0
  .append("path")
  .datum(data0)
  .attr("class", "area")
  .style("fill", "url(#areaGradient)")
  .attr("d", area);

innerChart0
  .append("path")
  .datum(data0)
  .attr("class", "line")
  .attr("d", line);
 
});
