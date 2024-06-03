
import React, { useState } from "react";
import axios from "axios";
import ForgotForm from "./ForgotForm";
axios.defaults.withCredentials = true;

const Forgot = () => {
  const [formValues] = useState({
    email: "",
  });

  const onSubmit = (userObject) => {
    userObject.host = window.location.host;
    axios
      .post("http://localhost:4000/users/forgot-password", userObject)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert(err.response.data);
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <>
      <ForgotForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Reset Password
      </ForgotForm>
    </>
  );
};

export default Forgot;
