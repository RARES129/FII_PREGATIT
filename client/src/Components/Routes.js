import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/home.component.js";
import Register from "../Pages/Register/register.component.js";
import UserList from "../Pages/UserList/user-list.component.js";
import Login from "../Pages/Login/login.component.js";
import Logout from "../Components/Logout";
import NotFound from "../Pages/NotFound/NotFound.js";
import ForgotPassword from "../Pages/ForgotPassword/Forgot.component.js";
import ResetPassword from "../Pages/ForgotPassword/Reset.component.js";
import CreateProblem from "../Pages/CreateProblem/create.problem.component.js";
import Exercise from "../Pages/ExercisePage/exercise.component.js";
import ProblemList from "../Pages/ProblemList/problem.list.component.js";

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

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
      path="/forgot-password"
      element={
        <PublicRoute isLoggedIn={isLoggedIn}>
          <ForgotPassword />
        </PublicRoute>
      }
    />
    <Route
      path="/reset-password/:token"
      element={
        <PublicRoute isLoggedIn={isLoggedIn}>
          <ResetPassword />
        </PublicRoute>
      }
    />
    <Route
      path="/exercise/:id"
      element={
        <Exercise />
        // <PrivateRoute isLoggedIn={isLoggedIn}>
        //   <Exercise />
        // </PrivateRoute>
      }
    />
    <Route
      path="/problem-list"
      element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <ProblemList />
        </PrivateRoute>
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
    <Route
      path="/create-problem"
      element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <CreateProblem />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
