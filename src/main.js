import "./style.css";
import { getDailyForecast, getHourlyForecast } from "./Modules/weatherApi";
import { toggleLabel, toggleTheme, updateTimeDisplay } from "./Modules/helpers";
import { getCurrentWeather } from "./Modules/state";
import { initSearchCity } from "./Modules/search";
import { initRadarIcon } from "./Modules/geoLocation";

// Initialize app when DOM is fully loaded
window.addEventListener("load", async () => {
  const defaultCity = "Jakarta";

  // Initialize UI controls (theme, temperature unit, search, geolocation)
  toggleLabel();
  toggleTheme();
  initSearchCity();
  initRadarIcon();

  // fecth current weather and forecast data for the default city
  await getDailyForecast(defaultCity);
  await getHourlyForecast(defaultCity);

  // Start real-time clock display
  updateTimeDisplay();

  // Refresh weather data every 5 minutes
  setInterval(() => {
    const currentCity = getCurrentWeather()?.name || defaultCity;
    getDailyForecast(currentCity);
    getHourlyForecast(currentCity);
  }, 300000);

  // Update clock display every second
  setInterval(() => {
    updateTimeDisplay();
  }, 1000);
});
