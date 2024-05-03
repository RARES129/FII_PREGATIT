//src/Components/create-student.component.js
// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";

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
      .post("http://localhost:4000/users/create-student", studentObject)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully created");
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
      <StudentForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Register
      </StudentForm>
    </>
  );
};

// Export CreateStudent Component
export default CreateStudent;
