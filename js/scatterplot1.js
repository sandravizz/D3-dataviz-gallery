// --------------------------------------
//  Canvas
// --------------------------------------

const svg8 = d3.select("#chart8")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart8 = svg8
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
   
// --------------------------------------
// Data loading
// --------------------------------------

const data8 = d3.csv("../data/3.csv", d3.autoType)
      .then(function(data8){ 

  let data = data8
      .filter(d => d.year === 2022 ||  d.year === 1980); 

// --------------------------------------
// Scales
// --------------------------------------

x = d3.scaleLinear()
    .domain([0,1])
    .range([0, innerwidth]);
  
y = d3.scaleLinear()
    .domain([0,1])
    .range([innerheight, 0]);

r = d3.scaleSqrt()
    .domain([0,1])
    .range([5, 40]);

c = d3.scaleLinear()
    .domain([0,1])
    .range(["#06d6a0", "#f20666"]);

// --------------------------------------
// Line and area drawing
// --------------------------------------

innerChart8
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => x(d.gini1980))
    .attr("cy", (d) => y(d.gini2022))
    .attr("r",  3)
    .attr("fill", "blue");

innerChart8
    .selectAll("text")
    .data(data)
    .join("text")
    .filter(d => d.y > 200)
    .text(d => d.Country)   
    .attr("x", d => x(d.x))
    .attr("y", d => y(d.y));
 
});
