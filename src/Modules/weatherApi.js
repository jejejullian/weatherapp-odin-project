import { setCurrentWeather, setForecastWeather } from "./state.js";
import { render5DaysForecast, renderDailyForecast, renderHourlyForecast } from "./views.js";

/**
 * Fetch current weather data
 * @param {string|object} cityOrCoords - City name (string) or coordinates ({lat, lon})
 */
export async function getDailyForecast(cityOrCoords) {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    let url;

    // Build API URL based on parameter type
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

    // Store data in state and render UI
    setCurrentWeather(cityData);
    renderDailyForecast(cityData);
  } catch (err) {
    console.error("Failed to fetch weather:", err.message);
  }
}

/**
 * Fetch hourly and 5-day forecast data
 * @param {string|object} cityOrCoords - City name (string) or coordinates ({lat, lon})
 */
export async function getHourlyForecast(cityOrCoords) {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    let url;

    // Build API URL based on parameter type
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

    // Store data in state and render UI
    setForecastWeather(cityData);
    renderHourlyForecast(cityData);
    render5DaysForecast(cityData);
  } catch (err) {
    console.error("Failed to fetch weather:", err.message);
  }
}
