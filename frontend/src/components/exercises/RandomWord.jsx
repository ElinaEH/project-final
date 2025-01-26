import { useState } from "react";
import "./RandomWord.css";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import star icons

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
      setIsSaved(false); // Reset saved state for new word
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
    <div className="random-word-container">
      <h1 className="exercise-headline">Lyrical Exercise</h1>
      <p className="exercise-description">
        Click the button to get a random word. Use this word as inspiration 
        for your next song or lyric line.
      </p>
      
      <div className="word-display">
        {word && (
          <div className="word-content">
            <h3>{word}</h3>
            <button onClick={saveExercise} className="save-button">
              {isSaved ? <FaStar className="star-icon" /> : <FaRegStar className="star-icon" />}
            </button>
          </div>
        )}
      </div>

      <div className="button-container">
        <button 
          className="generate-button"
          onClick={getRandomWord}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "GENERATE WORD"}
        </button>
      </div>

      {word && (
        <div className="prompt-section">
          <p>Write a verse including this word!</p>
        </div>
      )}
    </div>
  );
};

export default RandomWord;