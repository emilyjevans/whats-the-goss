import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, incVotes } from "../utils/api";
import CommentSection from "./CommentSection";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/UserContext";
import timeSince from "../utils/timeSince";

const SingleArticle = () => {
  let { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [sentVotes, setSentVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(
    () =>
      getSingleArticle(article_id)
        .then((article) => {
          setArticle(article);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setErr("Oops, this page does not exist!");
        }),
    [article_id]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const CommentSectionExpand = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((currOpen) => !currOpen);

    return (
      <>
        <button onClick={toggleOpen}>
          {isOpen ? "Hide comments" : `View comments`}
        </button>
        {isOpen && children}
      </>
    );
  };

  const PostCommentExpand = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((currOpen) => !currOpen);

    return (
      <>
        <button onClick={toggleOpen}>
          {isOpen ? "Hide comment box" : "Post a comment"}
        </button>
        {isOpen && children}
      </>
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

  if (isLoading) return <p>Loading...</p>;

  let d = new Date(article.created_at);
  let timeLabel = timeSince(d);

  return (
    <main>
      <center>
        <h2>{article.title}</h2>
        <h3>
          Created by {article.author} {timeLabel} ago
        </h3>
        <p>
          Kudos: <b>{article.votes + sentVotes}</b> <br />
          <br />
          <button
            disabled={article.author === user.username || sentVotes === 1}
            onClick={clickHandle}
          >
            Add kudos
          </button>
        </p>
      </center>

      <p>{article.body}</p>
      <center>
        <PostCommentExpand>
          <PostComment />
        </PostCommentExpand>
        <br />
        <br />
        <CommentSectionExpand>
          <CommentSection article_id={article_id} />
        </CommentSectionExpand>
      </center>
    </main>
  );
};

export default SingleArticle;
