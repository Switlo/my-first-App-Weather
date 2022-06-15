let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let weekDay = document.querySelector("#weekDay");
weekDay.innerHTML = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Desember",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${month} ${date}, ${year}`;

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${hour}:${minute}`;

function currentWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#searchCity").innerHTML = response.data.name;
  document.querySelector("#currentHumidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#currentWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".aphorism").innerHTML = getAphorism(quotes);
}

function searchCity(city) {
  let apiKey = "0bbb2981f03e6b3d1d7194b9db724d7c";
  let units = "metric";
  //  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let formaCity = document.querySelector("#formaCity");
formaCity.addEventListener("submit", handleSubmit);

function showLocation(position) {
  let apiKey = "0bbb2981f03e6b3d1d7194b9db724d7c";
  let unit = "metric";
  //  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(currentWeather);
}

searchCity(navigator.geolocation.getCurrentPosition(showLocation));

let quotes = [
  `The weather is perfect. The gods are shining on us.`,
  `Bad weather always looks worse through a window.`,
  `I've never been one to bet on the weather.`,
  `Wherever you go, no matter what the weather,</br> always bring your own sunshine.`,
  `There is no such thing as bad weather,</br> only different kinds of good weather.`,
  `There's no such thing as bad weather, just soft people.`,
  `If you want to see the sunshine, you have to weather the storm.`,
];
function getAphorism(values) {
  const max = values.length - 1;
  const min = 0;
  const index = Math.round(Math.random() * (max - min) + min);
  const result = values[index];
  return result;
}
