import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { getUsers } from "./utils/api";
import "./App.css";

function Login() {
  const { setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setIsLoadingUsers(true);

    getUsers()
      .then((data) => {
        setUsers(data.users);
        setIsLoadingUsers(false);
      })
      .catch((error) => {
        setError(error.msg || "Error fetching users. Please try again later.");
        setIsLoadingUsers(false);
      });
  }, []);

  const handleUserSelect = (username) => {
    const selectedUser = users.find((user) => user.username === username);
    if (selectedUser) {
      setUser(selectedUser);
      setSelectedUser(selectedUser);
    }
  };

  if (isLoadingUsers) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error.msg}</p>;
  }

  return (
    <div className="login-section section-container">
      <h2>Login</h2>
      <p>Select your username:</p>
      <div className="user-list">
        {users.map((user) => (
          <div
            key={user.username}
            className="user-card"
            onClick={() => handleUserSelect(user.username)}
          >
            <img
              className="user-card-avatar"
              src={user.avatar_url}
              alt={user.username}
            />
            <span className="user-card-username">{user.username}</span>
            {selectedUser && selectedUser.username === user.username && (
              <p className="logged-in-message" style={{ color: "lime" }}>Logged in as {user.username}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;