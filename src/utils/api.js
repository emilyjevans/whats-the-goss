import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://whats-the-goss.herokuapp.com/api/",
});

export const getTopics = () => {
    return newsApi.get("/topics").then((res) => {
      return res.data.topics;
    });
  };

export const getArticle = () => {
  return newsApi.get("/articles/:article_id").then((res) => {
    return res.data.articles;
  });
};
