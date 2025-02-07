import { useState, useRef, useEffect } from "react";
import { Trash2, Volume2, VolumeX } from "lucide-react";
import WaveSurfer from "wavesurfer.js"; 
import FlowerPlayButton from "../../shared/animations/FlowerPlayButton.jsx";
import "./AudioPlayer.css";

const AudioPlayer = ({ audio, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audio.path);
    
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
      backend: "MediaElement",
      media: audioRef.current,
      hideScrollbar: true,
      interact: true,
    });

    wavesurferRef.current.load(audio.path);

    wavesurferRef.current.on("ready", () => {
      setDuration(wavesurferRef.current.getDuration());
    });

    wavesurferRef.current.on("audioprocess", () => {
      setProgress(wavesurferRef.current.getCurrentTime());
    });

    wavesurferRef.current.on("seek", () => {
      setProgress(wavesurferRef.current.getCurrentTime());
    });

    wavesurferRef.current.on("finish", () => {
      setIsPlaying(false);
      setProgress(0);
    });

    return () => {
      if (wavesurferRef.current) {
        try {
          wavesurferRef.current.pause();
          setIsPlaying(false);
          wavesurferRef.current.destroy();
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Error destroying WaveSurfer:', error);
          }
        }
      }
    };
  }, [audio.path]);

  useEffect(() => {
    return () => {
      if (wavesurferRef.current && isPlaying) {
        try {
          wavesurferRef.current.pause();
          setIsPlaying(false);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Error pausing WaveSurfer:', error);
          }
        }
      }
    };
  }, [isPlaying]);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

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

  return (
    <div className="audio-player">
      <div className="audio-player-container">
        <div className="audio-player-top">
          <div className="audio-player-controls">
            <FlowerPlayButton onClick={togglePlay} isPlaying={isPlaying} />
            <div className="audio-player-info">
              <span className="audio-player-filename">{audio.filename}</span>
              <span className="audio-player-time">
                {formatTime(progress)} / {formatTime(duration || 0)}
              </span>
            </div>
          </div>
          <button 
            onClick={() => onDelete(audio._id)}
            className="audio-player-delete"
            aria-label="Delete audio"
          >
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="audio-player-waveform" ref={waveformRef} />
        
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
