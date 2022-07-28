import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { id } = useParams();
  const { sendRequest, status, data } = useHttp(getAllComments);
  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);
  console.log(id);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const onAddedComment = useCallback(() => {
    sendRequest(id);
  }, [sendRequest, id]); 

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && data && data.length > 0)
    comments = <CommentsList comments={data} />;

  if (status === "completed" && (!data || data.length === 0))
    comments = <p>No comments added yet.</p>;

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          setIsAddingComment={setIsAddingComment}
          quoteId={id}
          onAddedComment={onAddedComment}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
