import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getTopics } from "../utils/api";

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="nav">
      {topics.map((topic) => {
        const topicSlug = topic.slug[0].toUpperCase() + topic.slug.substring(1);
        return (
          // <button class="mui-btn">
          <Link className="nav__link" key={topic.slug} to={`/${topic.slug}`}>
            {topicSlug}
          </Link>
          // </button>
        );
      })}
    </nav>
  );
};

export default Nav;
