import { getDailyForecast, getHourlyForecast } from "./weatherApi";

export function initSearchCity() {
  const searchFormEl = document.querySelector("#searchForm");
  const searchCityField = document.querySelector("#search");

  function handleSearchCity(e) {
    e.preventDefault();
    const inputSearchCity = searchCityField.value.trim();
    if (inputSearchCity === "") {
      alert("inputnya kosong bro");
    } else {
      getDailyForecast(inputSearchCity);
      getHourlyForecast(inputSearchCity);
      searchCityField.value = "";
    }
  }

  searchFormEl.addEventListener("submit", handleSearchCity);
}
