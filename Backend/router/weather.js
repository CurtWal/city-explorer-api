const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  let { lat, lon } = req.query;
  try {
    let API = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;
    let response = await axios.get(API);
    const weatherArray = response.data.data.map((day) => new Forecast(day));
    res.status(200).send(weatherArray);
    console.log(weatherArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

class Forecast {
  constructor(day) {
    this.date = day.ob_time;
    this.description = day.weather.description;
  }
}

module.exports = router;
