import React, { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";
import { useParams } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/books/${isbn}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [isbn]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <NavBar />
      <div className="book-details-card">
        {book ? (
          <div className="card">
            <div className="card-image">
              <img src={book.imageData} alt={book.title} />
            </div>
            <div className="card-details">
              <div className="price-top-right">
                <span className="selling-price">${book.sellingPrice}</span>
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
              <button type="submit" className="btns">
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <div>No book data found</div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
