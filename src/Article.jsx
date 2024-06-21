import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  patchArticleVotes,
  getCommentsByArticleId,
  postComment,
  deleteComment,
} from "./utils/api";
import { UserContext } from "./contexts/UserContext";
import CommentCard from "./CommentCard";
import "./App.css";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [votes, setVotes] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const [showPostSuccessMessage, setShowPostSuccessMessage] = useState(false);
  const [postError, setPostError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false);
  const [articleError, setArticleError] = useState(null);
  const [commentsError, setCommentsError] = useState(null);
  const [noComments, setNoComments] = useState(false);
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
        setArticleError(error.msg || "Error fetching article. Please try again later.");
        setIsLoadingArticle(false);
      });

    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data.comments);
        setNoComments(false);
        setIsLoadingComments(false);
      })
      .catch((error) => {
        if (error.msg === "Resource Not Found") {
          setNoComments(true);
        } else {
          setCommentsError(error.msg || "Error fetching comments. Please try again later.");
        }
        setIsLoadingComments(false);
      });
  }, [article_id, postSuccess]);

  const handleArticleVote = (voteChange) => {
    setVoteError(null);
    setVotes((votes) => votes + voteChange);

    patchArticleVotes(article_id, voteChange).catch((error) => {
      setVoteError(error.msg || "Error voting on article. Please try again later.");
      setVotes((votes) => votes - voteChange);
    });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please login to post a comment.");
      return;
    }

    if (!newCommentBody.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const newComment = {
      comment_id: comments.length ? comments[0].comment_id + 1 : 1,
      body: newCommentBody,
      article_id: article_id,
      author: user.username,
      votes: 0,
      created_at: new Date().toISOString(),
    };

    setIsSubmitting(true);
    setComments([newComment, ...comments]);
    setNoComments(false);

    postComment(article_id, user.username, newCommentBody)
      .then(() => {
        setNewCommentBody("");
        setPostSuccess(true);
        setPostError(null);
        setShowPostSuccessMessage(true);
        setTimeout(() => {
          setShowPostSuccessMessage(false);
        }, 2500);
      })
      .catch((error) => {
        setPostError(error.msg || "Error posting comment. Please try again later.");
        alert(postError);
        setPostSuccess(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDeleteComment = (comment_id) => {
    setIsDeleting(true);
    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        if (comments.length === 1) {
          setNoComments(true);
        }
        setDeleteSuccess("Comment deleted successfully!");
        setDeleteError(null);
        setShowDeleteSuccessMessage(true);
        setTimeout(() => {
          setShowDeleteSuccessMessage(false);
        }, 2500);
      })
      .catch((error) => {
        setDeleteError(error.msg || "Error deleting comment. Please try again later.");
        alert(deleteError);
        setDeleteSuccess(null);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  if (isLoadingArticle) {
    return <p>Loading article...</p>;
  }

  if (articleError) {
    return <p>{articleError}</p>;
  }

  return (
    <section className="single-article-section">
      {article ? (
        <>
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
                  <button
                    className="up-vote"
                    onClick={() => handleArticleVote(1)}
                  >
                    <span role="img" aria-label="thumbs-up">
                      👍
                    </span>
                  </button>
                </p>
                <p className="vote-count">Votes: {votes}</p>
                <p>
                  <button
                    className="down-vote"
                    onClick={() => handleArticleVote(-1)}
                  >
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
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <textarea
                  rows="5"
                  placeholder="Write your comment here..."
                  value={newCommentBody}
                  onChange={(event) => setNewCommentBody(event.target.value)}
                  required
                  className="comment-textarea"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="nav-button"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                {showPostSuccessMessage && (
                  <p style={{ color: "lime" }}>Comment posted successfully!</p>
                )}
              </form>
            ) : (
              <p>Please log in to leave a comment.</p>
            )}
          </section>

          <section className="comments-section">
            <h3>Comments</h3>
            {isLoadingComments ? (
              <p>Loading comments...</p>
            ) : commentsError ? (
              <p>{commentsError}</p>
            ) : noComments ? (
              <p>No comments yet</p>
            ) : (
              <ul className="comments-list">
                {comments.map((comment) => (
                  <CommentCard
                    key={comment.comment_id}
                    comment={comment}
                    onDelete={handleDeleteComment}
                    showDeleteSuccessMessage={showDeleteSuccessMessage}
                    deleteSuccess={deleteSuccess}
                    deleteError={deleteError}
                    isDeleting={isDeleting}
                  />
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <p>Article not found</p>
      )}
    </section>
  );
}

export default Article;