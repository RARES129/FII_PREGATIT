import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AppRoutes from "./Components/Routes";
import LoggedIn from "./Components/checkLoggedIn";

const App = () => {
  const { isLoggedIn, isLoading } = LoggedIn();
  if (isLoading) {
    return null;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar isLoggedIn={isLoggedIn} />
        </header>
        <AppRoutes isLoggedIn={isLoggedIn} />
      </div>
    </Router>
  );
};

export default App;
