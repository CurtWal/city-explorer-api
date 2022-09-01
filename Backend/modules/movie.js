const axios = require("axios");
const movieCache = require("./movieCache");

const getMovie = (city) => {
  const key = "city-" + city;
  const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1`;
  if (movieCache[key] && Date.now() - movieCache[key].timestamp >= 50000) {
    console.log("Cache hit");
    return movieCache[key].data;
  } else {
    const movieInfo = axios
      .get(API)
      .catch((err) =>
        console.log("Error: something went wrong from getMovie at server", err)
      );
    console.log("Cache miss");
    movieCache[key] = {};
    movieCache[key].timestamp = Date.now();
    movieCache[key].data = movieInfo;
    return movieInfo;
  }
};

class movieClass {
  constructor(chosen, idx) {
    this.id = chosen.results[idx].id;
    this.title = chosen.results[idx].title;
    this.overview = chosen.results[idx].overview;
    this.vote_average = chosen.results[idx].vote_average;
    this.vote_count = chosen.results[idx].vote_count;
    this.image = `https://image.tmdb.org/t/p/w500${chosen.results[idx].poster_path}`;
  }
}

const pushMovies = (chosenCity_Movie) => {
  const movieArr = [];
  if (chosenCity_Movie.results.length !== 0) {
    for (let i = 0; i < chosenCity_Movie.results.length; i++) {
      movieArr.push(new movieClass(chosenCity_Movie, [i]));
    }
  } else {
    movieArr.push({ error: "No movies" });
  }
  return movieArr;
};

module.exports = { getMovie, movieClass, pushMovies };
