import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
// Components
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  listSneakers,
  deleteSneaker,
  createSneaker,
} from "../redux/actions/sneakerActions";
import { SNEAKER_CREATE_RESET } from "../resources/constants/sneakerConstants";

const SneakerListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const sneakerList = useSelector((state) => state.sneakerList);
  const { loading, error, sneakers, page, pages } = sneakerList;

  const sneakerDelete = useSelector((state) => state.sneakerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = sneakerDelete;

  const sneakerCreate = useSelector((state) => state.sneakerCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    sneaker: createdSneaker,
  } = sneakerCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: SNEAKER_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/sneaker/${createdSneaker._id}/edit`);
    } else {
      dispatch(listSneakers("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdSneaker,
    pageNumber,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSneaker(id));
    }
  };

  const handleCreateSneaker = () => {
    dispatch(createSneaker());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Sneakers</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={handleCreateSneaker}>
            <i className="fas fa-plus" /> Add Sneaker
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {sneakers.map((sneaker) => (
                <tr key={sneaker._id}>
                  <td>{sneaker._id}</td>
                  <td>{sneaker.name}</td>
                  <td>${sneaker.price}</td>
                  <td>{sneaker.category}</td>
                  <td>{sneaker.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/sneaker/${sneaker._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDelete(sneaker._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default SneakerListPage;
