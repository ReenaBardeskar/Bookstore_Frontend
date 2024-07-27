import React from "react";

import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage.js";
import BookDetails from "./components/BookDetails/BookDetails.js";
import Cart from "./components/cart/cart.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/profile.js";
import Checkout from "./components/checkout/checkout.js";
import Registration from "./components/registration/registration.js";
import Search from "./components/search/search.js";
import ConfirmCart from "./components/confirmcart/confirmcart.js";
import ThankYou from "./components/thankyou/thankyou.js";
import NavBar from "./components/navbar/NavBar.js";
import "./components/navbar/navbar.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div id="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:isbn" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/search" element={<Search />} />
          <Route path="/confirmcart" element={<ConfirmCart />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
