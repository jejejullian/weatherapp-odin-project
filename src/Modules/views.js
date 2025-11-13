import { changeBgWeather, formattedDate, formatTimeLabel, kelvinToCelsius, kelvinToFahrenhiet } from "./helpers";

let isFahrenheitSelected = false;

export function updateTempDisplay(fahrenheitMode, weatherData, forecastData) {
  isFahrenheitSelected = fahrenheitMode;
  renderDailyForecast(weatherData);

  if(forecastData){
    renderHourlyForecast(forecastData)
  }
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

export function renderHourlyForecast(weatherData) {
  const hourlyForecastEl = document.querySelector("#hourlyForecast");
  hourlyForecastEl.innerHTML = "";

  if (weatherData && weatherData.list) {
    const hourlyData = weatherData.list.slice(0, 8);
    for (const item of hourlyData) {
      const { main, weather, dt_txt } = item;
      let { temp, humidity } = main;
      const { description, icon } = weather[0];

      const timeLabel = formatTimeLabel(dt_txt, item === hourlyData[0]);

      const degreeSym = "&#176;";
      let tempUnit = "C";

      if (isFahrenheitSelected) {
        temp = kelvinToFahrenhiet(temp);
        tempUnit = "F";
      } else {
        temp = kelvinToCelsius(temp);
      }

      const hourlyForecasItem = document.createElement("article");
      hourlyForecasItem.className = "w-32 shrink-0 flex flex-col items-center justify-center rounded-2xl p-4 bg-white/85 dark:bg-neutral-900";
      hourlyForecasItem.innerHTML = `
          <p class="font-semibold text-neutral-900 dark:text-white">${timeLabel}</p>
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt='${description}' class="w-18 drop-shadow-[0_0_20px_#ffff]" />
          <p class="text-lg font-bold 
         text-neutral-900 dark:text-white">${Math.round(temp)}${degreeSym}${tempUnit}</p>
          <p class="text-xs font-semibold text-neutral-900 dark:text-gray-300 text-center text-wrap capitalize">${description}</p>
          <p class="text-xs text-neutral-600 dark:text-gray-400">Rain ${humidity}%</p>
      `;

      hourlyForecastEl.append(hourlyForecasItem);
    }
  }
}
