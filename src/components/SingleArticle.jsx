import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, incVotes } from "../utils/api";
import CommentSection from "./CommentSection";
import PostComment from "./postComment";
import { UserContext } from "../contexts/UserContext";
import timeSince from "../utils/timeSince";

const SingleArticle = () => {
  let { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [sentVotes, setSentVotes] = useState(0);
  const [err, setErr] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(
    () =>
      getSingleArticle(article_id).then((article) => {
        setArticle(article);
      }),
    [article_id]
  );

  const CommentSectionExpand = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((currOpen) => !currOpen);

    return (
      <div>
        <button onClick={toggleOpen}>
          {isOpen ? "Hide comments" : "View comments"}
        </button>
        {isOpen && children}
      </div>
    );
  };

  const PostCommentExpand = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((currOpen) => !currOpen);

    return (
      <div>
        <button onClick={toggleOpen}>
          {isOpen ? "Hide" : "Post a comment"}
        </button>
        {isOpen && children}
      </div>
    );
  };

  const clickHandle = (e) => {
    e.preventDefault();
    setSentVotes((currCount) => currCount + 1);
    setErr(null);
    incVotes(article_id).catch((err) => {
      setSentVotes((currCount) => currCount - 1);
      setErr("Something went wrong, please try again");
    });
  };

  if (err) return <p>{err}</p>;

  let d = new Date(article.created_at);
  let timeLabel = timeSince(d);

  return (
    <main>
      {console.log(article)}
      <h2>{article.title}</h2>
      <p>{article.topic}</p>
      <h3>Created by {article.author} {timeLabel} ago</h3>
      <p>{article.body}</p>
      <p>Kudos: {article.votes + sentVotes}</p>
      <button disabled={article.author === user.username} onClick={clickHandle}>
        Add kudos
      </button>
      <p>Comment count: {article.comment_count}</p>
      <PostCommentExpand>
        <PostComment />
      </PostCommentExpand>
      <CommentSectionExpand>
        <CommentSection article_id={article_id} />
      </CommentSectionExpand>
    </main>
  );
};

export default SingleArticle;
