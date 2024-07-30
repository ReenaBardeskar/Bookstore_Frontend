import React, { useState, useEffect } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import PopupUser from "./PopupUser";
import PopupAddress from "./PopupAddress";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // State to toggle the form for user details
  const [isEditingAddress, setIsEditingAddress] = useState(false); // State to toggle the form for address
  const [addressData, setAddressData] = useState(null); // State for address data
  const [addressError, setAddressError] = useState(null); // State for address error

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    alert("Logout Successful!!");
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

  const fetchUserAddress = async () => {
    const username = localStorage.getItem("username");

    try {
      const response = await fetch(
        `http://localhost:8080/user/address?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setAddressData(null);
          setAddressError(data.message);
        } else {
          setAddressData(data);
          setAddressError(null);
        }
      } else {
        setAddressData(null);
        setAddressError("Unable to fetch address.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAddressData(null);
      setAddressError("An error occurred while fetching the address.");
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserAddress();
  }, []);

  const handleEditUserClick = () => {
    setIsEditing(true);
  };

  const handleEditAddressClick = () => {
    setIsEditingAddress(true);
  };

  return (
    <div>
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
                <button onClick={handleEditUserClick} className="btns">
                  Edit Personal Information
                </button>
              </div>
            </div>
          ) : (
            <div>No user data found</div>
          )}

          <PopupUser
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            userData={userData}
            fetchUserData={fetchUserData}
          />

          <PopupAddress
            isEditingAddress={isEditingAddress}
            setIsEditingAddress={setIsEditingAddress}
            addressData={addressData} // Pass address data to PopupAddress
            fetchUserAddress={fetchUserAddress} // Fetch updated address after saving
          />

          <hr />
          <div className="address">
            {addressError ? (
              <div>
                <div className="line">
                  <label className="label">Address:</label>
                  <label className="value">{addressError}</label>
                </div>
                <div className="line">
                  <label className="label"></label>
                  <label className="value">
                    Update your address using the button below
                  </label>
                </div>
              </div>
            ) : addressData ? (
              <div>
                <div className="line">
                  <label className="label">Address:</label>
                </div>
                <div className="line">
                  <label className="label">Street:</label>
                  <label className="value">{addressData.street}</label>
                </div>
                <div className="line">
                  <label className="label">City:</label>
                  <label className="value">{addressData.city}</label>
                </div>
                <div className="line">
                  <label className="label">State:</label>
                  <label className="value">{addressData.state}</label>
                </div>
                <div className="line">
                  <label className="label">Zip Code:</label>
                  <label className="value">{addressData.zipCode}</label>
                </div>
              </div>
            ) : (
              <div>
                <div className="line">
                  <label className="label">Address:</label>
                  <label className="value">Loading...</label>
                </div>
              </div>
            )}
            <div className="buttondiv">
              <button onClick={handleEditAddressClick} className="btns">
                Edit Address Information
              </button>
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
