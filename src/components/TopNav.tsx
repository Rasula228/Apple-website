import { useState, useEffect } from 'react';
import { Search, ShoppingBag } from 'lucide-react';

interface TopNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBuy: () => void;
  onOpenVideo: () => void;
}

export default function TopNav({ cartCount, onOpenCart, onOpenBuy, onOpenVideo }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'specs'>('overview');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, tab: 'overview' | 'videos' | 'specs') => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Primary Global Nav Bar */}
      <header
        className={`w-full transition-all duration-300 ${
          scrolled ? 'bg-[#000000]/80 backdrop-blur-md border-b border-[#333336]/40' : 'bg-[#000000]'
        }`}
      >
        <div className="max-w-[1024px] mx-auto px-4 h-[44px] flex items-center justify-between gap-6 text-[12px] font-normal text-[#f5f5f7]">
          {/* Apple Glyph */}
          <a
            href="#hero"
            aria-label="Apple Home"
            className="text-[#f5f5f7] hover:text-[#86868b] transition-colors shrink-0"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.77-11.7-14.19-6.3-9.88-11.39-21.23-15.27-34.05-3.89-12.82-5.83-24.81-5.83-35.98 0-14.34 3.52-26.06 10.56-35.16 7.04-9.1 16.03-13.72 26.97-13.86 4.35 0 9.27 1.13 14.76 3.4 5.48 2.27 9.4 3.48 11.75 3.63 2.14-.15 6.13-1.39 11.96-3.73 5.84-2.34 10.74-3.4 14.71-3.2 10.7.67 19.34 4.89 25.92 12.67-9.48 5.76-14.15 13.91-14.01 24.44.13 8.35 3.32 15.34 9.56 20.97 6.24 5.63 13.68 8.84 22.33 9.64-2.4 7.23-5.39 14.54-8.98 21.93zM119.22 31.84c0-7.39 2.7-14.28 8.09-20.67 5.4-6.39 12.02-10.45 19.86-12.17.65 1.5.98 3.13.98 4.9 0 7.42-2.8 14.35-8.41 20.78-5.61 6.43-12.44 10.43-20.52 11.98z" />
            </svg>
          </a>

          {/* Clean 4-5 Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden sm:flex items-center gap-7 text-[#86868b]">
            <a href="#hero" className="hover:text-[#f5f5f7] transition-colors whitespace-nowrap">Store</a>
            <a href="#hero" className="hover:text-[#f5f5f7] transition-colors whitespace-nowrap">Mac</a>
            <a href="#hero" className="hover:text-[#f5f5f7] transition-colors whitespace-nowrap">iPad</a>
            <a href="#hero" className="text-[#f5f5f7] transition-colors whitespace-nowrap">Watch</a>
            <a href="#hero" className="hover:text-[#f5f5f7] transition-colors whitespace-nowrap">AirPods</a>
            <a href="#support" className="hover:text-[#f5f5f7] transition-colors whitespace-nowrap">Support</a>
          </nav>

          {/* Search & Bag Interactive Icons */}
          <div className="flex items-center gap-4 text-[#86868b]">
            <button
              onClick={() => scrollToSection('features', 'overview')}
              aria-label="Search Apple"
              className="hover:text-[#f5f5f7] transition-colors p-1 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              className="relative hover:text-[#f5f5f7] transition-colors p-1 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0071e3] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Product Bar (Apple Watch Ultra Sub-nav) */}
      <div className="w-full bg-[#111111]/90 backdrop-blur-md border-b border-[#333336]/60">
        <div className="max-w-[1024px] mx-auto px-4 h-[52px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[19px] font-semibold text-[#f5f5f7] tracking-tight">
              Apple Watch Ultra 2
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <nav aria-label="Product Sections" className="hidden md:flex items-center gap-5 text-[12px] text-[#86868b]">
              <button
                onClick={() => scrollToSection('hero', 'overview')}
                className={`transition-colors cursor-pointer ${activeTab === 'overview' ? 'text-[#f5f5f7] font-medium' : 'hover:text-[#f5f5f7]'}`}
              >
                Overview
              </button>
              <button
                onClick={() => {
                  setActiveTab('videos');
                  onOpenVideo();
                }}
                className={`transition-colors cursor-pointer flex items-center gap-1 ${activeTab === 'videos' ? 'text-[#f5f5f7] font-medium' : 'hover:text-[#f5f5f7]'}`}
              >
                <span>Film</span>
                <span className="text-[10px] text-[#0071e3]">▶</span>
              </button>
              <button
                onClick={() => scrollToSection('specs', 'specs')}
                className={`transition-colors cursor-pointer ${activeTab === 'specs' ? 'text-[#f5f5f7] font-medium' : 'hover:text-[#f5f5f7]'}`}
              >
                Tech Specs
              </button>
            </nav>

            {/* Primary Filled Blue CTA Button (Apple Blue) */}
            <button
              onClick={onOpenBuy}
              className="bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#0062c4] text-white text-[12px] font-semibold px-4 py-1.5 rounded-[980px] transition-all duration-150 cursor-pointer shadow-sm"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
