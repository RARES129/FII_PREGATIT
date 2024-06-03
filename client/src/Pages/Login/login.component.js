
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
axios.defaults.withCredentials = true;

const LoginUser = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

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


export default LoginUser;
