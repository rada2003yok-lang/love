import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Sparkles } from 'lucide-react';

interface AnniversaryCounterProps {
  startDate: string;
  anniversaryTitle?: string;
  isEditing?: boolean;
  onDateChange?: (date: string) => void;
  onTitleChange?: (title: string) => void;
}

export const AnniversaryCounter: React.FC<AnniversaryCounterProps> = ({
  startDate,
  anniversaryTitle = 'เราจับมือเดินทางด้วยกันมาแล้ว',
  isEditing = false,
  onDateChange,
  onTitleChange,
}) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const start = new Date(startDate);
  const diffMs = Math.max(0, now.getTime() - start.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-pink-200 shadow-sm p-4 text-center space-y-3 relative overflow-hidden">
      {/* Decorative Washi Tape on top */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-28 h-4 washi-tape-pink rounded-xs rotate-1" />

      {/* Title */}
      <div className="pt-2">
        {isEditing ? (
          <div className="space-y-1">
            <input
              type="text"
              value={anniversaryTitle}
              onChange={(e) => onTitleChange?.(e.target.value)}
              className="text-xs font-medium text-slate-700 text-center w-full bg-pink-50/50 border border-pink-200 rounded-md px-2 py-1"
              placeholder="หัวข้อวันครบรอบ"
            />
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>วันที่เริ่มคบ / รู้จักกัน:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onDateChange?.(e.target.value)}
                className="bg-white border border-pink-200 rounded px-1.5 py-0.5 text-xs text-slate-700"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-pink-600">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>{anniversaryTitle}</span>
          </div>
        )}
      </div>

      {/* Big Days Display */}
      <div className="flex items-baseline justify-center gap-2">
        <span className="font-mono text-3xl sm:text-4xl font-extrabold text-pink-500 tracking-tight tabular-nums">
          {days.toLocaleString()}
        </span>
        <span className="text-sm font-semibold text-slate-600">วัน</span>
      </div>

      {/* Sub-counters (Hours, Minutes, Seconds) */}
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto text-center pt-1 border-t border-pink-100">
        <div className="bg-pink-50/60 rounded-lg p-1.5">
          <p className="font-mono text-base font-bold text-slate-800 tabular-nums">{hours}</p>
          <p className="text-[10px] text-slate-500">ชั่วโมง</p>
        </div>
        <div className="bg-pink-50/60 rounded-lg p-1.5">
          <p className="font-mono text-base font-bold text-slate-800 tabular-nums">{minutes}</p>
          <p className="text-[10px] text-slate-500">นาที</p>
        </div>
        <div className="bg-pink-50/60 rounded-lg p-1.5">
          <p className="font-mono text-base font-bold text-pink-600 tabular-nums">{seconds}</p>
          <p className="text-[10px] text-slate-500">วินาที</p>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 italic">
        "Every second with you is a sweet memory"
      </p>
    </div>
  );
};
