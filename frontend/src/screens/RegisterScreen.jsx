import React from "react";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { FormContainer } from "../components/FormContainer";
import { register } from "../actions/userActions";

export const RegisterScreen = () => {
  const search = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector(
    (state) => state.userRegister
  );
  const { error, loading, userInfo } = userRegister;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] =
    React.useState("");
  const [message, setMessage] = React.useState("");

  const redirect = search ? search.split("=")[1] : "/";

  React.useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [search, userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {message && (
        <Message variant="danger">{message}</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>name</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>confirm password</Form.Label>
          <Form.Control
            required
            type="confirmPassword"
            placeholder="confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account ?
          <Link
            to={
              redirect
                ? `/login?redirect=${redirect}`
                : "login"
            }
          >
            Sign in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
