import React from "react";
import "./profile.css";
import NavBar from "../navbar/NavBar.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    console.log("jwt token = ", localStorage.getItem("authtoken"));
    console.log("logout successful");
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // const token = localStorage.getItem("authToken");
      const username = localStorage.getItem("username");
      const response = await fetch(`http://localhost:8080/user/${username}`, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUserData(data);
      setLoading(false);
    };

    fetchUserData();
  }, []);

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
                <button>Edit Personal information</button>
              </div>
            </div>
          ) : (
            <div>No user data found</div>
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
              <button>Edit address information</button>
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
              <button>Edit payment information</button>
            </div>
            <div className="buttondiv">
              <button onClick={handleLogout}>
                <h2>Logout</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
