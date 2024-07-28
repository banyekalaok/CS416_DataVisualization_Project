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

var currentIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
  var mapContainer = document.getElementById("map-container");
  var chartContainer = document.getElementById("chart-container");
  var countyChartsContainer = document.getElementById("county-charts-container");
  var dropdownContainer = document.querySelector(".dropdown-container");
  var countyDropdown = document.getElementById("county-dropdown");
  var countyPopulationChart = document.getElementById("county-population-chart");
  var countyEmploymentChart = document.getElementById("county-employment-chart");
  var countyIncomeChart = document.getElementById("county-income-chart");

  var countyDropdownOptions = Object.keys(countyData).map(function(county) {
    return `<option value="${county}">${county}</option>`;
  }).join('');
  countyDropdown.innerHTML += countyDropdownOptions;

  document.getElementById("prev-button").addEventListener("click", function() {
    if (currentIndex > 0) {
      currentIndex--;
      showPage(currentIndex);
    }
  });

  document.getElementById("next-button").addEventListener("click", function() {
    if (currentIndex < 5) {
      currentIndex++;
      showPage(currentIndex);
    }
  });

  countyDropdown.addEventListener("change", function() {
    var selectedCounty = countyDropdown.value;
    if (selectedCounty) {
      updateChart(countyPopulationChart, countyData[selectedCounty].population, "Population");
      updateChart(countyEmploymentChart, countyData[selectedCounty].employment, "Employment");
      updateChart(countyIncomeChart, countyData[selectedCounty].income, "Income");
    }
  });

  function showPage(index) {
    mapContainer.classList.toggle("active", index === 0 || index === 4);
    chartContainer.classList.toggle("active", index === 1 || index === 2 || index === 3);
    countyChartsContainer.classList.toggle("active", index === 5);
    dropdownContainer.classList.toggle("hidden", index !== 4 && index !== 5);
    switch(index) {
      case 0:
        document.querySelector("#map").className = "states";
        break;
      case 4:
        document.querySelector("#map").className = "counties";
        break;
      case 5:
        // Clear previous chart content
        countyPopulationChart.innerHTML = '';
        countyEmploymentChart.innerHTML = '';
        countyIncomeChart.innerHTML = '';
        countyDropdown.value = '';
        break;
    }
  }

  function updateChart(container, data, label) {
    container.innerHTML = ''; // Clear previous chart content

    var svg = d3.select(container)
      .append("svg")
      .attr("width", 500)
      .attr("height", 300);

    var x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, 500])
      .padding(0.1);

    var y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .nice()
      .range([300, 0]);

    svg.append("g")
      .attr("transform", "translate(0,300)")
      .call(d3.axisBottom(x).tickFormat(function(d, i) { return 2010 + i; }));

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return x(i); })
      .attr("y", function(d) { return y(d); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return 300 - y(d); });

    svg.append("text")
      .attr("x", 250)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .text(label + " (2010-2022)");
  }

  showPage(currentIndex); // Initial page display
});
