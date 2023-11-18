document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('searchInput').value;
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
            displayWeather(data);
            updateRecentSearches(city);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('weatherDisplay').innerText = 'Failed to load weather data';
        });
});

function displayWeather(data) {
    const weatherDiv = document.getElementById('weatherDisplay');
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const cityName = data.name;

    weatherDiv.innerHTML = `<h3>Weather in ${cityName}</h3>
                            <p>Temperature: ${temperature} °C</p>
                            <p>Description: ${weatherDescription}</p>`;
}

function updateRecentSearches(city) {
    const recentSearchList = document.getElementById('recentSearchList');
    const listItem = document.createElement('li');
    listItem.textContent = city;
    recentSearchList.appendChild(listItem);
}
