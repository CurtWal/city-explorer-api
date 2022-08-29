import React, { Component } from "react";
import { Card } from "react-bootstrap";
export default class Movies extends Component {
  render() {
    return (
      <div>
        {this.props.movies.map((movie) => {
          return (
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: "1rem",
                width: "500px",
              }}
            >
              <Card.Img
                className="poster"
                variant="top"
                src={movie.image}
                alt={`${movie.title} movie poster`}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  Rating: {movie.vote_average}
                  <br></br>
                  {movie.overview}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}
