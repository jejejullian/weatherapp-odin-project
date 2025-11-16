import { setCurrentWeather, setForecastWeather } from "./state.js";
import { render5DaysForecast, renderDailyForecast, renderHourlyForecast } from "./views.js";

export async function getDailyForecast(cityOrCoords) {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    let url;

    if (typeof cityOrCoords === "string") {
      // Query by city name
      url = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrCoords}&appid=${apiKey}`;
    } else {
      // Query by coordinates
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}&appid=${apiKey}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const cityData = await response.json();
    setCurrentWeather(cityData);
    renderDailyForecast(cityData);
  } catch (err) {
    console.error("Failed to fetch weather:", err.message);
  }
}

export async function getHourlyForecast(cityOrCoords) {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    let url;

    if (typeof cityOrCoords === "string") {
      // Query by city name
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityOrCoords}&appid=${apiKey}`;
    } else {
      // Query by coordinates
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}&appid=${apiKey}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const cityData = await response.json();
    setForecastWeather(cityData);
    renderHourlyForecast(cityData);
    render5DaysForecast(cityData);
  } catch (err) {
    console.error("Failed to fetch weather:", err.message);
  }
}
