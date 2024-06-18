import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Articles from "./Articles";
import Article from "./Article";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:article_id" element={<Article />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
