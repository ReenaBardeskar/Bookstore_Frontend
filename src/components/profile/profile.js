import React from "react";
import "./profile.css";
import NavBar from "../navbar/NavBar.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // State to toggle the form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    console.log("jwt token = ", localStorage.getItem("authtoken"));
    console.log("logout successful");
    navigate("/");
  };

  const fetchUserData = async () => {
    const username = localStorage.getItem("username");
    const response = await fetch(`http://localhost:8080/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");

    // Update user data
    await fetch(`http://localhost:8080/user/update/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    fetchUserData();
    setIsEditing(false);
  };

  return (
    <div>
      <NavBar />
      <div className="outer">
        <div className="content">
          <h1>Your profile</h1>
          {loading ? <h2>Loading...</h2> : ""}
          {userData ? (
            <div className="personal">
              <div className="line">
                <label className="label">First Name:</label>
                <span>
                  <label className="value">{userData.firstName}</label>
                </span>
              </div>
              <div className="line">
                <label className="label">Last Name:</label>
                <span>
                  <label className="value">{userData.lastName}</label>
                </span>
              </div>
              <div className="line">
                <label className="label">Email:</label>
                <label className="value">{userData.email}</label>
              </div>
              <div className="buttondiv">
                <button onClick={handleEditClick} className="btns">
                  Edit Personal information
                </button>
              </div>
            </div>
          ) : (
            <div>No user data found</div>
          )}

          {isEditing && (
            <div className="popup-form">
              <h2>Edit Personal Information</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="line">
                  <label className="label">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="line">
                  <label className="label">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="line">
                  <label className="label">Mobile Number:</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="line">
                  <label className="label">password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="buttondiv">
                  <button type="submit" className="btns">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btns"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          <hr />
          <div className="address">
            <div className="line">
              <label className="label">Address:</label>
              <label className="value">88, Street Avenue</label>
            </div>
            <div className="line">
              <label></label>
              <label className="value">Ringgold, GA 11111</label>
            </div>
            <div className="buttondiv">
              <button className="btns">Edit address information</button>
            </div>
          </div>
          <hr />
          <div className="payment">
            <div className="line">
              <label className="label">Credit card type:</label>
              <label className="value">VISA</label>
            </div>
            <div className="line">
              <label className="label">Credit card number:</label>
              <label className="value">1111-1111-1111-****</label>
            </div>
            <div className="line">
              <label className="label">Expiration date:</label>
              <label className="value">06/27</label>
            </div>
            <div className="line">
              <label className="label">CVV:</label>
              <label className="value">***</label>
            </div>
            <div className="buttondiv">
              <button className="btns">Edit payment information</button>
            </div>
            <div className="buttondiv">
              <button className="btns" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
