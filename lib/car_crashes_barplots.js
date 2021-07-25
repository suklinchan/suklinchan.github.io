// add the options to the button
var crash_categories = ["total", "speeding", "alcohol", "distracted", "previous", "lessSpeeding", "lessAlcohol", "lessDistracted", "lessPrevious"];

var dropdown_options = ["Total number of drivers", 
                        "Drivers who were speeding", 
                        "Drivers who were alcohol-impaired", 
                        "Drivers who were distracted", 
                        "Drivers who had been involved in previous accidents"];

var legend_text = ["Number of drivers involved in fatal collisions per billion miles", 
                   "Number of drivers involved in fatal collisions who were speeding", 
                   "Number of drivers involved in fatal collisions who were alcohol-impaired", 
                   "Number of drivers involved in fatal collisions who were distracted", 
                   "Number of drivers involved in fatal collisions who had been involved in previous accidents"];

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

  makeVis(data, j)
}


/* Data in strings like it would be if imported from a csv */

var data = [
  { state:  "AL", total:  "18.8", speeding: "7.332",  alcohol:  "5.640",  distracted: "0.752",  previous: "3.760",  lessSpeeding: "11.468", lessAlcohol:  "13.160", lessDistracted: "18.048", lessPrevious: "15.040"  },
  { state:  "AK", total:  "18.1", speeding: "7.421",  alcohol:  "4.525",  distracted: "1.810",  previous: "1.086",  lessSpeeding: "10.679", lessAlcohol:  "13.575", lessDistracted: "16.290", lessPrevious: "17.014"  },
  { state:  "AZ", total:  "18.6", speeding: "6.510",  alcohol:  "5.208",  distracted: "2.976",  previous: "0.744",  lessSpeeding: "12.090", lessAlcohol:  "13.392", lessDistracted: "15.624", lessPrevious: "17.856"  },
  { state:  "AR", total:  "22.4", speeding: "4.032",  alcohol:  "5.824",  distracted: "1.344",  previous: "1.120",  lessSpeeding: "18.368", lessAlcohol:  "16.576", lessDistracted: "21.056", lessPrevious: "21.280"  },
  { state:  "CA", total:  "12.0", speeding: "4.200",  alcohol:  "3.360",  distracted: "1.080",  previous: "1.320",  lessSpeeding: "7.800",  lessAlcohol:  "8.640",  lessDistracted: "10.920", lessPrevious: "10.680"  },
  { state:  "CO", total:  "13.6", speeding: "5.032",  alcohol:  "3.808",  distracted: "2.856",  previous: "0.680",  lessSpeeding: "8.568",  lessAlcohol:  "9.792",  lessDistracted: "10.744", lessPrevious: "12.920"  },
  { state:  "CT", total:  "10.8", speeding: "4.968",  alcohol:  "3.888",  distracted: "1.404",  previous: "1.944",  lessSpeeding: "5.832",  lessAlcohol:  "6.912",  lessDistracted: "9.396",  lessPrevious: "8.856" },
  { state:  "DE", total:  "16.2", speeding: "6.156",  alcohol:  "4.860",  distracted: "2.106",  previous: "0.162",  lessSpeeding: "10.044", lessAlcohol:  "11.340", lessDistracted: "14.094", lessPrevious: "16.038"  },
  { state:  "DC", total:  "5.9",  speeding: "2.006",  alcohol:  "1.593",  distracted: "0.000",  previous: "0.000",  lessSpeeding: "3.894",  lessAlcohol:  "4.307",  lessDistracted: "5.900",  lessPrevious: "5.900" },
  { state:  "FL", total:  "17.9", speeding: "3.759",  alcohol:  "5.191",  distracted: "1.432",  previous: "1.074",  lessSpeeding: "14.141", lessAlcohol:  "12.709", lessDistracted: "16.468", lessPrevious: "16.826"  },
  { state:  "GA", total:  "15.6", speeding: "2.964",  alcohol:  "3.900",  distracted: "0.780",  previous: "1.092",  lessSpeeding: "12.636", lessAlcohol:  "11.700", lessDistracted: "14.820", lessPrevious: "14.508"  },
  { state:  "HI", total:  "17.5", speeding: "9.450",  alcohol:  "7.175",  distracted: "3.150",  previous: "2.275",  lessSpeeding: "8.050",  lessAlcohol:  "10.325", lessDistracted: "14.350", lessPrevious: "15.225"  },
  { state:  "ID", total:  "15.3", speeding: "5.508",  alcohol:  "4.437",  distracted: "2.295",  previous: "0.306",  lessSpeeding: "9.792",  lessAlcohol:  "10.863", lessDistracted: "13.005", lessPrevious: "14.994"  },
  { state:  "IL", total:  "12.8", speeding: "4.608",  alcohol:  "4.352",  distracted: "0.768",  previous: "0.512",  lessSpeeding: "8.192",  lessAlcohol:  "8.448",  lessDistracted: "12.032", lessPrevious: "12.288"  },
  { state:  "IN", total:  "14.5", speeding: "3.625",  alcohol:  "4.205",  distracted: "0.725",  previous: "0.725",  lessSpeeding: "10.875", lessAlcohol:  "10.295", lessDistracted: "13.775", lessPrevious: "13.775"  },
  { state:  "IA", total:  "15.7", speeding: "2.669",  alcohol:  "3.925",  distracted: "0.471",  previous: "2.041",  lessSpeeding: "13.031", lessAlcohol:  "11.775", lessDistracted: "15.229", lessPrevious: "13.659"  },
  { state:  "KS", total:  "17.8", speeding: "4.806",  alcohol:  "4.272",  distracted: "4.094",  previous: "2.670",  lessSpeeding: "12.994", lessAlcohol:  "13.528", lessDistracted: "13.706", lessPrevious: "15.130"  },
  { state:  "KY", total:  "21.4", speeding: "4.066",  alcohol:  "4.922",  distracted: "4.708",  previous: "5.136",  lessSpeeding: "17.334", lessAlcohol:  "16.478", lessDistracted: "16.692", lessPrevious: "16.264"  },
  { state:  "LA", total:  "20.5", speeding: "7.175",  alcohol:  "6.765",  distracted: "5.535",  previous: "0.410",  lessSpeeding: "13.325", lessAlcohol:  "13.735", lessDistracted: "14.965", lessPrevious: "20.090"  },
  { state:  "ME", total:  "15.1", speeding: "5.738",  alcohol:  "4.530",  distracted: "1.963",  previous: "2.416",  lessSpeeding: "9.362",  lessAlcohol:  "10.570", lessDistracted: "13.137", lessPrevious: "12.684"  },
  { state:  "MD", total:  "12.5", speeding: "4.250",  alcohol:  "4.000",  distracted: "3.625",  previous: "0.125",  lessSpeeding: "8.250",  lessAlcohol:  "8.500",  lessDistracted: "8.875",  lessPrevious: "12.375"  },
  { state:  "MA", total:  "8.2",  speeding: "1.886",  alcohol:  "2.870",  distracted: "1.066",  previous: "1.640",  lessSpeeding: "6.314",  lessAlcohol:  "5.330",  lessDistracted: "7.134",  lessPrevious: "6.560" },
  { state:  "MI", total:  "14.1", speeding: "3.384",  alcohol:  "3.948",  distracted: "0.705",  previous: "3.243",  lessSpeeding: "10.716", lessAlcohol:  "10.152", lessDistracted: "13.395", lessPrevious: "10.857"  },
  { state:  "MN", total:  "9.6",  speeding: "2.208",  alcohol:  "2.784",  distracted: "1.152",  previous: "1.152",  lessSpeeding: "7.392",  lessAlcohol:  "6.816",  lessDistracted: "8.448",  lessPrevious: "8.448" },
  { state:  "MS", total:  "17.6", speeding: "2.640",  alcohol:  "5.456",  distracted: "15.840", previous: "0.000",  lessSpeeding: "14.960", lessAlcohol:  "12.144", lessDistracted: "1.760",  lessPrevious: "17.600"  },
  { state:  "MO", total:  "16.1", speeding: "6.923",  alcohol:  "5.474",  distracted: "1.288",  previous: "2.576",  lessSpeeding: "9.177",  lessAlcohol:  "10.626", lessDistracted: "14.812", lessPrevious: "13.524"  },
  { state:  "MT", total:  "21.4", speeding: "8.346",  alcohol:  "9.416",  distracted: "3.424",  previous: "3.210",  lessSpeeding: "13.054", lessAlcohol:  "11.984", lessDistracted: "17.976", lessPrevious: "18.190"  },
  { state:  "NE", total:  "14.9", speeding: "1.937",  alcohol:  "5.215",  distracted: "1.043",  previous: "1.490",  lessSpeeding: "12.963", lessAlcohol:  "9.685",  lessDistracted: "13.857", lessPrevious: "13.410"  },
  { state:  "NV", total:  "14.7", speeding: "5.439",  alcohol:  "4.704",  distracted: "0.735",  previous: "0.147",  lessSpeeding: "9.261",  lessAlcohol:  "9.996",  lessDistracted: "13.965", lessPrevious: "14.553"  },
  { state:  "NH", total:  "11.6", speeding: "4.060",  alcohol:  "3.480",  distracted: "1.508",  previous: "1.972",  lessSpeeding: "7.540",  lessAlcohol:  "8.120",  lessDistracted: "10.092", lessPrevious: "9.628" },
  { state:  "NJ", total:  "11.2", speeding: "1.792",  alcohol:  "3.136",  distracted: "1.568",  previous: "2.464",  lessSpeeding: "9.408",  lessAlcohol:  "8.064",  lessDistracted: "9.632",  lessPrevious: "8.736" },
  { state:  "NM", total:  "18.4", speeding: "3.496",  alcohol:  "4.968",  distracted: "6.072",  previous: "0.368",  lessSpeeding: "14.904", lessAlcohol:  "13.432", lessDistracted: "12.328", lessPrevious: "18.032"  },
  { state:  "NY", total:  "12.3", speeding: "3.936",  alcohol:  "3.567",  distracted: "1.476",  previous: "2.460",  lessSpeeding: "8.364",  lessAlcohol:  "8.733",  lessDistracted: "10.824", lessPrevious: "9.840" },
  { state:  "NC", total:  "16.8", speeding: "6.552",  alcohol:  "5.208",  distracted: "1.008",  previous: "3.192",  lessSpeeding: "10.248", lessAlcohol:  "11.592", lessDistracted: "15.792", lessPrevious: "13.608"  },
  { state:  "ND", total:  "23.9", speeding: "5.497",  alcohol:  "10.038", distracted: "0.239",  previous: "3.346",  lessSpeeding: "18.403", lessAlcohol:  "13.862", lessDistracted: "23.661", lessPrevious: "20.554"  },
  { state:  "OH", total:  "14.1", speeding: "3.948",  alcohol:  "4.794",  distracted: "0.141",  previous: "2.538",  lessSpeeding: "10.152", lessAlcohol:  "9.306",  lessDistracted: "13.959", lessPrevious: "11.562"  },
  { state:  "OK", total:  "19.9", speeding: "6.368",  alcohol:  "5.771",  distracted: "1.592",  previous: "1.194",  lessSpeeding: "13.532", lessAlcohol:  "14.129", lessDistracted: "18.308", lessPrevious: "18.706"  },
  { state:  "OR", total:  "12.8", speeding: "4.224",  alcohol:  "3.328",  distracted: "4.224",  previous: "1.280",  lessSpeeding: "8.576",  lessAlcohol:  "9.472",  lessDistracted: "8.576",  lessPrevious: "11.520"  },
  { state:  "PA", total:  "18.2", speeding: "9.100",  alcohol:  "5.642",  distracted: "0.728",  previous: "2.184",  lessSpeeding: "9.100",  lessAlcohol:  "12.558", lessDistracted: "17.472", lessPrevious: "16.016"  },
  { state:  "RI", total:  "11.1", speeding: "3.774",  alcohol:  "4.218",  distracted: "0.888",  previous: "2.331",  lessSpeeding: "7.326",  lessAlcohol:  "6.882",  lessDistracted: "10.212", lessPrevious: "8.769" },
  { state:  "SC", total:  "23.9", speeding: "9.082",  alcohol:  "9.799",  distracted: "0.956",  previous: "4.541",  lessSpeeding: "14.818", lessAlcohol:  "14.101", lessDistracted: "22.944", lessPrevious: "19.359"  },
  { state:  "SD", total:  "19.4", speeding: "6.014",  alcohol:  "6.402",  distracted: "0.388",  previous: "2.716",  lessSpeeding: "13.386", lessAlcohol:  "12.998", lessDistracted: "19.012", lessPrevious: "16.684"  },
  { state:  "TN", total:  "19.5", speeding: "4.095",  alcohol:  "5.655",  distracted: "3.510",  previous: "3.705",  lessSpeeding: "15.405", lessAlcohol:  "13.845", lessDistracted: "15.990", lessPrevious: "15.795"  },
  { state:  "TX", total:  "19.4", speeding: "7.760",  alcohol:  "7.372",  distracted: "1.746",  previous: "2.522",  lessSpeeding: "11.640", lessAlcohol:  "12.028", lessDistracted: "17.654", lessPrevious: "16.878"  },
  { state:  "UT", total:  "11.3", speeding: "4.859",  alcohol:  "1.808",  distracted: "1.356",  previous: "0.452",  lessSpeeding: "6.441",  lessAlcohol:  "9.492",  lessDistracted: "9.944",  lessPrevious: "10.848"  },
  { state:  "VT", total:  "13.6", speeding: "4.080",  alcohol:  "4.080",  distracted: "0.544",  previous: "0.680",  lessSpeeding: "9.520",  lessAlcohol:  "9.520",  lessDistracted: "13.056", lessPrevious: "12.920"  },
  { state:  "VA", total:  "12.7", speeding: "2.413",  alcohol:  "3.429",  distracted: "1.651",  previous: "1.524",  lessSpeeding: "10.287", lessAlcohol:  "9.271",  lessDistracted: "11.049", lessPrevious: "11.176"  },
  { state:  "WA", total:  "10.6", speeding: "4.452",  alcohol:  "3.498",  distracted: "1.908",  previous: "1.484",  lessSpeeding: "6.148",  lessAlcohol:  "7.102",  lessDistracted: "8.692",  lessPrevious: "9.116" },
  { state:  "WV", total:  "23.8", speeding: "8.092",  alcohol:  "6.664",  distracted: "0.714",  previous: "3.094",  lessSpeeding: "15.708", lessAlcohol:  "17.136", lessDistracted: "23.086", lessPrevious: "20.706"  },
  { state:  "WI", total:  "13.8", speeding: "4.968",  alcohol:  "4.554",  distracted: "8.418",  previous: "2.208",  lessSpeeding: "8.832",  lessAlcohol:  "9.246",  lessDistracted: "5.382",  lessPrevious: "11.592"  },
  { state:  "WY", total:  "17.4", speeding: "7.308",  alcohol:  "5.568",  distracted: "3.306",  previous: "1.740",  lessSpeeding: "10.092", lessAlcohol:  "11.832", lessDistracted: "14.094", lessPrevious: "15.660"  },
];

