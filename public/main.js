const api = {
    key: "6446aa7a92b97f8fb58bd0adf073da16",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getWeather(searchbox.value);
    }
}

function getWeather(index) {
    fetch(`${api.base}weather?q=${index}&units=metric&APPID=${api.key}`)
        .then(zone => {
            return zone.json();
        }).then(displayResults).catch(displayError);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.textContent = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    let weatherImg = weather_el.innerText;

    if (JSON.stringify(weatherImg).includes("Clouds") == true) {
        let cloudy = document.getElementById("weather__cloud");
        cloudy.style.display = "block";
        let rain = document.getElementById("weather__rain");
        rain.style.display = "none";
    } else if (JSON.stringify(weatherImg).includes("Rain") == true) {
        let rain = document.getElementById("weather__rain");
        rain.style.display = "block";
        let cloudy = document.getElementById("weather__cloud");
        cloudy.style.display = "none";
    }

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let error = document.getElementById('error');
    error.style.display = "none";
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

function displayError() {
    let error = document.getElementById('error');
    error.innerText = "City not Found";
}


