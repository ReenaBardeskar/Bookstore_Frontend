import React, { useState, useEffect, useCallback } from "react";
import "./step2address.css";

const Step2Address = ({ onAddressUpdate }) => {
  const [addressData, setAddressData] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);

  const fetchAddress = useCallback(async () => {
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
          onAddressUpdate(data);
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
  }, [onAddressUpdate]); // Empty dependency array ensures fetchAddress does not change

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]); // Include fetchAddress in the dependency array

  const handleEditAddressClick = () => {
    setEditingAddress(true);
  };

  const handleSaveAddress = async (updatedAddress) => {
    const username = localStorage.getItem("username");

    try {
      const response = await fetch(
        `http://localhost:8080/user/address?username=${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAddress),
        }
      );

      if (response.ok) {
        const data = await response.text();
        alert(data);
        fetchAddress(); // Refresh address data
        setEditingAddress(false);
        setAddressError(null);
      } else {
        setAddressError("Unable to update address.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAddressError("An error occurred while updating the address.");
    }
  };

  const handleCancelEdit = () => {
    setEditingAddress(false);
  };

  return (
    <div>
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

      {editingAddress && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Address</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedAddress = {
                  street: e.target.street.value,
                  city: e.target.city.value,
                  state: e.target.state.value,
                  zipCode: e.target.zipCode.value,
                };
                handleSaveAddress(updatedAddress);
              }}
            >
              <div className="form-group">
                <label>Street:</label>
                <input
                  type="text"
                  name="street"
                  defaultValue={addressData?.street || ""}
                />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={addressData?.city || ""}
                />
              </div>
              <div className="form-group">
                <label>State:</label>
                <input
                  type="text"
                  name="state"
                  defaultValue={addressData?.state || ""}
                />
              </div>
              <div className="form-group">
                <label>Zip Code:</label>
                <input
                  type="text"
                  name="zipCode"
                  defaultValue={addressData?.zipCode || ""}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btns">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btns"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2Address;
