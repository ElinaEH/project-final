import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import { UploadCloud, Music2 } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Music2 className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">My Audio Files</h2>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <button 
            onClick={() => fileInputRef.current.click()}
            className="w-full border-2 border-dashed border-blue-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-500 transition-colors"
          >
            <UploadCloud className="w-12 h-12 text-blue-500" />
            <span className="text-gray-600 font-medium">Click to upload audio file</span>
            <span className="text-sm text-gray-500">WAV, MP3, or AAC</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
            id="audioFileInput"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
        </div>
      ) : audioFiles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No audio files uploaded yet.
        </div>
      ) : (
        <div className="space-y-3">
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
