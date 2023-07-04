
import { Link } from "react-router-dom";
import classes from './Home.module.css'

function Home() {
  return (
    <>
      <div className={classes.container}>
        <h1>Are You Ready To Start The Quiz?</h1>
        <Link to={"/quiz"}>
          <button>Start The Quiz</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
