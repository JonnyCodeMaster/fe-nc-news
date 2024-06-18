import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://not-fake-news.onrender.com/api",
});

export const getArticles = () => {
  return ncNewsApi.get("/articles").then(({ data }) => {
    return data;
  });
};

export const getArticleById = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
      return data;
    });
  };

  export const getCommentsByArticleId = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
      return data;
    });
  };