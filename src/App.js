import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight, FaTwitter } from "react-icons/fa";
import "./App.scss";
import COLORS_ARRAY from "./colorsArray";

let quoteDB =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("Click in 'change quote' to see your first famous phrase here!");
  const [author, setAuthor] = useState("");
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#2c3e50");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  };
  useEffect(() => {
    fetchQuotes(quoteDB);
  }, []);

  const getRandomQuote = () => {
    //Para encontrar uma posição aleatória do array
    let randomInteger = Math.floor(quotesArray.length * Math.random());

    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    setAccentColor(COLORS_ARRAY[randomInteger]);
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: accentColor, color: accentColor }}
      >
        <div id="wrapper">
          <div id="quote-box" style={{ color: accentColor }}>
            <div class="quote-text">
              <FaQuoteLeft />
              <span id="text">{quote}</span>
              <FaQuoteRight />
            </div>
            <div class="quote-author">
              - <span id="author">{author}</span>
            </div>
            <div class="buttons">
              <a
                class="button"
                id="tweet-quote"
                title="Tweet this quote!"
                href={`http://twitter.com/intent/tweet?text=${quote} -${author}`}
                target="_blank"
                rel="noreferrer"
              >
                Share
                <FaTwitter />
              </a>
              <button
                class="button"
                id="new-quote"
                style={{ backgroundColor: accentColor }}
                onClick={() => getRandomQuote()}
              >
                Change quote
              </button>
            </div>
          </div>
          <div class="footer"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
