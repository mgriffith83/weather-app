function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");


    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city);
}

 function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
    let day = days[date.getDay()];
    let period = "AM";

    if (hours > 12) {
        hours -= 12;
        period = "PM";
    }else if (hours === 0) {
        hours = 12;
    }
    

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes} ${period}`;
}

function searchCity(city) {
    let apiKey = "d3b3t4aedod8b547e248fb0521ce3a50";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;  
    axios.get(apiUrl).then(displayTemperature);
 }

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityName= searchInput.value;
    
    searchCity(cityName);

    searchInput.value = "";
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = [
       "Sunday",
       "Monday",
       "Tuesday",
       "Wednesday",
       "Thursday",
       "Friday",
       "Saturday"
   ];

   return days[date.getDay()];
}

function getForecast(city) {
        let apiKey = "d3b3t4aedod8b547e248fb0521ce3a50";
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;  
        axios(apiUrl).then(displayForecast);
     }

function displayForecast(response) {
   let forecastHtml = "";

   response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml += `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    
    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
    <strong>${Math.round(day.temperature.maximum)}°</strong>
    </div>
    <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div> 
    </div>
    </div>
    `;
    }
    });
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCity("Pollock Pines");