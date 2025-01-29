import Navbar from "../shared/Navbar.jsx";
import "./HomePage.css";
import Footer from "../shared/Footer.jsx";

const HomePage = () => {
  const navigateToExercises = () => {
    window.location.href = "/exercises";
  };

  return (
    <>
    <div>
      <Navbar />
      <div className="homepage-content">
        {/* <div className="hero-image">
          <img src={heroImage} alt="Hero background" />
        </div> */}
        <div className="homepage-text content-wrapper">
          <h1 className="homepage-title">
            <span>Unlock your creativity </span> 
             <span>&</span> 
             <span> get inspired</span>
          </h1>
          
          <p className="homepage-description"> 
            Create before you can overthink
          </p>


            <div className="button-container">
              <button
                onClick={navigateToExercises}
                className="start-button"
              >
                START PRACTISING
              </button>
            </div>
          </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default HomePage;
