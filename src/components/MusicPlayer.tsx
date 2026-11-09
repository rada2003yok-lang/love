import React, { useState, useEffect } from 'react';
import { romanticAudio, PRESET_TRACKS } from '../utils/audioSynthesizer';
import { Disc, Play, Pause, Volume2, VolumeX, Music, Upload } from 'lucide-react';

interface MusicPlayerProps {
  currentTrackId: string;
  customAudioUrl?: string;
  centerPhotoUrl?: string;
  onTrackChange: (trackId: string) => void;
  onCustomAudioUpload?: (dataUrl: string, fileName: string) => void;
  compact?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrackId,
  customAudioUrl,
  centerPhotoUrl,
  onTrackChange,
  onCustomAudioUpload,
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getIsPlaying());
  const [volume, setVolume] = useState(romanticAudio.getVolume());
  const [beatPulse, setBeatPulse] = useState(0);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing, beat) => {
      setIsPlaying(playing);
      setBeatPulse(beat);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    romanticAudio.toggle(currentTrackId, customAudioUrl);
  };

  const handleTrackSelect = (id: string) => {
    onTrackChange(id);
    if (isPlaying) {
      romanticAudio.play(id);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onCustomAudioUpload) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onCustomAudioUpload(reader.result, file.name);
          romanticAudio.play(undefined, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const activeTrack = PRESET_TRACKS.find(t => t.id === currentTrackId) || PRESET_TRACKS[0];

  return (
    <div className={`bg-white/95 backdrop-blur-md rounded-2xl border border-pink-200/90 shadow-sm p-3.5 transition-all ${
      compact ? 'max-w-xs' : 'w-full'
    }`}>
      <div className="flex items-center gap-3">
        {/* Spinning CD Disk with Vinyl Grooves */}
        <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20">
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 border-2 border-pink-300 shadow-md flex items-center justify-center overflow-hidden transition-transform ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
            style={{
              boxShadow: isPlaying ? '0 0 15px rgba(244, 114, 182, 0.4)' : undefined,
            }}
          >
            {/* Holographic Sheen Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-400/20 to-cyan-400/20 pointer-events-none rounded-full" />

            {/* Grooves */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-700/60 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border border-slate-700/40 flex items-center justify-center">
                {/* Center Label / Couple Photo */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-pink-100 border-2 border-pink-400 overflow-hidden flex items-center justify-center shadow-inner relative">
                  {centerPhotoUrl ? (
                    <img
                      src={centerPhotoUrl}
                      alt="Album"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-[10px]">❤️</span>
                  )}
                  {/* Center spindle hole */}
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-slate-900 border border-white/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Tonearm / Play indicator needle */}
          <div
            className={`absolute -top-1 -right-1 w-5 h-8 origin-top-right transition-transform duration-300 pointer-events-none ${
              isPlaying ? 'rotate-12' : '-rotate-12'
            }`}
          >
            <div className="w-1 h-6 bg-amber-400 rounded-full shadow-xs mx-auto" />
            <div className="w-2 h-2 rounded-full bg-pink-500 mx-auto" />
          </div>
        </div>

        {/* Track Info & Controls */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
              <Music className="w-3 h-3 text-pink-500 animate-pulse" />
              <span>{isPlaying ? 'กำลังเล่นเพลง...' : 'เครื่องเล่นเพลง Mimi'}</span>
            </span>

            {/* Audio Equalizer animation bars */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-pink-500 rounded-xs animate-bounce" style={{ height: '70%', animationDelay: '0ms' }} />
                <span className="w-1 bg-pink-400 rounded-xs animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                <span className="w-1 bg-pink-500 rounded-xs animate-bounce" style={{ height: '40%', animationDelay: '300ms' }} />
                <span className="w-1 bg-pink-300 rounded-xs animate-bounce" style={{ height: '85%', animationDelay: '200ms' }} />
              </div>
            )}
          </div>

          <p className="font-semibold text-slate-800 text-sm truncate mt-1">
            {customAudioUrl ? 'เพลงพิเศษสำหรับเราสองคน 🎶' : activeTrack.name}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {customAudioUrl ? 'Custom Audio File' : activeTrack.genre}
          </p>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-xs transition-transform active:scale-95"
              title={isPlaying ? 'หยุดเล่น' : 'เล่นเพลง'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            {/* Volume control */}
            <div className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-slate-600">
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-pink-400" />}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-14 accent-pink-500 h-1 bg-pink-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Upload audio file button */}
            {onCustomAudioUpload && (
              <label className="cursor-pointer text-xs text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-2 py-1 rounded-md border border-pink-200 transition-colors inline-flex items-center gap-1 ml-auto">
                <Upload className="w-3 h-3" />
                <span className="hidden md:inline">เปลี่ยนเพลง (MP3)</span>
                <span className="md:hidden">MP3</span>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleAudioFileUpload}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Track selector buttons */}
      {!compact && (
        <div className="mt-3 pt-2.5 border-t border-pink-100 flex flex-wrap gap-1.5">
          {PRESET_TRACKS.map((track) => {
            const isSelected = currentTrackId === track.id && !customAudioUrl;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => handleTrackSelect(track.id)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  isSelected
                    ? 'bg-pink-500 text-white shadow-2xs'
                    : 'bg-pink-50/70 text-slate-600 hover:bg-pink-100 hover:text-slate-900 border border-pink-200/60'
                }`}
              >
                {track.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
