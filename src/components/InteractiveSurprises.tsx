import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, Check, Smile, Plus, Trash2 } from 'lucide-react';

interface InteractiveSurprisesProps {
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
  isEditing?: boolean;
  onUpdateReasons?: (reasons: string[]) => void;
  onUpdateQuestion?: (q: { question: string; yesText: string; noText: string; successMessage: string }) => void;
  onUpdateCoupons?: (coupons: Array<{ id: string; title: string; description: string; redeemed: boolean }>) => void;
}

export const InteractiveSurprises: React.FC<InteractiveSurprisesProps> = ({
  reasons,
  loveQuestion,
  loveCoupons,
  isEditing = false,
  onUpdateReasons,
  onUpdateQuestion,
  onUpdateCoupons,
}) => {
  // Flip states for reasons
  const [revealedReasons, setRevealedReasons] = useState<Record<number, boolean>>({});
  // Runaway button state
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hasAgreed, setHasAgreed] = useState(false);
  const [couponsState, setCouponsState] = useState(loveCoupons);

  const toggleReason = (index: number) => {
    setRevealedReasons(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleYesClick = () => {
    setHasAgreed(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#e11d48', '#fda4af', '#fef08a'],
    });
  };

  const handleNoHover = () => {
    // Jump away playfully
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleRedeemCoupon = (couponId: string) => {
    const updated = couponsState.map(c => {
      if (c.id === couponId) {
        return { ...c, redeemed: true };
      }
      return c;
    });
    setCouponsState(updated);
    onUpdateCoupons?.(updated);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#fb7185', '#f472b6'],
    });
  };

  const handleAddReason = () => {
    if (onUpdateReasons && reasons.length < 10) {
      onUpdateReasons([...reasons, 'เพราะเธอน่ารักที่สุดในโลกสำหรับเค้า 💖']);
    }
  };

  const handleRemoveReason = (idx: number) => {
    if (onUpdateReasons) {
      onUpdateReasons(reasons.filter((_, i) => i !== idx));
    }
  };

  const handleAddCoupon = () => {
    if (onUpdateCoupons) {
      const newCoupon = {
        id: 'coupon-' + Date.now(),
        title: 'คูปองนวดหลัง 20 นาที 💆',
        description: 'นวดให้สบายตัวพร้อมเสิร์ฟน้ำเย็น',
        redeemed: false,
      };
      const updated = [...couponsState, newCoupon];
      setCouponsState(updated);
      onUpdateCoupons(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Playful "Do you love me?" Question Box */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-pink-200 shadow-sm p-5 sm:p-6 text-center space-y-4 relative overflow-hidden">
        <div className="w-12 h-12 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shadow-inner">
          <Heart className="w-6 h-6 fill-pink-500 animate-pulse" />
        </div>

        {isEditing ? (
          <div className="space-y-2 max-w-md mx-auto">
            <input
              type="text"
              value={loveQuestion.question}
              onChange={(e) => onUpdateQuestion?.({ ...loveQuestion, question: e.target.value })}
              className="font-bold text-center text-slate-800 text-lg w-full bg-pink-50/50 border border-pink-200 rounded-lg p-2"
              placeholder="คำถามน่ารักๆ เช่น เธอรักเค้ามากมั้ย?"
            />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                value={loveQuestion.yesText}
                onChange={(e) => onUpdateQuestion?.({ ...loveQuestion, yesText: e.target.value })}
                className="bg-white border border-pink-200 rounded p-1.5 text-center text-slate-700"
                placeholder="ปุ่มตกลง (Yes)"
              />
              <input
                type="text"
                value={loveQuestion.noText}
                onChange={(e) => onUpdateQuestion?.({ ...loveQuestion, noText: e.target.value })}
                className="bg-white border border-pink-200 rounded p-1.5 text-center text-slate-700"
                placeholder="ปุ่มแกล้ง (No runaway)"
              />
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              {loveQuestion.question}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              (ตอบจากใจจริงเท่านั้น ห้ามโกหกนะ! 🙈)
            </p>
          </div>
        )}

        {/* Buttons or Success State */}
        {hasAgreed ? (
          <div className="bg-pink-50 border border-pink-300 rounded-xl p-4 text-center animate-fade-in">
            <p className="text-2xl mb-1">🎉🥰💖</p>
            <p className="font-semibold text-pink-600 text-sm sm:text-base">
              {loveQuestion.successMessage}
            </p>
          </div>
        ) : (
          <div className="relative min-h-[60px] flex items-center justify-center gap-4 pt-2">
            {/* Yes button */}
            <button
              type="button"
              onClick={handleYesClick}
              className="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-transform active:scale-95"
            >
              {loveQuestion.yesText}
            </button>

            {/* Runaway No button */}
            <button
              type="button"
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onClick={handleNoHover}
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-medium border border-slate-300 shadow-2xs select-none"
            >
              {loveQuestion.noText}
            </button>
          </div>
        )}
      </div>

      {/* 2. Secret Reasons Why I Love You */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-pink-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-pink-100 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <h3 className="font-semibold text-slate-800 text-base">
              เหตุผลที่เค้ารักเธอ ({reasons.length} ข้อ)
            </h3>
          </div>
          {isEditing && (
            <button
              type="button"
              onClick={handleAddReason}
              className="text-xs text-pink-600 hover:text-pink-700 bg-pink-50 px-2.5 py-1 rounded-md border border-pink-200 inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่มเหตุผล</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reasons.map((reason, idx) => {
            const isRevealed = revealedReasons[idx];
            return (
              <div
                key={idx}
                className="relative rounded-xl border border-pink-200 p-3 bg-pink-50/40 transition-all hover:shadow-2xs"
              >
                {isEditing ? (
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-pink-500 text-xs mt-1.5">{idx + 1}.</span>
                    <textarea
                      value={reason}
                      onChange={(e) => {
                        const next = [...reasons];
                        next[idx] = e.target.value;
                        onUpdateReasons?.(next);
                      }}
                      rows={2}
                      className="w-full text-xs text-slate-700 bg-white border border-pink-200 rounded p-1.5 focus:outline-pink-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveReason(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleReason(idx)}
                    className="w-full text-left flex items-start gap-2.5"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      {isRevealed ? (
                        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed animate-fade-in">
                          {reason}
                        </p>
                      ) : (
                        <p className="text-xs text-pink-600 font-medium italic py-1 flex items-center gap-1">
                          <span>แตะเพื่อเปิดอ่านข้อความลับ ✨</span>
                        </p>
                      )}
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Love Coupons (คูปองบอกรัก) */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-pink-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-pink-100 pb-2">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-pink-500" />
            <h3 className="font-semibold text-slate-800 text-base">
              คูปองพิเศษสำหรับเธอคนเดียว (Love Coupons)
            </h3>
          </div>
          {isEditing && (
            <button
              type="button"
              onClick={handleAddCoupon}
              className="text-xs text-pink-600 hover:text-pink-700 bg-pink-50 px-2.5 py-1 rounded-md border border-pink-200 inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่มคูปอง</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {couponsState.map((coupon) => (
            <div
              key={coupon.id}
              className={`relative rounded-xl border p-3 flex flex-col justify-between transition-all ${
                coupon.redeemed
                  ? 'bg-slate-50 border-slate-200 opacity-70'
                  : 'bg-gradient-to-br from-rose-50 to-pink-50 border-pink-200 shadow-2xs hover:shadow-xs'
              }`}
            >
              {/* Perforated ticket edges */}
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-xs sm:text-sm">
                  {coupon.title}
                </p>
                <p className="text-[11px] text-slate-500">
                  {coupon.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-dashed border-pink-200">
                {coupon.redeemed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>ใช้คูปองแล้ว ❤️</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRedeemCoupon(coupon.id)}
                    className="w-full py-1 px-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-xs font-medium shadow-2xs transition-colors"
                  >
                    กดใช้คูปองนี้ ✨
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
