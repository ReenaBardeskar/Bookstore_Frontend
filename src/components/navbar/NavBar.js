import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/" className="navlink">
            Home
          </a>
        </li>
        <li>
          <a href="login" className="navlink">
            Login
          </a>
        </li>
        <li>
          <a href="cart" className="navlink">
            View cart
          </a>
        </li>
        <li>
          <form className="searchform" action="search" method="get">
            <input
              type="text"
              id="searchtext"
              name="searchtext"
              placeholder="Search books..."
            />
            <input
              type="image"
              src="searchicon.png"
              alt="Search"
              height="40px"
            />
          </form>
        </li>
        <li>
          <a href="profile">
            <img src="profile-icon-9.png" alt="" height="40px" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
