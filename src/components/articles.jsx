import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles } from "../utils/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { topic } = useParams();

  useEffect(() => {
    getArticles(topic)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="articles">
      <main>
        {articles.map((article) => {
          return (
            <section key={article.article_id}>
              <Link className="link" to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
              <p>Author: {article.author} Created at: {article.created_at}</p>
              <p>Comments: {article.comment_count} Votes: {article.votes}</p>
            </section>
          );
        })}
      </main>
    </main>
  );
};

export default Articles;
