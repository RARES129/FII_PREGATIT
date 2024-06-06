import React, { useState } from "react";
import axios from "axios";
import CreateProblemForm from "./CreateProblemForm";
axios.defaults.withCredentials = true;

const CreateProblem = () => {
  const [formValues, setFormValues] = useState({
    problemName: "",
    problemText: "",
    problemType: "",
    language: "", 
    testInputs: Array(10).fill(""),
    testOutputs: Array(10).fill(""),
  });

  const problemTypes = ["Vectors", "Graphs", "Character Strings"];
  const languages = ["C++", "Python"];

  const onSubmit = (Object) => {
    axios
      .post("http://localhost:4000/users/create-exercise", Object)
      .then((res) => {
        if (res.status === 200) {
          alert("Problem successfully created");
          window.location.href = "/problem-list";
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert(err.response.data);
          window.location.href = "/login";
        } else if (err.response && err.response.status === 400) {
          alert(err.response.data);
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <>
      <CreateProblemForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
        problemTypes={problemTypes}
        languages={languages} // Pass the languages prop
      >
        Create
      </CreateProblemForm>
    </>
  );
};

export default CreateProblem;
