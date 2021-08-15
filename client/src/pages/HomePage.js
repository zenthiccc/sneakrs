import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// Components
import Sneaker from "../components/Sneaker";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { listSneakers } from "../redux/actions/sneakerActions";
import SneakerCarousel from "../components/SneakerCarousel";

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const sneakerList = useSelector((state) => state.sneakerList);
  const { loading, error, sneakers, page, pages } = sneakerList;

  useEffect(() => {
    dispatch(listSneakers(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <SneakerCarousel />
      ) : (
        <Link to="/" className=" btn btn-light">
          Go Back
        </Link>
      )}
      {!keyword ? <h2>Latest Sneakers</h2> : <h2>Search Results</h2>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <>
          <Row>
            {sneakers.map((sneaker) => (
              <Col key={sneaker._id} sm={12} md={6} lg={4} xl={3}>
                <Sneaker sneaker={sneaker} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
