export type WatchFinish = 'natural' | 'black';

export type WatchStrapType = 'trail' | 'alpine' | 'ocean';

export interface StrapOption {
  id: string;
  type: WatchStrapType;
  name: string;
  colorName: string;
  colorHex: string;
  accentHex: string;
  description: string;
}

export interface VideoChapter {
  id: string;
  title: string;
  timestampSeconds: number;
  description: string;
  videoUrl: string;
  poster: string;
}

export interface CartItem {
  id: string;
  title: string;
  finish: WatchFinish;
  strap: StrapOption;
  hasAppleCare: boolean;
  basePrice: number;
  appleCarePrice: number;
  tradeInCredit: number;
  quantity: number;
}
