import React from "react";
import { Link } from "react-router-dom";
import './App.css';

const ArticleCard = ({ article }) => {
  const fallbackImage = "path/to/placeholder/image.jpg";
  const imageUrl = article.article_img_url || fallbackImage;


  return (
    <li className="article-card">
      <Link to={`/article/${article.article_id}`}>
        <div className="article-card-content">
          <h3 className="article-card-title">{article.title}</h3>
        </div>
        <img className="article-card-image" src={imageUrl} alt={article.title} />
        <div className="article-card-content">
          <p className="article-card-body">{article.body}</p>
        </div>
      </Link>
    </li>
  );
};

export default ArticleCard;