// Import Modules
import React, { useState } from "react";
import axios from "axios";

// LoginComponent Component
const LoginComponent = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  // onSubmit handler
  const onSubmit = (userObject) => {
    axios
      .post("http://localhost:4000/users/login", userObject)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully logged in");
          // Store user login status and username in local storage
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('loggedInUser', userObject.username);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert("Invalid username or password"));
  };

  // Return login form
  return (
    <form onSubmit={onSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={formValues.username}
          onChange={e => setFormValues({ ...formValues, username: e.target.value })}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={formValues.password}
          onChange={e => setFormValues({ ...formValues, password: e.target.value })}
        />
      </label>
      <input type="submit" value="Log In" />
    </form>
  );
};

// Export LoginComponent Component
export default LoginComponent;
