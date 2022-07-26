import React from "react";
import { Route, useParams } from "react-router-dom";
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
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => +params.id === quote.id);

  if (!quote) {
    return <p>No quote found.</p>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author}/>
      <Route path={`/quotes/${params.id}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetails;
