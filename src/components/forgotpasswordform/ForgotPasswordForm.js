import React, { useState } from "react";
import "./forgotpasswordform.css"; // Import the CSS file

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/user/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (response.status === 200) {
      alert("A password reset email has been sent.");
    } else if (response.status === 404) {
      alert("Username not found.");
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h3>Enter username to reset password</h3>

        <div className="forgot-password-label">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
