import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, incVotes } from "../utils/api";
import CommentSection from "./CommentSection";
import PostComment  from "./postComment";

const SingleArticle = () => {
  let { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [sentVotes, setSentVotes] = useState(0)
  const [err, setErr] = useState(null)

  useEffect(
    () =>
      getSingleArticle(article_id).then((article) => {
        setArticle(article);
      }),
    [article_id]
  );


  const CommentSectionExpand = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen((currOpen) => !currOpen)

    return (
      <div>
        <button onClick={toggleOpen}>{isOpen ? 'Hide comments' :'View comments'}</button>
        {isOpen && children}
      </div>
    )
  }

  const PostCommentExpand = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen((currOpen) => !currOpen)

    return (
      <div>
        <button onClick={toggleOpen}>{isOpen ? 'Hide' :'Post a comment'}</button>
        {isOpen && children}
      </div>
    )
  }

  const clickHandle = (e) => {e.preventDefault();
    setSentVotes((currCount)=>currCount+1);
    setErr(null);
    incVotes(article_id).catch((err)=> {
      setSentVotes((currCount)=>currCount-1)
      setErr('Something went wrong, please try again')
    })
  }

  if (err) return <p>{err}</p>

  return (
    <main>
      {console.log(article)}
      <h2>{article.title}</h2>
      <h3>{article.author}</h3>
      <p>Topic: {article.topic}</p>
      <p>{article.body}</p>
      <p>Created at: {article.created_at}</p>
      <p>Kudos: {article.votes+sentVotes}</p>
      <button onClick={clickHandle}>Add kudos</button>
      <p>Comment count: {article.comment_count}</p>
      <PostCommentExpand>
      <PostComment/>
      </PostCommentExpand>
      <CommentSectionExpand>
      <CommentSection article_id={article_id} />
      </CommentSectionExpand>
    </main>
  );
};

export default SingleArticle;
