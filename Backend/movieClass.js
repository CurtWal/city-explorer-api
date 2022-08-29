
class movieClass {
    constructor(chosen, idx){
        // this is only gonna give me results for 1 movie, but i want 20, then i want to return an array of all 20 objects...
        this.id = chosen.results[idx].id;
        this.title = chosen.results[idx].title;
        this.overview = chosen.results[idx].overview;
        this.vote_average = chosen.results[idx].vote_average;
        this.vote_count = chosen.results[idx].vote_count;
        this.image = `https://image.tmdb.org/t/p/w500${chosen.results[idx].poster_path}`;
    }
}

module.exports = movieClass;