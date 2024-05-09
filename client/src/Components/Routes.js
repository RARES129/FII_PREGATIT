import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/home.component.js";
import Register from "../Pages/Register/register.component.js";
import UserList from "../Pages/UserList/user-list.component.js";
import Login from "../Pages/Login/login.component.js";
import Logout from "../Components/Logout";
import NotFound from "../Pages/NotFound/NotFound.js";
import Training from "../Pages/Training/training.component.js";

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? children : <Navigate to="/" replace />;
};

const AppRoutes = ({ isLoggedIn }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/problem-list" element={<Training />} />
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
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
