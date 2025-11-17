import { changeBgWeather, formatDateLabel, formattedDate, formatTimeLabel, kelvinToCelsius, kelvinToFahrenhiet } from "./helpers";

// Track current temperature unit preference
let isFahrenheitSelected = false;

// Update temperature display when user toggles Celsius/Fahrenheit
export function updateTempDisplay(fahrenheitMode, weatherData, forecastData) {
  isFahrenheitSelected = fahrenheitMode;
  renderDailyForecast(weatherData);

  // Re-render forecast sections if data exists
  if (forecastData) {
    renderHourlyForecast(forecastData);
    render5DaysForecast(forecastData);
  }
}

// Render current weather section (main display)
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
    // Destructure API response data
    const { dt, main, name, weather } = weatherData;
    let { temp, feels_like, temp_min, temp_max, humidity } = main;
    const { description, icon } = weather[0];

    // HTML entity symbols for display
    const degreeSym = "&#176;"; // Degree symbol (°)
    const percentSym = "&#x25;"; // Percent symbol (%)
    const weatherType = weather[0].main;
    let tempUnit = "C";

    // Convert temperatures based on selected unit
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

    // Update DOM with weather data
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

    // Change background based on weather condition
    changeBgWeather(weatherType);
  }
}

// Render hourly forecast section (next 8 time slots)
export function renderHourlyForecast(weatherData) {
  const hourlyForecastEl = document.querySelector("#hourlyForecast");
  hourlyForecastEl.innerHTML = ""; // Clear previous content

  if (weatherData && weatherData.list) {
    // Get first 8 forecast items (approximately next 24 hours)
    const hourlyData = weatherData.list.slice(0, 8);

    for (const item of hourlyData) {
      // Destructure API response data
      const { main, weather, dt_txt } = item;
      let { temp, humidity } = main;
      const { description, icon } = weather[0];

      const timeLabel = formatTimeLabel(dt_txt);

      const degreeSym = "&#176;"; // Degree symbol (°)
      let tempUnit = "C";

      // Convert temperature based on selected unit
      if (isFahrenheitSelected) {
        temp = kelvinToFahrenhiet(temp);
        tempUnit = "F";
      } else {
        temp = kelvinToCelsius(temp);
      }

      // Create forecast card element
      const hourlyForecasItem = document.createElement("article");
      hourlyForecasItem.className = "w-32 shrink-0 flex flex-col items-center justify-center rounded-2xl p-4 bg-white/85 dark:bg-neutral-900";
      hourlyForecasItem.innerHTML = `
          <p class="font-semibold text-neutral-900 dark:text-white">${timeLabel}</p>
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt='${description}' class="w-18 drop-shadow-[0_0_20px_#ffff]" />
          <p class="text-lg font-bold 
         text-neutral-900 dark:text-white">${Math.round(temp)}${degreeSym}${tempUnit}</p>
          <p class="text-xs font-semibold text-neutral-900 dark:text-gray-300 text-center text-wrap capitalize">${description}</p>
          <div class="flex items-center mt-0.5">
            <span class="material-symbols-outlined text-neutral-600 dark:text-gray-400" style="font-size: 1rem"> humidity_percentage </span>
            <p class="text-xs text-neutral-600 dark:text-gray-400">${humidity}%</p>
          </div>
      `;

      hourlyForecastEl.append(hourlyForecasItem);
    }
  }
}

// Render 5-day forecast section (5 days × 5 time slots per day)
export function render5DaysForecast(weatherData) {
  const fiveDaysForecastEl = document.querySelector("#fiveDaysForecast");
  fiveDaysForecastEl.innerHTML = ""; // Clear previous content

  let processedDates = []; // Track which dates we've already processed
  let dailyForecasts = []; // Store filtered forecast data

  // Get today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  if (weatherData && weatherData.list) {
    // First loop: Filter data to get 5 days (skip today, 5 time slots per day)
    for (let i = 0; i < weatherData.list.length; i++) {
      const item = weatherData.list[i];
      const { dt_txt } = item;
      const dateLabel = dt_txt.split(" ")[0]; // Extract date only (YYYY-MM-DD)

      // Check if this date is new and not today
      if (!processedDates.includes(dateLabel) && dateLabel !== today) {
        // Get 5 consecutive time slots starting from current index
        const fiveHourlyData = weatherData.list.slice(i, i + 5);
        dailyForecasts.push({
          date: dateLabel,
          items: fiveHourlyData,
        });
        processedDates.push(dateLabel);

        // Stop after collecting 5 days
        if (dailyForecasts.length >= 5) {
          break;
        }
      }
    }

    // Second loop: Render filtered forecast data
    for (const dayData of dailyForecasts) {
      const { date, items } = dayData;
      const formattedDate = formatDateLabel(date); // Format as "13 THU"

      // Render each time slot for this day
      for (const item of items) {
        const { main, weather, dt_txt } = item;
        let { temp, humidity } = main;
        const { description, icon } = weather[0];

        const timeLabel = formatTimeLabel(dt_txt);

        const degreeSym = "&#176;"; // Degree symbol (°)
        let tempUnit = "C";

        // Convert temperature based on selected unit
        if (isFahrenheitSelected) {
          temp = kelvinToFahrenhiet(temp);
          tempUnit = "F";
        } else {
          temp = kelvinToCelsius(temp);
        }

        // Create forecast card element
        const fiveDaysForecastItem = document.createElement("article");
        fiveDaysForecastItem.className = "w-32 shrink-0 flex flex-col items-center justify-center rounded-2xl p-4 bg-white/85 dark:bg-neutral-900";
        fiveDaysForecastItem.innerHTML = `
          <div class="flex flex-col items-center">
            <p class="font-semibold text-neutral-900 dark:text-white">${formattedDate}</p>
            <p class="font-semibold text-neutral-900 dark:text-white leading-tight">${timeLabel}</p>
          </div>
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt='${description}' class="w-18 drop-shadow-[0_0_20px_#ffff]" />
          <p class="text-lg font-bold text-neutral-900 dark:text-white">${Math.round(temp)}${degreeSym}${tempUnit}</p>
          <p class="text-xs font-semibold text-neutral-900 dark:text-gray-300 text-center text-wrap capitalize">${description}</p>
          <div class="flex items-center mt-0.5">
            <span class="material-symbols-outlined text-neutral-600 dark:text-gray-400" style="font-size: 1rem"> humidity_percentage </span>
            <p class="text-xs text-neutral-600 dark:text-gray-400">${humidity}%</p>
          </div>
      `;
        fiveDaysForecastEl.append(fiveDaysForecastItem);
      }
    }
  }
}
