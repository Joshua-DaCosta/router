import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

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

const AllQuotes = () => {
  const { sendRequest, status, data, error } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);


  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="centered focused">
        <p>{error}</p>
      </div>
    );
  }

  if (status === "completed" && (!data || data.length === 0)) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={[...data]} />;
};

export default AllQuotes;
