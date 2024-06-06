import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import Select from "react-select";

const UserForm = (props) => {
  const { problemTypes, languages } = props;

  const validationSchema = Yup.object().shape({
    problemName: Yup.string().required("Required"),
    problemText: Yup.string().required("Required"),
    problemType: Yup.string().required("Required"),
    language: Yup.string().required("Required"),
    testInputs: Yup.array().of(Yup.string().required("Required")),
    testOutputs: Yup.array().of(Yup.string().required("Required")),
  });

  return (
    <div className="form-wrapper-problem">
      <Formik {...props} validationSchema={validationSchema} key={Date.now()}>
        <Form>
          <FormGroup className="form-group">
            <h1>Create Problem</h1>
          </FormGroup>

          <FormGroup className="form-group">
            <h6>Problem Name:</h6>
            <Field name="problemName" as="textarea" className="form-control" />
            <ErrorMessage
              name="problemName"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup className="form-group">
            <h6>Problem Text:</h6>
            <Field
              style={{ height: "200px" }}
              name="problemText"
              as="textarea"
              className="form-control"
            />
            <ErrorMessage
              name="problemText"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup className="form-group">
            <h6>Problem Type:</h6>
            <Field name="problemType">
              {({ field, form }) => (
                <Select
                  {...field}
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                  options={problemTypes.map((type) => ({
                    label: type,
                    value: type,
                  }))}
                  placeholder="Select Problem Type"
                  isSearchable
                  onChange={(selectedOption) => {
                    form.setFieldValue(
                      "problemType",
                      selectedOption ? selectedOption.value : ""
                    );
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="problemType"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup className="form-group">
            <h6>Language:</h6>
            <Field name="language">
              {({ field, form }) => (
                <Select
                  {...field}
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                  options={languages.map((lang) => ({
                    label: lang,
                    value: lang,
                  }))}
                  placeholder="Select Language"
                  isSearchable
                  onChange={(selectedOption) => {
                    form.setFieldValue(
                      "language",
                      selectedOption ? selectedOption.value : ""
                    );
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="language"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          {Array.from({ length: 10 }, (_, i) => (
            <React.Fragment key={i}>
              <FormGroup className="form-group">
                <h6 style={{ marginBottom: "20px" }}>Test Case {i + 1}:</h6>
                <h6>Input:</h6>
                <Field
                  name={`testInputs[${i}]`}
                  as="textarea"
                  className="form-control"
                />
                <ErrorMessage
                  name={`testInputs[${i}]`}
                  className="d-block invalid-feedback"
                  component="span"
                />
                <h6>Output:</h6>
                <Field
                  name={`testOutputs[${i}]`}
                  as="textarea"
                  className="form-control"
                />
                <ErrorMessage
                  name={`testOutputs[${i}]`}
                  className="d-block invalid-feedback"
                  component="span"
                />
              </FormGroup>
            </React.Fragment>
          ))}
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
