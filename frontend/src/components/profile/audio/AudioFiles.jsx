import React from "react";
import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer.jsx";
import { UploadCloud } from "lucide-react";
import "./AudioFiles.css";

const AudioFiles = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  const fetchAudioFiles = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/audio/files", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio files");
      }

      const data = await response.json();
      setAudioFiles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching audio files:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("audio", selectedFile);

    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/audio/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData
      });

      if (response.ok) {
        await fetchAudioFiles();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload audio file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAudio = async (audioId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:5000/audio/${audioId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.ok) {
        setAudioFiles(prevFiles => prevFiles.filter(audio => audio._id !== audioId));
      } else {
        throw new Error("Failed to delete audio file");
      }
    } catch (error) {
      console.error("Error deleting audio:", error);
      setError("Failed to delete audio file");
    }
  };

  return (
    <div className="audio-files">
      <div className="audio-files__header">
        <h2 className="audio-files__title">Audio Files</h2>
      </div>
      
      <div className="audio-files__upload-container">
        <div className="audio-files__upload-wrapper">
          <button 
            onClick={() => fileInputRef.current.click()}
            className="audio-files__upload-button"
          >
            <UploadCloud className="audio-files__upload-icon" />
            <span className="audio-files__upload-text">Click to upload audio file</span>
            <span className="audio-files__upload-subtitle">WAV, MP3, or AAC</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="audio-files__input"
            id="audioFileInput"
          />
        </div>
      </div>

      {error && (
        <div className="audio-files__error">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="audio-files__loading">
          <div className="audio-files__spinner"></div>
        </div>
      ) : audioFiles.length === 0 ? (
        <div className="audio-files__empty">
          No audio files uploaded yet
        </div>
      ) : (
        <div className="audio-files__list">
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
