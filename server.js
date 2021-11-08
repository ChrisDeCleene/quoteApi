const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get('/api/quotes', (req, res) => {
  const person = req.query.person;
  if (person) {
    const filteredQuotes = quotes.filter(quote => quote.person.toLowerCase().includes(person.toLowerCase()))
    res.send({ quotes: filteredQuotes });
  } else{
    res.send({ quotes: quotes })
  }
})

app.get("/api/quotes/random", (req, res) => {
  const quote = getRandomElement(quotes);
  res.send({ quote: quote });
});

app.post('/api/quotes', (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person
  };
  if(newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
})

app.listen(PORT);
console.log("Listening on port: " + PORT);
