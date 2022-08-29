const movieClass = require("./movieClass");

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

module.exports = pushMovies;
