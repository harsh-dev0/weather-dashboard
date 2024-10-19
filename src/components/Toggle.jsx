import React from "react";

function Toggle({ isCelsius, setIsCelsius }) {
  return (
    <div className="temperature-toggle">
      <label>
        <input
          type="checkbox"
          checked={isCelsius}
          onChange={() => setIsCelsius(!isCelsius)}
        />
        {isCelsius ? "Celsius" : "Fahrenheit"}
      </label>
    </div>
  );
}

export default Toggle;
