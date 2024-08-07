// --------------------------------------
//  Canvas
// --------------------------------------

const svg5 = d3
  .select("#chart2")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const innerChart5 = svg5
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Data
// --------------------------------------

const data5 = d3
  .csv("../data/3.csv", (d) => {
    return {
      Gini: +d.value,
      Country: d.country,
      Name: d.shortname,
      Region: d.region,
      Region2: d.region2,
      Year: +d.year,
    };
  })
  .then((data5) => {
    let data = data5
      .filter((d) => d.Year < 1981)
      .sort((a, b) => b.Gini - a.Gini);

    let region = data.map((d) => d.Region);

    // --------------------------------------
    // Tooltip
    // --------------------------------------

    const tooltip = d3
      .tip()
      .attr("class", "tooltip")
      .html(
        (event, d) => `<div> 
      <b>${d.Name}</b> 
      <br>Gini ${format6(d.Gini)}</br> 
      </div>`
      );

    svg5.call(tooltip);

    // --------------------------------------
    // Scales
    // --------------------------------------

    let x = d3.scaleLinear().domain([0, 0.75]).range([0, innerwidth]);

    let y = d3.scaleBand().domain(region).padding(0.05).range([innerheight, 0]);

    let c = d3
      .scaleOrdinal()
      .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
      .range(["#06d6a0", "#f20666", "#662e9b", "#9EF211", "#1155F2"]);

    // --------------------------------------
    // Bars
    // --------------------------------------

    innerChart5
      .selectAll(".bars")
      .data(data)
      .join("rect")
      .attr("class", "bars")
      .attr("x", 0)
      .attr("y", (d) => y(d.Region))
      .attr("width", 0)
      .attr("height", y.bandwidth())
      .attr("fill", (d) => c(d.Region))
      .attr("opacity", (d) =>
        d.Gini > d3.mean(data, (d) => d.Gini) ? 0.1 : 0.3
      )
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide)
      .transition()
      .duration(5000)
      .attr("width", (d) => x(d.Gini));
  });
