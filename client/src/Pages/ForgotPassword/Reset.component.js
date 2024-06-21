import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ResetForm from "./ResetForm";
axios.defaults.withCredentials = true;

const ResetPassword = () => {
  const [formValues] = useState({
    password: "",
  });
  const { token } = useParams();
  const onSubmit = (userObject) => {
    axios
      .post(`http://localhost:4000/users/reset-password/${token}`, userObject)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data);
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data);
          // window.location.href = "/login";
        } else {
          alert("Something went wrong");
        }
      });
  };
  return (
    <>
      <ResetForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Reset Password
      </ResetForm>
    </>
  );
};

export default ResetPassword;
