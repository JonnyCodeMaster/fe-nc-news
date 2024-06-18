import React, { useEffect, useState } from "react";
import "./App.css";
import ArticleCard from "./ArticleCard";
import { getArticles } from './utils/api';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);
    
    useEffect(() => {
        setIsLoadingArticles(true);
        getArticles()
          .then(data => {
            setArticles(data.articles);
            setIsLoadingArticles(false);
          })
          .catch(error => {
            console.error('Error fetching items:', error);
            setIsLoadingArticles(false);
          });
      }, []);

      if (isLoadingArticles) {return <p>Loading articles...</p>};

      return (
        <section>
          <h3>Please select an article</h3>
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </div>
        </section>
      );
}

export default Articles;