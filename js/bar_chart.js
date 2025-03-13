// --------------------------------------
//  Canvas
// --------------------------------------

const svg_barchart = d3.select("#bar_chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart_barchart = svg_barchart
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then( function(data) {

  const x = d3.scaleBand()
    .range([ 0, innerwidth ])
    .domain(data.map(d => d.Country))
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, 13000])
    .range([ innerheight, 0]);

    innerChart_barchart
    .selectAll("mybar")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.Country))
      .attr("y", d => y(d.Value))
      .attr("width", x.bandwidth())
      .attr("height", d => innerheight - y(d.Value))
      .attr("fill", "#06d6a0")
  
  })
