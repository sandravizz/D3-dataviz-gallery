// --------------------------------------
//  Canvas
// --------------------------------------

const svg5 = d3.select("#chart5")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart5 = svg5
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Legend
// --------------------------------------

let Legend = svg5
    .append("g")
    .attr("class", "legend");

    Legend
    .append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", "10px")
		.attr("height", "10px")
    .attr("fill", "#05C7F2") ; 

    Legend
    .append("text")
		.attr("x", 15)
		.attr("y", 9)
    .text("> the average") 
    .attr("fill", "white")
    .attr("class", "chart_text"); 

// --------------------------------------
// Data 
// --------------------------------------

const data5 = d3.csv("../data/3.csv", d => {

  return {
      Gini: +d.value,
      Country: d.country,
      Region: d.region,
      Region2: d.region2,
      Year: +d.year
  };

}).then(data5 => {

let data = data5
.filter(d => d.Year < 1981)
.sort((a,b) => b.Gini - a.Gini);


                
// --------------------------------------
// Tooltip 
// --------------------------------------

const tooltip =
    d3.tip()
      .attr("class", "tooltip")
      .html((event, d) => `<div> 
      <b>${(d.Country)}</b> 
      <br>Gini ${format(d.Gini)}</br> 
      </div>`)

svg5.call(tooltip); 

// --------------------------------------
// Scales
// --------------------------------------

let x = d3.scaleLinear()
        .domain([0, 1])
        .range([0, innerwidth]);

// --------------------------------------
// Bars
// --------------------------------------

innerChart5
    .selectAll(".bars")
    .data(data)
    .join("rect")
    .attr("class", "bars")
    .attr("x", 0)
    .attr("y", (d, i) => i * 2)
    .attr("width", 0)
    .attr("height", 2)
    .attr("fill", "#05C7F2") 
    .attr("opacity", d => d.Gini > d3.mean(data, (d) => d.Gini) ? 1 : 0.3)   
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide)
    .transition()
    .duration(5000)
    .attr("width", (d) => x(d.Gini));

// --------------------------------------
// Text
// --------------------------------------

// innerChart5
//     .selectAll(".text")
//     .data(data)
//     .join("text")
//     .attr("class", "text")
//     .attr("x", 0)
//     .attr("y", (d, i) => i * 2)
//     .attr("fill", d => d.Gini > d3.mean(data, (d) => d.Gini) ? "black" : "white") 
//     .attr("dy", 10)
//     .attr("dx", 4)
//     .text((d) => (d.Country))
//     .on("mouseover", tooltip.show)
//     .on("mouseout", tooltip.hide);  

});
