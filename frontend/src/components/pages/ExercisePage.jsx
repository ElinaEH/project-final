import ExerciseList from "../exercises/ExerciseList.jsx";
import Navbar from "../shared/Navbar.jsx";
import Footer from "../shared/Footer.jsx";
import ArrowIcon from "../shared/ArrowIcon.jsx";
import SpinningIcon from "../shared/SpinningIcon.jsx";
// import FlowerIcon1 from "../../assets/FlowerIcon1.png";
import "./ExercisePage.css";

const ExercisePage = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="exercise-container">
        <SpinningIcon />
        {/* <div className="flower-image-container">
            <img
            src={FlowerIcon1}
            alt="yellow-flower"
            className="flower-icon"
            />
        </div> */}
          <h1 className="exercise-title">Exercise Hub</h1>
          <p className="exercise-intro">Welcome to the Exercise Hub! 
            <span className="exercise-intro">
              Here are some exercises to practice the flow of songwriting without judgment.
            </span>
            <span className="exercise-intro">
              Don"t overthink it - just start creating!
            </span>
             </p>
             <ArrowIcon />
          <ExerciseList />
        </div>
      </div>
      <Footer />
      </>
  );
};

export default ExercisePage;
