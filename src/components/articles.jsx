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

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  return (
    <main className="articles">
      <main>
        {articles.map((article) => {
          // console.log(typeof article.created_at)
          // console.log((article.created_at))
          // let timeLabel = timeSince(new Date(Date.now()-Date.parse(moment(article.created_at))))
          return (
            <section key={article.article_id}>
              <Link className="link" to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
              <p>
                Author: {article.author} Created at: {article.created_at}
              </p>
              <p>
                Comments: {article.comment_count} Votes: {article.votes}
              </p>
            </section>
          );
        })}
      </main>
    </main>
  );
};

export default Articles;
