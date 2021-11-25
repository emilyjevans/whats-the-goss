import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles } from "../utils/api";
import timeSince from "../utils/timeSince";

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
          let d = new Date(article.created_at)
          let timeLabel = timeSince(d)
          return (
            <section key={article.article_id}>
              <Link className="link" to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
              <p>
                Created {timeLabel} ago by <b>{article.author}</b>  
                <br/>Comments: <b>{article.comment_count}</b> Kudos:  <b>{article.votes}</b>
              </p>
            </section>
          );
        })}
      </main>
    </main>
  );
};

export default Articles;
