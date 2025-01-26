import ChordProgression from "../exercises/ChordProgression.jsx";
import ExerciseList from "../exercises/ExerciseList.jsx";
import RandomWord from "../exercises/RandomWord.jsx";
import Navbar from "../shared/Navbar.jsx";
import './ExercisePage.css';

const ExercisePage = () => {
  return (
    <div>
      <Navbar />
      <div className="exercise-container">
        <h1 className="exercise-title">Exercise Hub</h1>
        <ExerciseList />
        <ChordProgression />
        <RandomWord />
      </div>
    </div>
  );
};

export default ExercisePage;
