import "./App.css";
import React, { useState } from "react";
import Weather from "./Components/Weather";

function App() {
  const [zip, setZip] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const cityInput = (e) => {
    setZip(e.target.value);
  };
  const getWeather = () => {
    if(zip.length===0){
      setWeatherInfo({noZip: 'Enter a zip code'}) 
      return 
    }
    fetch("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zip: zip }),
    })
      .then((r) => r.json())
      .then((weatherData) => {
        if(!weatherData || !weatherData.data) {
          setWeatherInfo({cod: "404"})
          return
        }
        setWeatherInfo(weatherData.data);
      })
      .catch((err) => {
        setWeatherInfo(err.data);
      });
  };
  const {cod, message, noZip} = weatherInfo;
  const errorMessage404 = <div className="error-message">{message}</div>;
  const errorMessage400 = (
    <div className="error-message">Enter a zip code</div>
  );
  let displayWeather;
  if (cod === "404") {
    displayWeather = errorMessage404;
  } else if (cod === "400") {
    displayWeather = errorMessage400;
  }else if(noZip && noZip.length > 0){
    displayWeather = errorMessage400
  }else {
    displayWeather = <Weather props={weatherInfo} />;
  }
  return (
    <div className="App">
      <header>
        <h1>Look up the weather in your zip code!</h1>
      </header>
      <main>
        <div>
          <div>
            <input
              className="weather-input"
              placeholder="Enter your zip code here"
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
