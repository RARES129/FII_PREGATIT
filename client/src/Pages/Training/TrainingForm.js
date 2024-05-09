import React from 'react';

const TrainingForm = ({ code, handleCodeChange }) => {
  return (
    <div>
      <h1>Problem Statement</h1>
      <p>Here you can describe the problem that needs to be solved with C++ code.</p>
      <h2>Paste Your C++ Code Below:</h2>
      <textarea
        value={code}
        onChange={handleCodeChange}
        style={{ width: "100%", height: "200px" }}
      />
      <button onClick={() => console.log(code)}>Submit Code</button>
    </div>
  );
};

export default TrainingForm;
