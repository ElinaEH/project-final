import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { FaRegStar, FaStar } from "react-icons/fa";
import ExerciseCardDetails from "./ExerciseCardDetails";
import "./ChordProgression.css";

const API_URL = import.meta.env.VITE_API_URL;

// Component that generates and manages chord progressions based on moods
const ChordProgression = () => {
  // State for chord data, loading state, and saved status
  const { user } = useAuth();
  const [chords, setChords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedKey, setSelectedKey] = useState("C");

  const keys = ["C", "G", "D", "A"];

  // Fetch random chord progression 
  const getRandomChords = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/chords/progression?key=${selectedKey}`);
      const data = await response.json();
      setChords(data);
      setIsSaved(false); // Reset saved state for new chord progressions
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch mood-based chord progression
  const getMoodChords = async (mood) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/chords/mood-progression?mood=${mood}&key=${selectedKey}`);
      const data = await response.json();
      setChords(data);
      setIsSaved(false);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Save exercise to user profile
  const saveExercise = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/profile/save-exercise`, {
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
      setError(true);
    }
  };

  // Define mood buttons configuration
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
      description="Pick a mood for your song, or hit random, and a matching chord progression will be generated"
      displayContent={
        chords && (
          <div className="chord-display">
            <h3>Mood: {chords.mood}</h3>
            <h3>Chords: {chords.chords.join(" - ")}</h3>
            <div className="tooltip-container">
              <button onClick={saveExercise} className="save-button">
                {isSaved ? <FaStar className="star-icon" /> : <FaRegStar className="star-icon" />}
                <div className="tooltip">
                  {user ? (
                    "Save this exercise to store it in your profile"
                  ) : (
                    "Sign in to save this exercise"
                  )}
                </div>
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
