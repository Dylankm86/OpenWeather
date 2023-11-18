document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'bd01bc2635c934b37257f0e5cb3c9572';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateWeatherDashboard(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

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