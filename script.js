document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'bd01bc2635c934b37257f0e5cb3c9572';

    fetchCurrentWeather(city, apiKey);
    fetchForecast(city, apiKey);
});

function fetchCurrentWeather(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => updateWeatherDashboard(data))
        .catch(error => console.error('Error:', error));
}

function fetchForecast(city, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data);
            displayDailyForecast(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateWeatherDashboard(data) {
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)`;
    document.getElementById('weatherCondition').textContent = `Conditions: ${data.weather[0].description}`;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weatherIcon').hidden = false;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s, ${data.wind.deg} degrees`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `Visibility: ${data.visibility / 1000} km`;
    document.getElementById('cloudiness').textContent = `Cloudiness: ${data.clouds.all}%`;
}

function displayHourlyForecast(data) {
    const hourlyForecastDiv = document.getElementById('hourlyForecast');
    hourlyForecastDiv.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i];
        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-item');
        forecastDiv.innerHTML = `
            <h4>${new Date(forecast.dt_txt).toLocaleTimeString()}</h4>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather Icon">
            <p>Temp: ${forecast.main.temp}°C</p>
            <p>${forecast.weather[0].description}</p>
        `;
        hourlyForecastDiv.appendChild(forecastDiv);
    }
}

function displayDailyForecast(data) {
    const dailyForecastDiv = document.getElementById('dailyForecast');
    dailyForecastDiv.innerHTML = '';

    let dailyData = {};
    data.list.forEach(forecast => {
        const date = forecast.dt_txt.split(' ')[0];
        if (!dailyData[date]) {
            dailyData[date] = [];
        }
        dailyData[date].push(forecast);
    });

    const daysToDisplay = Math.min(Object.keys(dailyData).length, 5);

    for (let i = 0; i < daysToDisplay; i++) {
        const date = Object.keys(dailyData)[i];
        const dailyForecasts = dailyData[date];
        const avgTemp = dailyForecasts.reduce((acc, val) => acc + val.main.temp, 0) / dailyForecasts.length;
        const icon = dailyForecasts[Math.floor(dailyForecasts.length / 2)].weather[0].icon;
        const description = dailyForecasts[Math.floor(dailyForecasts.length / 2)].weather[0].description;

        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-item');
        forecastDiv.innerHTML = `
            <h4>${new Date(dailyForecasts[0].dt_txt).toLocaleDateString()}</h4>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            <p>Avg Temp: ${avgTemp.toFixed(1)}°C</p>
            <p>${description}</p>
        `;
        dailyForecastDiv.appendChild(forecastDiv);
    }
}

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Toggle button text and styles
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Toggle Light Mode';
        darkModeToggle.style.backgroundColor = '#fff';
        darkModeToggle.style.color = '#000';
    } else {
        darkModeToggle.textContent = 'Toggle Dark Mode';
        darkModeToggle.style.backgroundColor = '#000';
        darkModeToggle.style.color = '#fff';
    }
});

