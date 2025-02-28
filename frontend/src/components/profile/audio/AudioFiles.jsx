// Manages uploading, displaying and deleting audio files
import React from "react";
import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer.jsx";
import { UploadCloud } from "lucide-react"; // Icon for upload button
import "./AudioFiles.css";

// API URL from environment variables - used for deployment configuration
const API_URL = import.meta.env.VITE_API_URL;

const AudioFiles = () => {
  // State variables to manage audio files, loading state and errors
  const [audioFiles, setAudioFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Reference to the hidden file input element for custom upload button styling
  const fileInputRef = React.useRef(null);

  // Fetch the audio files from the server when component mounts
  useEffect(() => {
    fetchAudioFiles();
  }, []);

  // Function to fetch the list of audio files from server
  const fetchAudioFiles = async () => {
    try {
      setIsLoading(true); // Show loading spinner
      const token = localStorage.getItem("accessToken"); // Get the token for authentication
      const response = await fetch(`${API_URL}/audio/files`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Send token for authentication
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Failed to fetch audio files");

      const data = await response.json(); // Get the list of audio files
      setAudioFiles(data); // Update the state with fetched audio files
      setError(null); // Reset previous errors
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Hide loading spinner once data is fetched
    }
  };

  // Function to handle the file input (uploading files)
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file
    if (!selectedFile) return; // Exit if no file is selected

    const formData = new FormData();
    formData.append("audio", selectedFile); // Add file to form data upload

    try {
      setIsLoading(true); // Show loading spinner when uploading
      const token = localStorage.getItem("accessToken"); // Get the token for authentication
      const response = await fetch(`${API_URL}/audio/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Send token for authentication
        },
        body: formData // Send the file as form data
      });

      if (response.ok) {
        await fetchAudioFiles(); // Refresh the list of audio files after successful upload
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input field
        }
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setError("Failed to upload audio file");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle deleting an audio file
  const handleDeleteAudio = async (audioId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/audio/${audioId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.ok) {
        // Filter out the deleted audio file from the current state
        setAudioFiles(prevFiles => prevFiles.filter(audio => audio._id !== audioId));
      } else {
        throw new Error("Failed to delete audio file");
      }
    } catch (error) {
      setError("Failed to delete audio file");
    }
  };

  // Render the component with conditional UI based on state
  return (
    <div className="audio-files">
      {/* Header section with title */}
      <div className="audio-files-header">
        <h2 className="audio-files-title">Audio Files</h2>
      </div>

      {/* Upload section with styled button and hidden file input */}
      <div className="audio-files-upload-container">
        <div className="audio-files-upload-wrapper">
          {/* Custom styled upload button that triggers the hidden file input */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="audio-files-upload-button"
          >
            <UploadCloud className="audio-files-upload-icon" />
            <span className="audio-files-upload-text">Click to upload audio file</span>
            <span className="audio-files-upload-subtitle">WAV, MP3, or AAC</span>
          </button>
          {/* Hidden file input triggered by the styled button above */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="audio-files-input"
            id="audioFileInput"
          />
        </div>
      </div>

      {/* Show error message if there is one */}
      {error && (
        <div className="audio-files-error">
          {error}
        </div>
      )}

      {/* Conditional rendering based on loading and data states */}
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <div className="audio-files-loading">
          <div className="audio-files-spinner"></div>
        </div>
      ) : audioFiles.length === 0 ? (
        // Show empty state message when no files are present
        <div className="audio-files-empty">
          No audio files uploaded yet
        </div>
      ) : (
        // Display the list of audio files using AudioPlayer component
        <div className="audio-files-list">
          {audioFiles.map((audio, index) => (
            <AudioPlayer
              key={audio._id || index}
              audio={audio}
              onDelete={handleDeleteAudio}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AudioFiles;
