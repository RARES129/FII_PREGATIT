
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const ResetPasswordForm = (props) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase char")
      .matches(/[A-Z]/, "Password must contain at least one uppercase char")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "at least 1 number or special char (@,!,#, etc)."
      ),
  });

  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup className="form-group">
            <h1>Enter your new password</h1>
          </FormGroup>
          <FormGroup className="form-group">
            <h6>Password:</h6>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              className="d-block invalid-feedback"
              component="span"
            />
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

export default ResetPasswordForm;
