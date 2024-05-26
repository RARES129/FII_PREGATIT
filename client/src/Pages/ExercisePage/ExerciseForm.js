import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import AceEditor from "react-ace";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";

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
            WebkitTextStroke: "0.5px black",
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
          marginTop: "20px",
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
  const [isEdited, setIsEdited] = useState(false);

  const handleAceEditorChange = (newValue, setFieldValue) => {
    setIsEdited(true);
    setFieldValue("problemCode", newValue);
  };

  return (
    <div className="form-wrapper-problem">
      <Formik
        {...props}
        onSubmit={(values, actions) => {
          props.onSubmit(values, actions); // call the onSubmit prop passed to ExerciseForm
          setIsEdited(false); // reset isEdited state to false after form submission
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <FormGroup className="form-group">
              <h1>{props.exercise.name}</h1>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>{props.exercise.text}</h5>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>Example Input:</h5>
              <h6>{props.exercise.testCases[0].input}</h6>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>Example Output:</h5>
              <h6>{props.exercise.testCases[0].output}</h6>
            </FormGroup>

            <FormGroup className="form-group">
              <h5>Your code:</h5>

              <AceEditor
                style={{ height: "600px", width: "100%" }}
                mode="c_cpp"
                theme="github"
                name="problemCode"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                onChange={(newValue) =>
                  handleAceEditorChange(newValue, setFieldValue)
                }
              />
              <ErrorMessage
                name="problemCode"
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
                  <Circles key={index} value={props.score} />
                ))}
            </div>
            <div
              style={{
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              {props.loading ? <Spinner /> : <Score value={props.score} />}
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
                disabled={props.loading || !isEdited}
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
