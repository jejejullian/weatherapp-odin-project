// state.js
let currentWeather = null;
let forecastWeather = null;

export function setCurrentWeather(cityData) {
  currentWeather = cityData;
}

export function getCurrentWeather() {
  return currentWeather;
}

export function setForecastWeather(cityData){
  forecastWeather  = cityData
}

export function getForecastWeather(){
  return forecastWeather
}
