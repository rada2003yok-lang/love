import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { Plus, Trash2, Camera, Image as ImageIcon } from 'lucide-react';

interface PolaroidGalleryProps {
  photos: PhotoItem[];
  isEditing?: boolean;
  onAddPhoto?: (photo: PhotoItem) => void;
  onRemovePhoto?: (id: string) => void;
  onUpdateCaption?: (id: string, caption: string) => void;
}

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({
  photos,
  isEditing = false,
  onAddPhoto,
  onRemovePhoto,
  onUpdateCaption,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAddPhoto) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newPhoto: PhotoItem = {
            id: 'photo-' + Date.now(),
            url: reader.result,
            caption: 'ความทรงจำของเรา 🤍',
            rotation: (Math.random() - 0.5) * 8,
          };
          onAddPhoto(newPhoto);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const samplePresets = [
    { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80', caption: 'จับมือไปด้วยกันนะ 🤝' },
    { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80', caption: 'ทะเลกับเธอ 🌊' },
    { url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80', caption: 'ดอกไม้ให้คนเก่ง 💐' },
  ];

  const handleAddPreset = (preset: { url: string; caption: string }) => {
    if (onAddPhoto) {
      onAddPhoto({
        id: 'photo-' + Date.now(),
        url: preset.url,
        caption: preset.caption,
        rotation: (Math.random() - 0.5) * 8,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative bg-white p-3 pb-4 rounded-xl shadow-md border border-slate-200/80 transition-all hover:scale-102 hover:shadow-lg"
            style={{
              transform: `rotate(${photo.rotation}deg)`,
            }}
          >
            {/* Washi Tape Accent */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 washi-tape rounded-xs z-10" />

            {/* Photo Container */}
            <div
              className="w-full aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer relative"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption */}
            <div className="mt-2.5 text-center">
              {isEditing ? (
                <input
                  type="text"
                  value={photo.caption}
                  onChange={(e) => onUpdateCaption?.(photo.id, e.target.value)}
                  className="font-handwriting text-sm text-center w-full text-slate-700 bg-pink-50/50 border border-pink-200 rounded px-1 py-0.5"
                  placeholder="เขียนแคปชันรูป..."
                />
              ) : (
                <p className="font-handwriting text-base text-slate-700 font-bold truncate">
                  {photo.caption}
                </p>
              )}
            </div>

            {/* Remove button during editing */}
            {isEditing && (
              <button
                type="button"
                onClick={() => onRemovePhoto?.(photo.id)}
                className="absolute top-1 right-1 bg-red-500/90 text-white p-1 rounded-full shadow-xs hover:bg-red-600 transition-colors z-20"
                title="ลบรูปนี้"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}

        {/* Add Photo Card in Edit Mode */}
        {isEditing && photos.length < 6 && (
          <div className="border-2 border-dashed border-pink-300 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 min-h-[220px] bg-white/60">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">เพิ่มรูปคู่ / ความทรงจำ</p>
              <p className="text-[11px] text-slate-500">อัปโหลดรูปภาพของคุณเอง</p>
            </div>

            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium rounded-lg shadow-xs transition-colors">
              <Plus className="w-3.5 h-3.5" />
              <span>เลือกรูปจากเครื่อง</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {/* Sample Presets */}
            <div className="pt-2 border-t border-pink-200/60 w-full">
              <p className="text-[10px] text-slate-400 mb-1">หรือเลือกรูปตัวอย่างโรแมนติก:</p>
              <div className="flex justify-center gap-1">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddPreset(preset)}
                    className="text-[10px] text-pink-600 bg-pink-50 hover:bg-pink-100 px-2 py-0.5 rounded border border-pink-200"
                  >
                    รูปคู่ {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white p-4 pb-6 rounded-2xl max-w-sm w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full aspect-square object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
            <p className="font-handwriting text-xl text-center text-slate-800 font-bold mt-4">
              {selectedPhoto.caption}
            </p>
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="mt-4 w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-medium"
            >
              ปิดรูปภาพ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
