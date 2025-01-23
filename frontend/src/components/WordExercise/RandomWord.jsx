// Component for random word exercise - lyrical exercise

import { useState } from "react";
import "./RandomWord.css";

const RandomWord = () => {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRandomWord = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/words/random");
      const data = await response.json();
      setWord(data.word);
    } catch (error) {
      console.error("Error fetching random word:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="random-word-container">
      <h1 className="exercise-headline">Lyrical Exercise</h1>
      {/* <h2>Word Generator Exercise</h2> */}
      <p className="exercise-description">
        Click the button to get a random word. Use this word as inspiration 
        for your next song or lyric line.
      </p>
      
      <div className="word-display">
        {word && <h3>{word}</h3>}
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
          <p>Try writing a line or verse using this word as inspiration!</p>
        </div>
      )}
    </div>
  );
};

export default RandomWord;