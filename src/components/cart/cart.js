import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./cart.css";
import Notification from "../Notification/Notification.js";

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate
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
        const booksArray = Object.keys(data).map((key) => ({
          ...data[key],
          quantity: 1, // Default quantity
        }));
        setBooks(booksArray);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [booksInCart]);

  const handleRemoveFromCart = (isbn) => {
    const updatedBooksInCart = booksInCart.filter((item) => item !== isbn);
    localStorage.setItem("cart", JSON.stringify(updatedBooksInCart));
    setBooksInCart(updatedBooksInCart);
    setBooks(books.filter((book) => book.isbn !== isbn));
    setNotification("Book removed from cart!");
  };

  const handleIncreaseQuantity = (isbn) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn === isbn ? { ...book, quantity: book.quantity + 1 } : book
      )
    );
  };

  const handleDecreaseQuantity = (isbn) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn === isbn && book.quantity > 1
          ? { ...book, quantity: book.quantity - 1 }
          : book
      )
    );
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const calculateTotal = () => {
    return books
      .reduce((total, book) => total + book.sellingPrice * book.quantity, 0)
      .toFixed(2);
  };

  const handleProceedToCheckout = () => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please log in to proceed to checkout.");
      navigate("/login");
    } else {
      // Create key-value pairs for ISBN and quantity
      const bookQuantities = books.reduce((acc, book) => {
        acc[book.isbn] = book.quantity;
        return acc;
      }, {});

      // Save book quantities to local storage
      localStorage.setItem("bookquantities", JSON.stringify(bookQuantities));
      localStorage.setItem("cart", JSON.stringify(booksInCart));
      navigate("/checkout");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Notification message={notification} onClose={handleCloseNotification} />
      <div className="top-row">
        <h1>Your cart</h1>
      </div>
      <div id="cart-container">
        <div className="book-details-container">
          {books.length > 0 ? (
            <div class="top-buttons">
              <button type="button" className="btns" id="total">
                Total: ${calculateTotal()}
              </button>
              <button
                type="button"
                className="btns"
                onClick={handleProceedToCheckout} // Update this button to handle checkout
              >
                Proceed to Checkout
              </button>
            </div>
          ) : (
            "No books in the Cart"
          )}
          {books.length > 0 &&
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
                    <div className="quantity-controls">
                      <button
                        className="btns"
                        onClick={() => handleDecreaseQuantity(book.isbn)}
                      >
                        -
                      </button>
                      <span className="quantity">{book.quantity}</span>
                      <button
                        className="btns"
                        onClick={() => handleIncreaseQuantity(book.isbn)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
