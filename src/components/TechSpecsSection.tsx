import { TECH_SPECS } from '../data/watchData';

interface TechSpecsSectionProps {
  onOpenBuy: () => void;
}

export default function TechSpecsSection({ onOpenBuy }: TechSpecsSectionProps) {
  return (
    <section id="specs" className="w-full bg-[#000000] text-[#f5f5f7] py-24 md:py-32 border-t border-[#1d1d1f]">
      <div className="max-w-[1024px] mx-auto px-6">
        <div className="mb-14">
          <span className="text-[12px] font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
            Technical Specifications
          </span>
          <h2 className="text-[36px] sm:text-[44px] font-bold text-[#f5f5f7] tracking-tight">
            Apple Watch Ultra 2 Specs
          </h2>
        </div>

        {/* Technical Data Table with Tabular Numerals */}
        <div className="divide-y divide-[#333336]/60 border-t border-b border-[#333336]/60">
          {TECH_SPECS.map((spec, idx) => (
            <div
              key={idx}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline"
            >
              <div className="md:col-span-4 text-[15px] font-semibold text-[#86868b]">
                {spec.label}
              </div>
              <div className="md:col-span-8 text-[15px] font-normal text-[#f5f5f7] tabular-nums">
                {spec.value}
              </div>
            </div>
          ))}

          {/* Additional in-depth metrics */}
          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline">
            <div className="md:col-span-4 text-[15px] font-semibold text-[#86868b]">
              Dimensions & Weight
            </div>
            <div className="md:col-span-8 text-[15px] font-normal text-[#f5f5f7] tabular-nums">
              Height: 49 mm · Width: 44 mm · Depth: 14.4 mm · Weight: 61.4 g (titanium case)
            </div>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline">
            <div className="md:col-span-4 text-[15px] font-semibold text-[#86868b]">
              Audio & Microphones
            </div>
            <div className="md:col-span-8 text-[15px] font-normal text-[#f5f5f7] tabular-nums">
              Three-microphone array with beamforming and wind noise suppression. Dual speakers with 86-decibel acoustic emergency siren.
            </div>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline">
            <div className="md:col-span-4 text-[15px] font-semibold text-[#86868b]">
              Silicon & Performance
            </div>
            <div className="md:col-span-8 text-[15px] font-normal text-[#f5f5f7] tabular-nums">
              S9 SiP with 64-bit dual-core processor. 4-core Apple Neural Engine. Second-generation Ultra Wideband chip. 64GB storage capacity.
            </div>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 p-6 rounded-[24px] bg-[#1d1d1f] border border-[#333336]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[16px] font-bold text-[#f5f5f7] block">
              Ready for your next expedition?
            </span>
            <span className="text-[13px] text-[#86868b]">
              Free express shipping. Special financing available with Apple Card.
            </span>
          </div>
          <button
            onClick={onOpenBuy}
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-semibold px-6 py-2.5 rounded-[980px] transition-colors cursor-pointer shrink-0"
          >
            Buy now from $799
          </button>
        </div>
      </div>
    </section>
  );
}
