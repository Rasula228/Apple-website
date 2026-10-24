interface PromoBannerProps {
  onOpenTradeIn?: () => void;
}

export default function PromoBanner({ onOpenTradeIn }: PromoBannerProps) {
  return (
    <aside aria-label="Commercial Announcement" className="w-full bg-[#1d1d1f] text-[#f5f5f7] py-[6px] px-4 text-center text-[12px] leading-normal border-b border-[#333336]/60">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-1.5 flex-wrap">
        <span className="text-[#86868b]">
          Get $35 to $340 in credit when you trade in an eligible Apple Watch with Apple Trade In.*
        </span>
        <button
          onClick={onOpenTradeIn}
          className="text-[#2997ff] hover:text-[#52aaff] inline-flex items-center gap-0.5 font-medium transition-colors cursor-pointer"
        >
          See what your device is worth
          <span aria-hidden="true" className="text-[11px] ml-0.5">›</span>
        </button>
      </div>
    </aside>
  );
}
