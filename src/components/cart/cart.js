import React from 'react';
import { useState, useEffect, useContext} from 'react';
import NavBar from '../navbar/NavBar.js';
import './cart.css';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  useEffect(() => {
      const booksInCart = [
          { title: 'Book 1', imgSrc: 'path_to_image1.jpg', quantity: '1', price: '65.49$' },
          { title: 'Book 2', imgSrc: 'path_to_image2.jpg', quantity: '1', price: '53.29$' },
          { title: 'Book 3', imgSrc: 'path_to_image3.jpg', quantity: '1', price: '100.00$' },
          { title: 'Book 4', imgSrc: 'path_to_image4.jpg', quantity: '1', price: '12.99$' },
          { title: 'Book 5', imgSrc: 'path_to_image5.jpg', quantity: '1', price: '36.15$' },
          { title: 'Book 6', imgSrc: 'path_to_image6.jpg', quantity: '1', price: '299.99$' },
          { title: 'Book 7', imgSrc: 'path_to_image7.jpg', quantity: '1', price: '80.19$' },
          { title: 'Book 8', imgSrc: 'path_to_image8.jpg', quantity: '1', price: '5.99$' },
          { title: 'Book 9', imgSrc: 'path_to_image9.jpg', quantity: '1', price: '214.99$' },
          { title: 'Book 10', imgSrc: 'path_to_image10.jpg', quantity: '1' }
      ];

      function createCartElement(book, i) {
          const element = document.createElement('div');
          element.className = 'cart-element';
          element.innerHTML = `
              <img src="${book.imgSrc}" alt="${book.title}">
              <p class="title">${book.title}</p>
              <p class="price">${book.price}</p>
              <p class="quantity" onclick="">Quantity: ${book.quantity}</p>
              <button type="button" class="increase">Increase</button>
              <button type="button" class="decrease">Decrease</button>
              <p class="remove" onclick="">Remove from cart</p>
          `;
          return element;
      }

      const cartContainer = document.getElementById('cart-container');

      booksInCart.forEach((book, i) => {
          cartContainer.appendChild(createCartElement(book, i));
      });
  },[]);

  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      <div class="top-row">
          <p></p>
          <h1>Your cart</h1>
            <a href="/checkout"><button type="button">Proceed to checkout</button></a>
      </div>
      <div id="cart-container">
          
      </div>
    </div>
  )
};

export default Cart;