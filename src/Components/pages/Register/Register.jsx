import React from "react";
import "./Register.css";
import { FaUser, FaLock, FaAt } from "react-icons/fa";

const Register = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Email" required />
          <FaAt className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Confirm Password" required />
          <FaLock className="icon" />
        </div>

        <button type="submit">Register</button>
        <div className="register-link">
          <p>
            Already have an account? <a href="#">Login</a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
