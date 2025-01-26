import RandomWord from "./RandomWord.jsx";
import ChordProgression from "./ChordProgression.jsx";
import "./ExerciseList.css";

const ExerciseList = () => {
  return (
    <div>
      {/* <h1 className="exercise-title">
        EXERCISES
      </h1> */}
      <RandomWord />
      <ChordProgression />
    </div>
  )
};

export default ExerciseList;