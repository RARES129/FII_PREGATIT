import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ExerciseTableRow from "./ProblemListForm"; // Update the import to the new component

axios.defaults.withCredentials = true;

const ProblemList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/exercises") // Update the endpoint to fetch exercises
      .then(({ data }) => {
        setExercises(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DataTable = () => {
    return exercises.map((exercise, index) => {
      return <ExerciseTableRow key={index} obj={exercise} />;
    });
  };

  return (
    <div className="table-wrapper">
      <h1> Exercise List:</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="id">ID</th>
            <th>Name</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default ProblemList;