var makeVis = function(data, category) {
  console.log("makeVis ", category)

  // Setup svg using Bostock's margin convention
  var margin = {top: 20, right: 160, bottom: 135, left: 30};

  //var width = 960 - margin.left - margin.right,
  var width = 1540 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      padding = -1300;

  //var svg = d3.select("body")
  var svg = d3.select("#vis-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Transpose the data into layers
  // var dataset = d3.layout.stack()(["total"].map(function(fruit) {
  //   return data.map(function(d) {
  //     return {x: d.state, y: +d[fruit]};
  //   });
  // }));

  console.log(category, crash_categories[category]);
  if (category == 0) {
    var dataset = d3.layout.stack()([crash_categories[category]].map(function(fruit) {
      return data.map(function(d) {
        return {x: d.state, y: +d[fruit]};
      });
    }));
  } else {
    var dataset = d3.layout.stack()([crash_categories[category], crash_categories[category+4]].map(function(fruit) {
      return data.map(function(d) {
        return {x: d.state, y: +d[fruit]};
      });
    })); 
  }

  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function(d) { return d.x; }))
    .rangeRoundBands([10, width-10], 0.02);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
    .range([height, 0]);

  //var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];
  // var colors = ["#f2b447"];
  // if (category == 0) {
  //   var colors = ["#f2b447"];
  // } else {
  //   var colors = ["#d25c4d", "#f2b447"];
  // }

  switch (category) {
    case 0:
      var colors = ["orange"];
      break;
    case 1:
      var colors = ["crimson", "orange"];
      break;
    case 2:
      var colors = ["darkred", "orange"];
      break;
    case 3:
      var colors = ["orangered", "orange"];
      break;
    case 4:
      var colors = ["indianred", "orange"];
      break;
  }

  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat( function(d) { return d } );

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // Add the text label for the Y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of collisions per billion miles");

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat( function(d) { return d } );

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the text label for the x axis
  svg.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 90) + ")")
      .style("text-anchor", "middle")
      .text("State (Abbreviated)");

  // Create groups for each series, rects for each segment 
  var groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) { return colors[i]; });

  var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  //.attr("y", function(d) { return y(d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    var num = d.y0 + d.y;
    var roundedString = num.toFixed(2);
    // tooltip.select("text").text(d.y0 + d.y);
    tooltip.select("text").text(roundedString);
  });

  // var rect = groups.selectAll("rect")
  //   .data(function(d) { return d; })
  //   .enter()
  //   .append("rect")
  //   .attr("x", function(d) { return x(d.x); })
  //   .attr("y", function(d) { return y(d.y0 + d.y); })
  //   .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  //   .attr("width", x.rangeBand())
  //   .on("mouseover", function() { tooltip.style("display", null); })
  //   .on("mouseout", function() { tooltip.style("display", "none"); })
  //   .on("mousemove", function(d) {
  //     // var xPosition = d3.mouse(this)[0] - 15;
  //     // var yPosition = d3.mouse(this)[1] - 25;
  //     var xPosition = d3.mouse(this)[0] + 10;
  //     var yPosition = d3.mouse(this)[1] + 532;
  //     // console.log("mousemove x y positions:", xPosition, yPosition);
  //     // console.log("x y :", x(d.x), y(d.y0 + d.y));

  //     //tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");

  //     var num = d.y0 + d.y;
  //     var roundedString = num.toFixed(2);
  //     tooltip.transition()
  //       .duration(200);
  //     tooltip.style("opacity", 1)
  //       //.html(d.y0 + d.y)
  //       .html(roundedString)
  //       .style("left", xPosition + "px")
  //       .style("top", yPosition + "px");
  //   });

  // Draw legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    //.attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    // .attr('transform', 'translate(' + (padding) + ','+ (height + 28 + i * 19) + ')');
    .attr("transform", function(d, i) { return "translate(" + (padding) + ","+ (height + 28 + i * 19) + ")"; });
   
  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice().reverse()[i];});


  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) { 
      console.log("legend ", legend_text[category])
      if (category == 0) {
        return legend_text[category];
      } else {
        switch (i) {
          case 0: return legend_text[0];
          case 1: return legend_text[category];
        }  
      }
    });

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");
};

makeVis(data, 0);





