import React from "react";
import "./homepage.css";
import { useState, useEffect, useContext } from "react";
import NavBar from "../navbar/NavBar.js";

const HomePage = () => {
  useEffect(() => {
    const topSellers = [
      {
        title: "Top Seller 1",
        imgSrc: "Book Images/PrideandPrejudice.jpg",
        id: "0001",
      },
      {
        title: "Top Seller 2",
        imgSrc: "Book Images/alchemist.jpg",
        id: "0002",
      },
      { title: "Top Seller 3", imgSrc: "Book Images/odysessy.jpg", id: "0003" },
      { title: "Top Seller 4", imgSrc: "Book Images/gatsby.jpg", id: "0004" },
      { title: "Top Seller 5", imgSrc: "Book Images/hobbit.jpg", id: "0005" },
    ];

    const comingSoon = [
      { title: "Coming Soon 1", imgSrc: "path_to_image6.jpg", id: "0006" },
      { title: "Coming Soon 2", imgSrc: "path_to_image7.jpg", id: "0007" },
      { title: "Coming Soon 3", imgSrc: "path_to_image8.jpg", id: "0008" },
      { title: "Coming Soon 4", imgSrc: "path_to_image9.jpg", id: "0009" },
      { title: "Coming Soon 5", imgSrc: "path_to_image10.jpg", id: "0010" },
    ];

    function createBookElement(book) {
      const bookDiv = document.createElement("div");
      bookDiv.className = "book";
      bookDiv.innerHTML = `
      <img src="${book.imgSrc}" alt="${book.title}">
      <p>${book.title}</p>
      <p><a href="bookdetails.html/id=${book.id}">View details</a></p>
    `;
      return bookDiv;
    }

    const topSellersRow = document.getElementById("top-sellers-row");
    topSellers.forEach((book) => {
      topSellersRow.appendChild(createBookElement(book));
    });

    const comingSoonRow = document.getElementById("coming-soon-row");
    comingSoon.forEach((book) => {
      comingSoonRow.appendChild(createBookElement(book));
    });
  }, []);

  return (
    <div className="homepage">
      <NavBar />

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

      <div className="book-section" id="top-sellers">
        <h2>Top Sellers</h2>
        <div className="book-row" id="top-sellers-row"></div>
      </div>

      <div className="book-section" id="coming-soon">
        <h2>Coming Soon</h2>
        <div className="book-row" id="coming-soon-row"></div>
      </div>
    </div>
  );
};

export default HomePage;
