import React, { useState } from "react";
import "./addbooks.css";
import AdminNavBar from "../adminnavbar/AdminNavBar";

const AddBooks = () => {
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    category: "",
    publisher: "",
    publicationYear: "",
    edition: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    description: "",
    imageData: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Book added successfully!");
      // Clear form fields
      setFormData({
        isbn: "",
        title: "",
        author: "",
        category: "",
        price: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="add-book-form-container">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="isbn">ISBN:</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="publisher">Publisher:</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="publicationYear">Publication Year:</label>
            <input
              type="text"
              id="publicationYear"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edition">Edition:</label>
            <input
              type="text"
              id="edition"
              name="edition"
              value={formData.edition}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="buyingPrice">Buying Price:</label>
            <input
              type="number"
              id="buyingPrice"
              name="buyingPrice"
              value={formData.buyingPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sellingPrice">Selling Price:</label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageData">Image URL:</label>
            <input
              type="text"
              id="imageData"
              name="imageData"
              value={formData.imageData}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
