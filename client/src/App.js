import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AppRoutes from "./Components/Routes";
import axios from "axios";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/users/isLoggedIn" // endpoint for checking if user is logged in
        );
        const loggedIn = response.data;
        setIsLoggedIn(loggedIn);
        if (loggedIn) {
          const adminResponse = await axios.get(
            "http://localhost:4000/users/isAdmin" // endpoint for checking if user is admin
          );
          setIsAdmin(adminResponse.data);
        }
      } catch (error) {
        console.error("Error checking login status", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
    effectRan.current = true;
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </header>
        <AppRoutes isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      </div>
    </Router>
  );
};

export default App;
