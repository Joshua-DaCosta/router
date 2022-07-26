import React from 'react';
import QuoteList from '../components/quotes/QuoteList';

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
  return <QuoteList quotes={DUMMY_QUOTES}/>
}

export default AllQuotes