import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from './utils/api';
import CommentCard from './CommentCard';
import './App.css';

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleById(article_id)
      .then(data => {
        setArticle(data.article);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });

  getCommentsByArticleId(article_id)
      .then(data => {
        setComments(data.comments);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [article_id]);

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <section className="single-article-section">
      <div className="single-article-card">
        <h3 className="single-article-title">{article.title}</h3>
        <img className="single-article-image" src={article.article_img_url} alt={article.title} />
        <div className="single-article-content">
          <p className="single-article-body">{article.body}</p>
        </div>
      </div>
      <section className="comments-section">
        <h3>Comments</h3>
        <ul className="comments-list">
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </ul>
      </section>
    </section>
  );
}

export default Article;