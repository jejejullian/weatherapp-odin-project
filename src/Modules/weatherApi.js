import { setCurrentWeather, setForecastWeather } from "./state.js";
import { renderDailyForecast, renderHourlyForecast } from "./views.js";

export async function getDailyForecast(city) {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

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

export async function getHourlyForecast(city) {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const cityData = await response.json();
    setForecastWeather(cityData);
    renderHourlyForecast(cityData);
  } catch (err) {
    console.error("Failed to fetch weather:", err.message);
  }
}
