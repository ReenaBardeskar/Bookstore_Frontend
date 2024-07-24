import React from "react";
import "./profile.css";
import NavBar from "../navbar/NavBar.js";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <div className="outer">
        <div className="content">
          <h1>Your profile</h1>
          <div className="personal">
            <div className="line">
              <label className="label">Name:</label>
              <span>
                <label className="value">Benjamin Brown</label>
                <label>
                  (<a href="/#">Edit</a>)
                </label>
              </span>
            </div>
            <div className="line">
              <label className="label">Email:</label>
              <label className="value">benjaminbrownforte@gmail.com</label>
            </div>
            <div className="line">
              <label className="label">Password</label>
              <span>
                <label className="value">************</label>
                <label>
                  (<a href="/#">Edit</a>)
                </label>
              </span>
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
