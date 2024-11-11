// --------------------------------------
//  Canvas
// --------------------------------------

const svg22 = d3
  .select("#chart10")
  .append("svg")
  .attr("viewBox", [0, 0, width2, height2]);

const innerChart22 = svg22
  .append("g")
  .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

// --------------------------------------
// Data loading
// --------------------------------------

const data23 = d3
  .json(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json"
  )
  .then(function (data23) {
    let data = data23;
    // console.log(data);

    var allNodes = data.nodes.map((d) => d.name);
    // console.log(allNodes);

    // var allLinks = data.links.map((d) => d.source);
    // console.log(allLinks);

    // --------------------------------------
    // Scales
    // --------------------------------------

    var x = d3.scalePoint().range([0, innerwidth2]).domain(allNodes);

    // --------------------------------------
    // Circle, label and path drawing
    // --------------------------------------

    innerChart22
      .selectAll("mynodes")
      .data(data.nodes)
      .join("circle")
      .attr("cx", (d) => x(d.name))
      .attr("cy", innerheight2)
      .attr("r", 8)
      .style("fill", "#69b3a2");

    innerChart22
      .selectAll("mylabels")
      .data(data.nodes)
      .join("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.name))
      .attr("y", innerheight2 + 20)
      .text((d) => d.name)
      .attr("fill", "white");

    // Link between id and name
    var idToNode = {};
    data.nodes.forEach((node) => (idToNode[node.id] = node));
    // console.log(idToNode);
    // console.log(idToNode[2].name);

    innerChart22
      .selectAll("mylinks")
      .data(data.links)
      .join("path")
      .attr("d", function (d) {
        start = x(idToNode[d.source].name);
        end = x(idToNode[d.target].name);
        return [
          "M",
          start,
          innerheight2,
          "A",
          (start - end) / 2,
          (start - end) / 2,
          0,
          0,
          start < end ? 1 : 0,
          end,
          innerheight2,
        ].join(" ");
      })
      .style("fill", "none")
      .attr("stroke", "white");
  });
