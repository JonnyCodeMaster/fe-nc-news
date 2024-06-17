import React from "react";
import './App.css';

const ArticleCard = ({ article }) => {
  console.log(article);
  const fallbackImage = "path/to/placeholder/image.jpg";
  const imageUrl = article.article_img_url || fallbackImage;


  return (
    <li className="article-card">
      <img className="article-card-image" src={imageUrl} alt={article.title} />
      <div className="article-card-content">
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-body">{article.body}</p>
      </div>
    </li>
  );
};

export default ArticleCard;