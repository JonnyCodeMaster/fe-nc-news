import React from "react";
import './App.css';

const CommentCard = ({ comment }) => {
    return (
        <li className="comment-card">
          <div className="comment-card-content">
            <h3 className="comment-card-title">{comment.author}</h3>
            <p className="comment-card-body">{comment.body}</p>
            <p className="comment-card-date">{new Date(comment.created_at).toLocaleString()}</p>
          </div>
        </li>
      );
    };

export default CommentCard;