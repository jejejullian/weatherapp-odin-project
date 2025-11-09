import { changeBgWeather, formattedDate, kelvinToCelsius, kelvinToFahrenhiet } from "./helpers";

let isFahrenheitSelected = false;

export function updateTempDisplay(fahrenheitMode, weatherData) {
  isFahrenheitSelected = fahrenheitMode;
  renderDailyForecast(weatherData);
}

export function renderDailyForecast(weatherData) {
  const cityNameEl = document.querySelector("#weatherCity");
  const dateEL = document.querySelector("#weatherDate");
  const tempEl = document.querySelector("#weatherTemp");
  const descEl = document.querySelector("#weatherDesc");
  const iconEl = document.querySelector("#weatherIcon");
  const feelsEl = document.querySelector("#weatherFeels");
  const humidityEl = document.querySelector("#weatherHumidity");
  const minEl = document.querySelector("#weatherMin");
  const maxEl = document.querySelector("#weatherMax");

  if (weatherData) {
    const { dt, main, name, weather } = weatherData;
    let { temp, feels_like, temp_min, temp_max, humidity } = main;
    const { description, icon } = weather[0];
    const degreeSym = "&#176;";
    const percentSym = "&#x25;";
    const weatherType = weather[0].main;
    let tempUnit = "C";

    if (isFahrenheitSelected) {
      temp = kelvinToFahrenhiet(temp);
      feels_like = kelvinToFahrenhiet(feels_like);
      temp_min = kelvinToFahrenhiet(temp_min);
      temp_max = kelvinToFahrenhiet(temp_max);
      tempUnit = "F";
    } else {
      temp = kelvinToCelsius(temp);
      feels_like = kelvinToCelsius(feels_like);
      temp_min = kelvinToCelsius(temp_min);
      temp_max = kelvinToCelsius(temp_max);
    }

    cityNameEl.textContent = name;
    dateEL.textContent = formattedDate(dt);
    tempEl.innerHTML = `${Math.round(temp)}${degreeSym}${tempUnit}`;
    descEl.textContent = description;
    iconEl.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconEl.alt = description;
    feelsEl.innerHTML = `${Math.round(feels_like)}${degreeSym}${tempUnit}`;
    humidityEl.innerHTML = `${humidity}${percentSym}`;
    minEl.innerHTML = `${Math.round(temp_min)}${degreeSym}${tempUnit}`;
    maxEl.innerHTML = `${Math.round(temp_max)}${degreeSym}${tempUnit}`;

    changeBgWeather(weatherType);
  }
}
