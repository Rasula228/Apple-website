import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ShieldAlert, Compass, Film, Rotate3d } from 'lucide-react';
import { HERO_WATCH_IMAGE, TITANIUM_CRAFT_IMAGE, AMBIENT_VIDEOS } from '../data/watchData';
import { WatchFinish } from '../types';
import { playEmergencySiren, stopEmergencySiren, playCrownClickSound } from '../utils/audio';

interface HeroStageProps {
  onOpenBuy: () => void;
  onOpenVideo: () => void;
  selectedFinish: WatchFinish;
  onSelectFinish: (finish: WatchFinish) => void;
}

export default function HeroStage({
  onOpenBuy,
  onOpenVideo,
  selectedFinish,
  onSelectFinish,
}: HeroStageProps) {
  const [screenMode, setScreenMode] = useState<'hardware' | 'video'>('hardware');
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState<boolean>(true);
  const [isHeroVideoMuted, setIsHeroVideoMuted] = useState<boolean>(true);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isNightMode, setIsNightMode] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [activeComplication, setActiveComplication] = useState<'altitude' | 'depth' | 'coordinates'>('coordinates');

  const toggleNightMode = () => {
    playCrownClickSound();
    setIsNightMode((prev) => !prev);
  };

  const toggleSiren = () => {
    if (isSirenActive) {
      stopEmergencySiren();
      setIsSirenActive(false);
    } else {
      playEmergencySiren(setIsSirenActive);
    }
  };

  const toggleHeroPlay = () => {
    if (!heroVideoRef.current) return;
    if (heroVideoRef.current.paused) {
      heroVideoRef.current.play();
      setIsHeroVideoPlaying(true);
    } else {
      heroVideoRef.current.pause();
      setIsHeroVideoPlaying(false);
    }
  };

  const toggleHeroMute = () => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = !isHeroVideoMuted;
    setIsHeroVideoMuted(!isHeroVideoMuted);
  };

  return (
    <section id="hero" className="relative w-full bg-[#000000] overflow-hidden pt-8 pb-20 md:pb-32">
      {/* Background radial gradient glow (subtle titanium halo) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#333336]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10">
        {/* Top Eyebrow */}
        <div className="flex flex-col items-center justify-center text-center pt-4 pb-4">
          <div className="inline-flex items-center gap-1.5 text-[17px] font-semibold text-[#f5f5f7] tracking-tight mb-2">
            <svg className="w-4 h-4 fill-current inline-block" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.77-11.7-14.19-6.3-9.88-11.39-21.23-15.27-34.05-3.89-12.82-5.83-24.81-5.83-35.98 0-14.34 3.52-26.06 10.56-35.16 7.04-9.1 16.03-13.72 26.97-13.86 4.35 0 9.27 1.13 14.76 3.4 5.48 2.27 9.4 3.48 11.75 3.63 2.14-.15 6.13-1.39 11.96-3.73 5.84-2.34 10.74-3.4 14.71-3.2 10.7.67 19.34 4.89 25.92 12.67-9.48 5.76-14.15 13.91-14.01 24.44.13 8.35 3.32 15.34 9.56 20.97 6.24 5.63 13.68 8.84 22.33 9.64-2.4 7.23-5.39 14.54-8.98 21.93zM119.22 31.84c0-7.39 2.7-14.28 8.09-20.67 5.4-6.39 12.02-10.45 19.86-12.17.65 1.5.98 3.13.98 4.9 0 7.42-2.8 14.35-8.41 20.78-5.61 6.43-12.44 10.43-20.52 11.98z" />
            </svg>
            <span>WATCH ULTRA 2</span>
          </div>
          <p className="text-[14px] text-[#86868b] max-w-md">
            49 mm aerospace titanium case · 3,000-nit display · Up to 72 hours battery life
          </p>
        </div>

        {/* Central Floating Hardware Showcase or Video Screen */}
        <div className="relative flex flex-col items-center justify-center my-6 md:my-10">
          <div className="relative w-full max-w-[880px] aspect-[16/9] flex items-center justify-center rounded-[28px] overflow-hidden bg-[#111111]/70 border border-[#333336]/50">
            {screenMode === 'video' ? (
              /* Video Option on Hero Screen */
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={heroVideoRef}
                  src={AMBIENT_VIDEOS.filmTheater}
                  autoPlay
                  loop
                  muted={isHeroVideoMuted}
                  playsInline
                  poster={HERO_WATCH_IMAGE}
                  className="w-full h-full object-cover"
                  onClick={toggleHeroPlay}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                {/* Video controls */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                  <button
                    onClick={toggleHeroPlay}
                    className="bg-[#111111]/80 hover:bg-[#111111] backdrop-blur-md border border-[#333336] text-[#f5f5f7] text-[12px] font-medium px-3.5 py-1.5 rounded-[980px] flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    {isHeroVideoPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isHeroVideoPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={toggleHeroMute}
                    className="bg-[#111111]/80 hover:bg-[#111111] backdrop-blur-md border border-[#333336] text-[#f5f5f7] p-2 rounded-[980px] cursor-pointer shadow-md"
                    title={isHeroVideoMuted ? 'Unmute' : 'Mute'}
                  >
                    {isHeroVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ) : (
              /* 3D Hardware Object Screen */
              <div className="relative w-full h-full flex items-center justify-center group">
                <img
                  src={selectedFinish === 'black' ? TITANIUM_CRAFT_IMAGE : HERO_WATCH_IMAGE}
                  alt="Apple Watch Ultra 2 in titanium case"
                  referrerPolicy="no-referrer"
                  className={`max-h-[500px] w-auto object-contain transition-all duration-700 select-none ${
                    isNightMode ? 'filter sepia(1) hue-rotate(-50deg) saturate(3) brightness(0.9)' : ''
                  }`}
                />

                {/* Siren Visual Waves when Siren is Active */}
                {isSirenActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[300px] h-[300px] rounded-full border-4 border-[#f56900] animate-ping opacity-60" />
                    <div className="w-[450px] h-[450px] rounded-full border-2 border-[#ea580c] animate-ping opacity-30 animation-delay-300" />
                  </div>
                )}
              </div>
            )}

            {/* Floating Top Right Badges */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-6 flex flex-col gap-2 z-20">
              {/* Screen Mode Switcher: Video vs Hardware */}
              <div className="flex items-center gap-1 p-1 bg-[#1d1d1f]/90 backdrop-blur-md border border-[#333336] rounded-[980px]">
                <button
                  onClick={() => setScreenMode('hardware')}
                  className={`px-3 py-1 rounded-[980px] text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    screenMode === 'hardware' ? 'bg-[#333336] text-white shadow-sm' : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  <Rotate3d className="w-3 h-3" />
                  <span>Hardware</span>
                </button>
                <button
                  onClick={() => setScreenMode('video')}
                  className={`px-3 py-1 rounded-[980px] text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    screenMode === 'video' ? 'bg-[#0071e3] text-white shadow-sm' : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  <Film className="w-3 h-3" />
                  <span>Video View</span>
                </button>
              </div>

              {/* Night Mode Toggle */}
              {screenMode === 'hardware' && (
                <button
                  onClick={toggleNightMode}
                  className={`px-3 py-1.5 rounded-[980px] text-[11px] font-medium flex items-center gap-2 transition-all cursor-pointer ${
                    isNightMode
                      ? 'bg-[#ff3b30] text-white shadow-lg shadow-[#ff3b30]/30'
                      : 'bg-[#1d1d1f]/90 text-[#f5f5f7] hover:bg-[#333336] border border-[#333336]'
                  }`}
                  title="Rotate Digital Crown to activate Night Mode"
                >
                  <span className={`w-2 h-2 rounded-full ${isNightMode ? 'bg-white animate-pulse' : 'bg-[#ff3b30]'}`} />
                  <span>{isNightMode ? 'Night Mode Active' : 'Night Mode (Crown)'}</span>
                </button>
              )}

              {/* 86dB Siren Audio Simulator */}
              {screenMode === 'hardware' && (
                <button
                  onClick={toggleSiren}
                  className={`px-3 py-1.5 rounded-[980px] text-[11px] font-medium flex items-center gap-2 transition-all cursor-pointer ${
                    isSirenActive
                      ? 'bg-[#f56900] text-white shadow-lg shadow-[#f56900]/30'
                      : 'bg-[#1d1d1f]/90 text-[#f5f5f7] hover:bg-[#333336] border border-[#333336]'
                  }`}
                  title="Press Action Button for 3s to sound the 86 dB Emergency Siren"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#f56900]" />
                  <span>{isSirenActive ? 'Stop Siren' : 'Test 86 dB Siren'}</span>
                </button>
              )}
            </div>

            {/* Bottom Floating Complication Strip */}
            {screenMode === 'hardware' && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#111111]/90 backdrop-blur-md border border-[#333336]/60 rounded-[980px] px-4 py-2 flex items-center gap-4 text-[11px] text-[#86868b] shadow-2xl z-20">
                <span className="text-[#f5f5f7] font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#f56900]" />
                  Wayfinder GPS
                </span>
                <span className="text-[#333336]">|</span>
                <button
                  onClick={() => setActiveComplication('coordinates')}
                  className={`cursor-pointer transition-colors ${activeComplication === 'coordinates' ? 'text-[#f5f5f7] font-medium' : 'hover:text-[#f5f5f7]'}`}
                >
                  36°42′N 118°17′W
                </button>
                <button
                  onClick={() => setActiveComplication('altitude')}
                  className={`cursor-pointer transition-colors ${activeComplication === 'altitude' ? 'text-[#f5f5f7] font-medium' : 'hover:text-[#f5f5f7]'}`}
                >
                  Elevation: 11,410 ft
                </button>
                <button
                  onClick={() => setActiveComplication('depth')}
                  className={`cursor-pointer transition-colors ${activeComplication === 'depth' ? 'text-[#00a1b3] font-medium' : 'hover:text-[#f5f5f7]'}`}
                >
                  Depth: 125 ft
                </button>
              </div>
            )}
          </div>

          {/* Titanium Finish Switcher */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-[12px] text-[#86868b]">Finish:</span>
            <div className="flex items-center gap-2 p-1 bg-[#111111] rounded-[980px] border border-[#333336]">
              <button
                onClick={() => onSelectFinish('natural')}
                className={`px-3 py-1 rounded-[980px] text-[12px] font-medium transition-all cursor-pointer ${
                  selectedFinish === 'natural'
                    ? 'bg-[#333336] text-[#f5f5f7]'
                    : 'text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                Natural Titanium
              </button>
              <button
                onClick={() => onSelectFinish('black')}
                className={`px-3 py-1 rounded-[980px] text-[12px] font-medium transition-all cursor-pointer ${
                  selectedFinish === 'black'
                    ? 'bg-[#333336] text-[#f5f5f7]'
                    : 'text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                Black Titanium
              </button>
            </div>
          </div>
        </div>

        {/* Hero Bottom-Left Headline & CTA Cluster per Apple specification */}
        <div className="mt-8 md:mt-14 max-w-[820px]">
          <h1 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold text-[#f5f5f7] leading-[1.05] tracking-tight-hero mb-6">
            A force of nature.
          </h1>

          <p className="text-[17px] md:text-[21px] text-[#86868b] leading-[1.4] max-w-[640px] mb-8">
            The ultimate sports and adventure watch. Now available in satin black titanium with immense battery life, the brightest display Apple has ever created, and the most accurate dual-frequency GPS in urban canyons and wilderness alike.
          </p>

          {/* Conversion Action Row: Filled Blue Pill CTA + Ghost Price Label + Video Link */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Primary Filled CTA Button (Apple Blue) */}
            <button
              onClick={onOpenBuy}
              className="bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#0062c4] text-white text-[14px] font-semibold px-6 py-2.5 rounded-[36px] transition-colors cursor-pointer shadow-md inline-flex items-center justify-center tracking-[-0.22px]"
            >
              Buy
            </button>

            {/* Ghost Price Label */}
            <span className="text-[14px] text-[#ffffff] font-normal px-2 py-2 tracking-[-0.22px]">
              From $799 or $33.29/mo. for 24 mo.
            </span>

            {/* Secondary Film Watch Action with exact related video */}
            <button
              onClick={() => {
                setScreenMode('video');
                onOpenVideo();
              }}
              className="group text-[#2997ff] hover:text-[#52aaff] text-[14px] font-medium inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#111111] border border-[#333336] flex items-center justify-center group-hover:border-[#2997ff] transition-colors">
                <Play className="w-3 h-3 text-[#2997ff] fill-[#2997ff] ml-0.5" />
              </div>
              <span>Watch the presentation film</span>
              <span className="text-[14px]">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
