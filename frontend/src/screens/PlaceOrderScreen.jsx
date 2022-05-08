import React from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { Message } from "../components/Message";

export const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  cart.itemPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (
    cart.itemPrice > 100 ? 0 : 10
  ).toFixed(2);

  cart.taxPrice = Number(0.082 * cart.itemPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrder = () => {
    console.log("placeOrder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup varian="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}
                {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postal}{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Information</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">
                  cart is empty
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X $ {item.price} = $
                          {(item.qty * item.price).toFixed(
                            2
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>$ {cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>$ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  variant="success"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
