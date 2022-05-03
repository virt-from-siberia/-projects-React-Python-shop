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

import {
  getUserDetails,
  updateUserProfile,
} from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export const ProfileScreen = () => {
  const search = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector(
    (state) => state.userDetails
  );
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state) => state.userUpdateProfile
  );
  const { success } = userUpdateProfile;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] =
    React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [search, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
      setMessage("");
    }
  };

  return (
    <Row>
      <Col md={3} sm={12}>
        <h2>User profile</h2>
        {message && (
          <Message variant="danger">{message}</Message>
        )}
        {error && (
          <Message variant="danger">{error}</Message>
        )}
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
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="confirmPassword"
              placeholder="confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </Form.Group>
          <br />

          <Button type="submit" variant="success">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9} sm={12}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
};
