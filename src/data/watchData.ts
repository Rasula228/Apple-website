import { StrapOption, VideoChapter } from '../types';

export const HERO_WATCH_IMAGE = '/src/assets/images/hero_titanium_watch_1792866452904.jpg';
export const TRAIL_RUNNER_IMAGE = '/src/assets/images/feature_trail_runner_bw_1792866454185.jpg';
export const OCEAN_DIVER_IMAGE = '/src/assets/images/feature_ocean_diver_bw_1792866454945.jpg';
export const TITANIUM_CRAFT_IMAGE = '/src/assets/images/feature_titanium_craft_1792866454952.jpg';

// Direct high-quality ambient MP4 video streams
export const AMBIENT_VIDEOS = {
  craftsmanship: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  running: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  diving: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  filmTheater: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
};

export const STRAP_OPTIONS: StrapOption[] = [
  {
    id: 'trail-blue-black',
    type: 'trail',
    name: 'Trail Loop',
    colorName: 'Blue/Black',
    colorHex: '#25282a',
    accentHex: '#0071e3',
    description: 'Light, thin, and flexible. Designed with a convenient pull tab for quick, micro-adjustments during high-altitude runs.'
  },
  {
    id: 'trail-gray-orange',
    type: 'trail',
    name: 'Trail Loop',
    colorName: 'Grey/Orange',
    colorHex: '#525459',
    accentHex: '#f56900',
    description: 'Soft double-layer weave with seamless edges for sustained comfort during endurance ultra marathons.'
  },
  {
    id: 'alpine-orange',
    type: 'alpine',
    name: 'Alpine Loop',
    colorName: 'Vibrant Orange',
    colorHex: '#ea580c',
    accentHex: '#f56900',
    description: 'Crafted from two textile layers woven together into one continuous piece without stitching. High-strength titanium G-hook.'
  },
  {
    id: 'alpine-olive',
    type: 'alpine',
    name: 'Alpine Loop',
    colorName: 'Olive Green',
    colorHex: '#3f4f3c',
    accentHex: '#a3e635',
    description: 'Rugged recycled polyester weave with reinforced top loops designed to withstand harsh outdoor expeditions.'
  },
  {
    id: 'ocean-midnight',
    type: 'ocean',
    name: 'Ocean Band',
    colorName: 'Midnight Blue',
    colorHex: '#14213d',
    accentHex: '#2997ff',
    description: 'Molded in high-performance fluoroelastomer with tubular geometry that stretches easily over a thick neoprene wetsuit.'
  },
  {
    id: 'ocean-yellow',
    type: 'ocean',
    name: 'Ocean Band',
    colorName: 'Flash Yellow',
    colorHex: '#eab308',
    accentHex: '#facc15',
    description: 'Corrosion-resistant titanium buckle and spring-loaded adjustable loop for high-speed water sports and open-water diving.'
  }
];

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: 'chapter-1',
    title: '01. Aerospace-Grade Titanium',
    timestampSeconds: 0,
    description: 'A 49 mm precision-machined case with raised edges to shield the flat sapphire front crystal from direct impacts.',
    videoUrl: AMBIENT_VIDEOS.craftsmanship,
    poster: TITANIUM_CRAFT_IMAGE
  },
  {
    id: 'chapter-2',
    title: '02. 3,000-Nit Retina Display',
    timestampSeconds: 12,
    description: 'The brightest display Apple has ever created. Uncompromising readability in harsh direct sunlight or glaciated snowfields.',
    videoUrl: AMBIENT_VIDEOS.filmTheater,
    poster: HERO_WATCH_IMAGE
  },
  {
    id: 'chapter-3',
    title: '03. Action Button & 86dB Siren',
    timestampSeconds: 24,
    description: 'Instantly customizable to drop compass waypoints, trigger backtracks, or sound an emergency acoustic siren heard up to 600 feet away.',
    videoUrl: AMBIENT_VIDEOS.running,
    poster: TRAIL_RUNNER_IMAGE
  },
  {
    id: 'chapter-4',
    title: '04. Depth Gauge & Oceanic+ App',
    timestampSeconds: 38,
    description: 'EN13319 certified for recreational scuba down to 40 meters. Bühlmann ZHL-16C decompression dive computer on your wrist.',
    videoUrl: AMBIENT_VIDEOS.diving,
    poster: OCEAN_DIVER_IMAGE
  }
];

export const TECH_SPECS = [
  { label: 'Case', value: '49 mm aerospace-grade titanium' },
  { label: 'Display Brightness', value: 'Up to 3,000 nits (1 nit minimum in darkness)' },
  { label: 'Battery Life', value: 'Up to 36 hours normal use / 72 hours in Low Power Mode' },
  { label: 'GPS', value: 'Precision dual-frequency GPS (L1 and L5)' },
  { label: 'Water Resistance', value: '100 m rated under ISO 22810 standard' },
  { label: 'Diving Certification', value: 'Recreational scuba diving to 40 m (EN13319)' },
  { label: 'Acoustic Siren', value: '86 dB dual-speaker alarm audible up to 600 feet (180 m)' },
  { label: 'Connectivity', value: 'LTE and UMTS Cellular built-in across all models' }
];
