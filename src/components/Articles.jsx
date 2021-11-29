import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { getArticles } from "../utils/api";
import timeSince from "../utils/timeSince";
import SortBySelector from "./SortBySelector";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErr] = useState(null);
  const { darkTheme } = useContext(ThemeContext);
  let { topic } = useParams();
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortBy)
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
      })
      .catch((err) => {
        setIsLoading(false)
        setErr("Oops, this page does not exist!");
      });
  }, [topic, sortBy, error]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <main className="articles">
      <div className="sortBy">
      Sort by: <SortBySelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      {articles.map((article) => {
        let d = new Date(article.created_at);
        let timeLabel = timeSince(d);
        const topicLabel =
          article.topic[0].toUpperCase() + article.topic.substring(1);
        return (
          <Link key={article.article_id}
          className={`${darkTheme ? "link-darkTheme" : "link"}`}
          to={`/articles/${article.article_id}`}
        >
          <section key={article.article_id}>

              {article.title}
           
            <p>
              Topic: <b>{topicLabel}</b>
              <br />
              Created <b>{timeLabel}</b> ago by <b>{article.author}</b>
              <br />
              Comments: <b>{article.comment_count}</b> Kudos:{" "}
              <b>{article.votes}</b>
            </p>
          </section>
          </Link>
        );
      })}
    </main>
  );
};

export default Articles;
