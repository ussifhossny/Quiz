import React, { useState, useEffect } from "react";
import classes from "./Result.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Result = () => {
  const [finalRank, setFinalRank] = useState(0);
  const { id } = useParams();
  let score = (id / 10) * 100;
  const navigate = useNavigate();

  //Post request to server to send student score & get the Rank.
  async function getRank() {
    await axios
      .post("http://localhost:3000/result", { score: score })
      .then((res) => {
        setFinalRank(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Fetching Score once starting page
  useEffect(() => {
    getRank();
  }, []);
  return (
    <>
      <div className={classes.container}>
        <h1>
          Your Rank is <span>{finalRank}</span>
        </h1>
        <button onClick={() => navigate("/quiz")}>Try Again!</button>
      </div>
    </>
  );
};

export default Result;
