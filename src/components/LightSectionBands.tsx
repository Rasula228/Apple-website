import { useState } from 'react';
import { ArrowUpRight, Activity, Droplets, BatteryCharging } from 'lucide-react';

interface LightSectionBandsProps {
  onOpenBuy: () => void;
  onOpenSpecs: () => void;
}

export default function LightSectionBands({ onOpenBuy, onOpenSpecs }: LightSectionBandsProps) {
  // Interactive state for Running metrics
  const [selectedZone, setSelectedZone] = useState<number>(3);
  // Interactive depth simulator
  const [currentDepth, setCurrentDepth] = useState<number>(24);
  // Battery mode switch
  const [batteryMode, setBatteryMode] = useState<'standard' | 'lowPower' | 'extreme'>('lowPower');

  const heartZones = [
    { zone: 1, name: 'Recovery', bpm: '115-130 bpm', benefit: 'Basic aerobic base & active recovery' },
    { zone: 2, name: 'Endurance', bpm: '131-145 bpm', benefit: 'Fat oxidation & vascular capillarization' },
    { zone: 3, name: 'Aerobic', bpm: '146-160 bpm', benefit: 'Cardiovascular efficiency & VO2 max gains' },
    { zone: 4, name: 'Threshold', bpm: '161-175 bpm', benefit: 'Lactate tolerance & sustained race pacing' },
    { zone: 5, name: 'Maximum', bpm: '> 176 bpm', benefit: 'Peak neuromuscular anaerobic power' },
  ];

  return (
    <section className="w-full bg-[#ffffff] text-[#1d1d1f] py-24 md:py-32 selection:bg-[#0071e3] selection:text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 space-y-28 md:space-y-40">
        
        {/* =========================================================================
            Block 1: Category Eyebrow: Running (Signal Orange #f56900)
            Two-column: Text Left, Interactive/Visual Right
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 max-w-[540px]">
            {/* Category Eyebrow: SF Pro Text 17px weight 600 #f56900 */}
            <span className="text-[17px] font-semibold text-[#f56900] tracking-[-0.19px] block mb-3">
              Running
            </span>

            {/* Headline: SF Pro Display 56px weight 700 in Obsidian (#1d1d1f) */}
            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-[#1d1d1f] leading-[1.07] tracking-[-0.84px] mb-6">
              Your goals demand answers.
            </h2>

            {/* Body paragraph in Platinum (#86868b) */}
            <p className="text-[17px] font-normal text-[#86868b] leading-[1.47] mb-6">
              Pushing your boundaries requires consistent, reliable bio-telemetry. Advanced running metrics automatically calculate personalized Heart Rate Zones using your fitness history and advanced physiological models.
            </p>

            <p className="text-[15px] font-normal text-[#86868b] leading-[1.47] mb-8">
              Precision dual-frequency GPS integrates L1 and L5 satellite bands to deliver exact pace and distance metrics through rugged mountain ravines and dense concrete metropolises.
            </p>

            {/* Inline Sub-feature link: small circular icon with 2-line label in Obsidian */}
            <div className="pt-2">
              <button
                onClick={onOpenSpecs}
                className="group inline-flex items-center gap-4 text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-center group-hover:bg-[#1d1d1f] group-hover:text-white transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-[#1d1d1f] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-[17px] font-semibold text-[#1d1d1f] block leading-tight group-hover:text-[#0066cc] transition-colors">
                    Explore stride length and vertical oscillation metrics
                  </span>
                  <span className="text-[13px] text-[#86868b] block mt-0.5">
                    Built-in Running Power sensor without external accessories ›
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Heart Rate Zone & Cadence Display */}
          <div className="lg:col-span-6 bg-[#f5f5f7] rounded-[28px] p-7 md:p-10 border border-[#d2d2d7]/50">
            <div className="flex items-center justify-between border-b border-[#d2d2d7] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#f56900]" />
                <span className="text-[15px] font-semibold text-[#1d1d1f]">Real-Time Metrics</span>
              </div>
              <span className="text-[13px] font-medium text-[#86868b]">Running Simulator</span>
            </div>

            {/* Zone Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[13px] text-[#86868b]">Heart Rate Zones</span>
                <span className="text-[13px] font-semibold text-[#1d1d1f] tabular-nums">
                  Zone {selectedZone}: {heartZones[selectedZone - 1].name}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 h-10 bg-[#ffffff] p-1 rounded-[14px] border border-[#d2d2d7]">
                {heartZones.map((z) => (
                  <button
                    key={z.zone}
                    onClick={() => setSelectedZone(z.zone)}
                    className={`rounded-[10px] text-[12px] font-semibold transition-all cursor-pointer ${
                      selectedZone === z.zone
                        ? 'bg-[#f56900] text-white shadow-sm'
                        : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
                    }`}
                  >
                    Z{z.zone}
                  </button>
                ))}
              </div>
            </div>

            {/* Live readout card */}
            <div className="bg-[#ffffff] rounded-[20px] p-5 border border-[#d2d2d7] space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-[#86868b] uppercase tracking-wider block">Heart Rate</span>
                  <span className="text-[28px] font-bold text-[#1d1d1f] tabular-nums">
                    {heartZones[selectedZone - 1].bpm.split(' ')[0]} <span className="text-[14px] font-normal text-[#86868b]">bpm</span>
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#86868b] uppercase tracking-wider block">Estimated Pace</span>
                  <span className="text-[28px] font-bold text-[#1d1d1f] tabular-nums">
                    {selectedZone === 1 ? '9\'15"' : selectedZone === 2 ? '8\'20"' : selectedZone === 3 ? '7\'25"' : selectedZone === 4 ? '6\'30"' : '5\'40"'} <span className="text-[14px] font-normal text-[#86868b]">/mi</span>
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f5f5f7] flex items-center justify-between text-[13px]">
                <span className="text-[#86868b]">Physiological impact:</span>
                <span className="font-medium text-[#1d1d1f]">{heartZones[selectedZone - 1].benefit}</span>
              </div>
            </div>

            <div className="mt-5 text-[12px] text-[#86868b] text-center">
              Powered by the 3rd-generation optical heart sensor and accelerometer.
            </div>
          </div>
        </div>

        {/* =========================================================================
            Block 2: Category Eyebrow: Diving (Reef Teal #00a1b3)
            Two-column: Interactive Depth Gauge Left, Text Right
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Oceanic+ Depth Computer Display */}
          <div className="lg:col-span-6 order-2 lg:order-1 bg-[#f5f5f7] rounded-[28px] p-7 md:p-10 border border-[#d2d2d7]/50">
            <div className="flex items-center justify-between border-b border-[#d2d2d7] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#00a1b3]" />
                <span className="text-[15px] font-semibold text-[#1d1d1f]">Depth App & Oceanic+</span>
              </div>
              <span className="text-[12px] font-medium text-[#00a1b3] bg-[#00a1b3]/10 px-2.5 py-0.5 rounded-[980px]">
                EN13319 Certified
              </span>
            </div>

            {/* Depth Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2 text-[13px]">
                <span className="text-[#86868b]">Simulated Depth:</span>
                <span className="font-bold text-[#1d1d1f] tabular-nums text-[16px]">{currentDepth} meters ({Math.round(currentDepth * 3.28)} ft)</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={currentDepth}
                onChange={(e) => setCurrentDepth(Number(e.target.value))}
                className="w-full h-2 bg-[#d2d2d7] rounded-lg appearance-none cursor-pointer accent-[#00a1b3]"
              />
              <div className="flex justify-between text-[11px] text-[#86868b] mt-1 tabular-nums">
                <span>0 m (Surface)</span>
                <span>20 m (65 ft)</span>
                <span>40 m (Recreational limit)</span>
              </div>
            </div>

            {/* Dive Computer Readout */}
            <div className="bg-[#1d1d1f] text-white rounded-[20px] p-6 space-y-4 shadow-sm">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-[#111111] rounded-[14px]">
                  <span className="text-[10px] text-[#86868b] uppercase block">Depth</span>
                  <span className="text-[24px] font-bold text-[#00a1b3] tabular-nums">{currentDepth}m</span>
                </div>
                <div className="p-2 bg-[#111111] rounded-[14px]">
                  <span className="text-[10px] text-[#86868b] uppercase block">No Deco (NDL)</span>
                  <span className="text-[24px] font-bold text-white tabular-nums">
                    {Math.max(5, 50 - currentDepth)}min
                  </span>
                </div>
                <div className="p-2 bg-[#111111] rounded-[14px]">
                  <span className="text-[10px] text-[#86868b] uppercase block">Water</span>
                  <span className="text-[24px] font-bold text-[#2997ff] tabular-nums">70°F</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[12px] text-[#86868b]">
                <span>Bühlmann ZHL-16C algorithm</span>
                <span className="text-[#a3e635] font-medium">Safe ascent rate (30 ft/min)</span>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 max-w-[540px]">
            <span className="text-[17px] font-semibold text-[#00a1b3] tracking-[-0.19px] block mb-3">
              Diving
            </span>

            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-[#1d1d1f] leading-[1.07] tracking-[-0.84px] mb-6">
              Down to 40 meters. Never out of your depth.
            </h2>

            <p className="text-[17px] font-normal text-[#86868b] leading-[1.47] mb-6">
              Built to withstand recreational scuba diving and freediving, Apple Watch Ultra features an integrated depth gauge that activates automatically as soon as you plunge into the water.
            </p>

            <p className="text-[15px] font-normal text-[#86868b] leading-[1.47] mb-8">
              Partnering with Huish Outdoors, the Oceanic+ app turns your watch into a full-featured dive computer running real-time decompression calculations and unmistakable underwater haptics.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBuy}
                className="group inline-flex items-center gap-4 text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-center group-hover:bg-[#1d1d1f] group-hover:text-white transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-[#1d1d1f] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-[17px] font-semibold text-[#1d1d1f] block leading-tight group-hover:text-[#0066cc] transition-colors">
                    Configure with fluoroelastomer Ocean Band
                  </span>
                  <span className="text-[13px] text-[#86868b] block mt-0.5">
                    Fits securely over a thick wetsuit with titanium buckle ›
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            Block 3: Category Eyebrow: Battery Life (Iris Violet #8668ff)
            Two-column: Text Left, Battery Simulator Right
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 max-w-[540px]">
            <span className="text-[17px] font-semibold text-[#8668ff] tracking-[-0.19px] block mb-3">
              Battery Life
            </span>

            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-[#1d1d1f] leading-[1.07] tracking-[-0.84px] mb-6">
              Days of power. For when there's no outlet in sight.
            </h2>

            <p className="text-[17px] font-normal text-[#86868b] leading-[1.47] mb-6">
              Whether you are in the final leg of a 100-mile mountain ultra or descending the icy flank of a mountain pass, battery anxiety is the last thing you should carry.
            </p>

            <p className="text-[15px] font-normal text-[#86868b] leading-[1.47] mb-8">
              Get up to 36 hours of normal battery life and up to 72 hours with Low Power Mode engaged while maintaining continuous background GPS tracking and heart rate readings.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenSpecs}
                className="group inline-flex items-center gap-4 text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-center group-hover:bg-[#1d1d1f] group-hover:text-white transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-[#1d1d1f] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-[17px] font-semibold text-[#1d1d1f] block leading-tight group-hover:text-[#0066cc] transition-colors">
                    Review the official battery technical whitepaper
                  </span>
                  <span className="text-[13px] text-[#86868b] block mt-0.5">
                    Tested across extreme operating temperatures from -4°F to 130°F ›
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Battery Duration Calculator */}
          <div className="lg:col-span-6 bg-[#f5f5f7] rounded-[28px] p-7 md:p-10 border border-[#d2d2d7]/50">
            <div className="flex items-center justify-between border-b border-[#d2d2d7] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-[#8668ff]" />
                <span className="text-[15px] font-semibold text-[#1d1d1f]">Expedition Battery Calculator</span>
              </div>
              <span className="text-[13px] text-[#86868b]">Fast Magnetic Charging</span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1.5 bg-white rounded-[16px] border border-[#d2d2d7] mb-6">
              <button
                onClick={() => setBatteryMode('standard')}
                className={`py-2 text-[12px] font-semibold rounded-[12px] transition-all cursor-pointer ${
                  batteryMode === 'standard' ? 'bg-[#1d1d1f] text-white shadow-sm' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Standard Use
              </button>
              <button
                onClick={() => setBatteryMode('lowPower')}
                className={`py-2 text-[12px] font-semibold rounded-[12px] transition-all cursor-pointer ${
                  batteryMode === 'lowPower' ? 'bg-[#8668ff] text-white shadow-sm' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Low Power
              </button>
              <button
                onClick={() => setBatteryMode('extreme')}
                className={`py-2 text-[12px] font-semibold rounded-[12px] transition-all cursor-pointer ${
                  batteryMode === 'extreme' ? 'bg-[#1d1d1f] text-white shadow-sm' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Endurance Workout
              </button>
            </div>

            <div className="bg-white rounded-[20px] p-6 border border-[#d2d2d7] space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] text-[#86868b]">Estimated battery life:</span>
                <span className="text-[44px] font-bold text-[#1d1d1f] tabular-nums">
                  {batteryMode === 'standard' ? '36' : batteryMode === 'lowPower' ? '72' : '17'}{' '}
                  <span className="text-[20px] font-medium text-[#86868b]">hours</span>
                </span>
              </div>

              <p className="text-[13px] text-[#86868b] leading-normal pt-2 border-t border-[#f5f5f7]">
                {batteryMode === 'standard' && 'Includes 180 time checks, 180 notifications, 90 minutes of active app use, and a 60-minute outdoor workout with audio playback.'}
                {batteryMode === 'lowPower' && 'Throttles secondary readings while preserving critical notifications, compass orientation, and satellite track logging.'}
                {batteryMode === 'extreme' && '17 continuous hours of outdoor workout with precision dual-frequency GPS and uninterrupted optical heart rate monitoring.'}
              </p>
            </div>

            <div className="mt-5 text-[12px] text-[#86868b] text-center">
              Recharge from 0 to 80% in approximately one hour using the USB-C Fast Charger cable.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
