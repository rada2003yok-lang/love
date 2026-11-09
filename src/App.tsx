import React, { useState, useEffect, useMemo } from 'react';
import { LoveCardData, PlacedSticker, PhotoItem } from './types';
import { DEFAULT_LOVE_CARD, decodeCardData, saveLocalDraft, loadLocalDraft } from './utils/urlState';
import { BACKGROUND_PATTERNS } from './data/backgrounds';
import { Navbar } from './components/Navbar';
import { EnvelopeOpener } from './components/EnvelopeOpener';
import { BackgroundPicker } from './components/BackgroundPicker';
import { MusicPlayer } from './components/MusicPlayer';
import { LoveLetterCard } from './components/LoveLetterCard';
import { AnniversaryCounter } from './components/AnniversaryCounter';
import { PolaroidGallery } from './components/PolaroidGallery';
import { InteractiveSurprises } from './components/InteractiveSurprises';
import { StickerCanvas } from './components/StickerCanvas';
import { ShareModal } from './components/ShareModal';
import { Sparkles, Heart, ArrowUp, Music, Eye, Edit3, Share2, RefreshCw, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [cardData, setCardData] = useState<LoveCardData>(() => {
    // Check if card was provided in URL hash
    if (typeof window !== 'undefined' && window.location.hash) {
      const match = window.location.hash.match(/#card=([^&]+)/);
      if (match && match[1]) {
        const decoded = decodeCardData(match[1]);
        if (decoded) return decoded;
      }
    }
    return loadLocalDraft();
  });

  // Determines whether we show the initial closed envelope experience
  const [isRecipientMode, setIsRecipientMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('#card=')) {
      return true;
    }
    return false;
  });

  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(() => {
    // If not arriving from a shared link, start directly on the board
    if (typeof window !== 'undefined' && window.location.hash.includes('#card=')) {
      return false;
    }
    return true;
  });

  const [showShareModal, setShowShareModal] = useState(false);

  // Auto-save drafts to localStorage
  useEffect(() => {
    saveLocalDraft(cardData);
  }, [cardData]);

  // Find the active background pattern
  const activeBackground = useMemo(() => {
    return BACKGROUND_PATTERNS.find(b => b.id === cardData.backgroundId) || BACKGROUND_PATTERNS[0];
  }, [cardData.backgroundId]);

  // Dynamic background style calculation based on pattern, scale, and custom uploads
  const computedBgStyle = useMemo(() => {
    if (cardData.customBgImage) {
      return {
        backgroundImage: `url(${cardData.customBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }

    const baseSize = activeBackground.fullStyle.backgroundSize;
    let scaledSize = baseSize;

    // Apply scale multiplier if backgroundSize is in px
    if (baseSize.includes('px')) {
      const parts = baseSize.split(' ').map(p => {
        const num = parseFloat(p);
        return isNaN(num) ? p : `${Math.round(num * cardData.bgPatternScale)}px`;
      });
      scaledSize = parts.join(' ');
    }

    return {
      backgroundColor: cardData.customBgColor || activeBackground.fullStyle.backgroundColor,
      backgroundImage: activeBackground.fullStyle.backgroundImage,
      backgroundSize: scaledSize,
    };
  }, [activeBackground, cardData.customBgColor, cardData.customBgImage, cardData.bgPatternScale]);

  // Handlers for updating card state
  const updateCard = (partial: Partial<LoveCardData>) => {
    setCardData(prev => ({ ...prev, ...partial }));
  };

  const handleToggleViewMode = () => {
    if (!isRecipientMode) {
      // Switch to recipient view with closed envelope
      setIsRecipientMode(true);
      setHasOpenedEnvelope(false);
    } else {
      // Switch back to editor mode
      setIsRecipientMode(false);
      setHasOpenedEnvelope(true);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลเป็นการ์ดเริ่มต้นหรือไม่?')) {
      setCardData(DEFAULT_LOVE_CARD);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-900">
      {/* Background Pattern Layer */}
      <div
        className={`fixed inset-0 pointer-events-none transition-all duration-300 ${
          cardData.isBgAnimated ? 'animate-pulse' : ''
        }`}
        style={computedBgStyle}
      />

      {/* Dim/Opacity Overlay for Text Legibility */}
      <div
        className="fixed inset-0 pointer-events-none bg-white/40"
        style={{
          opacity: 1 - (cardData.bgOpacity ?? 0.95),
        }}
      />

      {/* Recipient Flow: Unopened Envelope First */}
      {isRecipientMode && !hasOpenedEnvelope ? (
        <div className="relative z-10">
          <EnvelopeOpener
            toName={cardData.toName}
            fromName={cardData.fromName}
            envelopeColor={cardData.envelopeColor}
            musicTrackId={cardData.musicTrackId}
            customAudioUrl={cardData.customAudioUrl}
            onOpen={() => setHasOpenedEnvelope(true)}
          />

          {/* Quick exit bar at bottom for previewing */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
            <button
              type="button"
              onClick={() => {
                setIsRecipientMode(false);
                setHasOpenedEnvelope(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-slate-700 text-xs font-medium rounded-full shadow-md border border-pink-200 backdrop-blur-xs transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-pink-500" />
              <span>กลับไปหน้าแก้ไขการ์ด</span>
            </button>
          </div>
        </div>
      ) : (
        /* Unfolded Love Card Board (Editor Mode or Opened Recipient View) */
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Top Bar following Top Bar Contract */}
          <Navbar
            isRecipientView={isRecipientMode}
            onToggleViewMode={handleToggleViewMode}
            onOpenShareModal={() => setShowShareModal(true)}
            toName={cardData.toName}
          />

          {/* Recipient Banner (Only shown in Recipient Mode) */}
          {isRecipientMode && (
            <div className="bg-pink-500/90 backdrop-blur-md text-white py-1.5 px-4 text-center text-xs font-medium flex items-center justify-center gap-2 shadow-2xs">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>มุมมองแฟน: แฟนจะเห็นหน้านี้พร้อมเพลงและลูกเล่นทั้งหมด ❤️</span>
              <button
                type="button"
                onClick={() => setIsRecipientMode(false)}
                className="underline hover:text-pink-100 ml-1 font-semibold"
              >
                กลับไปแก้ไข
              </button>
            </div>
          )}

          {/* Main Content Area */}
          <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
            {/* Creator Quick Banner (Only in Edit Mode) */}
            {!isRecipientMode && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-pink-200/90 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 shadow-inner">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-800">
                      สร้างเว็บบอกรักแฟน สไตล์ Mimi Y2K
                    </h2>
                    <p className="text-xs text-slate-500">
                      มีคลังลายพื้นหลังกว่า 24 แบบ เพลงหวาน สติกเกอร์ และการ์ดข้อความลับ
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href="/mimi-love-project.zip"
                    download="mimi-love-project.zip"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-700 bg-pink-100/90 hover:bg-pink-200 px-3 py-1.5 rounded-lg border border-pink-300 shadow-2xs transition-colors"
                    title="ดาวน์โหลดไฟล์โปรเจกต์ทั้งหมด (.zip) ไปอัปโหลดขึ้น GitHub"
                  >
                    <Download className="w-3.5 h-3.5 text-pink-600" />
                    <span>ดาวน์โหลดโค้ด (.ZIP)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    title="เริ่มสร้างใหม่จากค่าเริ่มต้น"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>รีเซ็ต</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowShareModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold shadow-2xs transition-transform active:scale-95"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>คัดลอกลิงก์ส่งให้แฟน</span>
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 1: BACKGROUND PICKER (The user's explicit request: มีลายพื้นหลังมากกว่านี้!) */}
            {!isRecipientMode && (
              <section id="backgrounds">
                <BackgroundPicker
                  currentBgId={cardData.backgroundId}
                  patternScale={cardData.bgPatternScale}
                  bgOpacity={cardData.bgOpacity}
                  isAnimated={cardData.isBgAnimated}
                  customColor={cardData.customBgColor}
                  customImage={cardData.customBgImage}
                  onSelectBackground={(id) => updateCard({ backgroundId: id, customBgImage: undefined })}
                  onChangeScale={(scale) => updateCard({ bgPatternScale: scale })}
                  onChangeOpacity={(opacity) => updateCard({ bgOpacity: opacity })}
                  onToggleAnimated={(animated) => updateCard({ isBgAnimated: animated })}
                  onChangeCustomColor={(color) => updateCard({ customBgColor: color })}
                  onUploadCustomImage={(dataUrl) => updateCard({ customBgImage: dataUrl })}
                />
              </section>
            )}

            {/* SECTION 2: CD MUSIC PLAYER */}
            <section id="music">
              <MusicPlayer
                currentTrackId={cardData.musicTrackId}
                customAudioUrl={cardData.customAudioUrl}
                centerPhotoUrl={cardData.photos[0]?.url}
                onTrackChange={(trackId) => updateCard({ musicTrackId: trackId, customAudioUrl: undefined })}
                onCustomAudioUpload={(dataUrl, fileName) =>
                  updateCard({ customAudioUrl: dataUrl, customAudioName: fileName })
                }
              />
            </section>

            {/* SECTION 3: ANNIVERSARY COUNTER */}
            {cardData.showAnniversary && (
              <section id="anniversary">
                <AnniversaryCounter
                  startDate={cardData.startDate}
                  anniversaryTitle={cardData.anniversaryTitle}
                  isEditing={!isRecipientMode}
                  onDateChange={(date) => updateCard({ startDate: date })}
                  onTitleChange={(title) => updateCard({ anniversaryTitle: title })}
                />
              </section>
            )}

            {/* SECTION 4: LOVE LETTER CARD */}
            <section id="letter">
              <LoveLetterCard
                toName={cardData.toName}
                fromName={cardData.fromName}
                title={cardData.title}
                letterContent={cardData.letterContent}
                isEditing={!isRecipientMode}
                onUpdateTo={(to) => updateCard({ toName: to })}
                onUpdateFrom={(from) => updateCard({ fromName: from })}
                onUpdateTitle={(title) => updateCard({ title: title })}
                onUpdateContent={(content) => updateCard({ letterContent: content })}
              />
            </section>

            {/* SECTION 5: POLAROID PHOTO MEMORIES */}
            {cardData.showPhotos && (
              <section id="photos" className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <span className="text-lg">📷</span>
                  <h3 className="font-semibold text-slate-800 text-base">
                    ภาพความทรงจำของเรา (Photo Gallery)
                  </h3>
                </div>
                <PolaroidGallery
                  photos={cardData.photos}
                  isEditing={!isRecipientMode}
                  onAddPhoto={(photo: PhotoItem) => updateCard({ photos: [...cardData.photos, photo] })}
                  onRemovePhoto={(id) =>
                    updateCard({ photos: cardData.photos.filter((p) => p.id !== id) })
                  }
                  onUpdateCaption={(id, caption) =>
                    updateCard({
                      photos: cardData.photos.map((p) => (p.id === id ? { ...p, caption } : p)),
                    })
                  }
                />
              </section>
            )}

            {/* SECTION 6: INTERACTIVE SURPRISES (Love Question, Reasons, Coupons) */}
            <section id="surprises">
              <InteractiveSurprises
                reasons={cardData.reasons}
                loveQuestion={cardData.loveQuestion}
                loveCoupons={cardData.loveCoupons}
                isEditing={!isRecipientMode}
                onUpdateReasons={(reasons) => updateCard({ reasons })}
                onUpdateQuestion={(loveQuestion) => updateCard({ loveQuestion })}
                onUpdateCoupons={(loveCoupons) => updateCard({ loveCoupons })}
              />
            </section>

            {/* Bottom Sharing Action */}
            <div className="pt-4 pb-12 text-center space-y-3">
              <button
                type="button"
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>คัดลอกลิงก์ส่งให้แฟนตอนนี้ ❤️</span>
              </button>
              <p className="text-xs text-slate-500">
                ลิงก์จะบันทึกลายพื้นหลัง รูปภาพ เพลง และข้อความทั้งหมดที่คุณตั้งค่าไว้
              </p>
            </div>
          </main>

          {/* Floating Stickers on Canvas */}
          <StickerCanvas
            stickers={cardData.stickers}
            isEditing={!isRecipientMode}
            onUpdateStickers={(stickers: PlacedSticker[]) => updateCard({ stickers })}
          />

          {/* Share Modal */}
          <ShareModal
            cardData={cardData}
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            onPreviewMode={() => {
              setIsRecipientMode(true);
              setHasOpenedEnvelope(false);
            }}
          />

          {/* Footer */}
          <footer className="mt-auto py-6 border-t border-pink-200/50 bg-white/40 text-center text-xs text-slate-500">
            <p>Mimi Love • สร้างด้วยความรักสำหรับคนพิเศษของคุณ</p>
          </footer>
        </div>
      )}
    </div>
  );
}
