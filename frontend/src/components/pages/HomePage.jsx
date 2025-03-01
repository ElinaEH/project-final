// Homepage redirecting navigation from exercise route that was created as homepage first, change to proper routing

import Navbar from "../shared/Navbar.jsx";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Footer from "../shared/Footer.jsx";
import BounceIcon from "../shared/animations/BounceIcon.jsx";

const HomePage = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="homepage-content">
          <div className="homepage-text content-wrapper">
            <BounceIcon />
            <h1 className="homepage-title">
              <span>Nurture your creativity </span>
              <span>&</span>
              <span> let your music grow</span>
            </h1>
            <div className="button-container">
              <Link to="/exercises"
                className="start-button">
                START CREATING
              </Link>
            </div>
            <p className="homepage-description">
              <span>Boost your creativity with SOUNDSEED </span>
              <span>A platform for songwriters to get inspired and make their musical ideas blossom</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
