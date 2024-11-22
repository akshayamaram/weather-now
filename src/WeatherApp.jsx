import React, { useState } from "react";
import { Search, Wind, Droplet, MapPin } from "lucide-react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async () => {
    if (!city) return;
    setIsLoading(true);
    setError(null);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );
      const geoData = await geoResponse.json();
      // console.log(geoData)

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, country, admin1 } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      );
      const weatherData = await weatherResponse.json();
      console.log(weatherData);

      setWeatherData({
        ...weatherData.current_weather,
        city: city,
        country: country,
        region: admin1,
        humidity: weatherData.hourly.relativehumidity_2m[0],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (temperature) => {
    if (temperature < 10) return "❄️";
    if (temperature < 20) return "⛅";
    return "☀️";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <>
      <div className="weather-container">
        <header className="app-header">
          <h1 className="app-title">Weather-Now</h1>
        </header>
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city"
              className="search-input"
            />
            <button
              type="submit"
              className="search-button"
              disabled={isLoading}
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        {isLoading && <div className="loading">Fetching weather...</div>}

        {error && <div className="error">{error}</div>}

        {weatherData && !error && (
          <div className="weather-details">
            <div className="location-header">
              <MapPin size={24} />
              <h2>
                {weatherData.city}, {weatherData.country}
              </h2>
            </div>

            <div className="main-weather">
              <div className="temperature">
                <span className="temp-icon">
                  {getWeatherIcon(weatherData.temperature)}
                </span>
                <span className="temp-value">{weatherData.temperature}°C</span>
              </div>

              <div className="weather-stats">
                <div className="stat">
                  <Wind size={20} />
                  <span>Windspeed</span>
                  <span>{weatherData.windspeed} km/h</span>
                </div>
                <div className="stat">
                  <Droplet size={20} />
                  <span>Humidity</span>
                  <span>{weatherData.humidity} %</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
