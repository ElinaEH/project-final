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

  const getDescription = (type) => {
    if (type === "word") {
      return "CLICK THE BUTTON TO GET A RANDOM WORD. USE THIS WORD AS INSPIRATION FOR YOUR NEXT SONG OR LYRIC LINE.";
    } else {
      return "GENERATE A CHORD PROGRESSION BASED ON THE MOOD YOU WANT TO EXPRESS IN YOUR SONG OR CHOOSE RANDOM TO GET A RANDOM MOOD GENERATED.";
    }
  };

  return (
    <div className="saved-exercises">
      {exercises.length === 0 ? (
        <p className="no-exercises">You have no saved exercises</p>
      ) : (
        <>
          <p className="instructions">Saved exercises:</p>
          <div className="exercises-list">
            {exercises.map((exercise) => (
              <div key={exercise._id} className="exercise-item">
                <div className="exercise-content">
                  <h2 className="type">
                    {exercise.type === "word" ? "RANDOM WORD" : "CHORD PROGRESSION"}
                  </h2>
                  <p className="description">{getDescription(exercise.type)}</p>
                  {exercise.type === "word" ? (
                    <>
                      <h3 className="word">{exercise.content.word}</h3>
                      <p className="saved-date">{new Date(exercise.content.savedAt).toLocaleString()}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="mood">MOOD: {exercise.content.mood}</h3>
                      <h3 className="chords">CHORDS: {exercise.content.chords.join(" - ")}</h3>
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