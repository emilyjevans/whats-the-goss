import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getTopics } from "../utils/api";

const Nav = () => {
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
            <Link key={topic.slug} to={`/topics/${topic.slug}`}>
              {topic.slug}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
