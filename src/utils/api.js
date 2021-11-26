import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://whats-the-goss.herokuapp.com/api/",
});

export const getTopics = () => {
  return newsApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticles = (topic, sort_by='created_at') => {
  if (topic && sort_by) {
    return newsApi.get(`/articles?topic=${topic}&sort_by=${sort_by}`).then((res) => {
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
  return newsApi.get(`/articles/${articleId}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const deleteComment = (commentId) => {
  return newsApi.delete(`/comments/${commentId}`).then((res) => {
    return res.status;
  });
};

export const sendComment = (articleId, username, comment) => {
  const commentObj = { username: username, body: comment };
  return newsApi
    .post(`/articles/${articleId}/comments`, commentObj)
    .then((res) => {
      return res.status;
    });
};

export const incVotes = (articleId) => {
  const votesObj = { inc_votes: 1 };
  return newsApi.patch(`/articles/${articleId}`, votesObj).then((res) => {
    console.log(res);
    return res.status;
  });
};
