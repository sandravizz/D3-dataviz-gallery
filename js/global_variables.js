// --------------------------------------
//  Margin and size
// --------------------------------------

//Simple charts (small in terms of hight)
const margin = { top: 10, right: 30, bottom: 20, left: 30 };
const width = 900;
const height = 150;
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

//More complex chart (bigger in terms of hight)
const margin2 = { top: 20, right: 30, bottom: 20, left: 60 };
const width2 = 900;
const height2 = 300;
const innerwidth2 = width2 - margin2.left - margin2.right;
const innerheight2 = height2 - margin2.top - margin2.bottom;

//Small mutiple
const margin3 = { top: 20, right: 10, bottom: 20, left: 40 };
const width3 = 180;
const height3 = 180;

// --------------------------------------
//  Formating
// --------------------------------------

const format = d3.format(".03s");
const format6 = d3.format(".0");

const parseDate = d3.timeParse("%Y");
const formatDate = d3.timeFormat("%Y");
