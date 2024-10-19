import React, { useState, useEffect } from "react";
import Search from "./Search";
import Favorites from "./Favorite";
import WeatherDisplay from "./WeatherDisplay";
import Toggle from "./Toggle";

const API_KEY = "39a358bb9024eceb0a14aab609d4f79f"; // Replace with your OpenWeather API Key
const SERVER_URL = "http://localhost:5000/favorites"; // JSON server URL

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  // Load last searched city from localStorage on mount
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
    fetchFavorites(); // Fetch favorite cities from the JSON server
  }, []);

  const fetchWeather = async (city) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData.list.filter((entry, index) => index % 8 === 0)); // Every 8th entry (24 hours)
      localStorage.setItem("lastCity", city); // Save the city to localStorage
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(SERVER_URL);
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };

  const addFavoriteCity = async () => {
    if (weather && !favorites.some((fav) => fav.name === weather.name)) {
      const newFavorite = { name: weather.name, weather };
      try {
        const response = await fetch(SERVER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFavorite),
        });

        if (response.ok) {
          const savedFavorite = await response.json(); // Get the saved favorite with id
          setFavorites([...favorites, { ...newFavorite, id: savedFavorite.id }]); // Use the new id
        }
      } catch (error) {
        console.error("Failed to add favorite city:", error);
      }
    }
  };

  const removeFavoriteCity = async (cityName) => {
    const cityToDelete = favorites.find((fav) => fav.name === cityName);
    if (cityToDelete) {
      try {
        const response = await fetch(`${SERVER_URL}/${cityToDelete.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove from state immediately after successful deletion
          setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== cityToDelete.id));
        }
      } catch (error) {
        console.error("Failed to delete favorite city:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      <Search fetchWeather={fetchWeather} />
      <Toggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
      {weather && (
        <>
          <WeatherDisplay weather={weather} forecast={forecast} isCelsius={isCelsius} />
          <button className="add-favorite" onClick={addFavoriteCity}>
            Add to Favorites
          </button>
        </>
      )}
      <Favorites
        favorites={favorites}
        removeFavoriteCity={removeFavoriteCity}
        isCelsius={isCelsius}
      />
    </div>
  );
}

export default App;
