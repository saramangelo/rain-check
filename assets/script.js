// OFFICE HOURS NOTES:
// for one call, use geo coding
// use the daily forecast 16 Days

// FROM MODULE 6:
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// Acceptance Criteria
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

/* MY PSEUDOCODE:
1. form inputs
2. search for a CITY, presented with CURRENT and FUTURE CONDITIONS for that city, AND that city is added to the search history
// FORM INPUT, LOCAL STORAGE
3. view CURRENT weather conditions for that city, presented with CITY NAME, DATE, ICON representation of WEATHER CONDITIONS, TEMPERATURES, HUMIDITY, WIND SPEED
// FETCH URL
4. view FUTURE weather conditions for that city, presented with 5-DAY FORECAST that displays DATE, ICON representation of WEATHER CONDITIONS, TEMPERATURE, WIND SPEED, HUMIDITY
// FETCH URL
5. click on a city in search history, presented with CURRENT and FUTURE CONDITIONS for that city.
// LOCAL STORAGE 
// BUTTONS FOR EACH CITY
*/

/* 
1. click button
2. grabUserInput
3. saveUserInput --> renderPreviousCities (create, update, append buttons) --> event listener on buttons to call renderClickedCity
   fetchCurrentWeather --> printCurrentWeather (create, update, append current weather card)
   fetchForecastData --> filterForecastData --> printForecastData (create, update, append forecast weather cards)
4. renderClickedCity --> fetchCurrentWeather(of element clicked)
                     --> fetchForecastData(of element clicked)
*/


// MY CODE:

// API Key
var APIkey = "e84606a3a3ed2806c22526e2f0cab7bd";

// query selectors
var button = document.querySelector(".waves-effect");
var searchInput = document.querySelector(".search-input");
var citiesUl = document.querySelector(".cities");
var currentWeatherEl = document.querySelector(".currentWeather");
var forecastWeatherEl = document.querySelector(".forecastWeather");

// functions

// grab user input, call save and fetch current/forecast weather
function grabUserInput() {
  var value = searchInput.value;
  saveUserInput(value);
  fetchCurrentWeather(value);
  fetchForecastData(value);
}

// fetch current weather, call print current weather
function fetchCurrentWeather(cityName) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIkey}`;
  // interpolation backticks `

  fetch(currentWeatherUrl)
    .then((response) => {
      console.log(currentWeatherUrl);
      return response.json();
    })
    // .json gives workable data
    .then((data) => {
      printCurrentWeather(data);
      console.log(data);
    });
}

// fetch forecast data, call filter forecast data
function fetchForecastData(cityName) {
  console.log(cityName);
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIkey}`;

  fetch(forecastUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      filterForecastData(data);
    });
}

// filter forecast data, call print forecast data
function filterForecastData({ list }) {
  forecastWeatherEl.innerHTML = "";
  for (var i = 0; i < 5; i++) {
    printForecastData(list[i * 8]);
  }
}

// print current weather, need to clear out what's already there, (inner.html = ''), create, update, append
function printCurrentWeather({ dt_txt, weather, main, wind, name }) {
  currentWeatherEl.innerHTML = "";
  console.log(name)
  var currentDate = dt_txt;
  var formattedDate = dayjs(currentDate).format("MM/DD/YYYY");
  var { description, icon } = weather[0];
  var { temp, humidity } = main;
  var { speed } = wind;
  var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  var div = document.createElement("div");
  div.classList.add("weather-containers");
  div.innerHTML =
    "Current Weather" +
    `${name}<img src = "${iconUrl}"/><p>${formattedDate}</p><p>Temp: ${temp} \u00B0F</p><p>Humidity: ${humidity}</p><p>Wind Speed: ${speed} mph</p>`;
  currentWeatherEl.appendChild(div);
}

// print forecast data, create, update, append
function printForecastData({ dt_txt, weather, main, wind }) {
  var forecastDate = dt_txt.split(" ")[0];
  var { description, icon } = weather[0];
  var { temp, humidity } = main;
  var { speed } = wind;
  var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  var formattedDate = dayjs(forecastDate).format("MM/DD/YYYY");
  var div = document.createElement("div");
  div.classList.add("weather-containers");
  div.innerHTML =
    "5-Day Forecast" +
    `<img src = "${iconUrl}"/><p>${formattedDate}</p><p><p>Temp: ${temp} \u00B0F</p><p>Humidity: ${humidity}</p><p>Wind Speed: ${speed} mph</p>`;
  forecastWeatherEl.appendChild(div);
}

// save user input, use local storage, call render previous cities
// localStorage set (push it into empty [], push to []) , make it a button
function saveUserInput(valueToSave) {
  var previousValues = JSON.parse(localStorage.getItem("previousCities")) || [];
  previousValues.push(valueToSave);
  previousValues = JSON.stringify(previousValues);
  // can also use localStorage.setItem("previousCities", JSON.stringify(previousValues));
  localStorage.setItem("previousCities", previousValues);
  renderPreviousCities();
}

// render previous cities, clear out what's already there, create button, update, append
function renderPreviousCities() {
  var previousCities = JSON.parse(localStorage.getItem("previousCities")) || [];
  citiesUl.innerHTML = "";
  for (var i = 0; i < previousCities.length; i++) {
    var currentValue = previousCities[i];
    var newListItem = document.createElement("button");
    button.classList.add("waves-effect");
    newListItem.setAttribute("class", "enterCity");
    newListItem.textContent = currentValue;
    newListItem.setAttribute("data-city", currentValue);
    citiesUl.appendChild(newListItem);
    newListItem.addEventListener("click", renderClickedCity);
  }
}

// render clicked city, call fetch current weather, fetch forecast data
function renderClickedCity(event) {
  console.log(event.target);

  var element = event.target.getAttribute("data-city");
  console.log(element);
  fetchCurrentWeather(element);
  fetchForecastData(element);
}

// event listener
button.addEventListener("click", grabUserInput);


