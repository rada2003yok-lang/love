import React, { useState } from 'react';
import { LoveCardData } from '../types';
import { encodeCardData } from '../utils/urlState';
import { Copy, Check, Share2, Eye, ExternalLink, QrCode, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShareModalProps {
  cardData: LoveCardData;
  isOpen: boolean;
  onClose: () => void;
  onPreviewMode: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  cardData,
  isOpen,
  onClose,
  onPreviewMode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encoded = encodeCardData(cardData);
  const baseUrl = window.location.origin + window.location.pathname;
  const shareableUrl = `${baseUrl}#card=${encoded}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setCopied(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fda4af', '#fef08a'],
      });
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(
    `มีกล่องความรักพิเศษจาก ${cardData.fromName} ส่งถึง ${cardData.toName} นะครับ ❤️ เปิดอ่านได้ที่นี่: ${shareableUrl}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-pink-200 space-y-5 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
              <Heart className="w-4 h-4 fill-pink-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                ส่งกล่องความรักให้แฟน (Share to Your Love)
              </h3>
              <p className="text-xs text-slate-500">
                ส่งลิงก์นี้ให้แฟน แฟนจะเห็นซองจดหมายและเพลงรักทันที!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Link Input & Button */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            ลิงก์การ์ดบอกรักของคุณ:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="w-full text-xs bg-slate-50 border border-pink-200 rounded-xl px-3 py-2 text-slate-600 font-mono focus:outline-hidden"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-medium shadow-xs transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}</span>
            </button>
          </div>
        </div>

        {/* Direct Social Share Buttons */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700">ส่งต่อผ่านแอปพลิเคชัน:</p>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={lineShareUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>แชร์เข้า LINE</span>
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <Copy className="w-4 h-4 text-pink-500" />
              <span>คัดลอกข้อความ + ลิงก์</span>
            </button>
          </div>
        </div>

        {/* Preview Action */}
        <div className="pt-3 border-t border-pink-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            ต้องการลองดูว่าแฟนจะเห็นแบบไหน?
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onPreviewMode();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-pink-600 font-semibold hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ลองเปิดในมุมมองแฟน</span>
          </button>
        </div>
      </div>
    </div>
  );
};
