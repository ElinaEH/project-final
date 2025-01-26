// Component for chord progression exercise - chord exercise
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
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

 return (
   <div className="chord-container">
      <h1 className="exercise-headline">Chord Progression</h1>
     {/* <h2>Chord Progression Generator</h2> */}
     <p className="exercise-description">
       Generate a chord progression based on the mood you want to express in your song or choose random to get a random mood generated.
     </p>
     
     <div className="chord-display">
       {chords && (
         <div>
           <h3>Mood: {chords.mood}</h3>
           <h3>Chords: {chords.chords.join(" - ")}</h3>
           <button onClick={saveExercise} className="save-button">
            {isSaved ? <FaStar className="star-icon" /> : <FaRegStar className="star-icon" />}
           </button>
         </div>
       )}
     </div>

     <div className="chord-button-group">
       <button 
         className="chord-button"
         onClick={() => getMoodChords("uplifting")}
         disabled={isLoading}
       >
         UPLIFTING
       </button>
       <button 
         className="chord-button"
         onClick={() => getMoodChords("emotional")}
         disabled={isLoading}
       >
         EMOTIONAL
       </button>
       <button 
         className="chord-button"
         onClick={() => getMoodChords("nostalgic")}
         disabled={isLoading}
       >
         NOSTALGIC
       </button>
       <button 
         className="chord-button"
         onClick={getRandomChords}
         disabled={isLoading}
       >
         RANDOM MOOD
       </button>
     </div>

     {chords && (
       <div className="chord-prompt">
         <p>Create a melody using this chord progression!</p>
       </div>
     )}
   </div>
 );
};

export default ChordProgression;
