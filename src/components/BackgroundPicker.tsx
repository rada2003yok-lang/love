import React, { useState } from 'react';
import { BACKGROUND_PATTERNS } from '../data/backgrounds';
import { BackgroundPattern, BackgroundCategory } from '../types';
import { Sparkles, Sliders, Image as ImageIcon, Check, Wand2 } from 'lucide-react';

interface BackgroundPickerProps {
  currentBgId: string;
  patternScale: number;
  bgOpacity: number;
  isAnimated: boolean;
  customColor?: string;
  customImage?: string;
  onSelectBackground: (id: string) => void;
  onChangeScale: (scale: number) => void;
  onChangeOpacity: (opacity: number) => void;
  onToggleAnimated: (animated: boolean) => void;
  onChangeCustomColor: (color: string) => void;
  onUploadCustomImage: (dataUrl: string) => void;
}

export const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
  currentBgId,
  patternScale,
  bgOpacity,
  isAnimated,
  customColor,
  customImage,
  onSelectBackground,
  onChangeScale,
  onChangeOpacity,
  onToggleAnimated,
  onChangeCustomColor,
  onUploadCustomImage,
}) => {
  const [selectedTab, setSelectedTab] = useState<BackgroundCategory>('all');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    { id: 'all', label: 'ทั้งหมด (24+ แบบ)' },
    { id: 'gingham', label: 'ลายสก็อตปิคนิค' },
    { id: 'hearts', label: 'หัวใจ & โบว์' },
    { id: 'retro', label: 'เรโทร 90s & Y2K' },
    { id: 'cozy', label: 'กระดาษ & อบอุ่น' },
  ];

  const filteredPatterns = selectedTab === 'all'
    ? BACKGROUND_PATTERNS
    : BACKGROUND_PATTERNS.filter(p => p.category === selectedTab);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUploadCustomImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-pink-200 shadow-sm p-4 md:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pink-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <h3 className="font-semibold text-slate-800 text-base">
              เลือกลายพื้นหลังสุดน่ารัก (Background Patterns)
            </h3>
            <span className="text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
              {BACKGROUND_PATTERNS.length} ลาย
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            สไตล์ Mimi Y2K มีทั้งลายสก็อต หัวใจ โบว์ เมฆ 90s และกระดาษคราฟท์
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center gap-1.5 text-xs text-pink-600 font-medium hover:text-pink-700 bg-pink-50/80 hover:bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-200 transition-colors w-fit"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showAdvanced ? 'ซ่อนการปรับแต่ง' : 'ปรับขนาด & เอฟเฟกต์'}</span>
        </button>
      </div>

      {/* Advanced Customizer Controls */}
      {showAdvanced && (
        <div className="bg-pink-50/60 rounded-xl p-3.5 border border-pink-100 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Pattern Scale Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>ขนาดลาย (Pattern Scale)</span>
                <span className="font-mono text-pink-600 font-medium">{Math.round(patternScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.8"
                step="0.1"
                value={patternScale}
                onChange={(e) => onChangeScale(parseFloat(e.target.value))}
                className="w-full accent-pink-500 h-1.5 bg-pink-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Pattern Opacity Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>ความโปร่งแสงลาย (Opacity)</span>
                <span className="font-mono text-pink-600 font-medium">{Math.round(bgOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={bgOpacity}
                onChange={(e) => onChangeOpacity(parseFloat(e.target.value))}
                className="w-full accent-pink-500 h-1.5 bg-pink-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Floating Animation Toggle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-600">เอฟเฟกต์ลายลอยช้าๆ</span>
              <button
                type="button"
                onClick={() => onToggleAnimated(!isAnimated)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnimated ? 'bg-pink-500' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnimated ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Upload Custom Wallpaper / Photo */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-pink-200/60 text-xs">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-pink-200 shadow-2xs font-medium">
              <ImageIcon className="w-3.5 h-3.5 text-pink-500" />
              <span>อัปโหลดรูปพื้นหลังเอง...</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {customImage && (
              <span className="text-pink-600 text-xs">✓ ใช้รูปภาพของคุณเป็นพื้นหลัง</span>
            )}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedTab(cat.id as BackgroundCategory)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedTab === cat.id
                ? 'bg-pink-500 text-white shadow-2xs'
                : 'bg-pink-50/70 text-slate-600 hover:bg-pink-100 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Pattern Grid Swatches */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-72 overflow-y-auto p-1">
        {filteredPatterns.map((pattern: BackgroundPattern) => {
          const isSelected = currentBgId === pattern.id && !customImage;
          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => onSelectBackground(pattern.id)}
              className={`group relative text-left rounded-xl p-2 border transition-all text-xs flex flex-col justify-between h-28 overflow-hidden ${
                isSelected
                  ? 'border-pink-500 ring-2 ring-pink-400 ring-offset-1 bg-white shadow-sm'
                  : 'border-pink-200/80 hover:border-pink-400 bg-white/70 hover:shadow-2xs'
              }`}
            >
              {/* Pattern Mini Swatch */}
              <div
                className="w-full h-14 rounded-lg border border-black/5 relative overflow-hidden transition-transform group-hover:scale-102"
                style={{
                  backgroundColor: pattern.fullStyle.backgroundColor,
                  backgroundImage: pattern.fullStyle.backgroundImage,
                  backgroundSize: pattern.fullStyle.backgroundSize,
                }}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-pink-500 text-white rounded-full p-0.5 shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Pattern Label & Tag */}
              <div className="mt-1.5">
                <p className="font-medium text-slate-800 text-[11px] leading-tight truncate">
                  {pattern.name}
                </p>
                <p className="text-[10px] text-pink-600 truncate mt-0.5">
                  {pattern.tag}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
