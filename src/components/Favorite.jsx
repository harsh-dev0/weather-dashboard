import React from "react";

function Favorites({ favorites, removeFavoriteCity, isCelsius }) {
  const convertTemp = (tempK) => {
    return isCelsius
      ? Math.round(tempK - 273.15) // Kelvin to Celsius
      : Math.round((tempK - 273.15) * 9 / 5 + 32); // Kelvin to Fahrenheit
  };

  return (
    <div className="favorites-list">
      <h2>Your Favorite Cities</h2>
      {favorites.length > 0 ? (
        favorites.map((fav) => (
          <div key={fav.id} className="favorite-city">
            <span>{fav.name}</span>
            <button className="delete" onClick={() => removeFavoriteCity(fav.name)}>
              Remove
            </button>
            {fav.weather && fav.weather.main ? (
              <div className="favorite-weather">
                <p>{convertTemp(fav.weather.main.temp)}° {isCelsius ? "C" : "F"}</p>
                <p>{fav.weather.weather[0]?.description}</p>
              </div>
            ) : (
              <p>Weather data not available</p>
            )}
          </div>
        ))
      ) : (
        <p>No favorite cities found.</p>
      )}
    </div>
  );
}

export default Favorites;
