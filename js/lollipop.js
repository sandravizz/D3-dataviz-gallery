// --------------------------------------
//  Canvas
// --------------------------------------

const svg3 = d3.select("#chart3")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart3 = svg3
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  data loading
// --------------------------------------

const data3 = d3.csv("../data/home_year.csv", d => {

    return {
        Total: +d.home_score,
        Periode: parseDate(d.Year)
      };         
    
    }).then(data3 => {  

// --------------------------------------
//  Scales
// --------------------------------------

let x = d3.scaleTime()
    .domain(d3.extent(data3, d => d.Periode))
    .range([0, innerwidth]);

let y = d3.scaleLinear()
    .domain(d3.extent(data3, d => d.Total))
    .range([innerheight, 0]);

let r1 = d3.scaleSqrt()
    .domain([0, d3.max(data3, d => d.Total)])
    .range([0, 7]);

// --------------------------------------
//  Axes 
// --------------------------------------

innerChart3
.append("g")
.attr("class", "x-axis")
.attr("transform", `translate(0, ${innerheight})`)
.call(d3.axisBottom(x).tickValues([
        parseDate(1880), 
        parseDate(1890),
        parseDate(1900),
        parseDate(1910),
        parseDate(1920),
        parseDate(1930),
        parseDate(1940),
        parseDate(1950),
        parseDate(1960),
        parseDate(1970),
        parseDate(1980),
        parseDate(1990),
        parseDate(2000),
        parseDate(2010), 
        parseDate(2020)]) 
        .tickFormat(formatDate)
        .tickSize(5)
        .tickPadding(5));
         
// --------------------------------------
//  data drawing
// --------------------------------------

innerChart3
    .selectAll(".line")
    .data(data3)
    .join("line")
    .attr("class", "line_lollipop") 
    .attr("x1", (d) => x(d.Periode))
    .attr("x2", (d) => x(d.Periode))
    .attr("y1", innerheight)
    .attr("y2",  innerheight)
    .attr("stroke", "#ccff99")
    .attr("stroke-width", 0.5)
    .attr("opacity", 1)
    .transition()
    .delay((d) => 500 + x(d.Periode) * 3.6)
    .duration(1000)
    .attr("y2", (d) => y(d.Total) + r1(d.Total));

innerChart3
    .selectAll(".cost_circle")
    .data(data3)
    .join("circle")
    .attr("class", "cost_circle")   
    .attr("cx", (d) => x(d.Periode))
    .attr("cy", (d) => y(d.Total))
    .attr("r", 0)
    .attr("fill", "#ccff99")
    .attr("fill-opacity", 1)
    .attr("stroke", "#ccff99")
    .attr("stroke-width", 0.2)
    .transition()
    .delay((d) => 500 + x(d.Periode) * 5)
    .duration(1000)
    .attr("r", (d) => r1(d.Total));
    
});
