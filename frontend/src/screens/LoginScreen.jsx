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
import { login } from "../actions/userActions";

export const LoginScreen = () => {
  const search = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const redirect = search ? search.split("=")[1] : "/";

  React.useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [search, userInfo, navigate, redirect]);

  console.log("redirect", redirect);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button type="submit" variant="success">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New customer ?{" "}
          <Link
            to={
              redirect
                ? `/register?redirect=${redirect}`
                : "register"
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
