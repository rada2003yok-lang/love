export interface AvailableSticker {
  id: string;
  name: string;
  emoji: string;
  category: 'cute' | 'love' | 'food' | 'aesthetic';
}

export const AVAILABLE_STICKERS: AvailableSticker[] = [
  // Love & Romance
  { id: 's-heart-pink', name: 'หัวใจชมพู', emoji: '💖', category: 'love' },
  { id: 's-heart-sparkle', name: 'หัวใจวิบวับ', emoji: '✨', category: 'love' },
  { id: 's-heart-fire', name: 'คลั่งรัก', emoji: '❤️‍🔥', category: 'love' },
  { id: 's-kiss', name: 'รอยจูบ', emoji: '💋', category: 'love' },
  { id: 's-love-letter', name: 'จดหมายรัก', emoji: '💌', category: 'love' },
  { id: 's-ring', name: 'แหวนแต่งงาน', emoji: '💍', category: 'love' },
  { id: 's-cupid', name: 'คิวปิด', emoji: '💘', category: 'love' },
  { id: 's-ribbon', name: 'โบว์สีชมพู', emoji: '🎀', category: 'love' },

  // Cute animals & characters
  { id: 's-cat-love', name: 'แมวมีหัวใจ', emoji: '😻', category: 'cute' },
  { id: 's-bear', name: 'น้องหมี', emoji: '🧸', category: 'cute' },
  { id: 's-bunny', name: 'กระต่ายน้อย', emoji: '🐰', category: 'cute' },
  { id: 's-chick', name: 'ลูกเจี๊ยบ', emoji: '🐥', category: 'cute' },
  { id: 's-puppy', name: 'น้องหมา', emoji: '🐶', category: 'cute' },
  { id: 's-angel', name: 'นางฟ้าตัวน้อย', emoji: '👼', category: 'cute' },

  // Food & Sweet Cafe
  { id: 's-strawberry', name: 'สตรอว์เบอร์รี่', emoji: '🍓', category: 'food' },
  { id: 's-cake', name: 'เค้กฉลอง', emoji: '🍰', category: 'food' },
  { id: 's-coffee', name: 'กาแฟคู่กัน', emoji: '☕', category: 'food' },
  { id: 's-cookie', name: 'คุกกี้เนย', emoji: '🍪', category: 'food' },
  { id: 's-icecream', name: 'ไอศกรีม', emoji: '🍦', category: 'food' },
  { id: 's-candy', name: 'ลูกอมหวาน', emoji: '🍬', category: 'food' },

  // Aesthetic & Y2K
  { id: 's-cherry-blossom', name: 'ดอกซากุระ', emoji: '🌸', category: 'aesthetic' },
  { id: 's-tulip', name: 'ทิวลิป', emoji: '🌷', category: 'aesthetic' },
  { id: 's-sunflower', name: 'ทานตะวัน', emoji: '🌻', category: 'aesthetic' },
  { id: 's-cd', name: 'แผ่นซีดี Y2K', emoji: '💿', category: 'aesthetic' },
  { id: 's-cassette', name: 'เทปคาสเซ็ท', emoji: '📼', category: 'aesthetic' },
  { id: 's-camera', name: 'กล้องโพลารอยด์', emoji: '📷', category: 'aesthetic' },
  { id: 's-star', name: 'ดาวตก', emoji: '⭐', category: 'aesthetic' },
  { id: 's-cloud', name: 'ปุยเมฆ', emoji: '☁️', category: 'aesthetic' },
];
