import React, { useState, useEffect } from "react";
import Step1Books from "./Step1Books";
import Step2Address from "./Step2Address";
import Step3Payment from "./Step3Payment";
import styles from "./checkout.module.css"; // Import the CSS Module
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [addressData, setAddressData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [promoCode, setPromoCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cart");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Save quantities to local storage
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

  const handlePromoUpdate = (updatedPromo) => {
    setPromoCode(updatedPromo);
  };

  // const handleCompletePurchase = () => {
  //   console.log("Address Data:", addressData);
  //   console.log("Payment Card Data:", paymentData);
  // };

  const fetchBooksByISBN = async (isbns) => {
    try {
      const response = await fetch("http://localhost:8080/books/by-isbn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isbns),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch book details.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching books:", error);
      return null;
    }
  };

  const handleCompletePurchase = async () => {
    // Retrieve bookQuantities from localStorage
    const bookQuantities = JSON.parse(
      localStorage.getItem("bookquantities") || "{}"
    );

    const userId = paymentData.userID;
    const paymentId = paymentData.paymentID;
    const addressId = addressData.addressID;

    // Extract ISBNs from the bookQuantities object
    const isbns = Object.keys(bookQuantities);

    if (isbns.length === 0) {
      alert("No books found in the cart.");
      return;
    }

    try {
      // Fetch books by ISBNs to get book details
      const data = await fetchBooksByISBN(isbns);
      if (!data) {
        throw new Error("Failed to fetch book details.");
      }

      // Extract book IDs and prepare order items as an object of objects
      const orderItems = Object.entries(bookQuantities).map(
        ([isbn, quantity]) => {
          // Find the book in the data array by matching the ISBN
          const book = data.find((item) => item.isbn === isbn);

          // Return an object containing bookId, quantity, and price
          return {
            bookId: book ? book.bookID : null,
            quantity: quantity,
            price: book ? book.sellingPrice : 0,
          };
        }
      );

      const totalAmount = Object.values(orderItems).reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      // Prepare order details
      const orderData = {
        order: {
          userId: userId, // Ensure you have user ID in paymentData
          addressId: addressId, // Ensure you have address ID in addressData
          paymentId: paymentId, // Ensure you have payment ID in paymentData
          orderDate: new Date().toISOString(),
          totalAmount: promoCode === "SAVE10" ? totalAmount - 10 : totalAmount,
          orderStatus: "OrderConfirmed", // Or any other status you want to set
          confirmationNumber: Math.floor(Math.random() * 1000000), // Generate a random confirmation number
          promoCode: promoCode, // Get promo code if any
        },
        orderItems: orderItems, // Attach order items as an object of objects
      };

      // Send order data to the backend
      const orderResponse = await fetch("http://localhost:8080/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create the order.");
      }

      const result = await orderResponse.text();
      if (promoCode === "SAVE10") {
        const resultWithDiscount = `${result}\nCongratulations, you got a discount of $10`;
        alert(resultWithDiscount);
      } else {
        alert(result); // Handle result if needed
      }

      navigate("/");

      // Optionally clear localStorage or redirect the user
      localStorage.removeItem("bookquantities");
      localStorage.removeItem("cart");
      // Redirect or show a success message
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.checkout}>
      {currentStep === 1 && (
        <div className={styles.stepContainer}>
          <h2 className={styles.stepHeader}>Step 1: Confirm Books</h2>
          <div className={styles.stepContent}>
            <Step1Books cartItems={cartItems} />
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
              onPromoUpdate={handlePromoUpdate}
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
