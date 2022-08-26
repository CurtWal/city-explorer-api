"use strict";

require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3002;
const app = express();
const weatherData = require("./data/weather.json");
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/weather", (req, res) => {
  let cityName = req.query.cityName;

  const city = weatherData.find(
    (city) =>
      city.city_name.toLocaleLowerCase() === cityName.toLocaleLowerCase()
  );
  console.log(city);
  try {
    const weatherArray = city.data.map((day) => new Forecast(day));
    res.status(200).send(weatherArray);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
