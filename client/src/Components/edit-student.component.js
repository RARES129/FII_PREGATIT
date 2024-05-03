//src/Components/edit-student.component.js
// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate here

// EditStudent Component
const EditStudent = (props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  const { id } = useParams();
  const navigate = useNavigate(); // Add this line

  //onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .put("http://localhost:4000/students/update-student/" + id, studentObject)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully updated");
          navigate("/student-list"); // Change this line
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get("http://localhost:4000/users/update-student/" + id)
      .then((res) => {
        const { name, email, rollno } = res.data;
        setFormValues({
          name,
          email,
          rollno,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return student form
  return (
    <StudentForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Student
    </StudentForm>
  );
};

// Export EditStudent Component
export default EditStudent;
