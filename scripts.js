//  data for counties (for dropdown functionality)
var countyData = {
  "Fairfield": {
    population: [919702, 929775, 938339, 944612, 950338, 952518, 953669, 954050, 956852, 957097, 955261, 963050, 962946],
    employment: [605634, 621729, 628393, 639197, 646565, 657037, 663787, 658198, 663335, 653822, 633880, 660242, 697773],
    income: [102572, 102997, 101729, 95083, 99718, 101239, 103708, 106972, 112898, 113634, 115859, 119982, 125185]
  },
  "Hartford": {
    population: [895440, 898033, 899840, 900791, 901481, 901332, 899949, 899713, 900246, 899727, 896666, 898265, 898783],
    employment: [620140, 629924, 633093, 638818, 646397, 652539, 653785, 656110, 660969, 659664, 633784, 647256, 668935],
    income: [50432, 52406, 53574, 53855, 55768, 57678, 58536, 59688, 61867, 63511, 66436, 69487, 70339]
  },
  "Litchfield": {
    population: [189898, 189659, 188811, 188622, 187661, 186974, 186156, 185552, 185504, 185264, 184818, 185799, 186116],
    employment: [94461, 95602, 96204, 96488, 97175, 97588, 96580, 95697, 96588, 95212, 92452, 96049, 100339],
    income: [49426, 51949, 53868, 53345, 54616, 56257, 57347, 58252, 59931, 64549, 70947, 76129, 79947]
  },
  "Middlesex": {
    population: [165683, 166494, 166206, 166154, 165853, 165033, 164858, 164744, 164973, 164685, 163970, 166051, 166537],
    employment: [92891, 94000, 95526, 96510, 97188, 98011, 98748, 98253, 98555, 98216, 94655, 98338, 102635],
    income: [52977, 54544, 56630, 56888, 59206, 61157, 62242, 63203, 65060, 67714, 70759, 73081, 74591]
  },
  "New Haven": {
    population: [863694, 865458, 867409, 866896, 868202, 866734, 865560, 866435, 866667, 864743, 863234, 869138, 869527],
    employment: [477548, 482732, 487949, 492770, 496762, 501019, 504365, 506204, 510921, 511012, 499399, 515302, 538440],
    income: [44296, 45947, 46896, 47193, 48555, 50082, 50725, 51504, 53729, 56441, 60506, 63599, 64829]
  },
  "New London": {
    population: [274104, 273513, 274945, 274204, 273038, 271593, 270745, 270266, 269857, 268874, 267680, 268300, 268681],
    employment: [168285, 168026, 166646, 165934, 164515, 164721, 166953, 168381, 166335, 163508, 150870, 157094, 163717],
    income: [45928, 47792, 48410, 48199, 49614, 52089, 53370, 54659, 55649, 58005, 61119, 64182, 64847]
  },
  "Tolland": {
    population: [153220, 152960, 151815, 151557, 151407, 151372, 150698, 150527, 150221, 150091, 149443, 155971, 156405],
    employment: [61593, 62213, 62835, 63225, 63327, 63236, 63672, 64018, 64492, 63619, 61507, 62735, 65692],
    income: [44972, 46910, 48201, 48105, 50193, 51468, 52551, 53261, 54815, 57370, 59931, 60304, 61498]
  },
  "Windham": {
    population: [118538, 118301, 117894, 117478, 116715, 116439, 116053, 116328, 116998, 116678, 116290, 116781, 117210],
    employment: [51388, 52027, 52597, 53563, 54132, 53993, 53441, 53412, 53270, 52857, 50885, 52535, 54415],
    income: [37164, 38325, 38845, 38925, 40049, 41301, 42267, 43472, 44383, 47378, 50431, 53289, 53504]
  }
};

// Populate the dropdown menu with county names
var dropdown = d3.select("#county-dropdown");
for (var county in countyData) {
  dropdown.append("option")
          .attr("value", county)
          .text(county);
}

dropdown.on("change", function() {
  var selectedCounty = this.value;
  if (selectedCounty) {
    updateCountyCharts(selectedCounty);
  }
});

// Update charts for the selected county
// function updateCountyCharts(countyName) {
//   var selectedData = countyData[countyName];
//   updateChart(selectedData.population, countyName + " Population", [100000, 400000]);
//   updateChart(selectedData.employment, countyName + " Employment", [100000, 300000]);
//   updateChart(selectedData.income, countyName + " Income", [50000, 70000]);
// }

