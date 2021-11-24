import React, { useContext, useEffect, useState } from "react";
import { sendComment } from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PostComment = () => {
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);
  let { article_id } = useParams();

  useEffect(() => {}, [article_id, newComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendComment(article_id, user.username, newComment).catch((err) => {
      console.dir(err);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username: {user.username}
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default PostComment;
