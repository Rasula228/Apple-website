export default function Footer() {
  return (
    <footer id="support" className="w-full bg-[#111111] text-[#86868b] text-[12px] leading-relaxed border-t border-[#333336]/60 pt-10 pb-16">
      <div className="max-w-[1024px] mx-auto px-6 space-y-6">
        {/* Footnotes / Legal Disclaimers */}
        <div className="space-y-3 pb-8 border-b border-[#333336]/60 text-[11px] leading-normal">
          <p>
            * Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for an Apple Gift Card. Trade-in value may be applied toward qualifying new device purchase, or added to an Apple Gift Card. Actual value awarded is based on receipt of a qualifying device matching the description provided when estimate was made.
          </p>
          <p>
            1. Battery life claims depend on usage and configuration. The 72-hour Low Power Mode battery life was tested by Apple in August 2023 using preproduction Apple Watch Ultra 2 paired with an iPhone.
          </p>
          <p>
            2. Apple Watch Ultra 2 has a water resistance rating of 100 meters under ISO standard 22810. It may be used for recreational scuba diving (with compatible third-party app from the App Store) to 40 meters and high-speed water sports. It should not be used for diving below 40 meters.
          </p>
          <p>
            3. Oceanic+ app requires a subscription. Available on the App Store. Decompression protocols and depth safety alerts are dive assistance features and should always be accompanied by a secondary backup gauge and dive buddy.
          </p>
        </div>

        {/* Directory links 5-column grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 py-4 text-[12px]">
          <div className="space-y-2">
            <span className="font-semibold text-[#f5f5f7] block">Shop and Learn</span>
            <ul className="space-y-1.5">
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Store</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Mac</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">iPad</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">iPhone</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Watch</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">AirPods</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-[#f5f5f7] block">Apple Store</span>
            <ul className="space-y-1.5">
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Find a Store</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Genius Bar</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Today at Apple</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple Trade In</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Financing</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Order Status</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-[#f5f5f7] block">Entertainment</span>
            <ul className="space-y-1.5">
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple Music</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple TV+</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple Fitness+</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple Podcasts</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple Books</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">App Store</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-[#f5f5f7] block">For Business</span>
            <ul className="space-y-1.5">
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple and Business</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Shop for Business</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple in Healthcare</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Apple in Education</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-[#f5f5f7] block">Apple Values</span>
            <ul className="space-y-1.5">
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Accessibility</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Education</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Environment</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Privacy</a></li>
              <li><a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Supply Chain</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-6 border-t border-[#333336]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            <span>Copyright © 2026 Apple Inc. All rights reserved.</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[#86868b]">
              <a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Terms of Use</a>
              <span>|</span>
              <a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Sales and Refunds</a>
              <span>|</span>
              <a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Legal</a>
              <span>|</span>
              <a href="#hero" className="hover:text-[#f5f5f7] transition-colors">Site Map</a>
            </div>
          </div>

          <div className="text-[#f5f5f7] font-medium shrink-0">
            <span>United States · English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
