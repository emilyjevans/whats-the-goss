import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { sendComment } from "../utils/api";

const PostComment = (article_id) => {
  const [newComment, setNewComment] = useState([]);
  const [toArticle, setToArticle] = useState(false);
  const username = "jessjelly";

  useEffect(() => {
    sendComment(article_id, username, newComment);
  }, [newComment, article_id]);

  if (toArticle === true) {
    return <Navigate to={`/articles/${article_id}`} />;
  }

  return (
    <div>
      <form afterSubmit={() => toArticle(true)}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Enter comment here:
          <input type="text" name="comment" onChange={e => setNewComment(e.target.value)}/>
        </label>
        <input
          type="submit"
          value="Submit"
          onSubmit={() => {
              setToArticle(true);
            }}
        />
      </form>
    </div>
  );
};

export default PostComment;
