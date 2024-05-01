// --------------------------------------
//  Canvas
// --------------------------------------

const svg7 = d3.select("#chart7")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart7 = svg7
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Data 
// --------------------------------------

const data7 = d3.csv("../data/td-més_centres.csv", d3.autoType)
                .then(function(data7){ 

    let sexe = d3.groups(data7, (d) => d.sexe).map((d) => d[0]);
    let edat = d3.groups(data7, (d) => d.grups_edat).map((d) => d[0]);

// --------------------------------------
//  Scales
// --------------------------------------

let c = d3
   .scaleOrdinal()
   .domain(sexe)
   .range(["#022859", "#f20666"]);

let r = d3
  .scaleSqrt()
  .domain(d3.extent(data7, (d) => d.visites))
  .range([0.5, 7]);

let y = d3
  .scaleBand()
  .domain(edat)
  .range([innerheight, 0]);

let x = d3
  .scaleLinear()
  .domain([0, 1300])
  .range([0, innerwidth]);

// --------------------------------------
//  Axes
// --------------------------------------

innerChart7
   .append("g")
	 .attr("class", "x-axis")
	 .attr("transform", `translate(0, ${innerheight})`)
	 .call(d3.axisBottom(x)
		       .ticks(5)
           .tickPadding(0));

innerChart7
   .append("g")
   .attr("class", "y-axis")
   .attr("transform", `translate(0, -15)`)
	 .call(d3.axisLeft(y)
		       .ticks(5)
           .tickPadding(0));

// --------------------------------------
//  Simulation
// --------------------------------------

  const simulation = d3
    .forceSimulation(data7)
    .force("x", d3.forceX((d) => x(d.pacients)).strength(0.5))
    .force("y", d3.forceY((d) => y(d.grups_edat)).strength(0.5))
    .force("collide", d3.forceCollide((d) => r(d.visites) + 0.1).strength(1));

  for (let i = 0; i < 100; i++) {
    simulation.tick();
  }

// --------------------------------------
//  Drawing circles
// --------------------------------------

innerChart7
    .selectAll("circle")
    .data(data7)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => r(d.visites))
    .attr("fill", (d) => c(d.sexe));

  });
