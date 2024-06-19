import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  patchArticleVotes,
  getCommentsByArticleId,
  postComment,
} from "./utils/api";
import CommentCard from "./CommentCard";
import { UserContext } from "./contexts/UserContext";
import "./App.css";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [votes, setVotes] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoadingArticle(true);
    setIsLoadingComments(true);

    getArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
        setVotes(data.article.votes);
        setIsLoadingArticle(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setIsLoadingArticle(false);
      });

    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data.comments);
        setIsLoadingComments(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setComments([]);
        } else {
          console.error("Error fetching comments:", error);
        }
        setIsLoadingComments(false);
      });
  }, [article_id, postSuccess]);

  const handleArticleVote = (voteChange) => {
    setVoteError(null);
    setVotes((votes) => votes + voteChange);

    patchArticleVotes(article_id, voteChange).catch((error) => {
      console.error("Error voting on article:", error);
      setVoteError("Error voting on article", error);
      setVotes((votes) => votes - voteChange);
    });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please login to post a comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    setIsSubmitting(true);

    postComment(article_id, user.username, newComment)
      .then((comment) => {
        setNewComment("");
        setPostSuccess(true);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        alert("Failed to post comment. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoadingArticle) {
    return <p>Loading article...</p>;
  }

  return (
    <section className="single-article-section">
      <div className="single-article-card">
        <h3 className="single-article-title">{article.title}</h3>
        <img
          className="single-article-image"
          src={article.article_img_url}
          alt={article.title}
        />

        <div className="single-article-content">
          <p className="single-article-body">{article.body}</p>

          <div className="article-votes">
            <p>
              <button className="up-vote" onClick={() => handleArticleVote(1)}>
                <span role="img" aria-label="thumbs-up">
                  👍
                </span>
              </button>
            </p>
            <p className="vote-count">Votes: {votes}</p>
            <p>
              <button className="down-vote" onClick={() => handleArticleVote(-1)}>
                <span role="img" aria-label="thumbs-down">
                  👎
                </span>
              </button>
            </p>
            {voteError && <p className="vote-error">{voteError}</p>}
          </div>
        </div>
      </div>

      <section className="comment-form-section">
        <h3>Add a new comment</h3>
        {user ? (
          <form onSubmit={handleCommentSubmit} className="commewnt-form">
            <textarea
              rows="5"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              required
              className="comment-textarea"
            />
            <br />
            <button type="submit" disabled={isSubmitting} className="nav-button">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
            {postSuccess && <p style={{ color: "lime" }}>Comment posted successfully!</p>}
          </form>
        ) : (
          <p>Please log in to leave a comment.</p>
        )}
      </section>

      <section className="comments-section">
        <h3>Comments</h3>
        {isLoadingComments ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

export default Article;
