import Navbar from "../shared/Navbar.jsx";
import "./HomePage.css";

const HomePage = () => {
  const navigateToExercises = () => {
    window.location.href = '/exercises';
  };

  return (
    <div>
      <Navbar />
      <div className="homepage-content">
        <div className="homepage-text">
          <h1 className="homepage-title">
            Unlock your creativity & get inspired
          </h1>
          
          <p className="homepage-description"> 
            The ultimate platform for songwriters to boost their creativity
            <br /><br />
            Improve your skills with practical songwriting exercises
          </p>

          <button
            onClick={navigateToExercises}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 
                       rounded-lg text-lg font-semibold transition-colors"
          >
            Start Practicing
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
