import RandomWord from "./WordExercise/RandomWord.jsx";
import ChordProgression from "./ChordExercise/ChordProgression.jsx";
import "./ExerciseList.css";

const ExerciseList = () => {
  return (
    <div>
      <h1 className="exercise-title">
        EXERCISES
      </h1>
      <RandomWord />
      <ChordProgression />
    </div>
  )
};

export default ExerciseList;