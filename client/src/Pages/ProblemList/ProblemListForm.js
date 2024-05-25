import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExerciseTableRow = (props) => {
  const { _id, name, text, testCases, id } = props.obj;

  return (
    <tr>
      <td className="id">{id}</td>
      <td>{name}</td>
      <td className="action">
        <Link to={`/exercise/${id}`}>
          <Button size="sm" variant="primary">
            View
          </Button>
        </Link>
      </td>
    </tr>
  );
};

export default ExerciseTableRow;
