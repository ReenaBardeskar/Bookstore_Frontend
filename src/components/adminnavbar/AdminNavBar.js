import React from "react";
import { useNavigate } from "react-router-dom";
import "./adminnavbar.css";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    // Clear any authentication tokens or user info
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="admin-navbar">
      <h1 className="admin-title">Admin Dashboard</h1>
      <h2>Welcome Admin, {username}</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminNavBar;
