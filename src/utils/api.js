import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://not-fake-news.onrender.com/api/",
});

export const getArticles = () => {
  return ncNewsApi.get("/articles").then(({ data }) => {
    return data;
  });
};
