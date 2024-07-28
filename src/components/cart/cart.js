import React from "react";
import { useEffect, useState } from "react";
import "./cart.css";
import Notification from "../Notification/Notification.js";

const Cart = () => {
  const [notification, setNotification] = useState(null);

  const [booksInCart, setBooksInCart] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedList = localStorage.getItem("cart");
    if (storedList) {
      setBooksInCart(JSON.parse(storedList));
    } else {
      setBooksInCart([]);
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (booksInCart.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/books/by-isbn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booksInCart),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Convert object of objects into an array of objects
        const booksArray = Object.keys(data).map((key) => data[key]);
        setBooks(booksArray);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [booksInCart]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleRemoveFromCart = (isbn) => {
    // Remove book from local storage
    const updatedBooksInCart = booksInCart.filter((item) => item !== isbn);
    localStorage.setItem("cart", JSON.stringify(updatedBooksInCart));
    setBooksInCart(updatedBooksInCart);
    window.dispatchEvent(new Event("storage"));

    setNotification("Book removed from cart!");
    // Optionally, re-fetch the books to update the UI
    setBooks(books.filter((book) => book.isbn !== isbn));
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      <Notification message={notification} onClose={handleCloseNotification} />
      <div className="top-row">
        <p></p>
        <h1>Your cart</h1>
      </div>
      <div id="cart-container">
        <div className="book-details-container">
          {books.length > 0 ? (
            <a href="/checkout">
              <button type="button" className="btns">
                Proceed to checkout
              </button>
            </a>
          ) : (
            ""
          )}
          {books.length > 0 ? (
            books.map((book) => (
              <div className="book-details-card" key={book.bookID}>
                <div className="card">
                  <div className="card-image">
                    <img src={book.imageData} alt={book.title} />
                  </div>
                  <div className="card-details">
                    <div className="price-top-right">
                      <span className="selling-price">
                        ${book.sellingPrice}
                      </span>
                    </div>
                    <h1 className="book-title">{book.title}</h1>
                    <p>
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p>
                      <strong>Category:</strong> {book.category}
                    </p>
                    <p>
                      <strong>Publisher:</strong> {book.publisher}
                    </p>
                    <p>
                      <strong>Publication Year:</strong> {book.publicationYear}
                    </p>
                    <p>
                      <strong>Edition:</strong> {book.edition}
                    </p>
                    <p>
                      <strong>Description:</strong> {book.description}
                    </p>
                    <button
                      className="btns"
                      onClick={() => handleRemoveFromCart(book.isbn)}
                    >
                      Remove from Cart
                    </button>
                    <button className="btns">+ Qunatity</button>
                    <button className="btns">- Qunatity</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No book in the Cart</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
