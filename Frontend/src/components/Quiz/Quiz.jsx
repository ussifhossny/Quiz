import React from "react";
import axios from "axios";
import classes from "./Quiz.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaXmark } from "react-icons/fa6";

export const Quiz = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [words, setWords] = useState([]);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(false);
  const [showQ, setShowQ] = useState(true);

  //Get List of random words from server
  async function getWords() {
    await axios
      .get("http://localhost:3000/words")
      .then((res) => {
        //Save List of words in Words State
        setWords(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Fetching the List of words once the page start
  useEffect(() => {
    getWords();
  }, []);
  //Calculate the student score
  function getScore(e) {
    e.preventDefault();
    if (words.length > 0) {
      if (e.target.value === words[count].pos) {
        setScore((prevScore) => prevScore + 1);
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    }
  }

  // Displaying Words one by one & Display loading
  const nextWord = (e) => {
    e.preventDefault();
    if (count < words.length - 1 && words.length > 0) {
      setCount((prevCount) => prevCount + 1);
      setProgress(((count + 1) / words.length) * 100);
    } else {
      setProgress(((count + 1) / words.length) * 100);
      setTimeout(() => {
        setShowQ(false);
      }, 1000);
    }
  };
  const showResult = (e) => {
    e.preventDefault();
    navigate("/result/" + score);
  };

  //Remove result of each answer after displaying it
  function resetMsg(e) {
    e.preventDefault();
    setCorrectCount(1);
    setTimeout(() => {
      setCorrectCount(0);
    }, 500);
  }
  //Handler submit when click on btn answer
  function clickHandler(e) {
    e.preventDefault();
    nextWord(e);
    getScore(e);
    resetMsg(e);
  }
  //Swiching between Colors of result
  const green = { color: "green" };
  const red = { color: "rgb(193, 4, 4)" };

  let msg = showQ ? "In Progress" : "Finished";

  return (
    <>
      <div className={classes.container}>
        {words.length > 0 && showQ && (
          <h1>
            Word <span className={classes.word}>{words[count].word}</span> is a?
          </h1>
        )}

        {showQ && (
          <div className="btns">
            <button value={"noun"} onClick={clickHandler}>
              Noun
            </button>
            <button value={"adjective"} onClick={clickHandler}>
              Adjective
            </button>
            <button value={"verb"} onClick={clickHandler}>
              Verb
            </button>
            <button value={"adverb"} onClick={clickHandler}>
              Adverb
            </button>
          </div>
        )}

        <div className={classes.q}>
          {!showQ && <h1>Congratulation!</h1>}
          {!showQ && (
            <button className={classes.resultBtn} onClick={showResult}>
              See Result
            </button>
          )}
        </div>

        {/* Choose which text will displaying */}
        {correctCount > 0 && correct && (
          <p style={green}>
            <FaCheck className={classes.icon} />
          </p>
        )}
        {correctCount > 0 && !correct && (
          <p style={red}>
            <FaXmark className={classes.icon} />
          </p>
        )}

        <h2>
          {msg} <span>{progress}%</span>
        </h2>
      </div>
    </>
  );
};

export default Quiz;
