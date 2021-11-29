import React, { useContext, useState } from "react";
import { sendComment } from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PostComment = () => {
  const [newComment, setNewComment] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErr] = useState(null);
  const { user } = useContext(UserContext);
  let { article_id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    sendComment(article_id, user, newComment)
    .then(() => {
      setIsLoading(false)
      setSubmitStatus(true);
    })
    .catch((err) => {
      setIsLoading(false)
      setErr("Cannot submit an empty comment")
    });
  };

  if (error) return <p>{error}</p>

  if(isLoading) return <p>Loading...</p>

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
        </label><br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default PostComment;
