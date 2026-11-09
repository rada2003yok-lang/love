import React, { useState } from 'react';
import { PlacedSticker } from '../types';
import { AVAILABLE_STICKERS, AvailableSticker } from '../data/stickers';
import { Sparkles, Trash2, RotateCw, ZoomIn, ZoomOut, Plus, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StickerCanvasProps {
  stickers: PlacedSticker[];
  isEditing?: boolean;
  onUpdateStickers?: (stickers: PlacedSticker[]) => void;
}

export const StickerCanvas: React.FC<StickerCanvasProps> = ({
  stickers,
  isEditing = false,
  onUpdateStickers,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'love', label: 'บอกรัก' },
    { id: 'cute', label: 'สัตว์น่ารัก' },
    { id: 'food', label: 'ขนม & คาเฟ่' },
    { id: 'aesthetic', label: 'Y2K วินเทจ' },
  ];

  const filteredStickers = selectedCategory === 'all'
    ? AVAILABLE_STICKERS
    : AVAILABLE_STICKERS.filter(s => s.category === selectedCategory);

  const handleAddSticker = (item: AvailableSticker) => {
    if (!onUpdateStickers) return;
    const newSticker: PlacedSticker = {
      id: 'stk-' + Date.now() + Math.random().toString(36).substring(2, 5),
      stickerId: item.id,
      emoji: item.emoji,
      name: item.name,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      scale: 1.1,
      rotation: (Math.random() - 0.5) * 24,
    };
    onUpdateStickers([...stickers, newSticker]);
    setShowPicker(false);
  };

  const handleRemoveSticker = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onUpdateStickers) return;
    onUpdateStickers(stickers.filter(s => s.id !== id));
  };

  const handleRotateSticker = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onUpdateStickers) return;
    onUpdateStickers(
      stickers.map(s => {
        if (s.id === id) {
          return { ...s, rotation: (s.rotation + 25) % 360 };
        }
        return s;
      })
    );
  };

  const handleScaleSticker = (id: string, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onUpdateStickers) return;
    onUpdateStickers(
      stickers.map(s => {
        if (s.id === id) {
          const nextScale = Math.max(0.6, Math.min(2.5, s.scale + delta));
          return { ...s, scale: nextScale };
        }
        return s;
      })
    );
  };

  // When recipient clicks a sticker, create cute mini heart burst!
  const handleStickerClick = (sticker: PlacedSticker) => {
    if (isEditing) {
      setActiveStickerId(activeStickerId === sticker.id ? null : sticker.id);
      return;
    }

    confetti({
      particleCount: 15,
      spread: 45,
      origin: {
        x: sticker.x / 100,
        y: sticker.y / 100,
      },
      colors: ['#f472b6', '#fda4af', '#fbcfe8'],
    });
  };

  return (
    <>
      {/* Floating Placed Stickers */}
      {stickers.map((stk) => {
        const isSelected = isEditing && activeStickerId === stk.id;
        return (
          <div
            key={stk.id}
            onClick={() => handleStickerClick(stk)}
            style={{
              position: 'absolute',
              left: `${stk.x}%`,
              top: `${stk.y}%`,
              transform: `translate(-50%, -50%) rotate(${stk.rotation}deg) scale(${stk.scale})`,
              zIndex: 30,
              cursor: isEditing ? 'grab' : 'pointer',
            }}
            className={`group select-none transition-transform duration-100 ${
              isSelected ? 'ring-2 ring-pink-400 rounded-lg p-1 bg-white/40' : ''
            }`}
          >
            <span className="text-3xl sm:text-4xl filter drop-shadow-md hover:scale-115 transition-transform inline-block">
              {stk.emoji}
            </span>

            {/* Quick edit controls when sticker is selected */}
            {isSelected && isEditing && (
              <div
                className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-md border border-pink-200 p-1 flex items-center gap-1 z-40"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(e) => handleScaleSticker(stk.id, -0.2, e)}
                  className="p-1 hover:bg-pink-50 text-slate-600 rounded"
                  title="ย่อขนาด"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleScaleSticker(stk.id, 0.2, e)}
                  className="p-1 hover:bg-pink-50 text-slate-600 rounded"
                  title="ขยายขนาด"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleRotateSticker(stk.id, e)}
                  className="p-1 hover:bg-pink-50 text-pink-600 rounded"
                  title="หมุนสติกเกอร์"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleRemoveSticker(stk.id, e)}
                  className="p-1 hover:bg-red-50 text-red-500 rounded"
                  title="ลบสติกเกอร์"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Sticker Drawer Trigger in Edit Mode */}
      {isEditing && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="flex items-center gap-2 px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg font-medium text-xs sm:text-sm active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>แปะสติกเกอร์ Mimi ({stickers.length})</span>
          </button>
        </div>
      )}

      {/* Sticker Picker Modal */}
      {showPicker && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowPicker(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-pink-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-pink-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="font-semibold text-slate-800 text-sm">
                  เลือกสติกเกอร์ตกแต่ง
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-pink-50 text-slate-600 hover:bg-pink-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Sticker Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-60 overflow-y-auto p-1">
              {filteredStickers.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAddSticker(item)}
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-pink-50 border border-transparent hover:border-pink-200 transition-all hover:scale-110"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-[10px] text-slate-500 truncate mt-1 w-full text-center">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              *เมื่อแปะแล้ว สามารถแตะเพื่อย่อ ขยาย หมุน หรือลบได้ตลอดเวลา
            </p>
          </div>
        </div>
      )}
    </>
  );
};
