import { useState, useRef, useEffect } from "react";
import { Trash2, Volume2, VolumeX } from "lucide-react"; // Icon library
import WaveSurfer from "wavesurfer.js"; // Waveform visualisation
import FlowerPlayButton from "../../shared/animations/FlowerPlayButton.jsx";
import "./AudioPlayer.css";

const AudioPlayer = ({ audio, onDelete }) => {
  // State for play status, progress, duration, volume and mute status
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // References for the waveform container and Wavesurfer
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && audio.path) {
      // Set up Wavesurfer for waveform visualization
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#efdfcc",
        progressColor: "#FF8800",
        cursorColor: "#FF8800",
        height: 50,
        barWidth: 2,
        barGap: 1,
        responsive: true,
        normalize: true,
        backend: "WebAudio",
        hideScrollbar: true,
        interact: true,
      });
      
      // Load audio file into Wavesurfer
      wavesurferRef.current.load(audio.path);

      // Set duration time when audio is ready
      wavesurferRef.current.on("ready", () => {
        setDuration(wavesurferRef.current.getDuration());
      });

      // Update progress as audio plays
      wavesurferRef.current.on("audioprocess", () => {
        setProgress(wavesurferRef.current.getCurrentTime());
      });

      // Update progress when seeking (when user moves the playhead)
      wavesurferRef.current.on("seek", () => {
        setProgress(wavesurferRef.current.getCurrentTime());
      });

      // Reset state when audio finishes playing
      wavesurferRef.current.on("finish", () => {
        setIsPlaying(false);
        setProgress(0);
      });
    }

    return () => {
      // Cleanup Wavesurfer when component unmounts
      if (wavesurferRef.current) {
        wavesurferRef.current.pause();
        setIsPlaying(false);
        wavesurferRef.current.destroy();
      }
    };
  }, [audio.path]);

  useEffect(() => {
    return () => {
      // Pause audio if still playing when component unmounts
      if (wavesurferRef.current && isPlaying) {
        wavesurferRef.current.pause();
        setIsPlaying(false);
      }
    };
  }, [isPlaying]);

  // Play/Pause toggle function
  const togglePlay = () => {
    if (!wavesurferRef.current) return;

    try {
      if (isPlaying) {
        wavesurferRef.current.pause();
        setIsPlaying(false);
      } else {
        wavesurferRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling play state:", error);
      setIsPlaying(false);
    }
  };

  // Format time into minutes and seconds format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  // Toggle mute on/off
  const toggleMute = () => {
    if (!wavesurferRef.current) return;
    
    if (isMuted) {
      wavesurferRef.current.setVolume(volume);
      setIsMuted(false);
    } else {
      wavesurferRef.current.setVolume(0);
      setIsMuted(true);
    }
  };

  if (!audio.path) return null;

  // Extract the filename from audio path 
  const filename = audio.path.split("/").pop().split("-").slice(1).join("-");

  return (
    <div className="audio-player">
      <div className="audio-player-container">
        <div className="audio-player-top">
          <div className="audio-player-controls">
            {/* Play/Pause button */}
            <FlowerPlayButton onClick={togglePlay} isPlaying={isPlaying} />
            <div className="audio-player-info">
              {/* Display filename and progress */}
              <span className="audio-player-filename">{filename}</span>
              <span className="audio-player-time">
                {formatTime(progress)} / {formatTime(duration || 0)}
              </span>
            </div>
          </div>
          {/* Delete button */}
          <button 
            onClick={() => onDelete(audio._id)}
            className="audio-player-delete"
            aria-label="Delete audio"
          >
            <Trash2 size={20} />
          </button>
        </div>
        
        {/* Waveform visualization */}
        <div className="audio-player-waveform" ref={waveformRef} />
        
        {/* Volume controls */}
        <div className="audio-player-volume">
          <button
            onClick={toggleMute}
            className="audio-player-volume-button"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="audio-player-volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
