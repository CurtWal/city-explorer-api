const express = require('express');
const axios = require('axios');
const router = express.Router();
const pushMovies = require("./pushMovies");

router.get('/', async (request, response) => {
    try {
      const { city } = request.query;
      const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1`;
      const chosenCity_Movie = await axios.get(API);
      const results = pushMovies(chosenCity_Movie.data);
      response.send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  

  module.exports = router;