import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { getUsers } from "./utils/api";
import "./App.css";

function Login() {
    const { setUser } = useContext(UserContext);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      getUsers()
        .then((data) => {
          setUsers(data.users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }, []);
  
    const handleUserSelect = (username) => {
      const selectedUser = users.find((user) => user.username === username);
      if (selectedUser) {
        setUser(selectedUser);
      }
    };
  
    return (
        <div className="login-section section-container">
          <h2>Login</h2>
          <p>Select your username:</p>
          <div className="user-list">
            {users.map((user) => (
              <div key={user.username} className="user-card" onClick={() => handleUserSelect(user.username)}>
                <img className="user-card-avatar" src={user.avatar_url} alt={user.username} />
                <span className="user-card-username">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  
  export default Login;