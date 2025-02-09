import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { FaRegStar, FaStar } from "react-icons/fa";
import "./RandomWord.css";
import ExerciseCardDetails from "./ExerciseCardDetails.jsx";

// Component that generates random words for lyrical exercises
const API_URL = import.meta.env.VITE_API_URL;

const RandomWord = () => {
  // State for word, loading and save status
  const { user } = useAuth();
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);

  // Fetch random word from API
  const getRandomWord = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/words/random`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWord(data.word);
      setIsSaved(false);
    } catch (error) {
      console.error("Error fetching random word:", error);
      setError("Failed to fetch random word. Please try again.");
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
          type: "word",
          content: {
            word: word,
            savedAt: new Date()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsSaved(true);
    } catch (error) {
      console.error("Error saving exercise:", error);
      setError("Failed to save exercise. Please try again.");
    }
  };

  return (
    <ExerciseCardDetails
      title="Lyrical Exercise"
      description="Click the button to get a random word"
      displayContent={
        <>
          {error && <div className="error-message">{error}</div>}
          {word && (
            <div className="word-content">
              <h3>{word}</h3>
              <div className="tooltip-container">
                <button
                  onClick={saveExercise}
                  className="save-button"
                  disabled={isLoading}
                >
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
          )}
        </>
      }
      actionButtons={
        <button
          className="generate-button"
          onClick={getRandomWord}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "GENERATE WORD"}
        </button>
      }
      prompt={word && "Write lyrics for a verse and include this word! Set a timer for 30 minutes"}
    />
  );
};

export default RandomWord;
