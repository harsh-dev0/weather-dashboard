import React from "react";

function WeatherDisplay({ weather, forecast, isCelsius }) {
  const convertTemp = (tempK) => {
    return isCelsius
      ? Math.round(tempK - 273.15) // Kelvin to Celsius
      : Math.round((tempK - 273.15) * 9 / 5 + 32); // Kelvin to Fahrenheit
  };

  return (
    <div className="weather-display">
      <h2>{weather.name}</h2>
      <p>Current Temperature: {convertTemp(weather.main.temp)}° {isCelsius ? "C" : "F"}</p>
      <p>Condition: {weather.weather[0].description}</p>

      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {convertTemp(day.main.temp)}° {isCelsius ? "C" : "F"}</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;
