import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import WeatherStatic from "./WeatherStatic";
import Movies from "./Movies";
export default class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: [],
      lon: "",
      lat: "",
      city: "",
      movies: [],
    };
  }
  handleMap = async (e) => {
    e.preventDefault();
    // user search goes here
    //  third party api
    let res = await axios
      .get(
        `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_KEY}&q=${this.state.city}&format=json`
      )
      .catch((err) =>
        alert("Error something went wrong, Location not found", err)
      );
    console.log(res.data[0]);

    // the lon and lat of the city
    this.setState({
      lon: res.data[0].lon,
      lat: res.data[0].lat,
    });
    try {
      this.handleWeather(this.state.city, this.state.lon, this.state.lat); // call this method to get our weather data
    } catch (error) {
      alert(error.message);
    }
  };
  // handleWeather = async (cityName) => {
  //   const API = `http://localhost:3001/weather?cityName=${cityName}`; //our URL with query parameters
  //   const res = await axios.get(API);
  //   this.setState({ weatherData: res.data });
  // };
  handleWeather = async (city, lon, lat) => {
    const weather = await axios
      .get(
        `http://localhost:3001/weather?lat=35.1490215&lon=-90.0516285&key=${process.env.REACT_APP_KEY}`
      )
      .catch((err) => console.log("error with location", err));
    this.setState({ weatherData: weather.data });
    console.log(this.state.weatherData);

    const movie = await axios
      .get(`http://localhost:3001/movie?city=${city}`)
      .catch((err) => console.log("error with films", err));
    this.setState({ movies: movie.data });
    console.log(this.state.movies);
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleMap}>
          <Form.Group>
            <Form.Label className="form-data">Enter Location: </Form.Label>
            <Form.Control
              type="text"
              value={this.state.city}
              onChange={(e) => this.setState({ city: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore
          </Button>
        </Form>
        <WeatherStatic
          weatherData={this.state.weatherData}
          lat={this.state.lat}
          lon={this.state.lon}
        />
        <Movies movies={this.state.movies} />
      </div>
    );
  }
}
