import React from 'react';

const TrainingForm = ({ code, language, output, handleCodeChange, handleLanguageChange, handleSubmit }) => {
  return (
    <div>
      <h1>Online Compiler</h1>
      <p>Select your language:</p>
      <select value={language} onChange={handleLanguageChange}>
        <option value="c++">C++</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>
      <h2>Paste Your Code Below:</h2>
      <textarea
        value={code}
        onChange={handleCodeChange}
        style={{ width: "100%", height: "200px" }}
      />
      <button onClick={handleSubmit}>Submit Code</button>
      <h2>Output:</h2>
      <textarea
        value={output}
        readOnly
        style={{ width: "100%", height: "200px" }}
      />
    </div>
  );
};

export default TrainingForm;
