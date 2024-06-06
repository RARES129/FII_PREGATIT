import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExerciseForm from "./UserSourceForm";
import NotFound from "../NotFound/NotFound";
axios.defaults.withCredentials = true;

const Exercise = () => {
  const [exercise, setExercise] = useState(null);
  const [exerciseNotFound, setExerciseNotFound] = useState(false);
  const { id, userId } = useParams();
  const [formValues, setFormValues] = useState({
    problemCode: "",
    score: null,
    name: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/exercise-source/${id}/${userId}`)
      .then((res) => {
        setExercise(res.data.exercise);
        setFormValues({
          problemCode: res.data.userCode,
          score: res.data.userScore,
          name: res.data.name,
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setExercise(null);
          setExerciseNotFound(true);
        } else console.error("Error fetching exercise:", err);
      });
  }, [id]);

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
        score={formValues.score}
      >
        Submit
      </ExerciseForm>
    </>
  );
};

export default Exercise;
