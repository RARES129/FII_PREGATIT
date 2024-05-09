import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const StudentTableRow = (props) => {
  const { _id, name, email } = props.obj;

  const deleteStudent = () => {
    axios
      .delete("http://localhost:4000/users/delete-student/" + _id)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <Button onClick={deleteStudent} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default StudentTableRow;
