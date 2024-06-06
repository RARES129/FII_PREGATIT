import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, FormControl } from "react-bootstrap";
import ExerciseTableRow from "./SourceListForm";
import { useParams } from "react-router-dom";
axios.defaults.withCredentials = true;

const ProblemList = () => {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const effectRan = useRef(false);
  const { userId } = useParams();

  useEffect(() => {
    if (effectRan.current) return;
    axios
      .get("http://localhost:4000/users/exercises")
      .then(({ data }) => {
        setExercises(data);
      })
      .catch((error) => {
        console.log(error);
      });
    effectRan.current = true;
  }, []);

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.id.toString().includes(searchQuery)
  );

  const DataTable = () => {
    return filteredExercises.map((exercise, index) => {
      return <ExerciseTableRow key={index} obj={exercise} userId={userId} />;
    });
  };

  return (
    <div className="table-wrapper">
      <h1> Source List:</h1>
      <FormControl
        type="text"
        placeholder="Search by name or ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="id">ID</th>
            <th>Name</th>
            <th className="Type">Type</th>
            <th className="successRate">Success Rate</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default ProblemList;
