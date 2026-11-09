import { BackgroundPattern } from '../types';

// Helper to encode SVG into clean data URI
const svgToDataUri = (svgString: string) => {
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}")`;
};

// SVG Patterns
const heartPatternSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <path d="M20 28.5l-1.45-1.32C13.4 22.36 10 19.28 10 15.5 10 12.42 12.42 10 15.5 10c1.74 0 3.41.81 4.5 2.09C21.09 10.81 22.76 10 24.5 10 27.58 10 30 12.42 30 15.5c0 3.78-3.4 6.86-8.55 11.54L20 28.5z" fill="#f472b6" fill-opacity="0.35"/>
  <circle cx="6" cy="6" r="1.5" fill="#fbcfe8" fill-opacity="0.6"/>
  <circle cx="34" cy="34" r="1.5" fill="#fbcfe8" fill-opacity="0.6"/>
</svg>`;

const miniHeartsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <path d="M16 23l-1-0.9C10.5 18 8 15.5 8 12.5 8 10 10 8 12.5 8c1.4 0 2.7.7 3.5 1.7.8-1 2.1-1.7 3.5-1.7 2.5 0 4.5 2 4.5 4.5 0 3-2.5 5.5-7 9.6L16 23z" fill="#fb7185" fill-opacity="0.45"/>
  <path d="M30 7l-.5-.4C27.5 5 26.5 4 26.5 2.7c0-1.1.9-2 2-2 .6 0 1.2.3 1.5.8.3-.5.9-.8 1.5-.8 1.1 0 2 .9 2 2 0 1.3-1 2.3-3 3.9L30 7z" fill="#f43f5e" fill-opacity="0.25"/>
</svg>`;

const bowRibbonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <g fill="#ec4899" fill-opacity="0.4">
    <ellipse cx="17" cy="22" rx="7" ry="4" transform="rotate(-20 17 22)"/>
    <ellipse cx="31" cy="22" rx="7" ry="4" transform="rotate(20 31 22)"/>
    <circle cx="24" cy="23" r="3" fill="#db2777" fill-opacity="0.5"/>
    <path d="M22 25c-2 6-5 10-7 12m11-12c2 6 5 10 7 12" stroke="#db2777" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.4"/>
  </g>
</svg>`;

const pixelHeartSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <rect x="10" y="8" width="4" height="4" fill="#f43f5e" fill-opacity="0.45"/>
  <rect x="18" y="8" width="4" height="4" fill="#f43f5e" fill-opacity="0.45"/>
  <rect x="6" y="12" width="12" height="4" fill="#fb7185" fill-opacity="0.45"/>
  <rect x="14" y="12" width="12" height="4" fill="#fb7185" fill-opacity="0.45"/>
  <rect x="6" y="16" width="20" height="4" fill="#f43f5e" fill-opacity="0.45"/>
  <rect x="10" y="20" width="12" height="4" fill="#e11d48" fill-opacity="0.45"/>
  <rect x="14" y="24" width="4" height="4" fill="#be123c" fill-opacity="0.45"/>
</svg>`;

const strawberrySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path d="M24 16c-6 0-10 5-10 11 0 7 8 13 10 13s10-6 10-13c0-6-4-11-10-11z" fill="#f43f5e" fill-opacity="0.45"/>
  <path d="M20 15c2-3 4-3 4-3s2 0 4 3c2-1 4-1 4-1s-1 3-3 4c-3-1-6-1-9 0-2-1-3-4-3-4s2 0 3 1z" fill="#22c55e" fill-opacity="0.5"/>
  <circle cx="21" cy="22" r="0.8" fill="#fecdd3"/>
  <circle cx="27" cy="22" r="0.8" fill="#fecdd3"/>
  <circle cx="24" cy="27" r="0.8" fill="#fecdd3"/>
  <circle cx="21" cy="32" r="0.8" fill="#fecdd3"/>
  <circle cx="27" cy="32" r="0.8" fill="#fecdd3"/>
</svg>`;

const retroStarsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <!-- 4-point star -->
  <path d="M20 6 Q20 20 6 20 Q20 20 20 34 Q20 20 34 20 Q20 20 20 6 Z" fill="#fbbf24" fill-opacity="0.4"/>
  <circle cx="34" cy="10" r="1.5" fill="#f472b6" fill-opacity="0.5"/>
  <circle cx="8" cy="32" r="1" fill="#60a5fa" fill-opacity="0.5"/>
</svg>`;

const daisyFlowersSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
  <g fill="#ffffff" fill-opacity="0.85">
    <circle cx="22" cy="14" r="5"/>
    <circle cx="22" cy="30" r="5"/>
    <circle cx="14" cy="22" r="5"/>
    <circle cx="30" cy="22" r="5"/>
    <circle cx="16" cy="16" r="4.5"/>
    <circle cx="28" cy="16" r="4.5"/>
    <circle cx="16" cy="28" r="4.5"/>
    <circle cx="28" cy="28" r="4.5"/>
  </g>
  <circle cx="22" cy="22" r="5" fill="#f59e0b" fill-opacity="0.8"/>
</svg>`;

const sakuraPetalsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path d="M20 12 C18 16 19 22 24 24 C29 22 30 16 28 12 C26 9 22 9 20 12 Z" fill="#fbcfe8" fill-opacity="0.55" transform="rotate(-15 24 18)"/>
  <path d="M10 32 C8 35 9 39 13 40 C17 39 18 35 16 32 C14 30 12 30 10 32 Z" fill="#f472b6" fill-opacity="0.4" transform="rotate(35 14 36)"/>
</svg>`;

const teddyBearSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
  <g fill="#b45309" fill-opacity="0.3">
    <!-- ears -->
    <circle cx="18" cy="18" r="5"/>
    <circle cx="32" cy="18" r="5"/>
    <!-- head -->
    <ellipse cx="25" cy="26" rx="10" ry="9"/>
    <!-- snout -->
    <ellipse cx="25" cy="28" rx="4" ry="3" fill="#fef3c7" fill-opacity="0.5"/>
    <circle cx="25" cy="27" r="1.5" fill="#78350f" fill-opacity="0.5"/>
  </g>
</svg>`;

const noteBookGraphSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path d="M0 0h20v20H0z" fill="none"/>
  <path d="M0 20h20M20 0v20" stroke="#cbd5e1" stroke-width="0.8" opacity="0.65"/>
</svg>`;

const musicNotesSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <path d="M14 26a3 3 0 1 1-3-3c1.6 0 3 .8 3 2.5V11l14-4v14a3 3 0 1 1-3-3c1.6 0 3 .8 3 2.5v-10l-14 4v11.5z" fill="#ec4899" fill-opacity="0.3"/>
</svg>`;

const wavyPastelSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40">
  <path d="M0 20 Q15 5 30 20 T60 20" stroke="#f472b6" stroke-width="3" fill="none" opacity="0.25"/>
  <path d="M0 35 Q15 20 30 35 T60 35" stroke="#a78bfa" stroke-width="2" fill="none" opacity="0.2"/>
</svg>`;

