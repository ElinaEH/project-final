import ExerciseList from "../exercises/ExerciseList.jsx";
import Navbar from "../shared/Navbar.jsx";
import Footer from "../shared/Footer.jsx";
import "./ExercisePage.css";

const ExercisePage = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="exercise-container">
          <h1 className="exercise-title">Exercise Hub</h1>
          <p className="exercise-intro">Welcome to the Exercise Hub! 
            <span className="exercise-intro">
              Here are some exercises to practice the flow of songwriting without judgment. Don't overthink it - just start creating!
            </span>
             </p>
          <ExerciseList />
        </div>
      </div>
      <Footer />
      </>
  );
};

export default ExercisePage;