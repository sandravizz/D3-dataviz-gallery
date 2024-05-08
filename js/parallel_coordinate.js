// --------------------------------------
//  Canvas
// --------------------------------------

const svg10 = d3.select("#chart10")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart10 = svg10
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
   
// --------------------------------------
// Data 
// --------------------------------------

let test = d3.csv("../data/cars.csv");
console.log(test); 

const data10 = d3.csv("../data/cars.csv", d3.autoType)
      .then(function(data10){  

console.log(data10); 

// --------------------------------------
// Scales
// --------------------------------------

let x = new Map(
  Array.from(keys, (key) => [
    key,
    d3.scaleLinear(
      d3.extent(data10, (d) => d[key]),
      [0, innerwidth]
    )
  ])
);

let y = d3.scalePoint(keys, [0, innerheight]);

// --------------------------------------
// Generators
// --------------------------------------
  
let line = d3.line()
    .defined(([, value]) => value != null)
    .x(([key, value]) => x.get(key)(value))
    .y(([key]) => y(key));

// --------------------------------------
//  Axes 
// --------------------------------------

innerChart10
    .attr("class", "x-axis")
    .selectAll("g")
    .data(keys)
    .join("g")
      .attr("transform", d => `translate(0,${y(d)})`)
      .each(function(d) { d3.select(this).call(d3.axisBottom(x.get(d))); })
      .call(g => g.append("text")
        .attr("x", 0)
        .attr("y", -6)
        .attr("text-anchor", "start")
        .text(d => d))
      .call(g => g.selectAll("text")
        .clone(true)
        .lower()
        .attr("fill", "none")
        .attr("stroke-width", 10)
        .attr("stroke-linejoin", "round")
        .attr("stroke", "white"));

// --------------------------------------
// Line and area drawing
// --------------------------------------

innerChart10
    .selectAll("path")
    .data(data.slice().sort((a, b) => d3.ascending(a[keyz], b[keyz])))
    .join("path")
    .attr("class", "line")
    .attr("d", d => line(d3.cross(keys, [d], (key, d) => [key, d[key]])))
    .call(path => path.append("title")
    .text(d => d.name));

});
