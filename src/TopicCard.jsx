import React from "react";
import { Link } from "react-router-dom";
import codingTopicImage from "./images/coding-topic.jpg";
import footballTopicImage from "./images/football-topic.jpg";
import cookingTopicImage from "./images/cooking-topic.jpg";
import "./App.css";

const TopicCard = ({ topic }) => {
  let topicImage = "path/to/placeholder/image.jpg";

  if (topic.slug === "coding") {
    topicImage = codingTopicImage;
  }
  if (topic.slug === "football") {
    topicImage = footballTopicImage;
  }
  if (topic.slug === "cooking") {
    topicImage = cookingTopicImage;
  }

  return (
    <li className="topic-card">
      <Link to={`/topics/${topic.slug}`}>
        <div className="topic-card-content">
          <h3 className="topic-card-title">{topic.slug}</h3>
        </div>
        <img className="topic-card-image" src={topicImage} alt={topic.slug} />
        <div className="topic-card-content">
          <p className="topic-card-body">{topic.description}</p>
        </div>
      </Link>
    </li>
  );
};

export default TopicCard;
