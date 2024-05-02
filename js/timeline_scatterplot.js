// --------------------------------------
//  Canvas
// --------------------------------------

const svg9 = d3.select("#chart9")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart9 = svg9
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading 
// --------------------------------------

const data9 = d3.csv("/data/3.csv", d => {

  return {
      Gini: +d.value,
      Country: d.country,
      Region: d.region,
      Year: parseDate(d.year)
  };

}).then(data9 => {

// --------------------------------------
//  Scales
// --------------------------------------

let y = d3.scaleTime()
    .domain(d3.extent(data9, d => (d.Year)))
    .range([0, innerheight]);

let x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, innerwidth]);

let c = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
    .range(["#F2ECCE", "#3DBCD9", "#F2AE2E", "#F2785C", "#D93240"]);

// --------------------------------------
//  Axes 
// --------------------------------------

innerChart9
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerheight})`)
    .call(d3.axisBottom(x)
         .tickValues([0.2, 0.4, 0.6, 0.8, 1])
     	 .tickSize(0)
         .tickPadding(10));

innerChart9
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(0, 5)`)
    .call(d3.axisRight(y)
          .tickSize(0)
          .tickFormat(formatDate)
          .tickPadding(0)
          .tickValues([parseDate(1980), parseDate(1985), parseDate(1990), parseDate(1995), parseDate(2000), parseDate(2005), parseDate(2010), parseDate(2015), parseDate(2020)])); 

// --------------------------------------
//  Data drawing
// --------------------------------------

innerChart9
    .selectAll(".rect")
    .data(data9)
    .join("rect")
    .attr("class", "rect") 
    .attr("x", (d) => x(d.Gini))
    .attr("y", (d) => y(d.Year))
    .attr("width", 1)
    .attr("height", 5)
    .attr("fill",  (d) => c(d.Region));

// --------------------------------------
//  Buttons 
// --------------------------------------

const filters = [
  { id: "Asia", label: "Asia", isActive: false,  backgroundcolor: "#F2ECCE" },
  { id: "Europe", label: "Europe", isActive: false, backgroundcolor: "#3DBCD9" },
  { id: "Africa", label: "Africa", isActive: false, backgroundcolor: "#F2AE2E" },
  { id: "Americas", label: "Americas", isActive: false, backgroundcolor: "#F2785C" },
  { id: "Oceania", label: "Oceania", isActive: false, backgroundcolor: "#D93240" }
  ];

  d3.select("#filters")
      .selectAll(".filter")
      .data(filters)
      .join("button")
      .attr("id", d => d.id)
      .text(d => d.label)
      .style("color", "#00161f")
      .style("background-color", d => d.backgroundcolor);

  });
