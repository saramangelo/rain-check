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

// MY CODE:

var APIkey = "e84606a3a3ed2806c22526e2f0cab7bd";

var button = document.querySelector(".button");
var searchInput = document.querySelector(".search-input");
var citiesUl = document.querySelector(".cities");
var currentWeatherEl = document.querySelector(".currentWeather");
var forecastWeatherEl = document.querySelector(".forecastWeather");

function grabUserInput() {
  
  var value = searchInput.value;
  saveUserInput(value);
  fetchCurrentWeather(value);
  fetchForecastData(value);
  
}

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

    });
}

function fetchForecastData(cityName) {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIkey}`;

  fetch(forecastUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      filterForecastData(data);
    });
}

function filterForecastData({ list }) {
  for (var i = 0; i < 5; i++) {
    printForecastData(list[i * 8]);
  }
}

function printCurrentWeather({ weather, main, wind }) {
  var { description, icon } = weather[0];
  var { temp, humidity } = main;
  var { speed } = wind;
  var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  var div = document.createElement("div");
  div.classList.add("weather-containers")
  div.innerHTML = `<p>Icon: ${icon}</p><p>Temp: ${temp}</p><p>Humidity: ${humidity}</p><p>Wind Speed: ${speed}</p>`;
 currentWeatherEl.appendChild(div);
}

function printForecastData({ dt_txt, weather, main, wind }) {
  var forecastDate = dt_txt.split(" ")[0];
  var { description, icon } = weather[0];
  var { temp, humidity } = main;
  var { speed } = wind;
  var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  //   TODO: Create Elements and Append to container
  var div = document.createElement("div");
  div.classList.add("weather-containers")
  div.innerHTML = `<p>Date: ${dt_txt}</p><p>Icon: ${icon}</p><p>Temp: ${temp}</p><p>Humidity: ${humidity}</p><p>Wind Speed: ${speed}</p>`;

  forecastWeatherEl.appendChild(div);
}

// TODO: localStorage set (push it into empty [], push to []) , make it a button
function saveUserInput (valueToSave){
  var previousValues = JSON.parse(localStorage.getItem("previousCities")) || [];
  previousValues.push(valueToSave);
  previousValues = JSON.stringify(previousValues);
  // can also use localStorage.setItem("previousCities", JSON.stringify(previousValues));
  localStorage.setItem("previousCities", previousValues);
  renderPreviousCities();
}

function renderPreviousCities(){
  var previousCities = JSON.parse(localStorage.getItem("previousCities")) || [];
  citiesUl.innerHTML = "";
  for (var i = 0; i<previousCities.length; i++){
    var currentValue = previousCities[i];
    var newListItem = document.createElement("button");
    newListItem.setAttribute("id", "enterCity");
    newListItem.textContent = currentValue;
    citiesUl.appendChild(newListItem);
    newListItem.addEventListener("click", renderClickedCity);
  }
}




function renderClickedCity(cityWeather){
console.log("clicked")
// use .val syntax
var cityWeather = $("#enterCity").val().trim();
fetchCurrentWeather(cityWeather)
fetchForecastData(cityWeather)

// call both functions fetch current and fetch forecast
}

// TODO: get happens on page load, while getting, run for loop for each city that's saved in the array - make a button, append in designated ahead, attach event listener in for loop


button.addEventListener("click", grabUserInput);

