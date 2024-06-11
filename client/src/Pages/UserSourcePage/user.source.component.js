import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserSourceForm from "./UserSourceForm";
import NotFound from "../NotFound/NotFound";
axios.defaults.withCredentials = true;

const Exercise = () => {
  const [exercise, setExercise] = useState(null);
  const [language, setLanguage] = useState("C++");
  const [exerciseNotFound, setExerciseNotFound] = useState(false);
  const { id, userId } = useParams();
  const [formValues, setFormValues] = useState({
    files: [{ name: "main.cpp", content: "" }],
    score: null,
    name: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/exercise-source/${id}/${userId}`)
      .then((res) => {
        const initialFiles =
          res.data.userFiles.length > 0
            ? res.data.userFiles
            : [
                {
                  name: res.data.language === "Python" ? "main.py" : "main.cpp",
                  content: "",
                },
              ];
        setExercise(res.data.exercise);
        setLanguage(res.data.language);
        setFormValues({
          files: initialFiles,
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
  }, [id, userId]);

  if (exerciseNotFound) {
    return <NotFound />;
  }

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserSourceForm
        initialValues={formValues}
        exercise={exercise}
        language={language}
        score={formValues.score}
      />
    </>
  );
};

export default Exercise;
