import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const [comment, setComment] = useState('');
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment, setIsAddingComment } = props;
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
      setIsAddingComment(false);
    }
  }, [status, error, onAddedComment, setIsAddingComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    if(comment.trim() === '') return;
    sendRequest({ commentData: { text: comment }, quoteId: props.quoteId });
    setComment('');
  };

  const pending = status === "pending" && (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {pending}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" 
        rows="5" 
        onChange={(e) => setComment(e.target.value)} 
        value={comment}
        placeholder='write your comment here'></textarea>
      </div>
      <div className={classes.actions}>
        <button type="submit" className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
