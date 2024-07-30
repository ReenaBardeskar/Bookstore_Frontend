import React, { useState, useEffect } from "react";

const PopupUser = ({ isEditing, setIsEditing, userData, fetchUserData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        mobileNumber: userData.mobileNumber || "",
        password: "", // Assuming password is not pre-filled for security reasons
      });
    }
  }, [userData]);

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

    try {
      await fetch(`http://localhost:8080/user/update/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      fetchUserData(); // Refresh user data after update
      setIsEditing(false); // Close the popup
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    isEditing && (
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
            <label className="label">Password:</label>
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
    )
  );
};

export default PopupUser;
