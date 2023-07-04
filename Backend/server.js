const express = require("express");
const app = express();
const quizData = require("./quiz-data.json");
const bodyParser = require("body-parser");
var HashSet = require('hashset');

//All Words List from database
let wordsList = quizData.wordList;
//All Scores List from database
let scoresList = quizData.scoresList;

// Allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

// Function get random 10 words of 15
function randomListOfWords() {
  let randomWords = new HashSet();
  //Copy array to avoid remove from original array
  const arrayCopy = [...wordsList];
  while (randomWords.length<10) {
    let randomIndex = Math.floor(Math.random() * arrayCopy.length);
    randomWords.add(arrayCopy[randomIndex]);
    console.log(arrayCopy[randomIndex]);
    // Remove the number from the original array
    // arrayCopy.splice(randomIndex, 1);
  }
  console.log(randomWords.toArray());

  return randomWords.toArray();
}
// Sending res to frontend with Random List of words
app.get("/words", (req, res) => {
  res.send(randomListOfWords());
});

//Get the Rank for the quiz final Score
function getRank(final) {
  let numLessThanScore = 0;
  for (let i = 0; i < scoresList.length; i++) {
    if (scoresList[i] < final) {
      numLessThanScore += 1;
    }
  }
  let rank = ((numLessThanScore / scoresList.length) * 100).toFixed(2);
  return rank;
}

//Send the final rank to frontend after calculate the score
app.post("/result", (req, res) => {
  let finalScore = req.body.score;
  const rank = getRank(finalScore);
  res.send(rank);
});

app.listen(3000, (req, res) => {
  console.log("Server is Running...");
  console.log("localhost:3000");
});
