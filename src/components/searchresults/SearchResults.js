// src/pages/SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import styles from "./searchresults.module.css"; // Import the CSS file for scoped styles

const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("query");
  const navigate = useNavigate();

  const handleViewDetails = (isbn) => {
    navigate(`/books/${isbn}`);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/books/search?searchTerm=${encodeURIComponent(
            query
          )}`
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.searchResultsContainer}>
      {books.length > 0 ? (
        books.map((book) => (
          <div className={styles.bookCard} key={book.isbn}>
            <div className={styles.cardImage}>
              <img src={book.imageData} alt={book.title} />
            </div>
            <div className={styles.cardDetails}>
              <div className={styles.priceTopRight}>${book.sellingPrice}</div>
              <h1 className={styles.bookTitle}>{book.title}</h1>
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
                onClick={() => handleViewDetails(book.isbn)}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No books found</div>
      )}
    </div>
  );
};

export default SearchResults;
