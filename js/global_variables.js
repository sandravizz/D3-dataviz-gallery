// --------------------------------------
//  Margin and size
// --------------------------------------

const margin = {top: 20, right: 10, bottom: 20, left: 40};
const width = 900;
const height = 350;
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

// --------------------------------------
//  Formating 
// --------------------------------------

const format = d3.format(".03s");
const format6 = d3.format(".0");

const parseDate = d3.timeParse("%Y");
const formatDate = d3.timeFormat("%Y");




