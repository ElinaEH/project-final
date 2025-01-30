// FlowerPlayButton.jsx
import { Play, Pause } from "lucide-react";
import FlowerIcon1 from "../../../assets/FlowerIcon1.png";
import "./FlowerPlayButton.css";

const FlowerPlayButton = ({ onClick, isPlaying }) => {
  return (
    <button className="flower-play-button" onClick={onClick}>
      <div className="icon-container">
        <img 
          src={FlowerIcon1} 
          alt="Flower play button" 
          className="flower-image"
          width="48"  
          height="48" 
        />
        {isPlaying ? (
          <Pause 
            className="play-icon" 
            size={30}  
            color="#FF8800"
            fill="#FF8800"
          />
        ) : (
          <Play 
            className="play-icon" 
            size={30}  
            color="#FF8800"
            fill="#FF8800"
          />
        )}
      </div>
    </button>
  );
};

export default FlowerPlayButton;
