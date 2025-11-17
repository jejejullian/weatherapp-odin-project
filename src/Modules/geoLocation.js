import { getDailyForecast, getHourlyForecast } from "./weatherApi";

// Initialize geolocation feature (radar icon)
export function initRadarIcon() {
  const radarBtn = document.querySelector("#radarIcon");
  radarBtn.addEventListener("click", () => {
    handleGetLocation();
  });
}

// Request user's current location
function handleGetLocation() {
  if (navigator.geolocation) {
    // Browser supports geolocation - request user's position
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Success callback when location is retrieved
function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Fetch weather using coordinates (not city name)
  getDailyForecast({ lat, lon });
  getHourlyForecast({ lat, lon });
}

// Error callback when location retrieval fails
function error(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;

    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable");
      break;

    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;

    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
