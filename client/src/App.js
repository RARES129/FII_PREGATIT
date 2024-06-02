import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AppRoutes from "./Components/Routes";
import LoggedIn from "./Components/checkLoggedIn";
import Admin from "./Components/checkAdmin";

const App = () => {
  const { isLoggedIn, isLoading } = LoggedIn();
  const { isAdmin, isLoadingAdmin } = Admin(isLoggedIn);
  if (isLoading || isLoadingAdmin) {
    return null;
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
