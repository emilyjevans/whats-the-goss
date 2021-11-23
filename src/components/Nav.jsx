import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getTopics } from "../utils/api";

const Nav = ({topic, setTopic}) => {
    const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <nav className="nav">
        {topics.map((topic) => {
          return (
            <Link key={topic.slug} to={`/articles/${topic.slug}`}>
              {topic.slug}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
