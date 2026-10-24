import { useState, useEffect } from 'react';
import { Compass, Moon, Sun } from 'lucide-react';
import { HERO_WATCH_IMAGE } from '../data/watchData';
import { playCrownClickSound } from '../utils/audio';

interface WatchVitrineShowcaseProps {
  onOpenVideo: () => void;
  onOpenBuy: () => void;
}

export default function WatchVitrineShowcase({ onOpenVideo, onOpenBuy }: WatchVitrineShowcaseProps) {
  const [activeFace, setActiveFace] = useState<'wayfinder' | 'modular' | 'depth'>('wayfinder');
  const [isRedNightMode, setIsRedNightMode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('09:41:28');
  const [headingDegrees, setHeadingDegrees] = useState<number>(315);

  // Live seconds clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCrownTurn = () => {
    playCrownClickSound();
    setHeadingDegrees((prev) => (prev + 15) % 360);
  };

  const toggleNight = () => {
    playCrownClickSound();
    setIsRedNightMode((prev) => !prev);
  };

  return (
    <section className="w-full bg-[#000000] py-24 md:py-32 border-t border-[#1d1d1f] relative overflow-hidden">
      {/* Background glow for vitrine effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-radial from-[#1d1d1f] via-[#111111]/80 to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <span className="text-[12px] font-semibold text-[#f56900] uppercase tracking-wider block mb-3">
            Interactive Vitrine Gallery
          </span>
          <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-[#f5f5f7] leading-tight tracking-tight-display mb-4">
            A titanium object glowing against pitch darkness.
          </h2>
          <p className="text-[16px] text-[#86868b] leading-relaxed">
            Explore real-time complications on the Wayfinder and Modular Ultra watch faces tailored for polar explorers, ultra-runners, and deep divers.
          </p>
        </div>

        {/* Vitrine Stage Container */}
        <div className="relative rounded-[28px] bg-[#111111] border border-[#333336]/60 p-6 md:p-12 overflow-hidden shadow-2xl">
          {/* Top Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#333336]/50 pb-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#86868b]">Face:</span>
              <div className="flex items-center gap-1.5 p-1 bg-[#1d1d1f] rounded-[980px] border border-[#333336]">
                <button
                  onClick={() => {
                    playCrownClickSound();
                    setActiveFace('wayfinder');
                  }}
                  className={`px-3 py-1 text-[12px] font-medium rounded-[980px] transition-all cursor-pointer ${
                    activeFace === 'wayfinder' ? 'bg-[#333336] text-white shadow-sm' : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  Wayfinder
                </button>
                <button
                  onClick={() => {
                    playCrownClickSound();
                    setActiveFace('modular');
                  }}
                  className={`px-3 py-1 text-[12px] font-medium rounded-[980px] transition-all cursor-pointer ${
                    activeFace === 'modular' ? 'bg-[#333336] text-white shadow-sm' : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  Modular Ultra
                </button>
                <button
                  onClick={() => {
                    playCrownClickSound();
                    setActiveFace('depth');
                  }}
                  className={`px-3 py-1 text-[12px] font-medium rounded-[980px] transition-all cursor-pointer ${
                    activeFace === 'depth' ? 'bg-[#333336] text-white shadow-sm' : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  Depth Gauge
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Crown Interactive Button */}
              <button
                onClick={handleCrownTurn}
                className="px-3.5 py-1.5 rounded-[980px] bg-[#1d1d1f] hover:bg-[#333336] border border-[#333336] text-[12px] text-[#f5f5f7] flex items-center gap-2 transition-colors cursor-pointer"
                title="Rotate Digital Crown"
              >
                <Compass className="w-3.5 h-3.5 text-[#2997ff]" />
                <span>Rotate Crown ({headingDegrees}°)</span>
              </button>

              {/* Night Mode Switcher */}
              <button
                onClick={toggleNight}
                className={`px-3.5 py-1.5 rounded-[980px] border text-[12px] font-medium flex items-center gap-2 transition-all cursor-pointer ${
                  isRedNightMode
                    ? 'bg-[#ff3b30] text-white border-[#ff3b30] shadow-md shadow-[#ff3b30]/20'
                    : 'bg-[#1d1d1f] hover:bg-[#333336] border-[#333336] text-[#f5f5f7]'
                }`}
              >
                {isRedNightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span>{isRedNightMode ? 'Night Mode (Active)' : 'Night Mode'}</span>
              </button>
            </div>
          </div>

          {/* Central Watch Display & Complications Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 4 cols: Complications Telemetry Readout */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-[20px] bg-[#1d1d1f] border border-[#333336]/60">
                <div className="flex items-center justify-between text-[11px] text-[#86868b] mb-1">
                  <span>LIVE COMPASS</span>
                  <span className="text-[#f56900] font-mono">{headingDegrees}° NW</span>
                </div>
                <div className="text-[20px] font-bold text-[#f5f5f7] tabular-nums">
                  36° 42' 14" N
                </div>
                <div className="text-[13px] text-[#86868b] mt-0.5">
                  Longitude: 118° 17' 31" W · Elevation: 11,410 ft
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-[#1d1d1f] border border-[#333336]/60">
                <div className="flex items-center justify-between text-[11px] text-[#86868b] mb-1">
                  <span>ENVIRONMENTAL SENSORS</span>
                  <span className="text-[#a3e635]">Optimal</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-[11px] text-[#86868b] block">Wind Gusts</span>
                    <span className="text-[15px] font-semibold text-[#f5f5f7]">11 mph NW</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#86868b] block">UV Index</span>
                    <span className="text-[15px] font-semibold text-[#f5f5f7]">4 (Moderate)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-[#1d1d1f] border border-[#333336]/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#86868b] block">SUNSET</span>
                  <span className="text-[15px] font-semibold text-[#f5f5f7]">7:48 PM</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#86868b] block">WATER TEMP</span>
                  <span className="text-[15px] font-semibold text-[#2997ff]">57 °F</span>
                </div>
              </div>
            </div>

            {/* Middle 4 cols: The Glowing Watch Face Hardware */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-[340px] aspect-[4/5] flex items-center justify-center">
                {/* Watch Image */}
                <img
                  src={HERO_WATCH_IMAGE}
                  alt="Apple Watch Ultra face in showroom vitrine"
                  referrerPolicy="no-referrer"
                  className={`w-full h-auto object-contain transition-all duration-500 ${
                    isRedNightMode ? 'filter sepia(1) hue-rotate(-50deg) saturate(3) brightness(0.95)' : ''
                  }`}
                />

                {/* Simulated Digital Time Overlay Center */}
                <div
                  className={`absolute top-[48%] left-[49%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none transition-colors ${
                    isRedNightMode ? 'text-[#ff3b30]' : 'text-white'
                  }`}
                >
                  <div className="text-[20px] sm:text-[24px] font-bold tracking-tight tabular-nums font-mono drop-shadow-md">
                    {currentTime}
                  </div>
                  <div className={`text-[10px] uppercase font-semibold tracking-wider ${isRedNightMode ? 'text-[#ff6b60]' : 'text-[#a3e635]'}`}>
                    {activeFace === 'wayfinder' ? 'WAYFINDER' : activeFace === 'modular' ? 'MODULAR' : 'DEPTH 125FT'}
                  </div>
                </div>
              </div>

              <span className="text-[12px] text-[#86868b] mt-3">
                Flat sapphire crystal with protective edge in 49 mm titanium
              </span>
            </div>

            {/* Right 4 cols: Interactive Actions & Vitrine Notes */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-[20px] bg-[#1d1d1f] border border-[#333336]/60">
                <span className="text-[12px] font-semibold text-[#f56900] block mb-1">
                  Rotating bezel with coordinate azimuth
                </span>
                <p className="text-[13px] text-[#86868b] leading-relaxed mb-4">
                  Turn the Digital Crown to rotate between minute tracks, real-time satellite azimuth bearings, or pure red monochrome night vision.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={onOpenBuy}
                    className="flex-1 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12px] font-semibold py-2 px-3 rounded-[980px] transition-colors cursor-pointer text-center"
                  >
                    Buy now
                  </button>
                  <button
                    onClick={onOpenVideo}
                    className="flex-1 bg-[#333336] hover:bg-[#424245] text-[#f5f5f7] text-[12px] font-semibold py-2 px-3 rounded-[980px] transition-colors cursor-pointer text-center"
                  >
                    Watch film
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-[#1d1d1f] border border-[#333336]/60 text-[12px] text-[#86868b]">
                <span className="font-semibold text-[#f5f5f7] block mb-1">Tested to MIL-STD 810H Standards</span>
                Validated across extreme altitude, thermal shock, water immersion, intense vibration, and direct impacts on granite rock.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
