import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import WeatherStatic from "./WeatherStatic";
export default class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: [],
      lon: "",
      lat: "",
      city: "",
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
    // the lon and lat of the city
    this.setState({
      lon: res.data[0].lon,
      lat: res.data[0].lat,
    });
    try {
      this.handleWeather(this.state.city); // call this method to get our weather data
    } catch (error) {
      alert(error.message);
    }
  };
  handleWeather = async (cityName) => {
    const API = `http://localhost:3001/weather?cityName=${cityName}`; //our URL with query parameters
    const res = await axios.get(API);
    this.setState({ weatherData: res.data });
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
      </div>
    );
  }
}
