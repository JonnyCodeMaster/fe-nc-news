import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "./utils/api";
import ArticleCard from "./ArticleCard";
import './App.css';

function TopicArticles() {
  const { slug } = useParams();
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(slug)
      .then((data) => {
        setArticlesByTopic(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return <p>Loading {slug} articles...</p>;
  }

  return (
    <section>
      <h3>{slug} articles</h3>
      <div className="articles-grid">
        {articlesByTopic.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default TopicArticles;