import { getCurrentWeather, getForecastWeather } from "./state";
import { updateTempDisplay } from "./views";

// ========== Temperature Conversion Functions ==========

// Convert Kelvin to Fahrenheit
export function kelvinToFahrenhiet(temp) {
  return ((temp - 273.15) * 9) / 5 + 32;
}

// Convert Kelvin to Celsius
export function kelvinToCelsius(temp) {
  return temp - 273.15;
}

// ========== Date/Time Formatting Functions ==========

/**
 * Format Unix timestamp to readable date
 * Example output: "Wednesday | 12 Nov 2025"
 */
export function formattedDate(dt) {
  const date = new Date(dt * 1000); // Convert Unix timestamp to milliseconds
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  // Split formatted date into parts and remove commas
  const parts = date.toLocaleDateString("en-US", options).split(" ");
  const [weekday, month, day, year] = [parts[0].replace(",", ""), parts[1], parts[2].replace(",", ""), parts[3]];

  return `${weekday} | ${day} ${month} ${year}`;
}

/**
 * Format datetime string to time only (HH.MM format)
 * Example: "2025-11-13 15:00:00" → "15.00"
 */
export function formatTimeLabel(dt_txt) {
  const date = new Date(dt_txt);
  const hours = date.getHours().toString().padStart(2, "0"); // Ensure 2 digits (e.g., "09")
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure 2 digits
  return `${hours}.${minutes}`;
}

/**
 * Format date to short format (DD DAY)
 * Example output: "13 THU"
 */
export function formatDateLabel(dt_txt) {
  const date = new Date(dt_txt);
  const options = {
    weekday: "short",
    day: "numeric",
  };
  const formatted = date.toLocaleDateString("en-US", options).toUpperCase();

  return formatted;
}

// ========== UI Toggle Functions ==========

// Initialize temperature unit toggle (Celsius/Fahrenheit)
export function toggleLabel() {
  const switchTemp = document.querySelector("#switchTemp");
  const toggleLabel = document.querySelector("#toggleLabel");

  // Set initial label based on checkbox state
  // &#8457: Fahrenheit symbol (℉), &#8451: Celsius symbol (℃)
  if (switchTemp.checked) {
    toggleLabel.innerHTML = "&#8457;";
  } else {
    toggleLabel.innerHTML = "&#8451;";
  }

  // Handle toggle change event
  switchTemp.addEventListener("change", () => {
    const isFahrenheitSelected = switchTemp.checked;
    toggleLabel.innerHTML = isFahrenheitSelected ? "&#8457;" : "&#8451;";

    // Get current weather data from state
    const weatherData = getCurrentWeather();
    const forecastData = getForecastWeather();

    // Re-render all weather sections with new temperature unit
    if (weatherData) {
      updateTempDisplay(isFahrenheitSelected, weatherData, forecastData);
    }
  });
}

// Initialize theme toggle (Dark/Light mode)
export function toggleTheme() {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;  // Check system preference
  const switchTheme = document.querySelector("#switchTheme");
  const themeIcon = document.querySelector("#themeIcon");

  // Determine initial theme: localStorage > system preference > light (default)
  const isDarkMode = storedTheme === "dark" || (!storedTheme && prefersDark);

  // Set initial theme
  if (isDarkMode) {
    document.documentElement.classList.add("dark"); // Tailwind dark mode class
    themeIcon.textContent = "moon_stars";
    switchTheme.checked = true;
  } else {
    document.documentElement.classList.remove("dark");
    themeIcon.textContent = "sunny";
    switchTheme.checked = false;
  }

  // Handle toggle change event
  switchTheme.addEventListener("change", () => {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      // Switch to light mode
      document.documentElement.classList.remove("dark");
      themeIcon.textContent = "sunny";
      localStorage.setItem("theme", "light");
    } else {
      // Switch to dark mode
      document.documentElement.classList.add("dark");
      themeIcon.textContent = "moon_stars";
      localStorage.setItem("theme", "dark");
    }
  });
}

// ========== Dynamic Background Function ==========

// Change background image based on weather condition
export function changeBgWeather(weatherType) {
  const weatherInfo = document.querySelector("#weatherInfo");

  // Remove all weather background classes
  weatherInfo.classList.remove("bg-sunny", "bg-cloudy", "bg-rainy", "bg-snow", "bg-foggy", "bg-thunder-storm", "bg-clear");

  // Add appropriate background class based on weather type
  if (weatherType === "Clouds") {
    weatherInfo.classList.add("bg-cloudy");
  } else if (weatherType === "Rain") {
    weatherInfo.classList.add("bg-rainy");
  } else if (weatherType === "Clear") {
    weatherInfo.classList.add("bg-clear");
  } else if (weatherType === "Snow") {
    weatherInfo.classList.add("bg-snow");
  } else if (weatherType === "Thunderstorm") {
    weatherInfo.classList.add("bg-thunder-storm");
  } else if (weatherType === "Drizzle") {
    weatherInfo.classList.add("bg-drizzle");
  } else if (weatherType === "Mist" || weatherType === "Haze" || weatherType === "Fog") {
    weatherInfo.classList.add("bg-foggy");
  } else {
    // Default fallback
    weatherInfo.classList.add("bg-sunny");
  }
}

// ========== Time Display Function ==========

// Update real-time clock display (HH:MM format)
export function updateTimeDisplay() {
  const timeDisplayEl = document.querySelector("#timeDisplay");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); // Ensure 2 digits
  const minutes = now.getMinutes().toString().padStart(2, "0"); // Ensure 2 digits
  timeDisplayEl.textContent = `${hours}:${minutes}`;
}
