import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleArticle } from "../utils/api";
import CommentSection from "./CommentSection";

const SingleArticle = () => {
  let { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(
    () =>
      getSingleArticle(article_id).then((article) => {
        setArticle(article);
      }),
    [article_id]
  );

  return (
    <main>
      {console.log(article)}
      <h2>{article.title}</h2>
      <h3>{article.author}</h3>
      <p>Topic: {article.topic}</p>
      <p>{article.body}</p>
      <p>Created at: {article.created_at}</p>
      <p>Votes: {article.votes}</p>
      <p>Comment count: {article.comment_count}</p>
      <Link to={`/articles/${article.article_id}/postComment`}>
        <button>Post a comment</button>
      </Link>
      <CommentSection article_id={article_id} />
    </main>
  );
};

export default SingleArticle;
