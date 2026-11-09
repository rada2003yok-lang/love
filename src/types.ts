export type BackgroundCategory = 'all' | 'gingham' | 'hearts' | 'retro' | 'cozy';

export interface BackgroundPattern {
  id: string;
  name: string;
  nameEn: string;
  category: 'gingham' | 'hearts' | 'retro' | 'cozy';
  tag: string;
  previewBg: string; // CSS background for picker swatch
  fullStyle: {
    backgroundColor: string;
    backgroundImage: string;
    backgroundSize: string;
  };
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  rotation: number;
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  emoji: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
  rotation: number;
}

export interface LoveCardData {
  id: string;
  toName: string;
  fromName: string;
  title: string;
  letterContent: string;
  startDate: string; // YYYY-MM-DD
  anniversaryTitle: string;
  backgroundId: string;
  customBgColor?: string;
  customBgImage?: string;
  bgPatternScale: number; // 0.6 - 1.8
  bgOpacity: number; // 0.1 - 1
  isBgAnimated: boolean;
  envelopeColor: 'pink' | 'cream' | 'lavender' | 'mint' | 'red';
  photos: PhotoItem[];
  musicTrackId: string;
  customAudioUrl?: string;
  customAudioName?: string;
  stickers: PlacedSticker[];
  reasons: string[];
  loveQuestion: {
    question: string;
    yesText: string;
    noText: string;
    successMessage: string;
  };
  loveCoupons: Array<{
    id: string;
    title: string;
    description: string;
    redeemed: boolean;
  }>;
  showAnniversary: boolean;
  showMusicPlayer: boolean;
  showPhotos: boolean;
  showLoveQuiz: boolean;
  showReasons: boolean;
  showCoupons: boolean;
  createdAt: number;
}
