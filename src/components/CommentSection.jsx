import React, { useEffect, useState } from "react";
import { getCommentsByArticle, deleteComment } from "../utils/api";

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          return (
            <li key={comment.comment_id}>
              <h4>{comment.author}</h4>
              <p>{comment.body}</p>
              <p>Created at: {comment.created_at}</p>
              <p>Votes: {comment.votes}</p>
              <button
                onClick={() => {
                  deleteComment(comment.comment_id).then(() => {
                    // do I need anything here?
                  });
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
