import { useState } from 'react';
import { X, Trash2, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { HERO_WATCH_IMAGE, TITANIUM_CRAFT_IMAGE } from '../data/watchData';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function ShoppingBagDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}: ShoppingBagDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.basePrice + item.appleCarePrice - item.tradeInCredit;
    return acc + itemTotal * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[500px] h-full bg-[#111111] text-[#f5f5f7] border-l border-[#333336] flex flex-col z-10 shadow-2xl">
        {/* Header */}
        <div className="p-6 bg-[#1d1d1f] border-b border-[#333336] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-bold text-[#f5f5f7]">Review your Bag</h2>
            <span className="text-[12px] bg-[#333336] text-[#f5f5f7] px-2 py-0.5 rounded-full font-medium">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#86868b] hover:text-[#f5f5f7] bg-[#333336]/50 hover:bg-[#333336] p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {orderConfirmed ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#0071e3]/20 border border-[#0071e3] flex items-center justify-center text-[#2997ff]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-[22px] font-bold text-[#f5f5f7]">Order #W-819402 Confirmed</h3>
              <p className="text-[14px] text-[#86868b] max-w-xs">
                Thank you for your order. Your Apple Watch Ultra 2 is being prepared for fast complimentary delivery.
              </p>
              <button
                onClick={() => {
                  setOrderConfirmed(false);
                  onClose();
                }}
                className="bg-[#0071e3] text-white text-[13px] font-semibold px-6 py-2.5 rounded-[980px] hover:bg-[#0077ed] transition-colors cursor-pointer mt-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#86868b] space-y-3">
              <p className="text-[16px] text-[#f5f5f7] font-semibold">Your bag is empty.</p>
              <p className="text-[13px] max-w-xs">
                Explore the Apple Watch Ultra 2 and choose your favorite titanium finish and band combination.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-[20px] bg-[#1d1d1f] border border-[#333336] flex gap-4 items-start"
                >
                  <div className="w-20 h-20 rounded-[14px] bg-[#000000] border border-[#333336] p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={item.finish === 'black' ? TITANIUM_CRAFT_IMAGE : HERO_WATCH_IMAGE}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-semibold text-[#f5f5f7] leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-[12px] text-[#86868b] block mt-1">
                      {item.finish === 'natural' ? 'Natural Titanium' : 'Black Titanium'} · {item.strap.name} ({item.strap.colorName})
                    </span>

                    {item.hasAppleCare && (
                      <span className="text-[11px] text-[#2997ff] block mt-1">
                        + AppleCare+ included ($99.00)
                      </span>
                    )}

                    {item.tradeInCredit > 0 && (
                      <span className="text-[11px] text-[#a3e635] block mt-0.5">
                        - Apple Trade In Credit (-${item.tradeInCredit}.00)
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#333336]/60">
                      <span className="text-[15px] font-bold text-[#f5f5f7] tabular-nums">
                        ${item.basePrice + item.appleCarePrice - item.tradeInCredit}
                      </span>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#86868b] hover:text-[#ff3b30] transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-[#333336] space-y-2 text-[13px]">
                <div className="flex justify-between text-[#86868b]">
                  <span>Subtotal</span>
                  <span className="text-[#f5f5f7] tabular-nums">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[#86868b]">
                  <span>Shipping</span>
                  <span className="text-[#a3e635] font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-[#86868b]">
                  <span>Estimated Tax</span>
                  <span className="text-[#86868b] tabular-nums">${(subtotal * 0.0825).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Button */}
        {items.length > 0 && !orderConfirmed && (
          <div className="p-6 bg-[#1d1d1f] border-t border-[#333336] space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-[#86868b]">Total:</span>
              <span className="text-[26px] font-bold text-[#f5f5f7] tabular-nums">
                ${subtotal}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#0062c4] text-white text-[14px] font-semibold py-3.5 rounded-[36px] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              {isCheckingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing secure order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Check Out</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
