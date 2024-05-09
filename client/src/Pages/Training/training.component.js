import React, { useState } from 'react';
import axios from 'axios';
import TrainingForm from './TrainingForm';

const TrainingComponent = () => {
  const [code, setCode] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:4000/api/code', { code })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <TrainingForm code={code} handleCodeChange={handleCodeChange} handleSubmit={handleSubmit} />
  );
};

export default TrainingComponent;
