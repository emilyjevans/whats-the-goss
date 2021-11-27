import React, { useContext, useState } from "react";
import { sendComment } from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PostComment = () => {
  const [newComment, setNewComment] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false)
  const { user } = useContext(UserContext);
  let { article_id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(true);
    sendComment(article_id, user, newComment)
    .catch((err) => {
      console.dir(err);
    });
  };

  if (submitStatus) {
    return <div>
      <p>Thank you for your comment</p>
    </div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          <input
            type="text"
            name="comment"
            placeholder="Enter your comment here"
            onChange={(e) => setNewComment(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default PostComment;
