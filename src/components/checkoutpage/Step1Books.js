import React, { useState, useEffect } from "react";
import "./step1books.css";

const Step1Books = ({ cartItems }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (cartItems.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/books/by-isbn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItems),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const booksArray = Object.keys(data).map((key) => ({
          ...data[key],
          quantity: 1, // Default quantity
        }));

        // Retrieve book quantities from local storage
        const storedQuantities =
          JSON.parse(localStorage.getItem("bookquantities")) || {};

        // Update books with the quantities from local storage
        const updatedBooksArray = booksArray.map((book) => ({
          ...book,
          quantity: storedQuantities[book.isbn] || 1, // Set quantity from local storage or default to 1
        }));

        setBooks(updatedBooksArray);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [cartItems]);

  const calculateTotal = () => {
    return books
      .reduce((total, book) => total + book.sellingPrice * book.quantity, 0)
      .toFixed(2);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div id="cart-container">
        <div className="book-details-container">
          <div className="total-price">
            <span>Total: ${calculateTotal()}</span>
          </div>
          {books.length > 0 &&
            books.map((book) => (
              <div className="book-details-card" key={book.isbn}>
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
                    <div className="quantity-label">
                      <span>
                        <strong>Quantity:</strong> {book.quantity}
                      </span>
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

export default Step1Books;
