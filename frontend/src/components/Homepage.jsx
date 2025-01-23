import Navbar from "./Navbar.jsx";
import ExerciseList from "./ExerciseList.jsx";
// import RandomWord from "./WordExercise/RandomWord.jsx";
// import ChordProgression from "./ChordExercise/ChordProgression.jsx";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <ExerciseList />
      {/* <RandomWord />
      <ChordProgression /> */}
    </div>
  );
};

export default Homepage;
