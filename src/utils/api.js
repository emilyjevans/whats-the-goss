import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://whats-the-goss.herokuapp.com/api/",
});

export const getTopics = () => {
  return newsApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticles = (topic) => {
  if (topic) {
    return newsApi.get(`/articles?topic=${topic}`).then((res) => {
      return res.data.articles;
    });
  }
  return newsApi.get(`/articles`).then((res) => {
    return res.data.articles;
  });
};

export const getSingleArticle = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsByArticle = (articleId) => {
  return newsApi.get(`/articles/${articleId}/comments`).then((res)=> {
    return res.data.comments;
  })
}
