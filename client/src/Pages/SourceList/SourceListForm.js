import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const ExerciseTableRow = (props) => {
  const { _id, name, text, testCases, id, successRate, type } = props.obj;
  const { userId } = props;

  return (
    <tr>
      <td className="id">{id}</td>
      <td>
        <Link to={`/exercise-source/${id}/${userId}`}>
          <h6>{name}</h6>
        </Link>
      </td>
      <td className="type">{type}</td>
      <td className="successRate">{successRate}%</td>
    </tr>
  );
};

export default ExerciseTableRow;
