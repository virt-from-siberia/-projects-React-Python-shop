import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

export function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="primary" expand="lg">
        <Container>
          <LinkContainer to="/" style={{ color: "white" }}>
            <Navbar.Brand href="#home">
              Proshop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer
                to="/cart"
                style={{ color: "white" }}
              >
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="userName"
                  style={{ color: "white!important" }}
                >
                  <LinkContainer
                    to="/profile"
                    style={{ color: "white" }}
                  >
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer
                  to="/login"
                  style={{ color: "white" }}
                >
                  <Nav.Link>
                    <i className="fas fa-user"></i>
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
