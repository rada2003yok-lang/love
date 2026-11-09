import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MailOpen, Lock } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

interface EnvelopeOpenerProps {
  toName: string;
  fromName: string;
  envelopeColor: 'pink' | 'cream' | 'lavender' | 'mint' | 'red';
  musicTrackId: string;
  customAudioUrl?: string;
  onOpen: () => void;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({
  toName,
  fromName,
  envelopeColor,
  musicTrackId,
  customAudioUrl,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);

    // Fire romantic confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fda4af', '#fef08a', '#c084fc'],
    });

    // Start playing romantic melody immediately
    romanticAudio.play(musicTrackId, customAudioUrl);

    // Transition after flap animation
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  const colorStyles = {
    pink: {
      bg: 'bg-rose-100',
      border: 'border-pink-300',
      flap: 'bg-rose-200',
      seal: 'bg-rose-500 hover:bg-rose-600',
    },
    cream: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      flap: 'bg-amber-100',
      seal: 'bg-amber-600 hover:bg-amber-700',
    },
    lavender: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      flap: 'bg-purple-100',
      seal: 'bg-purple-500 hover:bg-purple-600',
    },
    mint: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      flap: 'bg-emerald-100',
      seal: 'bg-emerald-500 hover:bg-emerald-600',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      flap: 'bg-red-100',
      seal: 'bg-red-600 hover:bg-red-700',
    },
  }[envelopeColor] || {
    bg: 'bg-rose-100',
    border: 'border-pink-300',
    flap: 'bg-rose-200',
    seal: 'bg-rose-500 hover:bg-rose-600',
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Floating intro text */}
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-600 bg-white/90 px-3 py-1 rounded-full shadow-xs border border-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>มีข้อความพิเศษส่งถึงเธอ</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            สำหรับ {toName || 'คนพิเศษ'}
          </h1>
          <p className="text-sm text-slate-500">
            จาก {fromName || 'คนของเธอ'} 💌
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative mx-auto w-72 h-48 sm:w-80 sm:h-52 perspective-1000">
          <div
            className={`relative w-full h-full rounded-2xl shadow-xl border-2 ${colorStyles.border} ${colorStyles.bg} overflow-hidden transition-transform duration-700 ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-102'
            }`}
          >
            {/* Envelope flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 ${colorStyles.flap} border-b-2 ${colorStyles.border} origin-top transition-transform duration-500 ${
                isOpening ? '-rotate-180' : ''
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Inner folded paper peaking out */}
            <div
              className={`absolute left-6 right-6 bottom-4 h-36 bg-white rounded-t-lg shadow-sm border border-slate-200 flex flex-col items-center justify-center p-4 transition-transform duration-700 ${
                isOpening ? '-translate-y-16' : 'translate-y-2'
              }`}
            >
              <Heart className="w-6 h-6 text-pink-400 fill-pink-100 animate-pulse mb-1" />
              <p className="font-handwriting text-lg text-slate-700 font-bold">
                Mimi Love Letter
              </p>
              <p className="text-[11px] text-slate-400">
                To: {toName}
              </p>
            </div>

            {/* Envelope front fold (lower half) */}
            <div
              className={`absolute inset-x-0 bottom-0 h-32 ${colorStyles.bg} border-t ${colorStyles.border} pointer-events-none`}
              style={{
                clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)',
              }}
            />

            {/* Wax Seal / Heart Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                type="button"
                onClick={handleOpenClick}
                disabled={isOpening}
                className={`group relative flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg transition-transform duration-300 active:scale-95 ${colorStyles.seal} ${
                  isOpening ? 'scale-125 opacity-0' : 'animate-bounce'
                }`}
                title="คลิกเพื่อเปิดจดหมาย"
              >
                <div className="absolute inset-1 rounded-full border border-white/40 border-dashed" />
                <Heart className="w-8 h-8 fill-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Prompt */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleOpenClick}
            disabled={isOpening}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <MailOpen className="w-4 h-4" />
            <span>{isOpening ? 'กำลังเปิดกล่องความรัก...' : 'แตะที่นี่เพื่อเปิดอ่าน ❤️'}</span>
          </button>
          <p className="text-xs text-slate-500">
            *พร้อมเสียงเพลงรักหวานๆ สไตล์ Mimi 🎵
          </p>
        </div>
      </div>
    </div>
  );
};
