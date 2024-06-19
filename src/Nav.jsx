import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Nav({ user }) {
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleMenuClick = (menuClicked) => {
    setSelectedMenu(menuClicked);
  };

  return (
    <section>
      <nav className="nav-links">
        <Link className="Link" to="/">
          <button className={`nav-button ${selectedMenu === 'Home' ? 'active' : ''}`} onClick={() => handleMenuClick('Home')}>Home</button>
        </Link>
        <Link className="Link" to="/articles">
          <button className={`nav-button ${selectedMenu === 'Articles' ? 'active' : ''}`} onClick={() => handleMenuClick('Articles')}>Articles</button>
        </Link>
        <Link className="Link" to="/login">
          <button className={`nav-button ${selectedMenu === 'Login' ? 'active' : ''}`} onClick={() => handleMenuClick('Login')}>Login</button>
        </Link>
        {/* <Link className="Link" to="/users">
          <button className={`nav-button ${selectedMenu === 'Users' ? 'active' : ''}`} onClick={() => handleMenuClick('Users')}>Users</button>
        </Link> */}
        {/* {user ? (
          <div className="user-info">
            <img src={user.avatar_url} alt={user.name} className="avatar" />
            <span>{user.name}</span>
          </div>
        ) : (
          <Link className="Link" to="/login">
            <button className={`nav-button ${selectedMenu === 'Login' ? 'active' : ''}`} onClick={() => handleMenuClick('Login')}>Login</button>
          </Link>
        )} */}
      </nav>
    </section>
  );
}

export default Nav;