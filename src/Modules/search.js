import { getDailyForecast, getHourlyForecast } from "./weatherApi";

// Initialize city search feature
export function initSearchCity() {
  const searchFormEl = document.querySelector("#searchForm");
  const searchCityField = document.querySelector("#search");

  // Handle search form submission
  function handleSearchCity(e) {
    e.preventDefault(); // Prevent page reload on form submit

    const inputSearchCity = searchCityField.value.trim(); // Remove whitespace

    if (inputSearchCity === "") {
      alert("City name cannot be empty");
    } else {
      // Fetch weather data for searched city
      getDailyForecast(inputSearchCity);
      getHourlyForecast(inputSearchCity);

      // Clear input field after successful search
      searchCityField.value = "";
    }
  }

  // Form submit event handles both Enter key and button click
  searchFormEl.addEventListener("submit", handleSearchCity);
}
