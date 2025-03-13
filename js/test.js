// Set up the SVG canvas dimensions
const margin = {top: 50, right: 150, bottom: 50, left: 50};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Append the SVG element to the container
const svg = d3.select("#container2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Data
const data = [
    {name: "Installation & Developers", values: [43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157, 161454, 154610, 168960, 171558]},
    {name: "Manufacturing", values: [24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243, 31050, 33099, 33473]},
    {name: "Sales & Distribution", values: [11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213, 25663, 28978, 30618]},
    {name: "Operations & Maintenance", values: [null, null, null, null, null, null, null, null, 11164, 11218, 10077, 12530, 16585]},
    {name: "Other", values: [21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906, 10073, 11471, 11648]}
];

// Create scales
const x = d3.scaleLinear().domain([2010, 2022]).range([0, width]);
const y = d3.scaleLinear().domain([0, 200000]).range([height, 0]);
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Create axes
const xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
const yAxis = d3.axisLeft(y);

// Append axes to the SVG
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Number of Employees");

// Create line generator
const line = d3.line()
    .defined(d => d !== null)
    .x((d, i) => x(2010 + i))
    .y(d => y(d));

// Draw lines
const paths = svg.selectAll(".line")
    .data(data)
    .join("path")
    .attr("class", "line")
    .attr("d", d => line(d.values))
    .style("stroke", d => color(d.name))
    .attr("fill", "none")
    .attr("data-name", d => d.name);

// Add legend
const legend = svg.selectAll(".legend")
    .data(data)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => "translate(0," + i * 20 + ")")
    .on("click", function(event, d) {
        const currentPath = svg.select(`path[data-name='${d.name}']`);
        const isVisible = currentPath.style("display") !== "none";
        currentPath.style("display", isVisible ? "none" : null);
    });

legend.append("rect")
    .attr("x", width + 30)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", d => color(d.name));

