const express = require('express')
const router = express.Router()
const weather = require('../modules/weather')
const getWeather = weather.getWeather;
const pushWeather = weather.pushForecast;

router.get('/weather', async (req, res) => {
  try {
    const {lat, lon} = req.query;
    const response = await getWeather(lat, lon);
    const results = pushWeather(response.data.data)
    res.send(results)
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = router













// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   let { lat, lon } = req.query;
//   try {
//     let API = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;
//     let response = await axios.get(API);
//     const weatherArray = response.data.data.map((day) => new Forecast(day));
//     res.status(200).send(weatherArray);
//     console.log(weatherArray);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// class Forecast {
//   constructor(day) {
//     this.date = day.ob_time;
//     this.description = day.weather.description;
//     this.icon = day.weather.icon;
//   }
// }

// module.exports = router;
