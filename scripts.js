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

function updateCountyCharts(countyName) {
  var selectedData = countyData[countyName];
  updateChart(selectedData.population, countyName + " Population", [100000, 400000], "county-population-chart");
  updateChart(selectedData.employment, countyName + " Employment", [100000, 300000], "county-employment-chart");
  updateChart(selectedData.income, countyName + " Income", [50000, 70000], "county-income-chart");
}

// Update existing functions to handle multiple charts
function updateChart(data, yAxisText, yRange, chartId) {
  var chartSvg = d3.select("#" + chartId + " svg");

  if (chartSvg.empty()) {
    chartSvg = d3.select("#" + chartId)
                 .append("svg")
                 .attr("width", chartWidth)
                 .attr("height", chartHeight);

    chartSvg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${chartHeight - margin.bottom})`);

    chartSvg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin.left},0)`)
            .append("text")
            .attr("class", "axis-label")
            .attr("x", -margin.left)
            .attr("y", margin.top - 10)
            .attr("fill", "black")
            .attr("text-anchor", "start");
  }

  var x = d3.scaleBand()
            .domain(years)
            .range([margin.left, chartWidth - margin.right])
            .padding(0.1);

  var y = d3.scaleLinear()
            .range([chartHeight - margin.bottom, margin.top])
            .domain(yRange);

  var xAxis = chartSvg.select(".x-axis");
  var yAxis = chartSvg.select(".y-axis");

  xAxis.call(d3.axisBottom(x).tickSizeOuter(0))
       .select(".axis-label")
       .attr("x", chartWidth / 2)
       .attr("y", margin.bottom - 10)
       .attr("fill", "black")
       .attr("text-anchor", "middle")
       .text("Year");

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
      .attr("y", y(0))
      .attr("height", 0)
      .merge(bars)
      .transition()
      .duration(750)
      .attr("y", d => y(d))
      .attr("height", d => chartHeight - margin.bottom - y(d));

  bars.exit().remove();
}

// Button functionality to switch between visualizations
var pages = ["states", "chart", "chart", "chart", "counties", "new-page"];
var currentPage = 0;

function showPage(index) {
  d3.select("#map-container").classed("active", index === 0 || index === 4 || index === 5);
  d3.select("#chart-container").classed("active", index === 1 || index === 2 || index === 3);
  d3.select("#county-charts-container").classed("active", index === 5);
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