export const BACKGROUND_PATTERNS: BackgroundPattern[] = [
  // 1. GINGHAM & PLAID (ลายสก็อตปิคนิคหวาน)
  {
    id: 'gingham-pink',
    name: 'สก็อตชมพูหวานฉ่ำ',
    nameEn: 'Strawberry Gingham',
    category: 'gingham',
    tag: 'ยอดนิยม ❤️',
    previewBg: 'linear-gradient(45deg, #f472b6 25%, transparent 25%), linear-gradient(-45deg, #f472b6 25%, transparent 25%), #ffeef2',
    fullStyle: {
      backgroundColor: '#fff0f4',
      backgroundImage: `
        linear-gradient(45deg, rgba(244, 114, 182, 0.28) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(244, 114, 182, 0.28) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(244, 114, 182, 0.28) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(244, 114, 182, 0.28) 75%)
      `,
      backgroundSize: '28px 28px',
    },
  },
  {
    id: 'gingham-butter',
    name: 'สก็อตเนยสดละมุน',
    nameEn: 'Buttercream Check',
    category: 'gingham',
    tag: 'อบอุ่น 🧈',
    previewBg: 'linear-gradient(45deg, #f59e0b 25%, transparent 25%), #fffbeb',
    fullStyle: {
      backgroundColor: '#fffdf5',
      backgroundImage: `
        linear-gradient(45deg, rgba(245, 158, 11, 0.22) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(245, 158, 11, 0.22) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(245, 158, 11, 0.22) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(245, 158, 11, 0.22) 75%)
      `,
      backgroundSize: '28px 28px',
    },
  },
  {
    id: 'gingham-blue',
    name: 'สก็อตฟ้าสดใส',
    nameEn: 'Sky Blue Picnic',
    category: 'gingham',
    tag: 'สดชื่น ☁️',
    previewBg: 'linear-gradient(45deg, #38bdf8 25%, transparent 25%), #f0f9ff',
    fullStyle: {
      backgroundColor: '#f0f9ff',
      backgroundImage: `
        linear-gradient(45deg, rgba(56, 189, 248, 0.25) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(56, 189, 248, 0.25) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(56, 189, 248, 0.25) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(56, 189, 248, 0.25) 75%)
      `,
      backgroundSize: '28px 28px',
    },
  },
  {
    id: 'gingham-mint',
    name: 'สก็อตเขียวมินต์พาสเทล',
    nameEn: 'Sage Mint Plaid',
    category: 'gingham',
    tag: 'ธรรมชาติ 🌿',
    previewBg: 'linear-gradient(45deg, #4ade80 25%, transparent 25%), #f0fdf4',
    fullStyle: {
      backgroundColor: '#f2fbf5',
      backgroundImage: `
        linear-gradient(45deg, rgba(74, 222, 128, 0.25) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(74, 222, 128, 0.25) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(74, 222, 128, 0.25) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(74, 222, 128, 0.25) 75%)
      `,
      backgroundSize: '28px 28px',
    },
  },
  {
    id: 'gingham-lavender',
    name: 'สก็อตม่วงลาเวนเดอร์',
    nameEn: 'Lavender Check',
    category: 'gingham',
    tag: 'ฝันหวาน 💜',
    previewBg: 'linear-gradient(45deg, #c084fc 25%, transparent 25%), #faf5ff',
    fullStyle: {
      backgroundColor: '#fcf7ff',
      backgroundImage: `
        linear-gradient(45deg, rgba(192, 132, 252, 0.25) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(192, 132, 252, 0.25) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(192, 132, 252, 0.25) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(192, 132, 252, 0.25) 75%)
      `,
      backgroundSize: '28px 28px',
    },
  },
  {
    id: 'gingham-cocoa',
    name: 'สก็อตโกโก้คาเฟ่',
    nameEn: 'Mocha Cafe Plaid',
    category: 'gingham',
    tag: 'มินิมอล ☕',
    previewBg: 'linear-gradient(45deg, #b45309 20%, transparent 20%), #fef3c7',
    fullStyle: {
      backgroundColor: '#fbf7ee',
      backgroundImage: `
        linear-gradient(45deg, rgba(180, 83, 9, 0.16) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(180, 83, 9, 0.16) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(180, 83, 9, 0.16) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(180, 83, 9, 0.16) 75%)
      `,
      backgroundSize: '28px 28px',
    },
  },

  // 2. HEARTS & BOWS (หัวใจและโบว์น่ารักสไตล์ Mimi)
  {
    id: 'hearts-floating',
    name: 'หัวใจหวานระยิบระยับ',
    nameEn: 'Floating Hearts',
    category: 'hearts',
    tag: 'สไตล์ Mimi 💕',
    previewBg: '#ffe4e6',
    fullStyle: {
      backgroundColor: '#fff0f3',
      backgroundImage: svgToDataUri(heartPatternSvg),
      backgroundSize: '40px 40px',
    },
  },
  {
    id: 'hearts-mini',
    name: 'มินิฮาร์ทจิ๋ว',
    nameEn: 'Tiny Little Hearts',
    category: 'hearts',
    tag: 'น่ารักมาก 💖',
    previewBg: '#ffe4e6',
    fullStyle: {
      backgroundColor: '#fff5f7',
      backgroundImage: svgToDataUri(miniHeartsSvg),
      backgroundSize: '32px 32px',
    },
  },
  {
    id: 'ribbon-bows',
    name: 'โบว์สีชมพู Coquette',
    nameEn: 'Pink Ribbon Bows',
    category: 'hearts',
    tag: 'ฮิตบน TikTok 🎀',
    previewBg: '#fce7f3',
    fullStyle: {
      backgroundColor: '#fff0f7',
      backgroundImage: svgToDataUri(bowRibbonSvg),
      backgroundSize: '48px 48px',
    },
  },
  {
    id: 'pixel-hearts',
    name: 'หัวใจพิกเซล 90s',
    nameEn: '90s Pixel Hearts',
    category: 'hearts',
    tag: 'Retro Game 👾',
    previewBg: '#fed7aa',
    fullStyle: {
      backgroundColor: '#fff5eb',
      backgroundImage: svgToDataUri(pixelHeartSvg),
      backgroundSize: '32px 32px',
    },
  },
  {
    id: 'strawberry-field',
    name: 'สวนสตรอว์เบอร์รี่สดใส',
    nameEn: 'Sweet Strawberries',
    category: 'hearts',
    tag: 'หวานฉ่ำ 🍓',
    previewBg: '#fee2e2',
    fullStyle: {
      backgroundColor: '#fff1f2',
      backgroundImage: svgToDataUri(strawberrySvg),
      backgroundSize: '48px 48px',
    },
  },
  {
    id: 'teddy-coffee',
    name: 'น้องหมีและหัวใจ',
    nameEn: 'Teddy Bear Love',
    category: 'hearts',
    tag: 'นุบนิบ 🧸',
    previewBg: '#fef3c7',
    fullStyle: {
      backgroundColor: '#fffdf5',
      backgroundImage: svgToDataUri(teddyBearSvg),
      backgroundSize: '50px 50px',
    },
  },

  // 3. RETRO & 90s NOSTALGIA
  {
    id: 'retro-clouds',
    name: 'ก้อนเมฆ Windows 95',
    nameEn: 'Dreamy Y2K Clouds',
    category: 'retro',
    tag: 'Y2K Classic ☁️',
    previewBg: 'radial-gradient(circle at 50% 50%, #bae6fd 20%, transparent 20%), #e0f2fe',
    fullStyle: {
      backgroundColor: '#eaf4fd',
      backgroundImage: `
        radial-gradient(circle at 50% 50%, #bae6fd 25%, transparent 25%),
        radial-gradient(circle at 0% 0%, #ffffff 40%, transparent 40%),
        radial-gradient(circle at 100% 100%, #ffffff 40%, transparent 40%)
      `,
      backgroundSize: '64px 64px',
    },
  },
  {
    id: 'sparkle-stars',
    name: 'ดวงดาวประกายวิบวับ',
    nameEn: 'Twinkling Y2K Stars',
    category: 'retro',
    tag: 'วิบวับ ✨',
    previewBg: '#fef9c3',
    fullStyle: {
      backgroundColor: '#fffde7',
      backgroundImage: svgToDataUri(retroStarsSvg),
      backgroundSize: '40px 40px',
    },
  },
  {
    id: 'daisy-pastels',
    name: 'สวนดอกเดซี่พาสเทล',
    nameEn: 'Pastel Daisies',
    category: 'retro',
    tag: 'ดอกไม้สดใส 🌼',
    previewBg: '#ecfdf5',
    fullStyle: {
      backgroundColor: '#f2fcf6',
      backgroundImage: svgToDataUri(daisyFlowersSvg),
      backgroundSize: '44px 44px',
    },
  },
  {
    id: 'grid-school',
    name: 'สมุดกราฟเขียนจดหมาย',
    nameEn: '90s Grid Notebook',
    category: 'retro',
    tag: 'ไดอารี่ 📝',
    previewBg: '#f8fafc',
    fullStyle: {
      backgroundColor: '#fbfcfd',
      backgroundImage: svgToDataUri(noteBookGraphSvg),
      backgroundSize: '20px 20px',
    },
  },
  {
    id: 'music-melody',
    name: 'ตัวโน้ตเพลงรัก Mimi',
    nameEn: 'Love Song Melody',
    category: 'retro',
    tag: 'เครื่องเล่นเพลง 🎵',
    previewBg: '#fdf2f8',
    fullStyle: {
      backgroundColor: '#fdf2f8',
      backgroundImage: svgToDataUri(musicNotesSvg),
      backgroundSize: '40px 40px',
    },
  },
  {
    id: 'wavy-candy',
    name: 'ลูกคลื่นพาสเทลสายรุ้ง',
    nameEn: 'Pastel Groovy Waves',
    category: 'retro',
    tag: 'เรโทรเวฟ 〰️',
    previewBg: '#fae8ff',
    fullStyle: {
      backgroundColor: '#faf2ff',
      backgroundImage: svgToDataUri(wavyPastelSvg),
      backgroundSize: '60px 40px',
    },
  },

  // 4. COZY, PAPER & NATURE (มินิมอล & ละมุน)
  {
    id: 'sakura-blossom',
    name: 'กลีบซากุระปลิวไหว',
    nameEn: 'Sakura Petals Drift',
    category: 'cozy',
    tag: 'โรแมนติก 🌸',
    previewBg: '#fce7f3',
    fullStyle: {
      backgroundColor: '#fff4f9',
      backgroundImage: svgToDataUri(sakuraPetalsSvg),
      backgroundSize: '48px 48px',
    },
  },
  {
    id: 'soft-polka-pink',
    name: 'จุดโพกาดอทมิลค์กี้',
    nameEn: 'Milky Polka Dot',
    category: 'cozy',
    tag: 'น่ารักคลาสสิก ⚪',
    previewBg: 'radial-gradient(#f472b6 2px, transparent 2px), #fff0f5',
    fullStyle: {
      backgroundColor: '#fff5f8',
      backgroundImage: 'radial-gradient(rgba(244, 114, 182, 0.4) 2.5px, transparent 2.5px)',
      backgroundSize: '24px 24px',
    },
  },
  {
    id: 'polka-mint',
    name: 'จุดโพกาดอทมินต์กรีน',
    nameEn: 'Mint Polka Dot',
    category: 'cozy',
    tag: 'เรียบง่าย 🟢',
    previewBg: 'radial-gradient(#34d399 2px, transparent 2px), #f0fdf4',
    fullStyle: {
      backgroundColor: '#f4fbf7',
      backgroundImage: 'radial-gradient(rgba(52, 211, 153, 0.4) 2.5px, transparent 2.5px)',
      backgroundSize: '24px 24px',
    },
  },
  {
    id: 'kraft-letter',
    name: 'กระดาษคราฟท์จดหมายรัก',
    nameEn: 'Vintage Kraft Paper',
    category: 'cozy',
    tag: 'วินเทจ 📜',
    previewBg: '#fef3c7',
    fullStyle: {
      backgroundColor: '#fbf3dc',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(217, 119, 6, 0.04) 0%, transparent 20%),
        radial-gradient(circle at 90% 80%, rgba(180, 83, 9, 0.05) 0%, transparent 25%),
        linear-gradient(rgba(180, 83, 9, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 100% 100%, 24px 24px',
    },
  },
  {
    id: 'starry-midnight',
    name: 'ราตรีประดับดาวแสนหวาน',
    nameEn: 'Midnight Starlight',
    category: 'cozy',
    tag: 'โรแมนติกยามค่ำ 🌌',
    previewBg: '#1e1b4b',
    fullStyle: {
      backgroundColor: '#1e1b4b',
      backgroundImage: `
        radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.25) 0%, transparent 70%),
        radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(1.5px 1.5px at 40px 70px, #fbcfe8, rgba(0,0,0,0)),
        radial-gradient(1px 1px at 80px 10px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 120px 50px, #f472b6, rgba(0,0,0,0))
      `,
      backgroundSize: '100% 100%, 150px 150px, 180px 180px, 200px 200px, 220px 220px',
    },
  },
  {
    id: 'sunset-peach',
    name: 'แสงอาทิตย์ตกไล่เฉดหวาน',
    nameEn: 'Sunset Peach Ombre',
    category: 'cozy',
    tag: 'อบอุ่นละมุน 🌅',
    previewBg: 'linear-gradient(135deg, #ffd1dc 0%, #ffe3e3 50%, #d8b4fe 100%)',
    fullStyle: {
      backgroundColor: '#fff0f4',
      backgroundImage: 'linear-gradient(135deg, rgba(254, 205, 211, 0.7) 0%, rgba(254, 240, 138, 0.4) 50%, rgba(233, 213, 255, 0.6) 100%)',
      backgroundSize: '100% 100%',
    },
  },
];
