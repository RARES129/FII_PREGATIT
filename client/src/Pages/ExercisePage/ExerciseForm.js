import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import { alignPropType } from "react-bootstrap/esm/types";

const name = "DA";
const problemText =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const exampleInput = "aaaaaaaaaaaaaaaaaaaaa";
const exampleOutput = "aaaaaaaaaaaaaaaaaaaaa";

const Score = ({ value }) => {
  let color = "gray";
  if (value !== null) {
    if (value >= 0 && value <= 20) {
      color = "red";
    } else if (value > 20 && value <= 40) {
      color = "orange";
    } else if (value > 40 && value <= 70) {
      color = "yellow";
    } else if (value > 70 && value <= 90) {
      color = "blue";
    } else if (value == 100) {
      color = "green";
    }
  }
  return (
    <div>
      {value !== null && (
        <h1
          style={{
            color: color,
            textAlign: "center",
            webkitTextStroke: "0.5px black",
          }}
        >
          {value}%
        </h1>
      )}
    </div>
  );
};

const Circles = ({ value }) => {
  let color = "gray";
  if (value !== null) {
    if (value >= 0 && value <= 20) {
      color = "red";
    } else if (value > 20 && value <= 40) {
      color = "orange";
    } else if (value > 40 && value <= 70) {
      color = "yellow";
    } else if (value > 70 && value <= 90) {
      color = "blue";
    } else if (value == 100) {
      color = "green";
    }
  }
  if (value != null) {
    return (
      <div
        style={{
          height: "50px",
          width: "50px",
          backgroundColor: color,
          borderRadius: "50%",
          display: "inline-block",
          margin: "5px",
          webkit: "0.5px black",
        }}
      ></div>
    );
  } else return <div></div>;
};

const ExerciseForm = (props) => {
  const validationSchema = Yup.object().shape({
    problemCode: Yup.string().required("Problem code is required"),
  });
  const value = null; // scorul de la backend

  console.log(props);
  return (
    <div className="form-wrapper-problem">
      <Formik
        initialValues={{
          problemCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form data", values);
          // Handle form submission
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <FormGroup className="form-group">
              <h1>{name}</h1>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>{problemText}</h5>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>Example Input:</h5>
              <h6>{exampleInput}</h6>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>Example Output:</h5>
              <h6>{exampleOutput}</h6>
            </FormGroup>

            <FormGroup className="form-group">
              <h5>Your code:</h5>

              <AceEditor
                style={{ height: "600px", width: "100%" }}
                mode="c_cpp"
                theme="github"
                name="problemCode"
                onChange={(value) => setFieldValue("problemCode", value)}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={values.problemCode}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
              <ErrorMessage
                name="problemText"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {Array(10)
                .fill()
                .map((_, index) => (
                  <Circles key={index} value={value} />
                ))}
            </div>
            <div>
              <Score value={value} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Button
                variant="danger"
                size="lg"
                block="block"
                type="submit"
                disabled={isSubmitting}
              >
                {props.children}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ExerciseForm;
