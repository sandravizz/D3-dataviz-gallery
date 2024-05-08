// --------------------------------------
//  Margin and size
// --------------------------------------

//Simple charts (dont need much space)
const margin = {top: 20, right: 10, bottom: 20, left: 40};
const width = 900;
const height = 150;
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

//More complex chart (need biiger visual space)
const margin2 = {top: 20, right: 10, bottom: 20, left: 40};
const width2 = 900;
const height2 = 350;
const innerwidth2 = width2 - margin2.left - margin2.right;
const innerheight2 = height2 - margin2.top - margin2.bottom;

// --------------------------------------
//  Formating 
// --------------------------------------

const format = d3.format(".03s");
const format6 = d3.format(".0");

const parseDate = d3.timeParse("%Y");
const formatDate = d3.timeFormat("%Y");




