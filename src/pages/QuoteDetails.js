import React from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  {
    id: 0,
    author: "Josh",
    text: "Learning is fun!",
  },
  {
    id: 1,
    author: "Nick",
    text: "Learning is for monkeys!",
  },
];

const QuoteDetails = () => {
  const match = useRouteMatch();
  console.log(match);
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => +params.id === quote.id);

  if (!quote) {
    return <p>No quote found.</p>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
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
