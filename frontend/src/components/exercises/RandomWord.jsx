import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import "./RandomWord.css";
import ExerciseCardDetails from "./ExerciseCardDetails.jsx";

const RandomWord = () => {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getRandomWord = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/words/random");
      const data = await response.json();
      setWord(data.word);
      setIsSaved(false);
    } catch (error) {
      console.error("Error fetching random word:", error);
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
          type: "word",
          content: {
            word: word,
            savedAt: new Date()
          }
        })
      });

      if (response.ok) {
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  return (
    <ExerciseCardDetails
      title="Lyrical Exercise"
      description="Click the button to get a random word"
      displayContent={
        word && (
          <div className="word-content">
            <h3>{word}</h3>
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
