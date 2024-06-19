import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Articles from "./Articles";
import Article from "./Article";
import Users from "./Users";
import Login from "./Login";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:article_id" element={<Article />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;