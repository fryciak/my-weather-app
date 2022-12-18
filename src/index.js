let tempInCelcius = 20;
let inputSelectedCity = "Sydney";
let keyApi = "4ef80dcco70dd6a3bdd23c8ta173fa30";

function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

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

function updateLargeIcon(newLargeIcon, weatherDescription) {
  console.log(newLargeIcon);
  let iconLarge = document.querySelector("#icon-large");
  iconLarge.setAttribute("src", newLargeIcon);
  iconLarge.setAttribute("alt", `${weatherDescription}`);
}

function showMainTemp(response) {
  console.log(response);
  if (inputSelectedCity !== response.data.city) {
    inputSelectedCity = response.data.city;
    updateCityName();
  }
  tempInCelcius = Math.round(response.data.temperature.current);
  let date = document.querySelector("#day-time");
  let weatherDescription = response.data.condition.description;
  let humidity = `Humidity: ${response.data.temperature.humidity}%`;
  let wind = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  let iconLargeUrl = response.data.condition.icon_url;
  let currentTemp = document.querySelector("h2");
  currentTemp.innerHTML = tempInCelcius;
  date.innerHTML = formatDate();
  updateWeatherDescription(weatherDescription);
  updateHumidity(humidity);
  updateWind(wind);
  updateLargeIcon(iconLargeUrl, weatherDescription);
}

//Celcius
function changeTempToCelcius(event) {
  event.preventDefault();
  linkCelcius.classList.add("active");
  linkFahrenheit.classList.remove("active");
  updateMainTempValue(tempInCelcius);
}

let linkCelcius = document.querySelector("#temp-c");
linkCelcius.addEventListener("click", changeTempToCelcius);

//Fahrenheit
function changeTempToFahrenheit(event) {
  event.preventDefault();
  linkCelcius.classList.remove("active");
  linkFahrenheit.classList.add("active");
  let fahrenheitTemp = Math.round((tempInCelcius * 9) / 5 + 32);
  updateMainTempValue(fahrenheitTemp);
}

let linkFahrenheit = document.querySelector("#temp-f");
linkFahrenheit.addEventListener("click", changeTempToFahrenheit);

function getWeatherData() {
  console.log(inputSelectedCity);
  let urlApi = `https://api.shecodes.io/weather/v1/current?query=${inputSelectedCity}&key=${keyApi}&units=metric`;
  axios.get(urlApi).then(showMainTemp);
}

getWeatherData();

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4ef80dcco70dd6a3bdd23c8ta173fa30";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
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
