import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

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
      <td>
        <Link to={`/source-list/${_id}`}>{name}</Link>
      </td>
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
