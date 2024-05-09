import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/home.component.js";
import Register from "../Pages/Register/register.component.js";
import UserList from "../Pages/User_list/user-list.component.js";
import Login from "../Pages/Login/login.component.js";
import Logout from "../Components/Logout";

// Private Route Wrapper
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Public Route Wrapper
const PublicRoute = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? children : <Navigate to="/" replace />;
};

const AppRoutes = ({ isLoggedIn }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="/register"
      element={
        <PublicRoute isLoggedIn={isLoggedIn}>
          <Register />
        </PublicRoute>
      }
    />
    <Route
      path="/user-list"
      element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <UserList />
        </PrivateRoute>
      }
    />
    <Route
      path="/login"
      element={
        <PublicRoute isLoggedIn={isLoggedIn}>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/logout"
      element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Logout />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