// Update existing functions to handle multiple charts
// Connecticut Population, Employment, and Per Capita Income Bar Charts
var chartWidth = 800;
var chartHeight = 400;
var margin = {top: 30, right: 20, bottom: 50, left: 70};

var populationData = [3580279, 3594193, 3605259, 3610314, 3614695, 3611995, 3607688, 3607615, 3611318, 3607159, 3597362, 3623355, 3626205];
var employmentData = [2171940, 2206253, 2223243, 2246505, 2266061, 2288144, 2301331, 2300273, 2314465, 2297910, 2217432, 2289551, 2391946];
var incomeData = [61392, 62964, 63555, 61999, 64482, 66220, 67550, 69146, 72157, 74173, 77383, 80691, 82938];
var years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

var chartSvg = d3.select("#chart")
                 .attr("width", chartWidth)
                 .attr("height", chartHeight);

var x = d3.scaleBand()
          .domain(years)
          .range([margin.left, chartWidth - margin.right])
          .padding(0.1);

var y = d3.scaleLinear()
          .range([chartHeight - margin.bottom, margin.top]);

var yAxisLabel = "Population";

chartSvg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .append("text")
        .attr("class", "axis-label")
        .attr("x", chartWidth / 2)
        .attr("y", margin.bottom - 10)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Year");

var yAxis = chartSvg.append("g")
                    .attr("class", "y-axis")
                    .attr("transform", `translate(${margin.left},0)`);

yAxis.append("text")
     .attr("class", "axis-label")
     .attr("x", -margin.left)
     .attr("y", margin.top - 10)
     .attr("fill", "black")
     .attr("text-anchor", "start")
     .text(yAxisLabel);

var bars = chartSvg.selectAll(".bar")
                   .data(populationData)
                   .enter().append("rect")
                   .attr("class", "bar")
                   .attr("x", (d, i) => x(years[i]))
                   .attr("y", d => y(d))
                   .attr("width", x.bandwidth())
                   .attr("height", d => chartHeight - margin.bottom - y(d));

// function updateChart(data, yAxisText, yRange) {
//   y.domain(yRange);

//   yAxis.transition()
//        .duration(750)
//        .call(d3.axisLeft(y));

//   yAxis.select(".axis-label")
//        .text(yAxisText);

//   bars.data(data)
//       .transition()
//       .duration(750)
//       .attr("y", d => y(d))
//       .attr("height", d => chartHeight - margin.bottom - y(d));
// }

function updateChart(data, yAxisText, yRange) {
  y.domain(yRange);

  yAxis.transition()
       .duration(750)
       .call(d3.axisLeft(y));

  yAxis.select(".axis-label")
       .text(yAxisText);

  var bars = chartSvg.selectAll(".bar")
                     .data(data);

  bars.enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(years[i]))
      .attr("width", x.bandwidth())
      .merge(bars)
      .transition()
      .duration(750)
      .attr("y", d => y(d))
      .attr("height", d => chartHeight - margin.bottom - y(d));

  bars.exit().remove();

  // Add annotations
  var annotations = chartSvg.selectAll(".annotation")
                            .data(data);

  annotations.enter().append("text")
              .attr("class", "annotation")
              .attr("x", (d, i) => x(years[i]) + x.bandwidth() / 2)
              .attr("y", d => y(d) - 5) // Adjust as needed to position the annotation
              .attr("text-anchor", "middle")
              .text(d => d)
              .style("font-size", "12px")
              .style("fill", "black")
              .merge(annotations)
              .transition()
              .duration(750)
              .attr("x", (d, i) => x(years[i]) + x.bandwidth() / 2)
              .attr("y", d => y(d) - 5); // Adjust as needed

  annotations.exit().remove();
}

