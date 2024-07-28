import React, { useState } from "react";
import "./login.css";

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
        const data = await response.json();
        const token = data.token;
        const accountTypeId = data.accountTypeId;

        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);

        console.log("Response:", token);
        if (accountTypeId === 1) {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        const errorMessage = await response.text();
        if (response.status === 403) {
          alert("Incorrect username or password. Please try again.");
        } else if (response.status === 428) {
          alert(errorMessage);
        } else {
          // Handle other errors
          alert(`Error: ${errorMessage}`);
        }
      }
    } catch (error) {
      // Handle network errors or other issues
      // console.log(error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="element">
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
