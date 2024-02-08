function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
}

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

function displayForecast() {
    let forecast = document.querySelector("#forecast");

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

days.forEach(function (day) {
forecast.innerHTML += `
<div class="weather-forecast-date">${day}</div>
<div class="weather-icon">🌧️</div>
<div class="weather-forecast-temperatures">
<div class="weather-forecast-temperature-max">
<strong>42°</strong>
</div>
<div class="weather-forecast-temperature-min">28°</div> 
</div>
`;
});
}

 function search(event) {
      event.preventDefault();
      let searchInputElement = document.querySelector("#search-input");
      let city = searchInputElement.value;

let apiKey = "d3b3t4aedod8b547e248fb0521ce3a50";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;    

axios.get(apiUrl).then(displayTemperature);
 }

 function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

displayForecast();