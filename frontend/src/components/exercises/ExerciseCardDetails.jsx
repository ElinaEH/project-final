import "./ExerciseCardDetails.css";

const ExerciseCardDetails = ({
  title,
  description,
  displayContent,
  actionButtons,
  prompt,
  children
}) => {
  return (
    <div className="exercise-card">
      <div className="exercise-header">
        <h1 className="exercise-headline">{title}</h1>
        <p className="exercise-description">{description}</p>
      </div>

      <div className="exercise-content">
        {/* Display Area (Word or Chord Display) */}
        {displayContent && (
          <div className="display-area">
            {displayContent}
          </div>
        )}

        {/* Action Buttons Area */}
        <div className={`button-area ${Array.isArray(actionButtons) ? "multiple-buttons" : ""}`}>
          {actionButtons}
        </div>

        {/* Additional Content */}
        {children}

        {/* Prompt Section */}
        {prompt && (
          <div className="prompt-section">
            <p>{prompt}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseCardDetails;
