import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import searchIcon from "./search-book-icon.png";
import profileImage from "../../profile-icon-9.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("By title");

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search page with the query parameter
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const getCartCount = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;
  }, []);

  const updateCartCount = useCallback(() => {
    setCartCount(getCartCount());
  }, [getCartCount]);

  useEffect(() => {
    // Update cart count on component mount
    updateCartCount();

    // Listen to storage changes
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, [updateCartCount]);

  const isLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (isLoggedIn()) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/" className="navlink">
            Home
          </Link>
        </li>

        <li>
          <div className="dropdown">
            <button className="selection" onClick={toggleDropdown}>
              {searchCategory}
            </button>
            {isOpen && (
              <div className="dropdown-content">
                <button onClick={() => setSearchCategory("By title")}>
                  By title
                </button>
                <button onClick={() => setSearchCategory("By genre")}>
                  By genre
                </button>
                <button onClick={() => setSearchCategory("By ISBN")}>
                  By ISBN
                </button>
                <button onClick={() => setSearchCategory("By author")}>
                  By author
                </button>
              </div>
            )}
          </div>
          <form className="searchform">
            <input
              type="text"
              id="searchtext"
              name="searchtext"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              src={searchIcon}
              alt="Search"
              height="30px"
              onClick={handleSearch}
            >
              <img src={searchIcon} alt="" height="30px" />
            </button>
          </form>
        </li>
        <li>
          <Link to="/cart" className="navlink">
            View Cart
            {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
          </Link>
        </li>
        <li>
          {isLoggedIn() ? (
            <h3>Welcome, {localStorage.getItem("username")}</h3>
          ) : (
            <Link to="/login" className="navlink">
              Login
            </Link>
          )}
        </li>
        <li>
          <a href="/profile" onClick={handleProfileClick}>
            <img src={profileImage} alt="" height="40px" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
