import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import ExerciseCardDetails from "./ExerciseCardDetails";
import "./ChordProgression.css";

const ChordProgression = () => {
  const [chords, setChords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getRandomChords = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/chords/progression");
      const data = await response.json();
      setChords(data);
      setIsSaved(false); // Reset saved state for new chord progressions
    } catch (error) {
      console.error("Error fetching chords:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodChords = async (mood) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/chords/mood-progression?mood=${mood}`);
      const data = await response.json();
      setChords(data);
      setIsSaved(false);
    } catch (error) {
      console.error("Error fetching chords:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveExercise = async () => {
    try {
      const response = await fetch("http://localhost:5000/profile/save-exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          type: "chord",
          content: chords
        })
      }); 
      if (response.ok) {
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  const moodButtons = [
    {
      key: "uplifting",
      text: "UPLIFTING",
      onClick: () => getMoodChords("uplifting")
    },
    {
      key: "emotional",
      text: "EMOTIONAL",
      onClick: () => getMoodChords("emotional")
    },
    {
      key: "nostalgic",
      text: "NOSTALGIC",
      onClick: () => getMoodChords("nostalgic")
    },
    {
      key: "random",
      text: "RANDOM",
      onClick: getRandomChords
    }
  ];

  return (
    <ExerciseCardDetails
      title="Chords Exercise"
      description="Generate a chord progression based on the mood you want to express in your song or choose random to get a random mood generated."
      displayContent={
        chords && (
          <div className="chord-display">
            <h3>Mood: {chords.mood}</h3>
            <h3>Chords: {chords.chords.join(" - ")}</h3>
            <div className="tooltip-container">
              <button onClick={saveExercise} className="save-button">
                {isSaved ? <FaStar className="star-icon" /> : <FaRegStar className="star-icon" />}
                <div className="tooltip">Sign in to save this exercise by clicking the star</div>
              </button>
            </div>
          </div>
        )
      }
      actionButtons={
        <div className="chord-progression-content">
          <div className="chord-button-group">
            {moodButtons.map(button => (
              <button 
                key={button.key}
                className="chord-button"
                onClick={button.onClick}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : button.text}
              </button>
            ))}
          </div>
        </div>
      }
      prompt={chords && "Write a chorus melody using this chord progression!"}
    />
  );
};

export default ChordProgression;
