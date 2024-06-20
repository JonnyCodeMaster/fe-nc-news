import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getArticles } from './utils/api';
import ArticleCard from "./ArticleCard";
import "./App.css";

function Articles() {
    const [articles, setArticles] = useState([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);
    const [sortParams, setSortParams] = useState({ sortBy: "created_at", order: "desc" });
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setIsLoadingArticles(true);
        getArticles()
            .then(data => {
                const sortedArticles = sortArticles(data.articles, sortParams.sortBy, sortParams.order);
                setArticles(sortedArticles);
                setIsLoadingArticles(false);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                setIsLoadingArticles(false);
            });
    }, [sortParams]);

    useEffect(() => {
        setSearchParams({
            sort_by: sortParams.sortBy,
            order: sortParams.order
        });
    }, [sortParams, setSearchParams]);

    const handleSortChange = (event) => {
        const [newSortBy, newOrder] = event.target.value.split(":");
        setSortParams({
            sortBy: newSortBy,
            order: newOrder
        });
    };

    const handleArticleClick = (articleId) => {
        navigate(`/article/${articleId}`);
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

    if (isLoadingArticles) {
        return <p>Loading articles...</p>;
    }

    return (
        <section>
            <h3>Please select an article</h3>
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
                {articles.map((article) => (
                    <ArticleCard
                        key={article.article_id}
                        article={article}
                        onClick={() => handleArticleClick(article.article_id)}
                    />
                ))}
            </div>
        </section>
    );
}

export default Articles;