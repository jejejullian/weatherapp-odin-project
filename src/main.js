import "./style.css";
import { getDailyForecast } from "./Modules/weatherApi";
import { toggleLabel, updateTimeDisplay } from "./Modules/helpers";

window.addEventListener("load", () => {
  toggleLabel();
  updateTimeDisplay();
  setInterval(updateTimeDisplay, 1000);
  getDailyForecast("subang");
  setInterval(()=> getDailyForecast('subang'),180000)
});
