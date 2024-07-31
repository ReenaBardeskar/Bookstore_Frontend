import React, { useState, useEffect } from "react";
import Step1Books from "./Step1Books";
import Step2Address from "./Step2Address";
import Step3Payment from "./Step3Payment";
import styles from "./checkout.module.css"; // Import the CSS Module

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [addressData, setAddressData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [bookQuantities, setBookQuantities] = useState({});

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cart");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const handleQuantityChange = (isbn, quantity) => {
    setBookQuantities((prevQuantities) => ({
      ...prevQuantities,
      [isbn]: quantity,
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Save quantities to local storage
      localStorage.setItem("bookQuantities", JSON.stringify(bookQuantities));
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleAddressUpdate = (updatedAddress) => {
    setAddressData(updatedAddress);
  };

  const handlePaymentUpdate = (updatedPayment) => {
    setPaymentData(updatedPayment);
  };

  const handleCompletePurchase = () => {
    console.log("Address Data:", addressData);
    console.log("Payment Card Data:", paymentData);
  };

  return (
    <div className={styles.checkout}>
      {currentStep === 1 && (
        <div className={styles.stepContainer}>
          <h2 className={styles.stepHeader}>Step 1: Confirm Books</h2>
          <div className={styles.stepContent}>
            <Step1Books
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className={styles.stepContainer}>
          <h2 className={styles.stepHeader}>Step 2: Confirm Address</h2>
          <div className={styles.stepContent}>
            <Step2Address
              onAddressUpdate={handleAddressUpdate}
              addressData={addressData}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className={styles.stepContainer}>
          <h2 className={styles.stepHeader}>Step 3: Confirm Payment Details</h2>
          <div className={styles.stepContent}>
            <Step3Payment
              paymentData={paymentData}
              onPaymentUpdate={handlePaymentUpdate}
              onPrevious={handlePreviousStep}
            />
          </div>
        </div>
      )}
      <div className={styles.buttonGroup}>
        {currentStep > 1 && (
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={handlePreviousStep}
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button className={styles.btn} onClick={handleNextStep}>
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button className={styles.btn} onClick={handleCompletePurchase}>
            Complete Purchase
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
