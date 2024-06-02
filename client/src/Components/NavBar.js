import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, isAdmin }) => (
  <Navbar bg="dark" variant="dark" fixed="top">
    <Container>
      <Navbar.Brand>
        <Link to={"/"} className="nav-link">
          FII Pregătit
        </Link>
      </Navbar.Brand>

      {isLoggedIn && (
        <Nav className="justify-content-end">
          <Nav>
            <Link to={"/problem-list"} className="nav-link">
              Exercises
            </Link>
          </Nav>
          {isAdmin && (
            <>
              <Nav>
                <Link to={"/create-problem"} className="nav-link">
                  Create Exercise
                </Link>
              </Nav>
              <Nav>
                <Link to={"/user-list"} className="nav-link">
                  User List
                </Link>
              </Nav>
            </>
          )}
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
