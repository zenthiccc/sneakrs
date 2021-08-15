import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
// Components
import Rating from "./Rating";

const Sneaker = ({ sneaker }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/sneaker/${sneaker._id}`}>
        <Card.Img src={sneaker.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/sneaker/${sneaker._id}`}>
          <Card.Title as="div">
            <strong>{sneaker.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={sneaker.rating}
            text={`${sneaker.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${sneaker.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Sneaker;
