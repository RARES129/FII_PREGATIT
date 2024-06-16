import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { FormGroup, Button, Tabs, Tab, Dropdown } from "react-bootstrap";
import AceEditor from "react-ace";
import Spinner from "react-bootstrap/Spinner";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-searchbox';

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

const ExerciseForm = (props) => {
  const [isEdited, setIsEdited] = useState(false);
  const [files, setFiles] = useState([{ name: "", content: "" }]);
  const [activeTab, setActiveTab] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    props.initialValues.language
  );

  useEffect(() => {
    if (props.initialValues.files && props.initialValues.files.length > 0) {
      setFiles(props.initialValues.files);
      setActiveTab(props.initialValues.files[0].name);
    }
  }, [props.initialValues.files]);

  const handleAceEditorChange = (newValue, fileName) => {
    setIsEdited(true);
    setFiles(
      files.map((file) =>
        file.name === fileName ? { ...file, content: newValue } : file
      )
    );
  };

  const handleAddTab = () => {
    const newName = prompt("Enter file name:");
    if (newName) {
      setFiles([...files, { name: newName, content: "" }]);
      setActiveTab(newName);
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (language === "Python") {
      setFiles(
        files.map((file) => ({
          ...file,
          name: file.name === "main.cpp" ? "main.py" : file.name,
        }))
      );
      setActiveTab("main.py");
    } else {
      setFiles(
        files.map((file) => ({
          ...file,
          name: file.name === "main.py" ? "main.cpp" : file.name,
        }))
      );
      setActiveTab("main.cpp");
    }
    setIsEdited(true);
  };

  const formatText = (text) => {
    return text.split("\n").map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <div className="form-wrapper-problem">
      <Formik
        {...props}
        initialValues={{
          ...props.initialValues,
          files: files,
          language: selectedLanguage,
        }}
        onSubmit={(values, actions) => {
          props.onSubmit({ ...values, files, language: selectedLanguage });
          setIsEdited(false);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FormGroup className="form-group">
              <h1>{props.exercise.name}</h1>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>{formatText(props.exercise.text)}</h5>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>Example Input:</h5>
              <h6>{formatText(props.exercise.testCases[0].input)}</h6>
            </FormGroup>
            <FormGroup className="form-group">
              <h5>Example Output:</h5>
              <h6>{formatText(props.exercise.testCases[0].output)}</h6>
            </FormGroup>

            <FormGroup className="form-group">
              <h5>Your code:</h5>
              {props.exercise.language === "All languages" ? (
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {selectedLanguage}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleLanguageChange("C++")}>
                      C++
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleLanguageChange("Python")}
                    >
                      Python
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    disabled
                  >
                    {props.exercise.language}
                  </Dropdown.Toggle>
                </Dropdown>
              )}
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                id="editor-tabs"
              >
                {files.map((file, index) => (
                  <Tab eventKey={file.name} title={file.name} key={index}>
                    <AceEditor
                      style={{ height: "600px", width: "100%" }}
                      mode={selectedLanguage === "Python" ? "python" : "c_cpp"}
                      theme="github"
                      name={file.name}
                      fontSize={14}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      value={file.content}
                      setOptions={{
                        showLineNumbers: true,
                        tabSize: 2,
                      }}
                      onChange={(newValue) =>
                        handleAceEditorChange(newValue, file.name)
                      }
                    />
                  </Tab>
                ))}
                <Tab eventKey="add" title="+">
                  <Button onClick={handleAddTab}>Add New File</Button>
                </Tab>
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
