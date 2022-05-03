import React from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";

import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";

export const ShippingScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = React.useState(
    shippingAddress.address
  );
  const [city, setCity] = React.useState(
    shippingAddress.city
  );
  const [postal, setPostal] = React.useState(
    shippingAddress.postal
  );
  const [country, setCountry] = React.useState(
    shippingAddress.country
  );

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postal,
        country,
      })
    );
    navigate(`/payment`);
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter your address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter your city"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="postal">
          <Form.Label>Postal</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter your postal code"
            value={postal ? postal : ""}
            onChange={(e) => setPostal(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter your country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button type="submit" variant="success">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
