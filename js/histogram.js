// --------------------------------------
//  Canvas
// --------------------------------------

const svg6 = d3.select("#chart6")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart6 = svg6
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading 
// --------------------------------------

const data6 = d3.csv("../data/3.csv", d => {

    return {
        Gini: +d.value,
        Country: d.country,
        Region: d.region,
        Region2: d.region2,
        Year: +d.year
    };
  
  }).then(data6 => {

let data = data6
  .filter(d => d.Year < 1981)
  .sort((a,b) => b.Gini - a.Gini)
  .map(d => d.Gini); 

// --------------------------------------
//  Create the bins for the histogram
// --------------------------------------

let bins = d3.bin().thresholds(40)(data);

// --------------------------------------
//  Scales
// --------------------------------------

let y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([innerheight, 0]);

let x = d3.scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([0, innerwidth]); 

// --------------------------------------
//  Axes 
// --------------------------------------

innerChart6
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerheight})`)
    .call(d3.axisBottom(x)
            .tickValues([0.2, 0.4, 0.6, 0.8])
     	      .tickSize(0)
            .tickFormat(format6)
            .tickPadding(25));

// --------------------------------------
//  Data drawing
// --------------------------------------

innerChart6
  .append("g")
  .selectAll("rect")
  .data(bins)
  .join("rect")
  .attr("x", d => x(d.x0) + 1)
  .attr("fill", "#05C7F2")
  .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
  .attr("y", d => y(d.length))
  .attr("height", d => y(0) - y(d.length));

});
