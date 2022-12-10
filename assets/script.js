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
*/

// MY CODE:

var APIkey = "e84606a3a3ed2806c22526e2f0cab7bd";

var button = document.querySelector('.button');
var searchInput = document.querySelector('.search-input');
var citiesUl = document.querySelector('.cities');

console.log(button);













