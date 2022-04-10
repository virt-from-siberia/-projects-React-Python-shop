import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Rating } from "../components/Rating";
import { istProductDetail } from "../actions/productActions";

export function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetail = useSelector(
    (state) => state.productDetail
  );
  const { product, loading, error } = productDetail;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (id) dispatch(istProductDetail(id));
  }, [id, dispatch]);

  const addToCartHandler = () =>
    navigate(`/cart/${id}?qty=${qty}`);

  return (
    <div>
      <Link to="/" className="btn btn-warning my-3">
        Go back
      </Link>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={product.image}
              alt="product image"
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup varian="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} ratings`}
                  color="#f8e825"
                />
              </ListGroup.Item>

              <ListGroup.Item>
                Price : $ {product.price}
              </ListGroup.Item>

              <ListGroup.Item>
                Description : $ {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>price</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>status</Col>
                    <Col>{product.countInStock}</Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) =>
                            setQty(e.target.value)
                          }
                        >
                          {[
                            ...Array(
                              product.countInStock
                            ).keys(),
                          ].map((x) => (
                            <option
                              key={x + 1}
                              value={x + 1}
                            >
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block btn-success"
                    type="button"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
