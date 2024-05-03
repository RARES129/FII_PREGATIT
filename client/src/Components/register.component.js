
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";

// CreateStudent Component
const CreateStudent = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  // onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .post("http://localhost:4000/users/register", studentObject)
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

  // Return student form
  return (
    <>
      <h1>Register</h1>
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
