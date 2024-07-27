import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../adminnavbar/AdminNavBar";
import "./adminDashboard.css";
import addBooksIcon from "../addbooks/add-books.png";
import manageUsersIcon from "../manageusers/manage-users.png";
import managePormotionsIcon from "../managepromotions/manage-promotions.png";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AdminNavBar />
      <div className="admin-dashboard">
        <div className="icon-container" onClick={() => navigate("/add-books")}>
          <img src={addBooksIcon} alt="Add Books" />
          <p>Add Books</p>
        </div>
        <div
          className="icon-container"
          onClick={() => navigate("/manage-users")}
        >
          <img src={manageUsersIcon} alt="Manage Users" />
          <p>Manage Users</p>
        </div>
        <div
          className="icon-container"
          onClick={() => navigate("/manage-promotions")}
        >
          <img src={managePormotionsIcon} alt="Manage Promotions" />
          <p>Manage Promotions</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
