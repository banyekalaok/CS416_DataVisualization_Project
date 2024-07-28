// Dummy data for counties (for dropdown functionality)
var countyData = {
  "Fairfield": {
    population: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000, 360000],
    employment: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000],
    income: [60000, 60500, 61000, 61500, 62000, 62500, 63000, 63500, 64000, 64500, 65000, 65500, 66000]
  },
  "Hartford": {
    population: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000, 360000],
    employment: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000],
    income: [60000, 60500, 61000, 61500, 62000, 62500, 63000, 63500, 64000, 64500, 65000, 65500, 66000]
  },
  "Litchfield": {
    population: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000, 360000],
    employment: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000],
    income: [60000, 60500, 61000, 61500, 62000, 62500, 63000, 63500, 64000, 64500, 65000, 65500, 66000]
  },
  "Middlesex": {
    population: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000, 360000],
    employment: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000],
    income: [60000, 60500, 61000, 61500, 62000, 62500, 63000, 63500, 64000, 64500, 65000, 65500, 66000]
  },
  "New Haven": {
    population: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000, 360000],
    employment: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000],
    income: [60000, 60500, 61000, 61500, 62000, 62500, 63000, 63500, 64000, 64500, 65000, 65500, 66000]
  },
  "New London": {
    population: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000, 360000],
    employment: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000],
    income: [60000, 60500, 61000, 61500, 62000, 62500, 63000, 63500, 64000, 64500, 65000, 65500, 66000]
  },
  "Tolland": {
    population: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000, 360000],
    employment: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000],
    income: [60000, 60500, 61000, 61500, 62000, 62500, 63000, 63500, 64000, 64500, 65000, 65500, 66000]
  },
  "Windham": {
    population: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000, 360000],
    employment: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000],
    income: [60000, 60500, 61000, 61500, 62000, 62500, 63000, 63500, 64000, 64500, 65000, 65500, 66000]
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
function updateCountyCharts(countyName) {
  var selectedData = countyData[countyName];
  updateChart(selectedData.population, countyName + " Population", [100000, 400000]);
  updateChart(selectedData.employment, countyName + " Employment", [100000, 300000]);
  updateChart(selectedData.income, countyName + " Income", [50000, 70000]);
}

// Update existing functions to handle multiple charts
// Connecticut Population, Employment, and Per Capita Income Bar Charts
var chartWidth = 800;
var chartHeight = 400;
var margin = {top: 30, right: 20, bottom: 50, left: 50};

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

function updateChart(data, yAxisText, yRange) {
  y.domain(yRange);

  yAxis.transition()
       .duration(750)
       .call(d3.axisLeft(y));

  yAxis.select(".axis-label")
       .text(yAxisText);

  bars.data(data)
      .transition()
      .duration(750)
      .attr("y", d => y(d))
      .attr("height", d => chartHeight - margin.bottom - y(d));
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
    // updateCountyCharts(county);
  }
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
