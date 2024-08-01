import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification.js";

import "./homepage.css"; // Create a CSS file for styling if needed

const HomePage = () => {
  const [notification, setNotification] = useState(null);

  const [topSellers, setTopSellers] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/books", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        // Convert object of objects into an array of objects
        const booksArray = Object.keys(data).map((key) => data[key]);
        const topBooksArray = [
          booksArray[0],
          booksArray[1],
          booksArray[2],
          booksArray[3],
          booksArray[4],
          booksArray[5],
        ];
        const soonBooksArray = [
          booksArray[6],
          booksArray[7],
          booksArray[8],
          booksArray[9],
          booksArray[11],
          booksArray[12],
        ];

        setTopSellers(topBooksArray);
        setComingSoon(soonBooksArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Function to handle navigation to book details page
  const handleViewDetails = (isbn) => {
    navigate(`/books/${isbn}`);
  };

  const handleAddToCart = (isbn) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(isbn)) {
      cart.push(isbn);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));

      setNotification("Book added to cart!");
    } else {
      setNotification("Book is already in the cart!");
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="homepage">
        <Notification
          message={notification}
          onClose={handleCloseNotification}
        />
        <div className="intro">
          <h1>FIND YOUR FAVORITE BOOK WITH BOOKSTORE-SYSTEM</h1>
          <p>
            Over 5 million books ready to ship and 3.6 million eBooks ready to
            download!
          </p>
        </div>

        <div className="banner">
          <img src="homepageimage.jpeg" alt="Banner" />
        </div>

        <h1>Top Sellers</h1>
        <div id="top-sellers-row" className="book-list">
          {topSellers.map((book, index) => (
            <div key={`${book.bookId}-${index}`} className="book-item">
              <img src={book.imageData} alt={book.title} />
              <p>{book.title}</p>
              <button
                className="btns"
                onClick={() => handleViewDetails(book.isbn)}
              >
                View Details
              </button>
              <button
                className="btns"
                onClick={() => handleAddToCart(book.isbn)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <h1>Coming Soon</h1>
        <div id="coming-soon-row" className="book-list">
          {comingSoon.map((book, index) => (
            <div key={`${book.bookId}-${index}`} className="book-item">
              <img src={book.imageData} alt={book.title} />
              <p>{book.title}</p>
              <p>
                <button className="btns">View Details</button>
                <button className="btns">Add to Cart</button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
