// Store current weather data (single city snapshot)
let currentWeather = null;

// Store forecast weather data (hourly/5-day forecast)
let forecastWeather = null;

/**
 * Save current weather data to state
 * Called after fetching from weather API
 */
export function setCurrentWeather(cityData) {
  currentWeather = cityData;
}

/**
 * Retrieve current weather data from state
 * Used for refreshing weather and getting city name
 */
export function getCurrentWeather() {
  return currentWeather;
}

/**
 * Save forecast weather data to state
 * Called after fetching from forecast API
 */
export function setForecastWeather(cityData){
  forecastWeather  = cityData
}

/**
 * Retrieve forecast weather data from state
 * Used when toggling temperature units (Celsius/Fahrenheit)
 */
export function getForecastWeather(){
  return forecastWeather
}
