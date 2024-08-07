// --------------------------------------
//  Canvas
// --------------------------------------

const svg2 = d3.select("#chart2")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart2 = svg2
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------

const data2 = d3.csv("../data/sankey.csv", d3.autoType) 

  .then(function(data2){ 

    let links = [];

    data2.map((d, i) => {
      links.push({
        source: d["country"], 
        target: d["neutral"],
        value: d["home_score"],
        id: i
      });
    });

    const nodes = Array.from(
      new Set(links.flatMap((d) => [d.source, d.target])),
      (name, id) => ({ name, id})
    );

    links.map((d) => {
      d.source = nodes.find((e) => e.name === d.source).id;
      d.target = nodes.find((e) => e.name === d.target).id;
    });
    
  let data_final2 = {nodes, links};

// --------------------------------------
//  Scales
// --------------------------------------

  let color = d3.scaleOrdinal()
      .domain(["Qatar", "Ivory Coast", "Saudi Arabia", "United States", "France", "Arab Emirates",  "Morocco"])
      .range(["#05C7F2", "#3BD945", "#F23827", "#F205E2", "#ccff99", "#F2E635", "#F2C2E5"]);

// --------------------------------------
//  Sankey
// --------------------------------------
  
  const sankey2 = d3.sankey()
      .nodeSort((a, b) => a.id - b.id)
      .nodeAlign(d3.sankeyLeft) 
      .nodeId((d) => d.id)
      .linkSort(null)
      .nodeWidth(160) 
      .nodePadding(1) 
      .extent([
        [0, 0],
        [innerwidth, innerheight]
      ]);

// --------------------------------------
//  Data drawing 
// --------------------------------------

    innerChart2
        .selectAll(".sankey2rects")
        .data((sankey2(data_final2)).nodes)
        .join("rect")
        .attr("class", "sankey2rects")  
        .attr("height", (d) => d.y1 - d.y0)
        .attr("width", (d) => (d.x0 < innerwidth / 2 ? d.x1 - d.x0 : 20))
        .attr("y", (d) => d.y0)
        .attr("x", (d) => d.x0)
        .attr("opacity", (d) => (d.x0 < innerwidth / 2 ? 0.5 : 1))
        .attr("fill", (d) => (d.x0 < innerwidth / 2 ? color(d.name) : "white"))
        .on("mouseover", (e, d) => {
          d3.selectAll(".sankey_path").style("opacity", (p) =>
            p.source.name === d.name || p.target.name === d.name ? "1" : "0.1"
          );
        })
        .on("mouseout", (e, d) => {
          d3.selectAll(".sankey_path").style("opacity", 0.5);
        });

    innerChart2
        .selectAll("text")
        .data((sankey2(data_final2)).nodes)
        .join("text")
        .attr("class", "label")
        .text((d) => (d.name))
        .attr("x", (d) => (d.x0 < innerwidth / 2 ? d.x0 + 6: d.x0 + 30))
        .attr("y", (d) => (d.y1 + d.y0) / 2)
        .attr("fill", (d) => (d.x0 < innerwidth / 2 ? color(d.name) : "white"))
        .attr("dy", "0.4em")
        .attr("text-anchor", (d) => (d.x0 < innerwidth / 2 ? "start" : "start"))
        .on("mouseover", (e, d) => {
          d3.selectAll(".sankey_path").style("opacity", (p) =>
            p.source.name === d.name || p.target.name === d.name ? "1" : "0.1"
          );
        })
        .on("mouseout", (e, d) => {
          d3.selectAll(".sankey_path").style("opacity", 0.5);
        });

    innerChart2
        .selectAll(".sankey_path")
        .data((sankey2(data_final2)).links)
        .join("path")
        .attr("class", "sankey_path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", (d) => color(d.source.name))
        .attr("fill", "none")
        .attr("opacity", (d) => (d.source.name === "United_States" ? 1 : 0.5))
        .attr("stroke-width", (d) => Math.max(0, d.width));

});
