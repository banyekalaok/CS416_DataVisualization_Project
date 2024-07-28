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
  updateChart(selectedData.population, countyName + " Population", [100000, 400000], "county-population-chart");
  updateChart(selectedData.employment, countyName + " Employment", [100000, 300000], "county-employment-chart");
  updateChart(selectedData.income, countyName + " Income", [50000, 70000], "county-income-chart");
}

// Update existing functions to handle multiple charts
function updateChart(data, yAxisText, yRange, chartId) {
  var chartSvg = d3.select("#" + chartId + " svg");
  var margin = {top: 20, right: 30, bottom: 30, left: 40};
  var chartWidth = 800 - margin.left - margin.right;
  var chartHeight = 400 - margin.top - margin.bottom;
  var years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];

  if (chartSvg.empty()) {
    chartSvg = d3.select("#" + chartId)
                 .append("svg")
                 .attr("width", chartWidth + margin.left + margin.right)
                 .attr("height", chartHeight + margin.top + margin.bottom)
               .append("g")
                 .attr("transform", `translate(${margin.left},${margin.top})`);

    chartSvg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${chartHeight})`);

    chartSvg.append("g")
            .attr("class", "y-axis");

    chartSvg.append("text")
            .attr("class", "axis-label")
            .attr("x", chartWidth / 2)
            .attr("y", chartHeight + margin.bottom - 10)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .text("Year");
  }

  var x = d3.scaleBand()
            .domain(years)
            .range([0, chartWidth])
            .padding(0.1);

  var y = d3.scaleLinear()
            .range([chartHeight, 0])
            .domain(yRange);

  var xAxis = chartSvg.select(".x-axis");
  var yAxis = chartSvg.select(".y-axis");

  xAxis.call(d3.axisBottom(x).tickSizeOuter(0));

  yAxis.transition()
       .duration(750)
       .call(d3.axisLeft(y))
       .select(".axis-label")
       .text(yAxisText);

  var bars = chartSvg.selectAll(".bar")
                     .data(data);

  bars.enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(years[i]))
      .attr("width", x.bandwidth())
      .attr("y", chartHeight)
      .attr("height", 0)
      .merge(bars)
      .transition()
      .duration(750)
      .attr("y", d => y(d))
      .attr("height", d => chartHeight - y(d));

  bars.exit().remove();
}

// Button functionality to switch between visualizations
var pages = ["map", "population", "employment", "income", "counties", "new-page"];
var currentPage = 0;

function showPage(index) {
  d3.select("#map-container").classed("active", index === 0 || index === 4 || index === 5);
  d3.select("#chart-container").classed("active", index === 1 || index === 2 || index === 3);
  d3.select("#county-charts-container").classed("active", index === 4);
  d3.select(".dropdown-container").classed("active", index === 4);

  if (index === 0) {
    d3.select("#map").attr("class", "states");
  } else if (index === 4) {
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
