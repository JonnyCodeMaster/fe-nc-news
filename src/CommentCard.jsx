import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import './App.css';

const CommentCard = ({
    comment,
    onDelete,
    showDeleteSuccessMessage,
    deleteSuccess,
    deleteError,
    isDeleting,
  }) => {
    const { user } = useContext(UserContext);
  
    const handleDelete = () => {
      onDelete(comment.comment_id);
    };

    return (
        <li className="comment-card">
          <div className="comment-card-content">
            <h3 className="comment-card-title">{comment.author}</h3>
            <p className="comment-card-body">{comment.body}</p>
            <p className="comment-card-date">
              {new Date(comment.created_at).toLocaleString()}
            </p>
            {user && user.username === comment.author && (
              <div>
              <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              {isDeleting && <p style={{ color: "ivory" }}>Deleting comment...</p>}
            </div>
          )}
          {showDeleteSuccessMessage && (
              <p style={{ color: "lime" }}>Comment deleted successfully!</p>
            )}
          {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
        </div>
      </li>
    );
  };
  
  export default CommentCard;