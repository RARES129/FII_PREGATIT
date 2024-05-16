import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const UserForm = (props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`You have enter an invalid email address`)
      .required("Required"),
  });
  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup className="form-group">
            <h1>Reset your password</h1>
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

export default UserForm;
