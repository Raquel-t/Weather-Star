var apiKey = "8bb6c2d489759cc78039c821cced7698";
var city = document.getElementById("cityInput");
var searchHistory = [];
const date = new Date();


// weather-Icon https://openweathermap.org/img/wn/

function oneDay(city){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ city +'&appid=8bb6c2d489759cc78039c821cced7698') 
.then(response => response.json())
.then(data => {
    oneDayDisplay (data)
    fiveDayFetch (data.coord.lat,data.coord.lon);
});
}

function fiveDayFetch(lat,lon){
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=8bb6c2d489759cc78039c821cced7698') 
.then(response => response.json())
.then(data => {
    fiveDayDisplay (data.list);
});
}



function oneDayDisplay(data) {
    var dataWeatherContainer = document.createElement("div")
    dataWeatherContainer.style.display = "block";
    dataWeatherContainer.style.padding = "1rem";
    dataWeatherContainer.innerHTML = `
    <h2>---${data.name}---</h2>
    <h3>${new Date(data.dt * 1000).toLocaleDateString()}</h3>

    <p class="temp" id="dTemp-0">${data.main.temp}</p>
    <p class="wind" id="dWind-0">${data.wind.speed}</p>
    <p class="humidity" id="dHumidity-0">${data.main.humidity}</p>
    `;
    document.querySelector("main").append(dataWeatherContainer);
}

document.querySelector("button").addEventListener("click", function(e){
    e.preventDefault();
    oneDay(city.value);
});
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Dallas&appid=8bb6c2d489759cc78039c821cced7698') 
.then(response => response.json())
.then(data => console.log(data));


// function to fetch current weather
// function currentWeather() {
//     var cityName = city.value;
//     var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=' + apiKey`;
    
//     fetch(currentWeatherURL)
//     .then(response => response.json())
//     .then(data => {
//         // Call the function to display the current weather data
//         oneDayDisplay(data);
//         // Fetch the five-day weather forecast
//         fiveDayWeather(cityName);
//     });
// }


// function to fetch the weather for 5 days
function fiveDayWeather(cityName) {
    var fiveDayWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=' + apiKey`;

    fetch(fiveDayWeatherURL)
    .then(response => response.json())
    .then(data => {
        
        fiveDayDisplay(data.list);
    });
}



// function to display information for 5 days
function fiveDayDisplay(weatherList) {
    var weatherContainer = document.createElement("div");
    weatherContainer.style.display = "block";
    weatherContainer.style.padding = "1rem";
        weatherContainer.innerHTML += `
        <p class="temp">${weatherData.main.temp}</p>
        <p class="wind">${weatherData.wind.speed}</p>
        <p class="humidity">${weatherData.main.humidity}</p>
        `;
        document.querySelector("main").append(weatherContainer);
}
document.querySelector("button").addEventListener("click", function (e) {
    e.preventDefault();
    fiveDayFetch ();
});




// event listeners
// click event for the search button
// document.querySelector("button").addEventListener("click", function (e) {
//     e.preventDefault();
//     currentWeather();
// });

// function to display history to local storage
function saveSearchHistory() {
    localStorage.setItem("history", JSON.stringify(searchHistory));
}
// even listeners for history buttons
function displaySearchHistory() {
    var historyList = document.querySelector(".history");
    historyList.innerHTML = ""; 
    searchHistory.forEach(function (city) {
        var li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", function () {
        
        cityInput.value = city;
        currentWeather();
    });
    historyList.appendChild(li);
});
}

