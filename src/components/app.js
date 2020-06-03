"use strict";

searchButton.addEventListener("click", searchWeather);

function searchWeather() {
  loadingText.style.display = "block";
  weatherBox.style.display = "none";
  var cityName = searchCity.value;
  if (cityName.trim().length == 0) {
    return alert("Please enter a city name.");
  }
  var http = new XMLHttpRequest();
  var apiKey = "c6651e7ac2399948c0ef5c7805ee2f6d";
  var url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&appid=" +
    apiKey;
  var method = "GET";

  http.open(method, url);
  http.onreadystatechange = function () {
    if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(
        cityName,
        data.weather[0].description.toUpperCase()
      );
      weatherData.temperature = data.main.temp;
      console.log(weatherData);
      updateWeather(weatherData);
    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert("Something went wrong!");
    }
  };
  http.send();
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName;
  // weatherDescription.textContent = weatherData.description;
  // weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;

  loadingText.style.display = "none";
  weatherBox.style.display = "block";
}
