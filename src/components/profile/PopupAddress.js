import React, { useState, useEffect } from "react";

const PopupAddress = ({
  isEditingAddress,
  setIsEditingAddress,
  addressData,
  fetchUserAddress,
}) => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (addressData) {
      setFormData({
        street: addressData.street || "",
        city: addressData.city || "",
        state: addressData.state || "",
        zipCode: addressData.zipCode || "",
      });
    }
  }, [addressData]);

  const handleAddressFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressFormSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");

    try {
      await fetch(`http://localhost:8080/user/address?username=${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      setIsEditingAddress(false); // Close the popup
      fetchUserAddress(); // Refresh the address data on the profile page
    } catch (error) {
      console.error("Error updating address:", error);
      setError("An error occurred while updating the address.");
    }
  };

  return (
    isEditingAddress && (
      <div className="popup-form">
        <h2>Edit Address Information</h2>
        <form onSubmit={handleAddressFormSubmit}>
          <div className="line">
            <label className="label">Street:</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleAddressFormChange}
            />
          </div>
          <div className="line">
            <label className="label">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleAddressFormChange}
            />
          </div>
          <div className="line">
            <label className="label">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleAddressFormChange}
            />
          </div>
          <div className="line">
            <label className="label">Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleAddressFormChange}
            />
          </div>
          <div className="buttondiv">
            <button type="submit" className="btns">
              Save
            </button>
            <button
              type="button"
              className="btns"
              onClick={() => setIsEditingAddress(false)}
            >
              Cancel
            </button>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    )
  );
};

export default PopupAddress;
