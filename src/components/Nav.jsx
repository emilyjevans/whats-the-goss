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
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="nav">
      {topics.map((topic) => {
        const topicSlug = topic.slug[0].toUpperCase() + topic.slug.substring(1);
        return (
          <Link className="nav__link" key={topic.slug} to={`/${topic.slug}`}>
            {topicSlug}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
