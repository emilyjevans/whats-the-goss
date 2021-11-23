import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router";
import { sendComment } from "../utils/api";
import { useParams } from "react-router-dom";

const PostComment = () => {
  const [newComment, setNewComment] = useState("");
  const [toArticle, setToArticle] = useState(false);
  const username = "jessjelly";
  let { article_id } = useParams();

  // useEffect(() => {
  //   console.log(article_id);
  //   console.log(username);
  //   console.log(newComment);

  // }, [newComment, article_id, toArticle]);

  // if (toArticle === true) {
  //   console.log("hello")
  //   return <Navigate to={`/articles/${article_id}`} />;
  // }

  return (
    <div>
      <form onSubmit={() => toArticle(true)}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Enter comment here:
          <input
            type="text"
            name="comment"
            onChange={(e) => setNewComment(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          onSubmit={() => {
            sendComment(article_id, username, newComment).catch((err) => {
              console.log(err);
            });;
          }}
        />
      </form>
    </div>
  );
};

export default PostComment;
