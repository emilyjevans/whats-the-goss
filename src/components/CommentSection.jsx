import React, { useContext, useEffect, useState } from "react";
import { getCommentsByArticle, deleteComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import timeSince from "../utils/timeSince";

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getCommentsByArticle(article_id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id, comments]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      <section>
        {comments.map((comment) => {
          let d = new Date(comment.created_at);
          let timeLabel = timeSince(d);
          return (
            <li key={comment.comment_id}>
              <h4>{comment.author}</h4>
              <p>{comment.body}</p>
              <p>
                Created <b>{timeLabel} ago</b>
              </p>
              <p>Kudos: <b>{comment.votes}</b></p>
              <button
                disabled={!(comment.author === user)}
                onClick={() => {
                  deleteComment(comment.comment_id).then(() => {});
                }}
              >
                Delete comment
              </button>
            </li>
          );
        })}
      </section>
    </div>
  );
};

export default CommentSection;
