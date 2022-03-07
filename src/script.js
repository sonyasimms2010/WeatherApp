function formatDate(date) {
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElemenent = document.querySelector("#date");
let currentTime = new Date();
dateElemenent.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector("#atlCard").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#deg").innerHTML = temp;
  document.querySelector("#units").innerHTML = "℃";

  //document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#prec").innerHTML = response.data.weather[0].main;

  let apiKey = "3dddfbe83729356080a3ea5aecdb4bb5";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrlForecast)
    .then(displayWeatherForecast)
    .catch((error) => {
      alert("Invalid coord");
    });
}

function search(event) {
  event.preventDefault();
  let apiKey = "3dddfbe83729356080a3ea5aecdb4bb5";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayWeatherCondition)
    .catch((error) => {
      alert("Invalid City");
    });
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayWeatherForecast(response) {
  let forecastContainer = document.querySelector("#forecast");
  let forecastHTML = '<div class="row">';

  response.data.daily.forEach(function (day, index) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-sm">
            ${formatDay(day.dt)}
            <br />
             <img src="http://openweathermap.org/img/wn/${
               day.weather[0].icon
             }@2x.png" width="50"/>
             <div>
             ${day.temp.min}℃
             ${day.temp.max}℃
            </div><br />
            ${day.weather[0].description}
          </div>
    `;
  });
  forecastHTML = forecastHTML + "</div>";

  forecastContainer.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#deg.card-text");
  let unitElement = document.querySelector("#units");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  if (isNaN(temperature)) {
    alert("Enter City first!");
    return;
  }
  if (unitElement.innerHTML === "℉") {
    return;
  }
  unitElement.innerHTML = "℉";
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function showPosition(position) {
  let atlCard = document.querySelector("h5");
  atlCard.innerHTML = `Your latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-sm">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          //<span class="weather-forecast-temperature-max"> 18° </span>
          //<span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = "Forecast";
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  displayForecast();
}
