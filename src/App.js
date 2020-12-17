import "./App.css";
import React, { useState } from "react";
import Weather from "./Components/Weather";

function App() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const cityInput = (e) => {
    setCity(e.target.value);
  };
  const getWeather = () => {
    fetch("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: city }),
    })
      .then((r) => r.json())
      .then((weatherData) => {
        setWeatherInfo(weatherData.express);
      })
      .catch((err) => {
        setWeatherInfo(err.express);
      });
  };
  const { cod, message } = weatherInfo;
  const errorMessage404 = <div className="error-message">{message}</div>;
  const errorMessage400 = (
    <div className="error-message">Enter a city name</div>
  );
  let displayWeather;
  if (cod === "404") {
    displayWeather = errorMessage404;
  } else if (cod === "400") {
    displayWeather = errorMessage400;
  } else {
    displayWeather = <Weather props={weatherInfo} />;
  }
  return (
    <div className="App">
      <header>
        <h1>Look up the weather in your city!</h1>
      </header>
      <main>
        <div>
          <div>
            <input
              className="weather-input"
              placeholder="Enter your city name here"
              onChange={cityInput}
              required
            />
            <button className="weather-submit" onClick={getWeather}>
              Submit
            </button>
          </div>
          <div className="display-weather">{displayWeather}</div>
        </div>
      </main>
      <footer>Copyright ©2020 All rights reserved</footer>
    </div>
  );
}

export default App;
