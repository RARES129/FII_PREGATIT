import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const LoginForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`You have enter an invalid email address`)
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup className="form-group">
            <h1>Login</h1>
          </FormGroup>
          <FormGroup className="form-group">
            <h6>Email:</h6>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block 
								invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup className="form-group">
            <h6>Password:</h6>
            <div className="password-field">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
              />
              <Button
                onClick={toggleShowPassword}
                className="show-password-btn"
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
            <ErrorMessage
              name="password"
              className="d-block 
								invalid-feedback"
              component="span"
            />
            <Button variant="link" className="forgot" href="/forgot-password">
              Forgot Password?
            </Button>
          </FormGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Button variant="danger" size="lg" block="block" type="submit">
              {props.children}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
