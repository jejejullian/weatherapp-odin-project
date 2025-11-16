import "./style.css";
import { getDailyForecast, getHourlyForecast } from "./Modules/weatherApi";
import { toggleLabel, toggleTheme, updateTimeDisplay } from "./Modules/helpers";
import { getCurrentWeather } from "./Modules/state";
import { initSearchCity } from "./Modules/search";
import { initRadarIcon } from "./Modules/geoLocation";

window.addEventListener("load", async () => {
  const defaultCity = "Jakarta";

  // initialize temperature toggle and theme toggle (dark/light)
  toggleLabel();
  toggleTheme();
  initSearchCity()
  initRadarIcon()

  // fecth current weather and forecast data for the default city
  await getDailyForecast(defaultCity);
  await getHourlyForecast(defaultCity);

  updateTimeDisplay();

  // refresh both weather and forecast data every 5 minutes
  setInterval(() => {
    const currentCity = getCurrentWeather()?.name || defaultCity;
    getDailyForecast(currentCity);
    getHourlyForecast(currentCity);
  }, 300000);

  // update the time display every second according to the city's timeone
  setInterval(() => {
    updateTimeDisplay();
  }, 1000);
});
