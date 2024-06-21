import React, { useEffect, useState } from "react";
import { getTopics } from "./utils/api";
import TopicCard from "./TopicCard";
import './App.css';

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoadingTopics(true);
    getTopics()
      .then((data) => {
        setTopics(data.topics);
        setIsLoadingTopics(false);
      })
      .catch((error) => {
        setError(error.msg || "Error fetching topics. Please try again later.");
        setIsLoadingTopics(false);
      });
  }, []);

  if (isLoadingTopics) {
    return <p>Loading topics...</p>;
  }

  if (error) {
    return <p>{error.msg}</p>;
  }

  return (
    <section>
      <h3>Please select a topic</h3>
      <div className="topics-grid">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </section>
  );
}

export default Topics;
