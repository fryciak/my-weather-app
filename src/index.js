let now = new Date();
let tempInCelcius = 20;
let inputSelectedCity = "Sydney";
let keyApi = "7d478f69e1b2f5d563653f13f5f91d76";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = `${day} ${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#enter-city");
  console.log(input.value);
  inputSelectedCity = input.value;
  updateCityName();
  getWeatherData();
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

//Celcius
function changeTempToCelcius(event) {
  event.preventDefault();
  updateMainTempValue(tempInCelcius);
}
let linkCelcius = document.querySelector("#temp-c");
linkCelcius.addEventListener("click", changeTempToCelcius);

//Fahrenheit
function changeTempToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((tempInCelcius * 9) / 5 + 32);
  updateMainTempValue(fahrenheitTemp);
}
let linkFahrenheit = document.querySelector("#temp-f");
linkFahrenheit.addEventListener("click", changeTempToFahrenheit);

function updateMainTempValue(newTemperature) {
  let h2MainTemp = document.querySelector(".main-temp h2");
  h2MainTemp.innerHTML = newTemperature;
}

function updateWeatherDescription(newDescription) {
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = newDescription;
}

function updateHumidity(newHumidity) {
  let humidity = document.querySelector("#humidity-conditions");
  humidity.innerHTML = newHumidity;
}

function updateWind(newWind) {
  let wind = document.querySelector("#wind-conditions");
  wind.innerHTML = newWind;
}

function showMainTemp(response) {
  console.log(response);
  if (inputSelectedCity !== response.data.name) {
    inputSelectedCity = response.data.name;
    updateCityName();
  }
  tempInCelcius = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let humidity = `${response.data.main.humidity}%`;
  let wind = `${Math.round(response.data.wind.speed)}km/h`;
  console.log(tempInCelcius);
  let currentTemp = document.querySelector("h2");
  currentTemp.innerHTML = tempInCelcius;
  updateWeatherDescription(weatherDescription);
  updateHumidity(humidity);
  updateWind(wind);
}

function getWeatherData() {
  console.log(inputSelectedCity);
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${inputSelectedCity}&appid=${keyApi}&units=metric`;
  axios.get(urlApi).then(showMainTemp);
}

getWeatherData();

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showMainTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function updateCityName() {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${inputSelectedCity}`;
}
