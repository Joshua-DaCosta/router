import React, { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";



const QuoteDetails = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { sendRequest, status, data: loadedData, error } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(params.id);
  },[sendRequest, params.id]);


  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>
  }
  if (!loadedData.text) {
    return <p>No quote found.</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedData.text} author={loadedData.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetails;
