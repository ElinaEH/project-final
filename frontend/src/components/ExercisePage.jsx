import Navbar from './Navbar';
import ExerciseList from './exercises/ExerciseList';
import ChordProgression from './exercises/ChordProgression';
import RandomWord from './exercises/RandomWord';
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
