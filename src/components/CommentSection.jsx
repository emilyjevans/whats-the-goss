import React, { useContext, useEffect, useState } from "react";
import { getCommentsByArticle, deleteComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import timeSince from "../utils/timeSince";

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let unmounted = false;
    getCommentsByArticle(article_id)
      .then((comments) => {
        if (!unmounted) {
          setComments(comments);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError("Oops, something went wrong.");
      });
    return () => {
      unmounted = true;
    };
  }, [article_id, comments]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const disableOnClick = (e) => {
    e.target.disabled = true;
  };

  return (
    <div>
      <h3>Comments</h3>

      {comments.map((comment) => {
        let d = new Date(comment.created_at);
        let timeLabel = timeSince(d);
        return (
          <section>
            <li key={comment.comment_id}>
              <h4>
                {comment.author}{" "}
                <button
                  disabled={!(comment.author === user)}
                  onClick={(e) => {
                    disableOnClick(e);
                    deleteComment(comment.comment_id).then(() => {});
                  }}
                >
                  Delete comment
                </button>
              </h4>
              <p>{comment.body}</p>
              <p>
                Created <b>{timeLabel} ago</b>
              </p>
              <p>
                Kudos: <b>{comment.votes}</b>
              </p>
            </li>
          </section>
        );
      })}
    </div>
  );
};

export default CommentSection;
