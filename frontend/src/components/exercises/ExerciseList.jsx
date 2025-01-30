// Both exercises 

import ChordProgression from "./ChordProgression.jsx";
import RandomWord from "./RandomWord.jsx";
import "./ExerciseList.css";

const ExerciseList = () => {
  return (
    <div className="exercise-container">
      <div className="exercise-grid">
        <RandomWord />
        <ChordProgression />
      </div>
    </div>
  );
};

export default ExerciseList;
