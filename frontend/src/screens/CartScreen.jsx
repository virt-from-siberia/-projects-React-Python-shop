import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import { Message } from "../components/Message";
import {
  addCart,
  removeFromCart,
} from "../actions/cartActions";

export const CartScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const search = useLocation().search;
  const qty =
    Number(new URLSearchParams(search).get("qty")) || 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) dispatch(addCart(id, qty));
  }, [id, dispatch, qty]);

  const removeFromCartHandler = (id) =>
    dispatch(removeFromCart(id));

  const checkoutHandler = () =>
    navigate(`/login?redirect=shopping`);

  return (
    <Row>
      <Col md={8}>
        <h1 className="my-3">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="my-3">
            <Message variant="info">
              Your car is empty <Link to="/">Go back </Link>
            </Message>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.product}
                className="my-2"
              >
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addCart(
                            item.product,
                            Number(e.target.value)
                          )
                        )
                      }
                    >
                      {[
                        ...Array(item.countInStock).keys(),
                      ].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() =>
                        removeFromCartHandler(item.product)
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Sub title (
                {cartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc + item.qty * item.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              variant="success"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};
