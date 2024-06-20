import React from "react";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import "./App.css";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <section className="header-container">
      <h2>Not Fake News</h2>
      <p>News you can trust!</p>
      {user ? (
        <div className="logged-in">
          <p>
            Logged in as {user.username}{" "}
            <img
              className="avatar"
              src={user.avatar_url}
              alt={`${user.username}'s avatar`}
            />
          </p>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </section>
  );
}

export default Header;