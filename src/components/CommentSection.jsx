import React, { useEffect, useState } from "react";
import { getCommentsByArticle } from "../utils/api";

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsByArticle(article_id)
      .then((comments) => {
        setComments(comments);
        console.log(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

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
            </li>
          );
        })}
      </section>
    </div>
  );
};

export default CommentSection;
