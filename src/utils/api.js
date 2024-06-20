import axios from "axios";

const notFakeNewsApi = axios.create({
  baseURL: "https://not-fake-news.onrender.com/api",
});

export const getArticles = () => {
  return notFakeNewsApi.get("/articles").then(({ data }) => {
    return data;
  });
};

export const getArticleById = (article_id) => {
    return notFakeNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
      return data;
    });
  };

export const patchArticleVotes = (article_id, voteChange) => {
    return notFakeNewsApi.patch(`/articles/${article_id}`, { inc_votes: voteChange }).then(({ data }) => {
      return data;
    });
  };

export const getCommentsByArticleId = (article_id) => {
    return notFakeNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
      return data;
    });
  };

export const getUsers = () => {
    return notFakeNewsApi.get("/users").then(({ data }) => {
      return data;
    });
  };

export const postComment = (article_id, username, body) => {
    return notFakeNewsApi.post(`/articles/${article_id}/comments`, { username, body }).then(({ data }) => {
        return data;
      });
  };


export const deleteComment = (comment_id) => {
    return notFakeNewsApi.delete(`/comments/${comment_id}`).then(({ data }) => {
      return data;
    });
  };

export const getTopics = () => {
    return notFakeNewsApi.get(`/topics`).then(({ data }) => {
      return data;
    });
  };

export const getArticlesByTopic = (slug) => {
    return notFakeNewsApi.get(`/articles?topic=${slug}`).then(({ data }) => {
      return data;
    });
  };