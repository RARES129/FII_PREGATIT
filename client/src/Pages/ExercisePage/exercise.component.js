import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExerciseForm from "./ExerciseForm";
import NotFound from "../NotFound/NotFound";
axios.defaults.withCredentials = true;

const Exercise = () => {
  const [loading, setLoading] = useState(false);
  const [exercise, setExercise] = useState(null);
  const [exerciseNotFound, setExerciseNotFound] = useState(false);
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    problemCode: "",
    score: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/exercise-text/${id}`)
      .then((res) => {
        setExercise(res.data.exercise);
        setFormValues({
          problemCode: res.data.userCode,
          score: res.data.userScore,
        });
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
    setLoading(true);

    axios
      .post(`http://localhost:4000/users/exercise/${id}`, {
        code: values.problemCode,
      })
      .then((res) => {
        if (res.status === 200) {
          setFormValues({ ...formValues, score: res.data.score });
          setLoading(false);
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
        setFormValues({ ...formValues, score: 0 });
        setLoading(false);
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
        score={formValues.score}
        loading={loading}
      >
        Submit
      </ExerciseForm>
    </>
  );
};

export default Exercise;
