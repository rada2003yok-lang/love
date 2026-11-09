import React, { useState } from 'react';
import { Heart, Feather, Sparkles, BookHeart } from 'lucide-react';

interface LoveLetterCardProps {
  toName: string;
  fromName: string;
  title: string;
  letterContent: string;
  isEditing?: boolean;
  onUpdateTo?: (val: string) => void;
  onUpdateFrom?: (val: string) => void;
  onUpdateTitle?: (val: string) => void;
  onUpdateContent?: (val: string) => void;
}

export const LoveLetterCard: React.FC<LoveLetterCardProps> = ({
  toName,
  fromName,
  title,
  letterContent,
  isEditing = false,
  onUpdateTo,
  onUpdateFrom,
  onUpdateTitle,
  onUpdateContent,
}) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const templates = [
    {
      name: 'บอกรักหวานซึ้ง (Romantic Classic)',
      title: 'ถึงเธอ... คนที่ทำให้โลกของเค้าสดใสที่สุด 🌸',
      content: `ขอบคุณที่ก้าวเข้ามาเป็นความสุขในชีวิตเค้านะครับ
ตั้งแต่มีเธอ โลกสีเทาๆ ของเค้าก็กลายเป็นสีชมพูขึ้นมาทันที

ชอบเวลาที่เธอยิ้ม ชอบเวลาที่เธอคอยเป็นห่วง
ชอบความน่ารักและความเอาใจใส่ที่เธอมีให้เสมอมา
ไม่ว่าวันข้างหน้าจะเป็นยังไง สัญญาว่าจะคอยจับมือเธอไว้แบบนี้ไปนานๆ เลยนะ

รักเธอที่สุดในโลกเลยนะคนดี ❤️`,
    },
    {
      name: 'สุขสันต์วันครบรอบ (Happy Anniversary)',
      title: 'สุขสันต์วันครบรอบของเรานะคนเก่ง ✨',
      content: `เดินทางด้วยกันมาถึงวันนี้แล้วนะ ขอบคุณสำหรับทุกๆ รอยยิ้ม ทุกๆ กำลังใจ
ขอบคุณที่อดทนกับความดื้อของเค้าในบางวัน 5555

ดีใจมากๆ ที่ได้มีเธอเป็นคนพิเศษข้างๆ
ขอให้เราสองคนรักและเข้าใจกันมากขึ้นในทุกๆ วันนะ
Happy Anniversary ครับที่รัก! 🥂💖`,
    },
    {
      name: 'ขอบคุณที่อยู่เคียงข้าง (Heartfelt Thanks)',
      title: 'จดหมายขอบคุณจากหัวใจดวงนี้ 💌',
      content: `อยากบอกเธอว่าเค้าโชคดีมากๆ ที่ได้เจอเธอ
เธอเป็นทั้งเพื่อนคู่คิด เป็นกำลังใจ และเป็นเซฟโซนที่ดีที่สุดของเค้า

เวลาเหนื่อย แค่ได้ยินเสียงเธอ ได้เห็นหน้าเธอ ก็หายเหนื่อยเป็นปลิดทิ้ง
รักเธอและจะอยู่ซัพพอร์ตเธอในทุกๆ ก้าวเสมอไปนะ 🫂`,
    },
  ];

  const handleApplyTemplate = (tpl: typeof templates[0]) => {
    onUpdateTitle?.(tpl.title);
    onUpdateContent?.(tpl.content);
    setShowTemplates(false);
  };

  return (
    <div className="relative bg-[#fffdfa] rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-200/80 overflow-hidden">
      {/* Top washi tapes on left and right */}
      <div className="absolute -top-2 left-6 w-20 h-4 washi-tape-pink rounded-xs -rotate-2" />
      <div className="absolute -top-2 right-6 w-20 h-4 washi-tape rounded-xs rotate-2" />

      {/* Notebook/Parchment lines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px)',
          backgroundSize: '100% 32px',
        }}
      />

      {/* Template chooser button in edit mode */}
      {isEditing && (
        <div className="relative z-10 flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="inline-flex items-center gap-1.5 text-xs text-pink-600 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-200 font-medium transition-colors"
          >
            <BookHeart className="w-3.5 h-3.5" />
            <span>เลือกข้อความบอกรักสำเร็จรูป</span>
          </button>
        </div>
      )}

      {showTemplates && (
        <div className="relative z-20 mb-4 p-3 bg-pink-50/90 rounded-xl border border-pink-200 space-y-2">
          <p className="text-xs font-semibold text-slate-700">เลือกเทมเพลตบอกรักแฟน:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {templates.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyTemplate(tpl)}
                className="text-left p-2 bg-white rounded-lg border border-pink-200 hover:border-pink-400 text-xs text-slate-700 shadow-2xs hover:shadow-xs transition-all"
              >
                <p className="font-semibold text-pink-600 truncate">{tpl.name}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{tpl.content}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Letter Header: To */}
      <div className="relative z-10 mb-4 border-b border-amber-200/60 pb-3">
        {isEditing ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 font-handwriting">To:</span>
              <input
                type="text"
                value={toName}
                onChange={(e) => onUpdateTo?.(e.target.value)}
                placeholder="ชื่อแฟน หรือคำเรียกแฟน เช่น ที่รัก, น้องมายด์"
                className="font-handwriting text-xl font-bold text-pink-600 bg-pink-50/40 border border-pink-200 rounded-lg px-2.5 py-1 w-full"
              />
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => onUpdateTitle?.(e.target.value)}
              placeholder="หัวข้อจดหมาย"
              className="text-sm font-semibold text-slate-700 bg-pink-50/40 border border-pink-200 rounded-lg px-2.5 py-1 w-full"
            />
          </div>
        ) : (
          <div>
            <span className="font-handwriting text-sm text-pink-500 font-bold block">
              To: {toName}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              {title}
            </h2>
          </div>
        )}
      </div>

      {/* Letter Body */}
      <div className="relative z-10 my-4 min-h-[160px]">
        {isEditing ? (
          <textarea
            value={letterContent}
            onChange={(e) => onUpdateContent?.(e.target.value)}
            rows={7}
            placeholder="เขียนความในใจบอกรักแฟนที่นี่..."
            className="w-full text-sm sm:text-base leading-relaxed text-slate-700 bg-pink-50/20 border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-300 focus:outline-hidden resize-y"
          />
        ) : (
          <p className="text-sm sm:text-base leading-loose text-slate-700 whitespace-pre-line font-thai-cute">
            {letterContent}
          </p>
        )}
      </div>

      {/* Letter Footer: From */}
      <div className="relative z-10 pt-4 border-t border-amber-200/60 flex flex-col items-end">
        {isEditing ? (
          <div className="flex items-center gap-2 max-w-xs w-full">
            <span className="text-xs font-bold text-slate-500 font-handwriting">From:</span>
            <input
              type="text"
              value={fromName}
              onChange={(e) => onUpdateFrom?.(e.target.value)}
              placeholder="ชื่อของคุณ เช่น เค้าเองนะ"
              className="font-handwriting text-base font-bold text-slate-800 bg-pink-50/40 border border-pink-200 rounded-lg px-2 py-1 w-full text-right"
            />
          </div>
        ) : (
          <div className="text-right">
            <p className="text-xs text-slate-400">ด้วยรักและคิดถึงเสมอ</p>
            <p className="font-handwriting text-xl text-pink-600 font-bold mt-0.5">
              {fromName} ❤️
            </p>
          </div>
        )}
      </div>

      {/* Cute stamp mark on bottom left */}
      <div className="absolute bottom-4 left-6 pointer-events-none opacity-20 rotate-[-12deg]">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-red-500 flex items-center justify-center p-1 text-center">
          <span className="text-[10px] font-bold text-red-600 leading-tight">
            MIMI LOVE<br/>APPROVED
          </span>
        </div>
      </div>
    </div>
  );
};
