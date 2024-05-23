import React, { useState } from 'react';
import axios from 'axios';
import TrainingForm from './TrainingForm';
axios.defaults.withCredentials = true;


const TrainingComponent = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("c++");
  const [output, setOutput] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:4000/api/code', { code, language })
      .then(response => {
        setOutput(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <TrainingForm 
      code={code} 
      language={language} 
      output={output} 
      handleCodeChange={handleCodeChange} 
      handleLanguageChange={handleLanguageChange} 
      handleSubmit={handleSubmit} 
    />
  );
};

export default TrainingComponent;
