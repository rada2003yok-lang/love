import { LoveCardData } from '../types';

export const DEFAULT_LOVE_CARD: LoveCardData = {
  id: 'card-1',
  toName: 'ที่รัก (My Favorite Person)',
  fromName: 'เค้าเองนะ 💕',
  title: 'ถึงเธอ... คนที่ทำให้โลกของเค้าสดใสที่สุด 🌸',
  letterContent: `ขอบคุณที่ก้าวเข้ามาเป็นความสุขในชีวิตเค้านะครับ
ตั้งแต่มีเธอ โลกสีเทาๆ ของเค้าก็กลายเป็นสีชมพูขึ้นมาทันที

ชอบเวลาที่เธอยิ้ม ชอบเวลาที่เธอคอยเป็นห่วง
ชอบความน่ารักและความเอาใจใส่ที่เธอมีให้เสมอมา
ไม่ว่าวันข้างหน้าจะเป็นยังไง สัญญาว่าจะคอยจับมือเธอไว้แบบนี้ไปนานๆ เลยนะ

รักเธอที่สุดในโลกเลยนะคนดี ❤️`,
  startDate: '2023-02-14',
  anniversaryTitle: 'เราจับมือเดินทางด้วยกันมาแล้ว',
  backgroundId: 'gingham-pink',
  bgPatternScale: 1.0,
  bgOpacity: 0.95,
  isBgAnimated: false,
  envelopeColor: 'pink',
  photos: [
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
      caption: 'เดทแรกที่ร้านโปรดของเรา ☕',
      rotation: -3,
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop&q=80',
      caption: 'รอยยิ้มที่ชอบที่สุดในโลก 🤍',
      rotation: 4,
    },
  ],
  musicTrackId: 'melody-musicbox',
  stickers: [
    { id: 'st1', stickerId: 's-ribbon', emoji: '🎀', name: 'โบว์สีชมพู', x: 15, y: 12, scale: 1.2, rotation: -12 },
    { id: 'st2', stickerId: 's-heart-pink', emoji: '💖', name: 'หัวใจชมพู', x: 82, y: 15, scale: 1.1, rotation: 10 },
    { id: 'st3', stickerId: 's-bear', emoji: '🧸', name: 'น้องหมี', x: 85, y: 78, scale: 1.2, rotation: -6 },
    { id: 'st4', stickerId: 's-cherry-blossom', emoji: '🌸', name: 'ซากุระ', x: 10, y: 82, scale: 1.0, rotation: 15 },
  ],
  reasons: [
    'ชอบเวลาที่เธอยิ้มตาหยีให้เค้าที่สุดในโลก',
    'ชอบเวลาที่เธอโทรมาเล่าเรื่องนู้นเรื่องนี้ให้ฟัง',
    'ชอบเวลาที่ได้กินของอร่อยๆ ไปด้วยกันกับเธอ',
    'ขอบคุณที่คอยรับฟังและเข้าใจเค้าในทุกๆ เรื่อง',
    'เพราะเธอคือความสบายใจและเป็นบ้านที่อบอุ่นของเค้าเสมอ',
  ],
  loveQuestion: {
    question: 'เธอรักเค้ามากมั้ย?',
    yesText: 'รักที่สุดในจักรวาลเลย! ❤️',
    noText: 'ไม่รักหรอก แบร่ 😜',
    successMessage: 'เย่! เค้าก็รักเธอที่สุดเหมือนกัน ขอบคุณที่อยู่ด้วยกันนะคนดี! 🎉💖',
  },
  loveCoupons: [
    { id: 'c1', title: 'คูปองตามใจ 1 วันเต็ม 👑', description: 'ใช้ได้ทันที ไม่บ่น ไม่ขัดใจเลยแม้แต่นิดเดียว', redeemed: false },
    { id: 'c2', title: 'คูปองกอดแน่นๆ ชาร์จพลัง 3 นาที 🫂', description: 'กอดอุ่นๆ เติมพลังเวลาเหนื่อยล้า', redeemed: false },
    { id: 'c3', title: 'คูปองบุฟเฟต์ / ขนมที่ชอบ 1 มื้อ 🍰', description: 'เค้าเป็นเจ้ามือเลี้ยงเอง!', redeemed: false },
  ],
  showAnniversary: true,
  showMusicPlayer: true,
  showPhotos: true,
  showLoveQuiz: true,
  showReasons: true,
  showCoupons: true,
  createdAt: Date.now(),
};

// UTF-8 safe base64 encoding/decoding
export function encodeCardData(card: LoveCardData): string {
  try {
    const jsonStr = JSON.stringify(card);
    const bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (err) {
    console.error('Failed to encode card:', err);
    return '';
  }
}

export function decodeCardData(encodedStr: string): LoveCardData | null {
  try {
    const binary = atob(encodedStr);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);
    return { ...DEFAULT_LOVE_CARD, ...parsed };
  } catch (err) {
    console.error('Failed to decode card:', err);
    return null;
  }
}

const STORAGE_KEY = 'mimi_love_card_draft_v1';

export function saveLocalDraft(card: LoveCardData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
  } catch (e) {
    console.warn('Could not save draft to localStorage', e);
  }
}

export function loadLocalDraft(): LoveCardData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_LOVE_CARD, ...parsed };
    }
  } catch (e) {
    console.warn('Could not load draft from localStorage', e);
  }
  return DEFAULT_LOVE_CARD;
}
