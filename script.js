let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];

let hours = addZero(today.getHours());
let minutes = addZero(today.getMinutes());

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}
let dateElement = document.querySelector(".date");
dateElement.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col-2">
     <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img 
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    width="42"
    />
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max"> ${Math.round(
        forecastDay.temp.max
      )}°C </span>
      <span class="weather-forecast-temperature-min"> ${Math.round(
        forecastDay.temp.min
      )}°C </span>
    </div>
    </div>
    
`;
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "4527ba8320dadb0d95f2df5d4303945c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "4527ba8320dadb0d95f2df5d4303945c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function getForecast(coordinates) {
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Johannesburg");
displayForecast();
