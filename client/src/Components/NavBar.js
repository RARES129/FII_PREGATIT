import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn }) => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        <Link to={"/"} className="nav-link">
          FII Pregătit
        </Link>
      </Navbar.Brand>

      {isLoggedIn && (
        <Nav className="justify-content-end">
          <Nav>
            <Link to={"/user-list"} className="nav-link">
              Student List
            </Link>
          </Nav>
          <Nav>
            <Link to={"/logout"} className="nav-link">
              Logout
            </Link>
          </Nav>
        </Nav>
      )}

      {!isLoggedIn && (
        <Nav className="justify-content-end">
          <Nav>
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </Nav>
          <Nav>
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </Nav>
        </Nav>
      )}
    </Container>
  </Navbar>
);

export default NavBar;
