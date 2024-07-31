import React, { useState, useEffect } from "react";

const PopupCard = ({ username, onClose, onSave }) => {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
    cardType: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/user/payment?username=${username}`,
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
            setCardData({
              cardNumber: "",
              expiryDate: "",
              cardHolder: "",
              cardType: "",
            });
            setError(data.message);
          } else {
            setCardData(data);
            setError(null);
          }
        } else {
          setError("Unable to fetch card details.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An error occurred while fetching the card details.");
      }
    };

    fetchCardData();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/user/payment?username=${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
        }
      );

      if (response.ok) {
        onSave();
        onClose();
      } else {
        setError("Unable to save card details.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("An error occurred while saving the card details.");
    }
  };

  return (
    <div className="popup-form">
      <h2>Edit Payment Card Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="line">
          <label className="label">Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label className="label">Expiry Date:</label>
          <input
            type="text"
            name="expiryDate"
            value={cardData.expiryDate}
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label className="label">Card Holder:</label>
          <input
            type="text"
            name="cardHolder"
            value={cardData.cardHolder}
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <label className="label">Card Type:</label>
          <input
            type="text"
            name="cardType"
            value={cardData.cardType}
            onChange={handleChange}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="buttondiv">
          <button type="submit" className="btns">
            Save
          </button>
          <button type="button" className="btns" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupCard;
