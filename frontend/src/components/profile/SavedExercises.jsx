import "./SavedExercises.css";

const SavedExercises = ({ exercises, onDelete }) => {
  const deleteExercise = async (exerciseId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:5000/profile/delete-exercise/${exerciseId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete exercise");
      onDelete();
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  return (
    <div className="saved-exercises">
      {exercises.length === 0 ? (
        <p className="no-exercises">You have no saved exercises yet</p>
      ) : (
        <>
          <p className="instructions">SAVED EXERCISES</p>
          <div className="exercises-list">
            {exercises.map((exercise) => (
              <div key={exercise._id} className="exercise-item">
                <div className="exercise-content">
                  {exercise.type === "word" ? (
                    <>
                      <div className="display-area">
                        <h3>{exercise.content.word}</h3>
                      </div>
                      <div className="prompt-section">
                        <p>Write lyrics for a verse and include this word! Set a timer for 30 minutes</p>
                      </div>
                      <p className="saved-date">{new Date(exercise.content.savedAt).toLocaleString()}</p>
                    </>
                  ) : (
                    <>
                      <div className="display-area">
                        <h3>Mood: {exercise.content.mood}</h3>
                        <h3>Chords: {exercise.content.chords.join(" - ")}</h3>
                      </div>
                      <div className="prompt-section">
                        <p>Write a chorus melody using this chord progression!</p>
                      </div>
                      <p className="saved-date">{new Date(exercise.savedAt).toLocaleString()}</p>
                    </>
                  )}
                </div>
                <button className="delete-button" onClick={() => deleteExercise(exercise._id)}>
                  DELETE
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SavedExercises;
