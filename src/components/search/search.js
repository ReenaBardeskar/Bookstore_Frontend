import React from 'react';
import './search.css';
import NavBar from '../navbar/NavBar.js';
import { useEffect } from "react";

const Search = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('searchtext');
        

        const searchQueryElement = document.getElementById('search-query');
        searchQueryElement.textContent = searchQuery;
        

        const recommendedBooks = [
            { title: 'Book 1', imgSrc: 'path_to_image1.jpg' },
            { title: 'Book 2', imgSrc: 'path_to_image2.jpg' },
            { title: 'Book 3', imgSrc: 'path_to_image3.jpg' },
            { title: 'Book 4', imgSrc: 'path_to_image4.jpg' },
            { title: 'Book 5', imgSrc: 'path_to_image5.jpg' },
            { title: 'Book 6', imgSrc: 'path_to_image6.jpg' },
            { title: 'Book 7', imgSrc: 'path_to_image7.jpg' },
            { title: 'Book 8', imgSrc: 'path_to_image8.jpg' },
            { title: 'Book 9', imgSrc: 'path_to_image9.jpg' },
            { title: 'Book 10', imgSrc: 'path_to_image10.jpg' }
        ];


        function createBookElement(book) {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            bookDiv.innerHTML = `
                <img src="${book.imgSrc}" alt="${book.title}">
                <p>${book.title}</p>
            `;
            return bookDiv;
        }

        // Insert recommended books into the DOM
        const recommendedBooksContainer = document.getElementById('recommended-books');
        const recommendedBooksContainer2 = document.getElementById('recommended-books-2');

        recommendedBooks.slice(0, 5).forEach(book => {
            recommendedBooksContainer.appendChild(createBookElement(book));
        });

        recommendedBooks.slice(5, 10).forEach(book => {
            recommendedBooksContainer2.appendChild(createBookElement(book));
        });
    });

    return (
    <div>
        <NavBar />
        <div class="outer-container">
            <div class="search-container">
                <h1>Search Results</h1>
                <div class="search-query">
                    <p>Your search query: <strong id="search-query"></strong></p>
                </div>
                <div class="book-row" id="recommended-books">

                </div>
                <div class="book-row" id="recommended-books-2">

                </div>
            </div>
        </div>
    </div>
    );
};

export default Search;