const axios = require('axios')
let cache = require('./cache');



 const getWeather = (lat, lon)  => {
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=3`;
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit', cache);
    return cache[key].data
  } else {
    const weatherInfo = axios.get(url).catch((err)=>console.log('Something went wrong from getWeather', err))
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = weatherInfo
    return weatherInfo
  }
}
class Weather {
    constructor(day) {
        this.icon = day.weather.icon
        this.date = day.valid_date;
		this.description = day.weather.description;
    }
  }


  const pushForecast = (chosenCity) => {
	const forecastArr = []
	chosenCity.map(day => forecastArr.push(new Weather(day)))

	return forecastArr
}



// const parseWeather = (weatherData) => {
//     try {
//       const weatherSummaries = weatherData.data.map(day => {
//         return new Weather(day);
//       });
//       return Promise.resolve(weatherSummaries);
//     } catch (e) {
//       return Promise.reject(e);
//     }
//   }

// const weatherHandler = (request, response) => {
//   const { lat, lon } = request.query;
//   getWeather(lat, lon)
//   .then(summaries => response.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }  



module.exports = {getWeather, Weather, pushForecast}