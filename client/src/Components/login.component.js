// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

const LoginUser = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  // onSubmit handler
  const onSubmit = (userObject) => {
    axios
      .post("http://localhost:4000/users/login", userObject)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully logged in");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert(err.response.data);
        } else {
          alert("Something went wrong");
        }
      });
  };

  // Return student form
  return (
    <>
      <LoginForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Login
      </LoginForm>
    </>
  );
};

// Export CreateStudent Component
export default LoginUser;
