// Dummy data for counties will be updated with actual data from the CSV file
var countyData = {};

// Read data from CSV and populate the countyData object
d3.csv("ct_emp_inc.csv").then(function(data) {
  data.forEach(function(d) {
    var county = d.county;
    if (!countyData[county]) {
      countyData[county] = {
        population: [],
        employment: [],
        income: []
      };
    }
    countyData[county].population.push(+d.population);
    countyData[county].employment.push(+d.employment);
    countyData[county].income.push(+d.income);
  });

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
});

// Function to update all three charts for the selected county
function updateCountyCharts(countyName) {
  var selectedData = countyData[countyName];
  updateChart(selectedData.population, countyName + " Population", [d3.min(selectedData.population) - 10000, d3.max(selectedData.population) + 10000], "population-chart");
  updateChart(selectedData.employment, countyName + " Employment", [d3.min(selectedData.employment) - 10000, d3.max(selectedData.employment) + 10000], "employment-chart");
  updateChart(selectedData.income, countyName + " Income", [d3.min(selectedData.income) - 5000, d3.max(selectedData.income) + 5000], "income-chart");
}

// Connecticut Population, Employment, and Per Capita Income Bar Charts
var chartWidth = 1163;
var chartHeight = 720;
var margin = {top: 30, right: 20, bottom: 50, left: 50};

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
                   .data([])
                   .enter().append("rect")
                   .attr("class", "bar")
                   .attr("x", (d, i) => x(years[i]))
                   .attr("y", d => y(d))
                   .attr("width", x.bandwidth())
                   .attr("height", d => chartHeight - margin.bottom - y(d));

function updateChart(data, yAxisText, yRange, chartId) {
  y.domain(yRange);

  d3.select("#" + chartId + " .y-axis")
    .transition()
    .duration(750)
    .call(d3.axisLeft(y));

  d3.select("#" + chartId + " .y-axis .axis-label")
    .text(yAxisText);

  d3.selectAll("#" + chartId + " .bar")
    .data(data)
    .transition()
    .duration(750)
    .attr("y", d => y(d))
    .attr("height", d => chartHeight - margin.bottom - y(d));
}

// Button functionality to switch between visualizations
var pages = ["states", "chart", "chart", "chart", "counties", "new-page"];
var currentPage = 0;

function showPage(index) {
  d3.select("#map-container").classed("active", index === 0 || index === 4 || index === 5);
  d3.select("#chart-container").classed("active", index === 1 || index === 2 || index === 3 || index === 5);
  d3.select(".dropdown-container").classed("active", index === 5);

  // Update class for map image
  if (index === 0) {
    d3.select("#map").attr("class", "states");
  } else if (index === 4 || index === 5) {
    d3.select("#map").attr("class", "counties");
  } else {
    d3.select("#map").attr("class", "");
  }

  if (index === 1) {
    updateChart(populationData, "Population", [3500000, 3700000], "chart");
  } else if (index === 2) {
    updateChart(employmentData, "Employment", [2100000, 2400000], "chart");
  } else if (index === 3) {
    updateChart(incomeData, "Per Capita Income", [60000, 85000], "chart");
  }
}

d3.select("#next-button").on("click", function() {
  currentPage = (currentPage + 1) % pages.length;
  showPage(currentPage);
});

d3.select("#prev-button").on("click", function() {
  currentPage = (currentPage - 1 + pages.length) % pages.length;
  showPage(currentPage);
});

showPage(currentPage); // Show the initial page
