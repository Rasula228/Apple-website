import { useState } from 'react';
import PromoBanner from './components/PromoBanner';
import TopNav from './components/TopNav';
import HeroStage from './components/HeroStage';
import FeatureStageDark from './components/FeatureStageDark';
import WatchVitrineShowcase from './components/WatchVitrineShowcase';
import LightSectionBands from './components/LightSectionBands';
import TechSpecsSection from './components/TechSpecsSection';
import Footer from './components/Footer';
import CinematicVideoModal from './components/CinematicVideoModal';
import ConfiguratorModal from './components/ConfiguratorModal';
import ShoppingBagDrawer from './components/ShoppingBagDrawer';
import { WatchFinish, CartItem } from './types';
import { STRAP_OPTIONS } from './data/watchData';

export default function App() {
  const [selectedFinish, setSelectedFinish] = useState<WatchFinish>('natural');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [activeVideoChapterId, setActiveVideoChapterId] = useState<string | undefined>(undefined);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState<boolean>(false);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-sample',
      title: 'Apple Watch Ultra 2 (49 mm, GPS + Cellular)',
      finish: 'natural',
      strap: STRAP_OPTIONS[0],
      hasAppleCare: true,
      basePrice: 799,
      appleCarePrice: 99,
      tradeInCredit: 0,
      quantity: 1,
    },
  ]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [item, ...prev]);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenVideoWithChapter = (chapterId: string) => {
    setActiveVideoChapterId(chapterId);
    setIsVideoModalOpen(true);
  };

  const handleOpenGeneralVideo = () => {
    setActiveVideoChapterId(undefined);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] flex flex-col font-sans selection:bg-[#0071e3] selection:text-white">
      {/* 1. Slim Promo Announcement Bar */}
      <PromoBanner onOpenTradeIn={() => setIsConfiguratorOpen(true)} />

      {/* 2. Global Top Nav & Secondary Product Subnav */}
      <TopNav
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsBagOpen(true)}
        onOpenBuy={() => setIsConfiguratorOpen(true)}
        onOpenVideo={handleOpenGeneralVideo}
      />

      {/* 3. Act 1: Dark Hero Stage */}
      <main className="flex-1">
        <HeroStage
          selectedFinish={selectedFinish}
          onSelectFinish={setSelectedFinish}
          onOpenBuy={() => setIsConfiguratorOpen(true)}
          onOpenVideo={handleOpenGeneralVideo}
        />

        {/* 4. Act 2: Dark Feature Stages & Craftsmanship */}
        <FeatureStageDark
          onOpenVideoWithChapter={handleOpenVideoWithChapter}
        />

        {/* 5. Obsidian Gallery Vitrine Showcase */}
        <WatchVitrineShowcase
          onOpenVideo={handleOpenGeneralVideo}
          onOpenBuy={() => setIsConfiguratorOpen(true)}
        />

        {/* 6. Act 3: Light Detail Bands (Paper White #ffffff) */}
        <LightSectionBands
          onOpenBuy={() => setIsConfiguratorOpen(true)}
          onOpenSpecs={() => {
            const el = document.getElementById('specs');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 7. Technical Specifications */}
        <TechSpecsSection
          onOpenBuy={() => setIsConfiguratorOpen(true)}
        />
      </main>

      {/* 8. Global Apple Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CinematicVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        initialChapterId={activeVideoChapterId}
      />

      <ConfiguratorModal
        isOpen={isConfiguratorOpen}
        onClose={() => setIsConfiguratorOpen(false)}
        onAddToCart={handleAddToCart}
        initialFinish={selectedFinish}
      />

      <ShoppingBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
