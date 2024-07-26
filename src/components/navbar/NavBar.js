import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import searchIcon from "../../searchicon.png"; // Adjust the path as needed
import profileImage from "../../profile-icon-9.png";

const NavBar = () => {
  const navigate = useNavigate();

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
          <Link to="/cart" className="navlink">
            View Cart
          </Link>
        </li>
        <li>
          <form className="searchform">
            <input
              type="text"
              id="searchtext"
              name="searchtext"
              placeholder="Search books..."
            />
            <input type="image" src={searchIcon} alt="Search" height="40px" />
          </form>
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