function updateCountyCharts(county) {
  var countyInfo = countyData[county];
  if (!countyInfo) return;

  var years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

  var populationData = countyInfo.population;
  var employmentData = countyInfo.employment;
  var incomeData = countyInfo.income;

  var countyChartSvg = d3.select("#county-chart")
                          .attr("width", chartWidth)
                          .attr("height", chartHeight);

  var x = d3.scaleBand()
            .domain(years)
            .range([margin.left, chartWidth - margin.right])
            .padding(0.1);

  var y = d3.scaleLinear()
            .range([chartHeight - margin.bottom, margin.top]);

  countyChartSvg.selectAll("*").remove(); // Clear existing chart

  countyChartSvg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0,${chartHeight - margin.bottom})`)
                .call(d3.axisBottom(x).tickSizeOuter(0))
                .append("text")
                .attr("class", "axis-label")
                .attr("x", chartWidth / 2)
                .attr("y", margin.bottom - 10)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text("Year");

  var yAxis = countyChartSvg.append("g")
                            .attr("class", "y-axis")
                            .attr("transform", `translate(${margin.left},0)`);

  yAxis.append("text")
       .attr("class", "axis-label")
       .attr("x", -margin.left)
       .attr("y", margin.top - 10)
       .attr("fill", "black")
       .attr("text-anchor", "start");

  function updateCountyChart(data, yAxisText, yRange) {
    y.domain(yRange);

    yAxis.transition()
         .duration(750)
         .call(d3.axisLeft(y));

    yAxis.select(".axis-label")
         .text(yAxisText);

    var bars = countyChartSvg.selectAll(".bar")
                             .data(data);

    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x(years[i]))
        .attr("width", x.bandwidth())
        .merge(bars)
        .transition()
        .duration(750)
        .attr("y", d => y(d))
        .attr("height", d => chartHeight - margin.bottom - y(d));

    bars.exit().remove();

    var annotations = countyChartSvg.selectAll(".annotation")
                                  .data(data);

    annotations.enter().append("text")
                .attr("class", "annotation")
                .attr("x", (d, i) => x(years[i]) + x.bandwidth() / 2)
                .attr("y", d => y(d) - 5) // Adjust as needed to position the annotation
                .attr("text-anchor", "middle")
                .text(d => d)
                .style("font-size", "12px")
                .style("fill", "black")
                .merge(annotations)
                .transition()
                .duration(750)
                .attr("x", (d, i) => x(years[i]) + x.bandwidth() / 2)
                .attr("y", d => y(d) - 5); // Adjust as needed
  
    annotations.exit().remove();
  }

  // Initially display population data
  updateCountyChart(populationData, "Population", [d3.min(populationData) * 0.95, d3.max(populationData) * 1.05]);

  // Add buttons or links to switch between data types
  d3.select("#county-buttons").selectAll("button").remove();

  d3.select("#county-buttons").append("button")
    .text("Population")
    .on("click", function() {
      updateCountyChart(populationData, "Population", [d3.min(populationData) * 0.95, d3.max(populationData) * 1.05]);
    });

  d3.select("#county-buttons").append("button")
    .text("Employment")
    .on("click", function() {
      updateCountyChart(employmentData, "Employment", [d3.min(employmentData) * 0.95, d3.max(employmentData) * 1.05]);
    });

  d3.select("#county-buttons").append("button")
    .text("Income")
    .on("click", function() {
      updateCountyChart(incomeData, "Income", [d3.min(incomeData) * 0.95, d3.max(incomeData) * 1.05]);
    });
}

// Button functionality to switch between visualizations
var pages = ["map", "population", "employment", "income", "counties", "new-page"];
var currentPage = 0;

function showPage(index) {
  // Clear the 'active' class from all containers
  d3.select("#map-container").classed("active", false);
  d3.select("#chart-container").classed("active", false);
  d3.select("#county-charts-container").classed("active", false);
  d3.select(".dropdown-container").classed("active", false);

  // Set the 'active' class based on the index
  if (index === 0) {
    d3.select("#map-container").classed("active", true);
    d3.select("#map").attr("class", "states");
  } else if (index === 1) {
    d3.select("#chart-container").classed("active", true);
    updateChart(populationData, "Population", [3500000, 3700000]);
  } else if (index === 2) {
    d3.select("#chart-container").classed("active", true);
    updateChart(employmentData, "Employment", [2100000, 2400000]);
  } else if (index === 3) {
    d3.select("#chart-container").classed("active", true);
    updateChart(incomeData, "Per Capita Income", [60000, 85000]);
  } else if (index === 4) {
    d3.select("#map-container").classed("active", true);
    d3.select("#map").attr("class", "counties");
  } else if (index === 5) {
    d3.select("#map-container").classed("active", true);
    d3.select("#map").attr("class", "counties");
    d3.select("#county-charts-container").classed("active", true);
    d3.select(".dropdown-container").classed("active", true);
    var selectedCounty = d3.select("#county-dropdown").property("value");
    if (selectedCounty) {
      updateCountyCharts(selectedCounty);
    }
  }

  d3.selectAll(".scene-number").text(`Scene ${index + 1}`);
  
}


// Pagination functionality
d3.select("#next-button").on("click", function() {
  currentPage = (currentPage + 1) % pages.length;
  showPage(currentPage);
});

d3.select("#prev-button").on("click", function() {
  currentPage = (currentPage - 1 + pages.length) % pages.length;
  showPage(currentPage);
});

showPage(currentPage); // Show the initial page
