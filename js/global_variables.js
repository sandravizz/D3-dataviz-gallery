// --------------------------------------
//  Margin and size
// --------------------------------------

//Simple charts (dont need much space)
const margin = { top: 10, right: 10, bottom: 20, left: 20 };
const width = 900;
const height = 150;
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

//More complex chart (need biiger visual space)
const margin2 = { top: 20, right: 10, bottom: 20, left: 60 };
const width2 = 900;
const height2 = 450;
const innerwidth2 = width2 - margin2.left - margin2.right;
const innerheight2 = height2 - margin2.top - margin2.bottom;

//Small mutiple
const margin3 = { top: 30, right: 10, bottom: 10, left: 40 };
const width3 = 180;
const height3 = 200;
// --------------------------------------
//  Formating
// --------------------------------------

const format = d3.format(".03s");
const format6 = d3.format(".0");

const parseDate = d3.timeParse("%Y");
const formatDate = d3.timeFormat("%Y");
