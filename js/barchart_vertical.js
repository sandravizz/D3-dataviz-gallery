// --------------------------------------
//  Canvas
// --------------------------------------

const svg1 = d3.select("#chart1")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart1 = svg1
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Global variables  
// --------------------------------------

const top_n = 7;
const tickDuration = 1000;
let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 20);
let year = 2024;

// ------------------------------------------
//  Defining colors in an object of objects 
// ------------------------------------------

let leagues = ({
  Qatar: { label: "Qatar", color: "#05C7F2" },
  Ivory_Coas: { label: "Ivory_Coast", color: "#3BD945" },
  Saudi_Arabia: { label: "Saudi_Arabia", color: "#F23827" },
  United_States: { label: "United_States", color: "#F205E2" },
  Sri_Lanka: { label: "Sri_Lanka", color: "#D90467" },
  France: { label: "France", color: "#ccff99" },
  United_Arab_Emirates: { label: "United_Arab_Emirates", color: "#F2E635" },
  Morocco: { label: "Morocco", color: "#F2C2E5" }
})

// --------------------------------------
//  Data loading
// --------------------------------------

const data1 = d3.csv("../data/top_countries_2024.csv", d => {

    return {
        league: d.country,
        sum_in: +d.home_score,
        year: +d.Year
      };         
    
    }).then(data1 => {  

const data = data1
  .filter((d) => d.league in leagues)
  .map((d) => {
    return {
      name: leagues[d.league].label,
      year: +d.year,
      value: +d.sum_in,
      colour: leagues[d.league].color
    };
  });

  let byYear = data.reduce((acc, cur) => {
    acc.set(cur.name + cur.year, cur);
    return acc;
  }, new Map());

  data.map((d) => {
    d.lastValue = (byYear.get(d.name + (d.year - 1)) || { value: NaN }).value;
    return d;
  });

  let yearSlice = data
    .filter((d) => d.year == year)
    .sort((a, b) => b.value - a.value)
    .slice(0, top_n);

  yearSlice.forEach((d, i) => (d.rank = i));

// --------------------------------------
//  Scales
// --------------------------------------

  let x = d3
    .scaleLinear()
    .domain([0, d3.max(yearSlice, (d) => d.value)])
    .range([0, innerwidth]);

  let y = d3
    .scaleLinear()
    .domain([top_n, 0])
    .range([innerheight, 0]);

// --------------------------------------
//  Drawing bars
// --------------------------------------

innerChart1
    .selectAll("rect.bar")
    .data(yearSlice, (d) => d.name)
    .join("rect")
    .attrs({
      class: "bar",
      x: x(0) + 1,
      width: (d) => x(d.value) - x(0) - 1,
      y: (d) => y(d.rank) + 5,
      height: y(1) - y(0) - barPadding, 
      fill: (d) => d.colour,
      opacity: 0.5
    });

// --------------------------------------
//  Drawing lables: name
// --------------------------------------

innerChart1
    .selectAll("text.label")
    .data(yearSlice, (d) => d.name)
    .join("text")
    .attrs({
      class: "label",
      x: 10,
      y: (d) => y(d.rank) + (y(1) - y(0))/1.3,
      "text-anchor": "start", 
      fill: (d) => d.colour
    })
    .html((d) => d.name);

// --------------------------------------
//  Drawing lables: value
// --------------------------------------

innerChart1
    .selectAll("text.valueLabel")
    .data(yearSlice, (d) => d.name)
    .join("text")
    .attrs({
      class: "valueLabel",
      x: (d) => x(d.value) + 5,
      y: (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1, 
      "fill":(d) => d.colour
    })
    .text((d) => d3.format(",.0f")(d.value));

});
