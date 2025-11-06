import { getCurrentWeather } from "./state";
import { updateTempDisplay } from "./views";

export function formattedDate(dt) {
  const date = new Date(dt * 1000);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const parts = date.toLocaleDateString("en-US", options).split(" ");
  const [weekday, month, day, year] = [parts[0].replace(",", ""), parts[1], parts[2].replace(",", ""), parts[3]];

  return `${weekday} | ${day} ${month} ${year}`;
}

export function kelvinToFahrenhiet(temp) {
  return ((temp - 273.15) * 9) / 5 + 32;
}

export function kelvinToCelsius(temp) {
  return temp - 273.15;
}

export function toggleLabel() {
  const switchTemp = document.querySelector("#switchTemp");
  const toggleLabel = document.querySelector("#toggleLabel");

  switchTemp.addEventListener("change", () => {
    const isFahrenHeit = switchTemp.checked;
    toggleLabel.innerHTML = isFahrenHeit ? "&#8451" : "&#8457";
    const weatherData = getCurrentWeather();
    if (weatherData) {
      updateTempDisplay(isFahrenHeit, weatherData);
    }
  });
}

export function changeBgWeather(weatherType) {
  const weatherInfo = document.querySelector("#weatherInfo");

  weatherInfo.classList.remove("bg-sunny", "bg-cloudy", "bg-rainy", "bg-snow", "bg-foggy", "bg-thunder-storm", "bg-clear");

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
    weatherInfo.classList.add("bg-sunny");
  }
}

export function updateTimeDisplay(){
  const timeDisplayEl = document.querySelector('#timeDisplay')
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  timeDisplayEl.textContent =  `${hours}:${minutes}`
}
