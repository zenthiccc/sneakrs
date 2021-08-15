import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
// Components
import Loader from "./Loader";
import Message from "./Message";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { listTopSneakers } from "../redux/actions/sneakerActions";

const SneakerCarousel = () => {
  const dispatch = useDispatch();

  const sneakerTop = useSelector((state) => state.sneakerTop);
  const { loading, error, sneakers } = sneakerTop;

  useEffect(() => {
    dispatch(listTopSneakers());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover">
      {sneakers.map((sneaker) => (
        <Carousel.Item key={sneaker._id}>
          <Link to={`/sneaker/${sneaker._id}`}>
            <Image src={sneaker.image} alt={sneaker.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>{sneaker.name}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SneakerCarousel;
