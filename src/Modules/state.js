// state.js
let currentWeather = null;

export function setCurrentWeather(cityData) {
  currentWeather = cityData;
}

export function getCurrentWeather() {
  return currentWeather;
}
