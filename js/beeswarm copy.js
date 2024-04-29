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

const data = d3.csv("../data/td-més_centres.csv", d3.autoType)
            .then(function(data){ 



    let sexe = d3.groups(data, (d) => d.sexe).map((d) => d[0]);
    let edat = d3.groups(data, (d) => d.grups_edat).map((d) => d[0]);

  });
