import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const ExerciseTableRow = (props) => {
  const { _id, name, text, testCases, id, successRate, type } = props.obj;
  const { isAdmin } = props;

  const deleteExercise = () => {
    axios
      .delete(`http://localhost:4000/users/delete-exercise/${id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Exercise successfully deleted");
          window.location.reload();
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert(err.response.data);
          window.location.href = "/login";
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <tr>
      <td className="id">{id}</td>
      <td>
        <Link to={`/exercise/${id}`}>
          <h6>{name}</h6>
        </Link>
      </td>
      <td className="type">{type}</td>
      {isAdmin && <td className="successRate">{successRate}%</td>}
      {isAdmin && (
        <td className="action">
          <Button
            size="sm"
            variant="danger"
            onClick={deleteExercise}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </td>
      )}
    </tr>
  );
};

export default ExerciseTableRow;
