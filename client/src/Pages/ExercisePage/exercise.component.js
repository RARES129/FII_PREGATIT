// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseForm from "./ExerciseForm";
axios.defaults.withCredentials = true;

const Exercise = () => {
  const [formValues, setFormValues] = useState({
    problemCode: "",
  });
  // onSubmit handler
  const onSubmit = (Object) => {
    axios
      .post("http://localhost:4000/users/create-problem", Object)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully registered");
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
      <ExerciseForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Submit
      </ExerciseForm>
    </>
  );
};

export default Exercise;
