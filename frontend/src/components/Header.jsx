import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function Header() {
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
              <LinkContainer
                to="/login"
                style={{ color: "white" }}
              >
                <Nav.Link>
                  <i className="fas fa-user"></i>
                  Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
