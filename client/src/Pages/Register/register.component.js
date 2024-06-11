import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";
axios.defaults.withCredentials = true;

const CreateStudent = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onSubmit = (Object) => {
    axios
      .post("http://localhost:4000/users/register", Object)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully registered");
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data);
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <>
      <RegisterForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Register
      </RegisterForm>
    </>
  );
};

// Export CreateStudent Component
export default CreateStudent;
