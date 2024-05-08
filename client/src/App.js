//App.js
// Import React
import React, { useState, useEffect } from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
import Register from "./Components/register.component.js";
import UserList from "./Components/user-list.component.js";
import Login from "./Components/login.component.js";
import Home from "./Components/home.component.js";
import useLoggedIn from "./Components/checkLoggedIn.js";
import Logout from "./Components/Logout";

// App Component
const App = () => {
  const isLoggedIn = useLoggedIn(); // Use the custom hook
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/"} className="nav-link">
                  FII Pregătit
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                {!isLoggedIn && (
                  <>
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
                  </>
                )}

                {isLoggedIn && (
                  <>
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
                  </>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/user-list" element={<UserList />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
