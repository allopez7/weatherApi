const express = require("express");
const fetch = require("node-fetch");
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 5000;

app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/weather", async (req, res) => {
  try {
    const weatherApi = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.body.zip},us&appid=${process.env.WEATHER_API_KEY}`
    );
    const weatherApiParse = await weatherApi.json();
    console.log(weatherApiParse)
    res.json({ express: weatherApiParse });
  } catch (err) {
    res.json({ express: weatherApiParse });
  }
});
