import React from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import { savePaymentMethod } from "../actions/cartActions";

export const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] =
    React.useState("PayPal");

  if (!shippingAddress.address) navigate(`/shipping`);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate(`/placeorder`);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">
            Select Payment Method
          </Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            ></Form.Check>
          </Col>
        </Form.Group>
        <br />
        <Button type="submit" variant="success">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
