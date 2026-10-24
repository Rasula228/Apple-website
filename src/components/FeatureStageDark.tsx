import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Compass, Zap, Waves, Flame, Volume2, VolumeX } from 'lucide-react';
import {
  TRAIL_RUNNER_IMAGE,
  OCEAN_DIVER_IMAGE,
  TITANIUM_CRAFT_IMAGE,
  AMBIENT_VIDEOS,
} from '../data/watchData';

interface FeatureStageDarkProps {
  onOpenVideoWithChapter?: (chapterId: string) => void;
}

export default function FeatureStageDark({ onOpenVideoWithChapter }: FeatureStageDarkProps) {
  // Video playback & sound states for Card 1 and Card 3
  const [isPlayingTrailVideo, setIsPlayingTrailVideo] = useState(true);
  const [isTrailMuted, setIsTrailMuted] = useState(true);
  const card1VideoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlayingDiveVideo, setIsPlayingDiveVideo] = useState(true);
  const [isDiveMuted, setIsDiveMuted] = useState(true);
  const card3VideoRef = useRef<HTMLVideoElement | null>(null);

  const [selectedActionButtonFunction, setSelectedActionButtonFunction] = useState<'workout' | 'waypoint' | 'backtrack' | 'dive' | 'flashlight'>('workout');

  // Track revealed element IDs via IntersectionObserver
  const [revealedElements, setRevealedElements] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax container & media element refs
  const card1ContainerRef = useRef<HTMLDivElement | null>(null);
  const card1MediaRef = useRef<HTMLDivElement | null>(null);

  const card2ContainerRef = useRef<HTMLDivElement | null>(null);
  const card2MediaRef = useRef<HTMLDivElement | null>(null);

  const card3ContainerRef = useRef<HTMLDivElement | null>(null);
  const card3MediaRef = useRef<HTMLDivElement | null>(null);

  // 1. IntersectionObserver for text reveals
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setRevealedElements({
        'section-headline': true,
        'card1-text': true,
        'card2-text': true,
        'card2-station': true,
        'card3-text': true,
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealId = entry.target.getAttribute('data-reveal-id');
            if (revealId) {
              setRevealedElements((prev) => ({ ...prev, [revealId]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const scope = sectionRef.current || document;
    const elementsToObserve = scope.querySelectorAll('[data-reveal-id]');
    elementsToObserve.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Parallax scale-down scroll effect for cards
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const updateCardParallax = (
      container: HTMLElement | null,
      media: HTMLElement | null,
      initialScale = 1.10,
      scaleReduction = 0.12,
      shiftAmount = 36
    ) => {
      if (!container || !media) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

      const totalDistance = windowHeight + rect.height;
      const currentDistance = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));

      const scale = initialScale - progress * scaleReduction;
      const translateY = (progress - 0.5) * -shiftAmount;

      media.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1) translate3d(0, ${translateY.toFixed(1)}px, 0)`;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateCardParallax(card1ContainerRef.current, card1MediaRef.current, 1.10, 0.12, 38);
          updateCardParallax(card2ContainerRef.current, card2MediaRef.current, 1.08, 0.10, 28);
          updateCardParallax(card3ContainerRef.current, card3MediaRef.current, 1.10, 0.12, 38);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleCard1Play = () => {
    if (!card1VideoRef.current) return;
    if (card1VideoRef.current.paused) {
      card1VideoRef.current.play();
      setIsPlayingTrailVideo(true);
    } else {
      card1VideoRef.current.pause();
      setIsPlayingTrailVideo(false);
    }
  };

  const toggleCard1Mute = () => {
    if (!card1VideoRef.current) return;
    card1VideoRef.current.muted = !isTrailMuted;
    setIsTrailMuted(!isTrailMuted);
  };

  const toggleCard3Play = () => {
    if (!card3VideoRef.current) return;
    if (card3VideoRef.current.paused) {
      card3VideoRef.current.play();
      setIsPlayingDiveVideo(true);
    } else {
      card3VideoRef.current.pause();
      setIsPlayingDiveVideo(false);
    }
  };

  const toggleCard3Mute = () => {
    if (!card3VideoRef.current) return;
    card3VideoRef.current.muted = !isDiveMuted;
    setIsDiveMuted(!isDiveMuted);
  };

  const actionButtonFunctions = [
    { id: 'workout', label: 'Workout', icon: Flame, desc: 'Instantly start an ultra-trail mountain run with real-time segmented pacing metrics.' },
    { id: 'waypoint', label: 'Compass Waypoint', icon: Compass, desc: 'Drop an exact satellite coordinate for a bivouac or fork in the trail with one touch.' },
    { id: 'backtrack', label: 'Backtrack', icon: Zap, desc: 'Record your footsteps with precision dual-frequency GPS to re-trace your exact route.' },
    { id: 'dive', label: 'Dive', icon: Waves, desc: 'Launch underwater depth metrics automatically upon submerging past 1 meter (3 feet).' },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="w-full bg-[#000000] py-20 md:py-28 text-[#f5f5f7]"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Section Headline (Dark) */}
        <div
          data-reveal-id="section-headline"
          className={`mb-20 md:mb-28 max-w-[1020px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealedElements['section-headline']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-[36px] sm:text-[56px] lg:text-[72px] font-bold text-[#f5f5f7] leading-[1.08] tracking-tight-display">
            Engineered to withstand the elements. Built to master them.
          </h2>
        </div>

        {/* Feature Cards Stack with 88-120px gaps */}
        <div className="space-y-24 md:space-y-32">
          {/* Card 1 (First Screen): Pure Video Screen Option */}
          <div
            ref={card1ContainerRef}
            className="relative w-full rounded-[28px] overflow-hidden bg-[#1d1d1f] aspect-[16/10] md:aspect-[16/8] group"
          >
            {/* Parallax Scaled Video Surface */}
            <div
              ref={card1MediaRef}
              className="w-full h-full will-change-transform transform-gpu origin-center transition-transform duration-75 ease-out"
            >
              <video
                ref={card1VideoRef}
                src={AMBIENT_VIDEOS.running}
                autoPlay
                loop
                muted={isTrailMuted}
                playsInline
                poster={TRAIL_RUNNER_IMAGE}
                className="w-full h-full object-cover cursor-pointer"
                onClick={toggleCard1Play}
              />
            </div>

            {/* Subtle Gradient Scrim for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none" />

            {/* Top Right Video Tag */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 flex items-center gap-2">
              <span className="bg-[#111111]/80 backdrop-blur-md border border-[#333336] text-[#86868b] text-[11px] font-semibold px-3 py-1 rounded-[980px] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f56900] animate-pulse" />
                4K Video Mode
              </span>
            </div>

            {/* Text Overlay Top-Left */}
            <div
              data-reveal-id="card1-text"
              className={`absolute top-7 left-7 md:top-10 md:left-10 max-w-[420px] z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                revealedElements['card1-text']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-[12px] uppercase tracking-wider text-[#86868b] font-medium block mb-2">
                PRECISION DUAL-FREQUENCY GPS (L1 + L5)
              </span>
              <p className="text-[17px] md:text-[20px] font-semibold text-[#f5f5f7] leading-[1.35]">
                Pinpoint accuracy even in deep alpine ravines and dense urban canyons where satellite signals reflect.
              </p>
            </div>

            {/* Bottom Screen Video Controls */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 flex items-center gap-2.5">
              <button
                onClick={toggleCard1Play}
                aria-label={isPlayingTrailVideo ? "Pause video" : "Play video"}
                className="bg-[#111111]/85 hover:bg-[#111111] backdrop-blur-md border border-[#333336] text-[#f5f5f7] text-[12px] font-medium px-3.5 py-2 rounded-[980px] flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                {isPlayingTrailVideo ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleCard1Mute}
                aria-label={isTrailMuted ? "Unmute audio" : "Mute audio"}
                className="bg-[#111111]/85 hover:bg-[#111111] backdrop-blur-md border border-[#333336] text-[#f5f5f7] p-2 rounded-[980px] transition-all cursor-pointer shadow-md"
                title={isTrailMuted ? "Unmute audio" : "Mute audio"}
              >
                {isTrailMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              {onOpenVideoWithChapter && (
                <button
                  onClick={() => onOpenVideoWithChapter('chapter-3')}
                  className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12px] font-medium px-4 py-2 rounded-[980px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <span>Watch chapter</span>
                  <span>›</span>
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Titanium Craftsmanship Macro & Action Button Interactive Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 cols: Macro Craftsmanship Image */}
            <div
              ref={card2ContainerRef}
              className="lg:col-span-7 relative rounded-[28px] overflow-hidden bg-[#111111] border border-[#333336]/40 aspect-[4/3] flex items-center justify-center group"
            >
              {/* Parallax Scaled Media Wrapper */}
              <div
                ref={card2MediaRef}
                className="w-full h-full will-change-transform transform-gpu origin-center transition-transform duration-75 ease-out"
              >
                <img
                  src={TITANIUM_CRAFT_IMAGE}
                  alt="Macro detail of titanium bezel and knurled Action Button"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Text Overlay Bottom-Left */}
              <div
                data-reveal-id="card2-text"
                className={`absolute bottom-7 left-7 md:bottom-10 md:left-10 max-w-[420px] z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  revealedElements['card2-text']
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="text-[12px] uppercase tracking-wider text-[#f56900] font-semibold block mb-1">
                  PRECISION ENGINEERING
                </span>
                <p className="text-[17px] md:text-[21px] font-semibold text-[#f5f5f7] leading-snug">
                  Aerospace-grade titanium case. The ideal balance of weight, ruggedness, and unmatched resistance to corrosive seawater.
                </p>
              </div>
            </div>

            {/* Right 5 cols: Action Button Interactive Station */}
            <div
              data-reveal-id="card2-station"
              className={`lg:col-span-5 rounded-[28px] bg-[#1d1d1f] p-7 md:p-9 flex flex-col justify-between border border-[#333336]/30 transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                revealedElements['card2-station']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#f56900]" />
                  <span className="text-[14px] font-semibold text-[#f56900]">Customizable Action Button</span>
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold text-[#f5f5f7] leading-tight mb-4">
                  One press. Total control with gloves or underwater.
                </h3>
                <p className="text-[14px] text-[#86868b] leading-relaxed mb-6">
                  Set the international orange physical button to fire off the exact tool you need in extreme backcountry conditions.
                </p>

                {/* Interactive button selector */}
                <div className="space-y-2.5">
                  {actionButtonFunctions.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedActionButtonFunction === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedActionButtonFunction(item.id as typeof selectedActionButtonFunction)}
                        className={`w-full text-left p-3.5 rounded-[18px] transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#333336] border border-[#f56900]/40'
                            : 'bg-[#111111]/70 hover:bg-[#111111] border border-transparent'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'bg-[#f56900] text-black' : 'bg-[#1d1d1f] text-[#86868b]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-[14px] font-semibold block ${isSelected ? 'text-[#f5f5f7]' : 'text-[#86868b]'}`}>
                            {item.label}
                          </span>
                          <span className="text-[12px] text-[#86868b] leading-tight block mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-[#333336]/60 mt-6 flex items-center justify-between text-[12px] text-[#86868b]">
                <span>Knurled grip for tactile gloves operation</span>
                <span className="text-[#f56900] font-medium">49 mm Titanium</span>
              </div>
            </div>
          </div>

          {/* Card 3 (Last Screen): Pure Video Screen Option */}
          <div
            ref={card3ContainerRef}
            className="relative w-full rounded-[28px] overflow-hidden bg-[#1d1d1f] aspect-[16/10] md:aspect-[16/8] group"
          >
            {/* Parallax Scaled Video Surface */}
            <div
              ref={card3MediaRef}
              className="w-full h-full will-change-transform transform-gpu origin-center transition-transform duration-75 ease-out"
            >
              <video
                ref={card3VideoRef}
                src={AMBIENT_VIDEOS.diving}
                autoPlay
                loop
                muted={isDiveMuted}
                playsInline
                poster={OCEAN_DIVER_IMAGE}
                className="w-full h-full object-cover cursor-pointer"
                onClick={toggleCard3Play}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />

            {/* Top Right Video Tag */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 flex items-center gap-2">
              <span className="bg-[#111111]/80 backdrop-blur-md border border-[#333336] text-[#86868b] text-[11px] font-semibold px-3 py-1 rounded-[980px] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a1b3] animate-pulse" />
                4K Video Mode
              </span>
            </div>

            {/* Text Overlay Top-Left */}
            <div
              data-reveal-id="card3-text"
              className={`absolute top-7 left-7 md:top-10 md:left-10 max-w-[440px] z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                revealedElements['card3-text']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-[12px] uppercase tracking-wider text-[#00a1b3] font-medium block mb-2">
                SCUBA & FREEDIVING DOWN TO 40 METERS
              </span>
              <p className="text-[17px] md:text-[20px] font-semibold text-[#f5f5f7] leading-[1.35]">
                Integrated depth gauge with water temperature sensor and automatic safe ascent-rate warnings.
              </p>
            </div>

            {/* Bottom Screen Video Controls */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 flex items-center gap-2.5">
              <button
                onClick={toggleCard3Play}
                aria-label={isPlayingDiveVideo ? "Pause video" : "Play video"}
                className="bg-[#111111]/85 hover:bg-[#111111] backdrop-blur-md border border-[#333336] text-[#f5f5f7] text-[12px] font-medium px-3.5 py-2 rounded-[980px] flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                {isPlayingDiveVideo ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleCard3Mute}
                aria-label={isDiveMuted ? "Unmute audio" : "Mute audio"}
                className="bg-[#111111]/85 hover:bg-[#111111] backdrop-blur-md border border-[#333336] text-[#f5f5f7] p-2 rounded-[980px] transition-all cursor-pointer shadow-md"
                title={isDiveMuted ? "Unmute audio" : "Mute audio"}
              >
                {isDiveMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              {onOpenVideoWithChapter && (
                <button
                  onClick={() => onOpenVideoWithChapter('chapter-4')}
                  className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12px] font-medium px-4 py-2 rounded-[980px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <span>Watch chapter</span>
                  <span>›</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
