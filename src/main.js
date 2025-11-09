import "./style.css";
import { getDailyForecast } from "./Modules/weatherApi";
import { toggleLabel, toggleTheme, updateTimeDisplay } from "./Modules/helpers";

window.addEventListener("load", () => {
  toggleLabel();
  toggleTheme();
  updateTimeDisplay();
  setInterval(updateTimeDisplay, 1000);
  getDailyForecast("subang");
  setInterval(() => getDailyForecast("subang"), 180000);
});
