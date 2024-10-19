import React, { useState } from "react";

function Search({ fetchWeather }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
