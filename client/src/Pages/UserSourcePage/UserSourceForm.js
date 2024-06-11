import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { FormGroup, Button, Tabs, Tab } from "react-bootstrap";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
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
    } else if (value === 100) {
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
    } else if (value === 100) {
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

const UserSourceForm = (props) => {
  const [files, setFiles] = useState([{ name: "main.cpp", content: "" }]);
  const [activeTab, setActiveTab] = useState("main.cpp");

  useEffect(() => {
    if (props.initialValues.files && props.initialValues.files.length > 0) {
      let updatedFiles = props.initialValues.files;
      if (
        props.exercise.language === "Python" &&
        updatedFiles[0].name !== "main.py"
      ) {
        updatedFiles[0].name = "main.py";
      }
      setFiles(updatedFiles);
      setActiveTab(updatedFiles[0].name);
    }
  }, [props.initialValues.files, props.exercise.language]);

  return (
    <div className="form-wrapper-problem">
      <Formik {...props}>
        <Form>
          <FormGroup className="form-group">
            <h1>{props.exercise.name}</h1>
            <h4>The source of {props.initialValues.name}</h4>
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
            <h5>Student code ({props.language}):</h5>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              id="editor-tabs"
            >
              {files.map((file, index) => (
                <Tab eventKey={file.name} title={file.name} key={index}>
                  <AceEditor
                    style={{ height: "600px", width: "100%" }}
                    mode={
                      props.exercise.language === "Python" ? "python" : "c_cpp"
                    }
                    theme="github"
                    name={file.name}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={file.content}
                    readOnly={true}
                    setOptions={{
                      showLineNumbers: true,
                      tabSize: 2,
                    }}
                  />
                </Tab>
              ))}
            </Tabs>
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
            <Score value={props.score} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserSourceForm;
