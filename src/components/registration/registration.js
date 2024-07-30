import React, { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [subscribeToPromo, setSubscribeToPromo] = useState(false);

  const [showAddress, setShowAddress] = useState(false);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userName: username,
      email,
      password,
      lastName,
      firstName,
      mobileNumber,
      subscribeToPromo,
      shippingAddress: showAddress
        ? {
            street: `${addressLine1} ${addressLine2}`,
            city,
            state,
            zipCode,
          }
        : null,
    };

    try {
      const response = await fetch("http://localhost:8080/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const responseData = await response.text();
      if (response.ok) {
        console.log("Submitted Data:", userData);
        if (showAddress) {
          alert(responseData + "\nAddress also Updated");
        } else {
          alert(responseData + "\nAddress NOT Updated");
        }
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subscribeToPromo">Subscribe to Promo</label>
            <input
              type="checkbox"
              id="subscribeToPromo"
              name="subscribeToPromo"
              checked={subscribeToPromo}
              onChange={(e) => setSubscribeToPromo(e.target.checked)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="showAddress">Add Address</label>
            <input
              type="checkbox"
              id="showAddress"
              name="showAddress"
              checked={showAddress}
              onChange={(e) => setShowAddress(e.target.checked)}
            />
          </div>

          {showAddress && (
            <div className="address-section">
              <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1</label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2</label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
