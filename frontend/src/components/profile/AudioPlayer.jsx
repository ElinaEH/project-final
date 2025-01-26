import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Trash2, Volume2 } from "lucide-react";

const AudioPlayer = ({ audio, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(audio.path ? new Audio(`http://localhost:5000/${audio.path}`) : null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    return () => {
      if (currentAudio) currentAudio.pause();
    };
  }, []);

  if (!audio.path) return null;

  // Extract just the filename without the ID
  const filename = audio.path.split('/').pop().split('-').slice(1).join('-');

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-gray-400" />
              <span className="font-medium text-gray-700">{filename}</span>
            </div>
            <div className="mt-1 h-1 bg-gray-200 rounded-full">
              <div className="h-full w-0 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onDelete(audio._id)}
          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete audio"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
