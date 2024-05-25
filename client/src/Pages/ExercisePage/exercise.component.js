import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExerciseForm from "./ExerciseForm";
import NotFound from "../NotFound/NotFound";
axios.defaults.withCredentials = true;

const Exercise = () => {
  const [exercise, setExercise] = useState(null);
  const [exerciseNotFound, setExerciseNotFound] = useState(false);
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    problemCode: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/exercise-text/${id}`)
      .then((res) => {
        setExercise(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setExercise(null);
          setExerciseNotFound(true);
        } else console.error("Error fetching exercise:", err);
      });
  }, [id]);

  const onSubmit = (values) => {
    console.log("Form submitted with values:", values.problemCode);

    axios
      .post(`http://localhost:4000/users/exercise/${id}`, {
        code: values.problemCode,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Exercise successfully submitted");
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

  if (exerciseNotFound) {
    return <NotFound />;
  }

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ExerciseForm
        initialValues={formValues}
        exercise={exercise}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Submit
      </ExerciseForm>
    </>
  );
};

export default Exercise;
