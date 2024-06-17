import React, { useEffect } from "react";
import "./App.css";
import ArticleCard from "./ArticleCard";
import { getArticles } from './utils/api';

function Articles({ articles, setArticles }) {
    useEffect(() => {
        getArticles()
          .then(data => {
            console.log(data.articles, "<<<<< articles data");
            setArticles(data.articles);
          })
          .catch(error => {
            console.error('Error fetching items:', error);
          });
      }, []);

      return (
        <section>
          <h3>Articles</h3>
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </div>
        </section>
      );
}

export default Articles;