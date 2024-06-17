import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Articles from "./Articles";
import { getArticles } from './utils/api';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then(data => {
        setArticles(data.articles);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles articles={articles} setArticles={setArticles} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
