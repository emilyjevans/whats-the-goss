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
  const { darkTheme } = useContext(ThemeContext);
  let { topic } = useParams();
  const [sortBy, setSortBy] = useState(null)

  useEffect(() => {
    getArticles(topic, sortBy)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topic, sortBy]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="articles">
        Sort by: <SortBySelector sortBy={sortBy} setSortBy={setSortBy}/>
        <br/>
      {articles.map((article) => {
        let d = new Date(article.created_at);
        let timeLabel = timeSince(d);
        return (
          <section key={article.article_id}>
            <Link
              className={`${darkTheme ? "link-darkTheme" : "link"}`}
              to={`/articles/${article.article_id}`}
            >
              {article.title}
            </Link>
            <p>Topic: {article.topic}<br/>
              Created <b>{timeLabel}</b> ago by <b>{article.author}</b>
              <br />
              Comments: <b>{article.comment_count}</b> Kudos:{" "}
              <b>{article.votes}</b>
            </p>
          </section>
        );
      })}
    </main>
  );
};

export default Articles;
