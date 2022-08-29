import React, { Component } from "react";
import { Card } from "react-bootstrap";
export default class WeatherStatic extends Component {
  render() {
    return (
      <div>
        {this.props.weatherData.map((day) => {
          return (
            <>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{this.props.city}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {day.date}
                  </Card.Subtitle>
                  <Card.Text>
                    Lon: {this.props.lon}
                    <br></br>
                    Lat: {this.props.lat}
                    <br></br>
                    {day.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    );
  }
}
