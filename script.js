function getWeather() {
      const apiKey = 'a14224e727cd4126862171510231610'; // Replace with your API key
      const city = document.getElementById('city-input').value;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                  const weatherInfo = `Weather in ${city}: ${data.weather}<br>
                                  Temperature: ${data.main.temp}°C<br>
                                  Humidity: ${data.main.humidity}%`;
                  document.getElementById('weather-info').innerHTML = weatherInfo;
            })
            .catch(error => {
                  console.error('Error fetching weather data:', error);
                  document.getElementById('weather-info').innerHTML = 'Error fetching weather data. Please try again.';
            });
}
