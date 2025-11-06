// state.js
let currentWeather = null;

export function setCurrentWeather(data) {
  currentWeather = data;
}

export function getCurrentWeather() {
  return currentWeather;
}
