import { useState } from 'react';
import { X, Check, ShieldCheck, RefreshCw, ShoppingBag, Truck } from 'lucide-react';
import { HERO_WATCH_IMAGE, TITANIUM_CRAFT_IMAGE, STRAP_OPTIONS } from '../data/watchData';
import { WatchFinish, StrapOption, CartItem } from '../types';

interface ConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  initialFinish?: WatchFinish;
}

export default function ConfiguratorModal({
  isOpen,
  onClose,
  onAddToCart,
  initialFinish = 'natural',
}: ConfiguratorModalProps) {
  const [selectedFinish, setSelectedFinish] = useState<WatchFinish>(initialFinish);
  const [selectedStrap, setSelectedStrap] = useState<StrapOption>(STRAP_OPTIONS[0]);
  const [includeAppleCare, setIncludeAppleCare] = useState<boolean>(false);
  const [tradeInActive, setTradeInActive] = useState<boolean>(false);
  const [tradeInCredit, setTradeInCredit] = useState<number>(140);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  if (!isOpen) return null;

  const basePrice = 799;
  const appleCarePrice = 99;
  const effectiveTradeIn = tradeInActive ? tradeInCredit : 0;
  const totalPrice = basePrice + (includeAppleCare ? appleCarePrice : 0) - effectiveTradeIn;

  const handleAdd = () => {
    const item: CartItem = {
      id: `ultra-${Date.now()}`,
      title: `Apple Watch Ultra 2 (49 mm, GPS + Cellular)`,
      finish: selectedFinish,
      strap: selectedStrap,
      hasAppleCare: includeAppleCare,
      basePrice,
      appleCarePrice: includeAppleCare ? appleCarePrice : 0,
      tradeInCredit: effectiveTradeIn,
      quantity: 1,
    };
    onAddToCart(item);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#000000]/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer / Panel */}
      <div className="relative w-full max-w-[620px] h-full bg-[#111111] text-[#f5f5f7] border-l border-[#333336] flex flex-col z-10 shadow-2xl">
        {/* Header */}
        <div className="p-6 bg-[#1d1d1f] border-b border-[#333336] flex items-center justify-between">
          <div>
            <span className="text-[12px] font-semibold text-[#86868b] uppercase tracking-wider block">
              Official Configurator
            </span>
            <h2 className="text-[20px] font-bold text-[#f5f5f7]">
              Buy Apple Watch Ultra 2
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#86868b] hover:text-[#f5f5f7] bg-[#333336]/60 hover:bg-[#333336] p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Visual Preview */}
          <div className="relative bg-[#000000] rounded-[24px] p-6 border border-[#333336] flex flex-col items-center justify-center">
            <img
              src={selectedFinish === 'black' ? TITANIUM_CRAFT_IMAGE : HERO_WATCH_IMAGE}
              alt="Configured Apple Watch Ultra"
              referrerPolicy="no-referrer"
              className="max-h-[260px] object-contain drop-shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="text-[15px] font-semibold text-[#f5f5f7] block">
                49 mm {selectedFinish === 'natural' ? 'Natural Titanium' : 'Black Titanium'} Case
              </span>
              <span className="text-[13px] text-[#86868b]">
                {selectedStrap.name} — {selectedStrap.colorName}
              </span>
            </div>
          </div>

          {/* Step 1: Finish */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-[#f5f5f7]">1. Case Finish</h3>
              <span className="text-[12px] text-[#86868b]">Aerospace Titanium</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedFinish('natural')}
                className={`p-4 rounded-[20px] border text-left transition-all cursor-pointer ${
                  selectedFinish === 'natural'
                    ? 'border-[#0071e3] bg-[#1d1d1f]'
                    : 'border-[#333336] bg-[#111111] hover:bg-[#1d1d1f]'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-[#d2d2d7] border border-white/20 mb-3" />
                <span className="text-[14px] font-semibold text-[#f5f5f7] block">Natural Titanium</span>
                <span className="text-[12px] text-[#86868b] block mt-0.5">Classic brushed metallic tone</span>
              </button>

              <button
                onClick={() => setSelectedFinish('black')}
                className={`p-4 rounded-[20px] border text-left transition-all cursor-pointer ${
                  selectedFinish === 'black'
                    ? 'border-[#0071e3] bg-[#1d1d1f]'
                    : 'border-[#333336] bg-[#111111] hover:bg-[#1d1d1f]'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-[#25282a] border border-white/20 mb-3" />
                <span className="text-[14px] font-semibold text-[#f5f5f7] block">Black Titanium</span>
                <span className="text-[12px] text-[#86868b] block mt-0.5">Satin diamond-like carbon (DLC)</span>
              </button>
            </div>
          </div>

          {/* Step 2: Straps Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-[#f5f5f7]">2. Choose Your Band</h3>
              <span className="text-[12px] text-[#86868b]">Standard size included</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {STRAP_OPTIONS.map((strap) => {
                const isSelected = selectedStrap.id === strap.id;
                return (
                  <button
                    key={strap.id}
                    onClick={() => setSelectedStrap(strap)}
                    className={`p-3 rounded-[18px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0071e3] bg-[#1d1d1f]'
                        : 'border-[#333336] bg-[#111111] hover:bg-[#1d1d1f]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-5 h-5 rounded-full border border-white/20"
                        style={{ backgroundColor: strap.colorHex }}
                      />
                      {isSelected && <Check className="w-4 h-4 text-[#0071e3]" />}
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold text-[#f5f5f7] block leading-tight">
                        {strap.colorName}
                      </span>
                      <span className="text-[11px] text-[#86868b] block mt-0.5">
                        {strap.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-[12px] text-[#86868b] mt-3">
              {selectedStrap.description}
            </p>
          </div>

          {/* Step 3: Apple Trade In */}
          <div className="p-4 bg-[#1d1d1f] rounded-[20px] border border-[#333336]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-5 h-5 text-[#2997ff] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[14px] font-semibold text-[#f5f5f7] block">Apple Trade In</span>
                  <span className="text-[12px] text-[#86868b] block">
                    Have an older watch? Save up to $340 towards your new Ultra.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setTradeInActive((prev) => !prev)}
                className={`px-3 py-1 text-[12px] font-semibold rounded-[980px] border transition-all cursor-pointer shrink-0 ${
                  tradeInActive
                    ? 'bg-[#2997ff] text-white border-[#2997ff]'
                    : 'border-[#333336] text-[#f5f5f7] hover:bg-[#333336]'
                }`}
              >
                {tradeInActive ? 'Applied (-$140)' : 'Apply credit'}
              </button>
            </div>
          </div>

          {/* Step 4: AppleCare+ */}
          <div className="p-4 bg-[#1d1d1f] rounded-[20px] border border-[#333336]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#f56900] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[14px] font-semibold text-[#f5f5f7] block">AppleCare+ for Apple Watch Ultra</span>
                  <span className="text-[12px] text-[#86868b] block">
                    Unlimited incidents of accidental damage protection and battery service.
                  </span>
                  <span className="text-[12px] text-[#f5f5f7] font-medium block mt-1">+$99.00 or $4.99/mo.</span>
                </div>
              </div>
              <button
                onClick={() => setIncludeAppleCare((prev) => !prev)}
                className={`px-3 py-1 text-[12px] font-semibold rounded-[980px] border transition-all cursor-pointer shrink-0 ${
                  includeAppleCare
                    ? 'bg-[#0071e3] text-white border-[#0071e3]'
                    : 'border-[#333336] text-[#f5f5f7] hover:bg-[#333336]'
                }`}
              >
                {includeAppleCare ? 'Added' : 'Add'}
              </button>
            </div>
          </div>

          {/* Delivery & Assurance */}
          <div className="space-y-2 text-[12px] text-[#86868b]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#a3e635]" />
              <span>Free 2-day delivery or pickup at any Apple Store.</span>
            </div>
            <div>
              <span>Free 14-day returns in store or online.</span>
            </div>
          </div>
        </div>

        {/* Footer Checkout Summary */}
        <div className="p-6 bg-[#1d1d1f] border-t border-[#333336] flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-[#86868b] uppercase tracking-wider block">Total</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-bold text-[#f5f5f7] tabular-nums">
                ${totalPrice}
              </span>
              <span className="text-[12px] text-[#86868b] tabular-nums">
                or ${(totalPrice / 24).toFixed(2)}/mo.
              </span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={addedToast}
            className="bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#0062c4] text-white text-[14px] font-semibold px-6 py-3 rounded-[36px] transition-all cursor-pointer shadow-lg flex items-center gap-2"
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
