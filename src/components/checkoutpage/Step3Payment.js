import React, { useState, useEffect, useCallback } from "react";
import "./step3payment.css";

const Step3Payment = ({ onPaymentUpdate, onPromoUpdate }) => {
  const [paymentCardData, setPaymentCardData] = useState(null);
  const [paymentCardError, setPaymentCardError] = useState(null);
  const [editingPaymentCard, setEditingPaymentCard] = useState(false);
  const [promo, setPromo] = useState("");

  const handleInputChange = (event) => {
    setPromo(event.target.value); // Update state with user input
  };

  const fetchPaymentCard = useCallback(async () => {
    const username = localStorage.getItem("username");

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
          setPaymentCardData(null);
          setPaymentCardError(data.message);
        } else {
          setPaymentCardData(data);
          setPaymentCardError(null);
          onPaymentUpdate(data); // Make sure this doesn't cause re-renders
        }
      } else {
        setPaymentCardData(null);
        setPaymentCardError("Unable to fetch payment card details.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setPaymentCardData(null);
      setPaymentCardError(
        "An error occurred while fetching payment card details."
      );
    }
  }, [onPaymentUpdate]); // Dependency on onPaymentUpdate

  useEffect(() => {
    fetchPaymentCard();
    onPromoUpdate(promo);
  }, [fetchPaymentCard, onPromoUpdate, promo]); // Dependency on fetchPaymentCard

  const handleEditPaymentCardClick = () => {
    setEditingPaymentCard(true);
  };

  const handleSavePaymentCard = async (updatedPaymentCard) => {
    const username = localStorage.getItem("username");

    try {
      const response = await fetch(
        `http://localhost:8080/user/payment?username=${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPaymentCard),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPaymentCardData(data);
        setEditingPaymentCard(false);
        setPaymentCardError(null);
      } else {
        setPaymentCardError("Unable to update payment card details.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setPaymentCardError(
        "An error occurred while updating payment card details."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingPaymentCard(false);
  };

  return (
    <div>
      <div className="payment-card">
        {paymentCardError ? (
          <div>
            <div className="line">
              <label className="label">Payment Card:</label>
              <label className="value">{paymentCardError}</label>
            </div>
            <div className="line">
              <label className="label"></label>
              <label className="value">
                Update your payment card details using the button below
              </label>
            </div>
          </div>
        ) : paymentCardData ? (
          <div>
            <div className="line">
              <label className="label">Payment Card:</label>
            </div>
            <div className="line">
              <label className="label">Card Number:</label>
              <label className="value">{paymentCardData.cardNumber}</label>
            </div>
            <div className="line">
              <label className="label">Expiry Date:</label>
              <label className="value">{paymentCardData.expiryDate}</label>
            </div>
            <div className="line">
              <label className="label">Card Holder:</label>
              <label className="value">{paymentCardData.cardHolder}</label>
            </div>
            <div className="line">
              <label className="label">Card Type:</label>
              <label className="value">{paymentCardData.cardType}</label>
            </div>
          </div>
        ) : (
          <div>
            <div className="line">
              <label className="label">Payment Card:</label>
              <label className="value">Loading...</label>
            </div>
          </div>
        )}
        <div className="buttondiv">
          <button onClick={handleEditPaymentCardClick} className="btns">
            Edit Payment Card Information
          </button>
        </div>
        <div className="line">
          <div className="form-group">
            <label>Have a Promo Code?</label>
            <input
              type="text"
              name="promoCode"
              value={promo}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {editingPaymentCard && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Payment Card</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedPaymentCard = {
                  cardNumber: e.target.cardNumber.value,
                  expiryDate: e.target.expiryDate.value,
                  cardHolder: e.target.cardHolder.value,
                  cardType: e.target.cardType.value,
                };
                handleSavePaymentCard(updatedPaymentCard);
              }}
            >
              <div className="form-group">
                <label>Card Number:</label>
                <input
                  type="text"
                  name="cardNumber"
                  defaultValue={paymentCardData?.cardNumber || ""}
                />
              </div>
              <div className="form-group">
                <label>Expiry Date:</label>
                <input
                  type="text"
                  name="expiryDate"
                  defaultValue={paymentCardData?.expiryDate || ""}
                />
              </div>
              <div className="form-group">
                <label>Card Holder:</label>
                <input
                  type="text"
                  name="cardHolder"
                  defaultValue={paymentCardData?.cardHolder || ""}
                />
              </div>
              <div className="form-group">
                <label>Card Type:</label>
                <input
                  type="text"
                  name="cardType"
                  defaultValue={paymentCardData?.cardType || ""}
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

export default Step3Payment;
