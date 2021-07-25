
var dataset;

var crash_categories = ["speeding", "alcohol", "distracted", "previous"];

var dropdown_options = ["Speeding Crashes", 
                        "Alcohol-impaired Driving Crashes", 
                        "Crashes due to Distractions",  
                        "Drivers had been involved in previous accidents"];

var axis_labels = ["Crashes due to speeding", 
                   "Crashes due to alcohol impairment", 
                   "Crashes due to distracted driving",
                   "Crashes where drivers had previous accidents"];

var tooltip_labels = ["Speeding Crashes", 
                     "Alcohol-related", 
                     "Distracted Driving", 
                     "Previous Accidents"];

var select  = d3.select("#dropdown_container").append("select").on("change", replot),
    options = select.selectAll('option').data(dropdown_options); // Data join

d3.select("#dropdown_container").attr("align","center");

// Enter selection
options.enter().append("option")
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button


function replot(selected_category) {
  // recover the option that has been chosen
  var j   = select.property('selectedIndex');
  console.log(j, crash_categories[j]);

  // Remove the previous graph
  d3.selectAll("svg > *").remove();
  d3.select("svg").remove();
  makeVis(dataset, j)
};

d3.csv('../data/bad_drivers.csv', function loadCallback(error, data) {
    data.forEach(function(d) { // convert strings to numbers
        d.total = +d.total;
        d.speeding = +d.speeding;
        d.alcohol = +d.alcohol;
        d.distracted = +d.distracted;
        d.previous = +d.previous;
    });
    dataset = data;
    makeVis(data, 0);
});

var makeVis = function(data, category) {
  console.log("makeVis ", category)
  // Common pattern for defining vis size and margins
  var margin = { top: 20, right: 20, bottom: 30, left: 300 },
      width  = 1160 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // Add the visualization svg canvas to the vis-container <div>
  var canvas = d3.select("#vis-container").append("svg")
      .attr("width",  width  + margin.left + margin.right)
      .attr("height", height + margin.top  + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Define our scales
  // var colorScale = d3.scale.category10();

  var xScale = d3.scale.linear()
      .domain([ d3.min(data, function(d) { return d.total; }) - 1,
                d3.max(data, function(d) { return d.total; }) + 1 ])
      .range([0, width]);

  var yScale;
  console.log("yScale", category)
  switch (category) {
    case 0:
      yScale = d3.scale.linear()
          .domain([ d3.min(data, function(d) { return d.speeding; }) - 1,
                    d3.max(data, function(d) { return d.speeding; }) + 1 ])
          .range([height, 0]); // flip order because y-axis origin is upper LEFT
      break;
    case 1:
      yScale = d3.scale.linear()
          .domain([ d3.min(data, function(d) { return d.alcohol; }) - 1,
                    d3.max(data, function(d) { return d.alcohol; }) + 1 ])
          .range([height, 0]); 
      break;
    case 2:
      yScale = d3.scale.linear()
      .domain([ d3.min(data, function(d) { return d.distracted; }) - 1,
                d3.max(data, function(d) { return d.distracted; }) + 1 ])
      .range([height, 0]); 
      break;
    case 3:
      yScale = d3.scale.linear()
      .domain([ d3.min(data, function(d) { return d.previous; }) - 1,
                d3.max(data, function(d) { return d.previous; }) + 1 ])
      .range([height, 0]); 
      break;
  }

  // Define our axes
  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom');

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

  // Add x-axis to the canvas
  canvas.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")") // move axis to the bottom of the canvas
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width) // x-offset from the xAxis, move label all the way to the right
      .attr("y", -6)    // y-offset from the xAxis, moves text UPWARD!
      .style("text-anchor", "end") // right-justify text
      .text("Total Crashes");

  // Add y-axis to the canvas
  canvas.append("g")
      .attr("class", "y axis") // .orient('left') took care of axis positioning for us
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)") // although axis is rotated, text is not
      .attr("y", 15) // y-offset from yAxis, moves text to the RIGHT because it's rotated, and positive y is DOWN
      .style("text-anchor", "end")
      .text(axis_labels[category]);

  // Add the tooltip container to the vis container
  // it's invisible and its position/contents are defined during mouseover
  var tooltip = d3.select("#vis-container").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  var color;
  switch (category) {
    case 0:
      color = "crimson";
      break;
    case 1:
      color = "darkred";
      break;
    case 2:
      color = "orangered";
      break;
    case 3:
      color = "indianred";
      break;
  }

  console.log("tooltip", category)
  // tooltip mouseover event handler
  var tipMouseover = function(d) {
      var yVal;
      switch (category) {
        case 0:
          yVal = d.speeding;
          break;
        case 1:
          yVal = d.alcohol;
          break;
        case 2:
          yVal = d.distracted;
          break;
        case 3:
          yVal = d.previous;
          break;
      }

      //var color = colorScale(d.state);
      var html  = "<span style='color:" + color + ";'>" + d.state + "</span><br/>" +
                  "<b>" + yVal + "</b> " + tooltip_labels[category] + ", <br/>" + 
                  "<b>" + d.total + "</b> Total Crashes";

      tooltip.html(html)
          .style("left", (d3.event.pageX + 15) + "px")
          .style("top", (d3.event.pageY - 28) + "px")
        .transition()
          .duration(200) // ms
          .style("opacity", .9) // started as 0!

  };
  // tooltip mouseout event handler
  var tipMouseout = function(d) {
      tooltip.transition()
          .duration(300) // ms
          .style("opacity", 0); // don't care about position!
  };

  // Add data points!

  console.log("Data Points", category)
  switch (category) {
    case 0:
      canvas.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5.5) // radius size, could map to another data dimension
        .attr("cx", function(d) { return xScale( d.total ); })     // x position
        .attr("cy", function(d) { return yScale( d.speeding); })  // y position
        // .style("fill", function(d) { return colorScale(d.state); })
        .style("fill", color)
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);
      break;
    case 1:
      canvas.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5.5) // radius size, could map to another data dimension
        .attr("cx", function(d) { return xScale( d.total ); })     // x position
        .attr("cy", function(d) { return yScale( d.alcohol); })  // y position
        // .style("fill", function(d) { return colorScale(d.state); })
        .style("fill", color)
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);
      break;
    case 2:
      canvas.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5.5) // radius size, could map to another data dimension
        .attr("cx", function(d) { return xScale( d.total ); })     // x position
        .attr("cy", function(d) { return yScale( d.distracted); })  // y position
        // .style("fill", function(d) { return colorScale(d.state); })
        .style("fill", color)
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);
      break;
    case 3:
      canvas.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5.5) // radius size, could map to another data dimension
        .attr("cx", function(d) { return xScale( d.total ); })     // x position
        .attr("cy", function(d) { return yScale( d.previous); })  // y position
        // .style("fill", function(d) { return colorScale(d.state); })
        .style("fill", color)
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);
      break;
  }
  // canvas.selectAll(".dot")
  //   .data(data)
  // .enter().append("circle")
  //   .attr("class", "dot")
  //   .attr("r", 5.5) // radius size, could map to another data dimension
  //   .attr("cx", function(d) { return xScale( d.total ); })     // x position
  //   .attr("cy", function(d) { return yScale( d.alcohol); })  // y position
  //   .style("fill", function(d) { return colorScale(d.state); })
  //   .on("mouseover", tipMouseover)
  //   .on("mouseout", tipMouseout);
};
