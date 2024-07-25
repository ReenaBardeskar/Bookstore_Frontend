import React, { useState } from "react";
import "./login.css";
import NavBar from "../navbar/NavBar.js";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userData = {
    username,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const token = await response.text(); // Assuming token is returned as plain text
        localStorage.setItem("authToken", token); // Store token in localStorage
        localStorage.setItem("username", username);
        console.log("Response:", token);
        // Redirect to home page on successful login
        navigate("/");
      } else {
        // Handle login failure
        const errorMessage = await response.text();
        console.log(errorMessage);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.log(error);
    }
  };

  return (
    <div className="element">
      <NavBar />
      <div className="outer-container">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Enter" />
          </form>
          <p>
            Don't have an account? <a href="registration">Register instead</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
