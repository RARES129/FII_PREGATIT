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

  const problemTypes = [
    "Dynamic Programming",
    "Greedy Algorithms",
    "Sorting",
    "Searching",
    "Linked Lists",
    "Stacks",
    "Queues",
    "Trees",
    "Hashing",
    "Heaps",
    "Graphs",
    "Backtracking",
    "Bit Manipulation",
    "Mathematics",
    "Geometry",
    "Combinatorics",
    "Probability",
    "Number Theory",
    "Game Theory",
    "Computational Geometry",
    "Data Structures",
    "Algorithms",
  ];
  const languages = ["All languages", "C++", "Python", "Java"];

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
