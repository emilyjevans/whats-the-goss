import React from "react";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";

const Articles = ({topic}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles(topic)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topic]);

  return (
    <main className="articles">
      <main>
        {articles.map((article) => {
          return (
            <section>
              <h3>{article.title}</h3>
              <p>Topic: {article.topic}</p>
              <p>By: {article.author}</p>
              <p>Created: {article.created_at}</p>
              <p>Comments: {article.comment_count}</p>
              <p>Votes: {article.votes}</p>
            </section>
          );
        })}
      </main>
    </main>
  );
};

export default Articles;
