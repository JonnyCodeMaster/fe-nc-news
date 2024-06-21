import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "./utils/api";
import ArticleCard from "./ArticleCard";
import './App.css';

function TopicArticles() {
  const { slug } = useParams();
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortParams, setSortParams] = useState({ sortBy: "created_at", order: "desc" });
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getArticlesByTopic(slug)
      .then((data) => {
        const sortedArticles = sortArticles(data.articles, sortParams.sortBy, sortParams.order);
        setArticlesByTopic(sortedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.msg || "Error fetching topic articles. Please try again later.");
        setIsLoading(false);
      });
  }, [slug, sortParams]);

  const handleSortChange = (event) => {
    const [newSortBy, newOrder] = event.target.value.split(":");
    setSortParams({
      sortBy: newSortBy,
      order: newOrder
    });
  };

  const sortArticles = (articles, sortBy, order) => {
    return articles.slice().sort((a, b) => {
      if (order === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  };

  if (isLoading) {
    return <p>Loading {slug} articles...</p>;
  }

  if (articlesByTopic.length === 0) {
    return <p>No articles found for this topic. Please try a different topic!</p>;
  }

  if (error) {
    return <p>{error.msg}</p>;
  }

  return (
    <section>
      <h3>{slug} articles</h3>
      <div className="sort-controls">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={`${sortParams.sortBy}:${sortParams.order}`} onChange={handleSortChange}>
          <option value="created_at:desc">Article Date (Newest First)</option>
          <option value="created_at:asc">Article Date (Oldest First)</option>
          <option value="comment_count:desc">Comments (Most to Least)</option>
          <option value="comment_count:asc">Comments (Least to Most)</option>
          <option value="votes:desc">Votes (Highest to Lowest)</option>
          <option value="votes:asc">Votes (Lowest to Highest)</option>
        </select>
      </div>
      <div className="articles-grid">
        {articlesByTopic.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default TopicArticles;