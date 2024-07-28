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
  updateChart(d3.select("#county-population-svg"), selectedData.population, countyName + " Population", [100000, 400000]);
  updateChart(d3.select("#county-employment-svg"), selectedData.employment, countyName + " Employment", [100000, 300000]);
  updateChart(d3.select("#county-income-svg"), selectedData.income, countyName + " Income", [50000, 70000]);
}

// Function to update a bar chart
function updateChart(svg, data, yAxisText, yRange) {
  var width = 800, height = 400, margin = {top: 30, right: 20, bottom: 50, left: 50};
  
  var x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

  var y = d3.scaleLinear()
            .range([height - margin.bottom, margin.top])
            .domain(yRange);

  var yAxis = d3.axisLeft(y);

  svg.attr("width", width)
     .attr("height", height);

  svg.selectAll("*").remove();  // Clear existing content

  svg.append("g")
     .attr("class", "x-axis")
     .attr("transform", `translate(0,${height - margin.bottom})`)
     .call(d3.axisBottom(x).tickFormat(i => 2010 + i))
     .append("text")
     .attr("class", "axis-label")
     .attr("x", width / 2)
     .attr("y", margin.bottom - 10)
     .attr("fill", "black")
     .attr("text-anchor", "middle")
     .text("Year");

  svg.append("g")
     .attr("class", "y-axis")
     .attr("transform", `translate(${margin.left},0)`)
     .call(yAxis)
     .append("text")
     .attr("class", "axis-label")
     .attr("x", -margin.left)
     .attr("y", margin.top - 10)
     .attr("fill", "black")
     .attr("text-anchor", "start")
     .text(yAxisText);

  svg.selectAll(".bar")
     .data(data)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", (d, i) => x(i))
     .attr("y", d => y(d))
     .attr("width", x.bandwidth())
     .attr("height", d => height - margin.bottom - y(d));
}

// Page handling logic
var pageIndex = 0;
var pageCount = 6;

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
    updateChart(d3.select("#population-chart-svg"), populationData, "Population", [3500000, 3700000]);
  } else if (index === 2) {
    d3.select("#chart-container").classed("active", true);
    updateChart(d3.select("#employment-chart-svg"), employmentData, "Employment", [2100000, 2400000]);
  } else if (index === 3) {
    d3.select("#chart-container").classed("active", true);
    updateChart(d3.select("#income-chart-svg"), incomeData, "Per Capita Income", [60000, 85000]);
  } else if (index === 4) {
    d3.select("#map-container").classed("active", true);
    d3.select("#map").attr("class", "counties");
  } else if (index === 5) {
    d3.select("#map-container").classed("active", true);
    d3.select("#map").attr("class", "counties");
    d3.select("#county-charts-container").classed("active", true);
    d3.select(".dropdown-container").classed("active", true);
    var selectedCounty = dropdown.property("value");
    updateCountyCharts(selectedCounty);
  }
}

d3.select("#prev-button").on("click", function() {
  pageIndex = (pageIndex - 1 + pageCount) % pageCount;
  showPage(pageIndex);
});

d3.select("#next-button").on("click", function() {
  pageIndex = (pageIndex + 1) % pageCount;
  showPage(pageIndex);
});

showPage(pageIndex);
