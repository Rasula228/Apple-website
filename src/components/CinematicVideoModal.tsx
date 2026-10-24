import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Clock } from 'lucide-react';
import { VIDEO_CHAPTERS } from '../data/watchData';
import { VideoChapter } from '../types';

interface CinematicVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapterId?: string;
}

export default function CinematicVideoModal({
  isOpen,
  onClose,
  initialChapterId,
}: CinematicVideoModalProps) {
  const [currentChapter, setCurrentChapter] = useState<VideoChapter>(VIDEO_CHAPTERS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (initialChapterId) {
      const match = VIDEO_CHAPTERS.find((c) => c.id === initialChapterId);
      if (match) setCurrentChapter(match);
    }
  }, [initialChapterId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && isOpen) {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const togglePlaybackSpeed = () => {
    if (!videoRef.current) return;
    const newSpeed = playbackSpeed === 1 ? 0.5 : 1;
    videoRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const selectChapter = (chapter: VideoChapter) => {
    setCurrentChapter(chapter);
    if (videoRef.current) {
      videoRef.current.src = chapter.videoUrl;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/95 backdrop-blur-2xl p-4 md:p-8 animate-in fade-in duration-200">
      {/* Close Button top-right */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 z-30 text-[#86868b] hover:text-[#f5f5f7] bg-[#1d1d1f] hover:bg-[#333336] p-2.5 rounded-full transition-colors cursor-pointer border border-[#333336]"
        aria-label="Close video player"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full max-w-[1240px] max-h-[92vh] flex flex-col rounded-[28px] overflow-hidden bg-[#111111] border border-[#333336]/60 shadow-2xl">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#1d1d1f] border-b border-[#333336]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f56900]" />
            <span className="text-[14px] font-semibold text-[#f5f5f7]">
              Apple Watch Ultra — Cinematic Film Showcase
            </span>
          </div>
          <span className="text-[12px] text-[#86868b]">4K Ultra HD Resolution</span>
        </div>

        {/* Video Canvas and Chapter List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Main Video Viewport (8 cols) */}
          <div className="lg:col-span-8 relative bg-[#000000] flex flex-col justify-center items-center group">
            <video
              ref={videoRef}
              src={currentChapter.videoUrl}
              autoPlay
              playsInline
              muted={isMuted}
              onTimeUpdate={() => {
                if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
              }}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              onEnded={() => setIsPlaying(false)}
              className="w-full max-h-[58vh] object-contain bg-black cursor-pointer"
              onClick={togglePlay}
            />

            {/* Custom Apple-style Playback HUD at bottom of video */}
            <div className="w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 md:p-6 flex flex-col gap-3">
              {/* Timeline slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#86868b] tabular-nums font-mono">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-[#333336] rounded-full appearance-none cursor-pointer accent-[#0071e3]"
                />
                <span className="text-[11px] text-[#86868b] tabular-nums font-mono">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Controls bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 text-white hover:text-[#0071e3] transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 text-[#86868b] hover:text-[#f5f5f7] transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={togglePlaybackSpeed}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-[6px] border transition-colors cursor-pointer ${
                      playbackSpeed === 0.5
                        ? 'bg-[#0071e3] text-white border-[#0071e3]'
                        : 'text-[#86868b] border-[#333336] hover:text-[#f5f5f7]'
                    }`}
                    title="0.5x Slow-motion mode to inspect titanium finish and display"
                  >
                    {playbackSpeed === 0.5 ? '0.5x Slow' : '1.0x Normal'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                        setIsPlaying(true);
                      }
                    }}
                    className="p-2 text-[#86868b] hover:text-[#f5f5f7] transition-colors cursor-pointer"
                    title="Restart chapter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current?.requestFullscreen) {
                        videoRef.current.requestFullscreen();
                      }
                    }}
                    className="p-2 text-[#86868b] hover:text-[#f5f5f7] transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-[#1d1d1f] p-5 md:p-6 overflow-y-auto max-h-[65vh] border-t lg:border-t-0 lg:border-l border-[#333336]/60 space-y-4">
            <div>
              <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider block mb-1">
                Video Chapters
              </span>
              <h3 className="text-[17px] font-bold text-[#f5f5f7]">
                {currentChapter.title}
              </h3>
              <p className="text-[13px] text-[#86868b] mt-1 leading-snug">
                {currentChapter.description}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              {VIDEO_CHAPTERS.map((chap, idx) => {
                const isActive = chap.id === currentChapter.id;
                return (
                  <button
                    key={chap.id}
                    onClick={() => selectChapter(chap)}
                    className={`w-full text-left p-3 rounded-[16px] transition-all cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'bg-[#333336] border border-[#0071e3]/60 shadow-md'
                        : 'bg-[#111111]/60 hover:bg-[#111111] border border-transparent'
                    }`}
                  >
                    <div className="relative w-16 h-11 rounded-[10px] overflow-hidden bg-black shrink-0 border border-[#333336]">
                      <img
                        src={chap.poster}
                        alt={chap.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        {isActive && isPlaying ? (
                          <div className="w-2 h-2 rounded-full bg-[#0071e3] animate-ping" />
                        ) : (
                          <Play className="w-3 h-3 fill-white text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[13px] font-semibold block truncate ${isActive ? 'text-[#f5f5f7]' : 'text-[#86868b]'}`}>
                        {chap.title}
                      </span>
                      <span className="text-[11px] text-[#86868b] block mt-0.5">
                        Chapter {idx + 1} of 4
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Apple Keynote Official Citation Badge */}
            <div className="pt-4 border-t border-[#333336]/60">
              <div className="bg-[#111111] p-3 rounded-[14px] text-[12px] text-[#86868b] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2997ff] shrink-0" />
                <span>Official Apple Presentation Film. High-fidelity spatial audio.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
