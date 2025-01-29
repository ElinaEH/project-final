import { useState, useRef, useEffect } from "react";
import { Play, Pause, Trash2, Volume2, VolumeX } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import "./AudioPlayer.css";

const AudioPlayer = ({ audio, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && audio.path) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#D8E6FF",
        progressColor: "#F26749",
        cursorColor: "#D8E6FF",
        height: 50,
        barWidth: 2,
        barGap: 1,
        responsive: true,
        normalize: true,
        backend: "WebAudio",
        hideScrollbar: true,
        interact: true,
      });
      
      wavesurferRef.current.load(`http://localhost:5000/${audio.path}`);

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
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audio.path]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;

    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
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

  const filename = audio.path.split("/").pop().split("-").slice(1).join("-");

  return (
    <div className="audio-player">
      <div className="audio-player__container">
        <div className="audio-player__top">
          <div className="audio-player__controls">
            <button 
              onClick={togglePlay}
              className="audio-player__play-button"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="audio-player__play-icon" />}
            </button>
            <div className="audio-player__info">
              <span className="audio-player__filename">{filename}</span>
              <span className="audio-player__time">
                {formatTime(progress)} / {formatTime(duration || 0)}
              </span>
            </div>
          </div>
          <button 
            onClick={() => onDelete(audio._id)}
            className="audio-player__delete"
            aria-label="Delete audio"
          >
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="audio-player__waveform" ref={waveformRef} />
        
        <div className="audio-player__volume">
          <button
            onClick={toggleMute}
            className="audio-player__volume-button"
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
            className="audio-player__volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
