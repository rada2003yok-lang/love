import React from 'react';
import { Heart, Share2, Sparkles, Edit3, Eye } from 'lucide-react';

interface NavbarProps {
  isRecipientView: boolean;
  onToggleViewMode: () => void;
  onOpenShareModal: () => void;
  toName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isRecipientView,
  onToggleViewMode,
  onOpenShareModal,
  toName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-pink-200/70 shadow-2xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="text-lg sm:text-xl font-bold tracking-tight text-pink-600 hover:text-pink-700 whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors font-thai-cute"
        >
          <span>Mimi Love</span>
          <span className="text-pink-400">♥</span>
        </a>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
          <a
            href="#letter"
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0"
          >
            จดหมายรัก
          </a>
          <a
            href="#music"
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0"
          >
            เครื่องเล่นเพลง
          </a>
          <a
            href="#photos"
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0"
          >
            ภาพความทรงจำ
          </a>
          <a
            href="#backgrounds"
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0"
          >
            คลังลายพื้นหลัง
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Mode switch for creator */}
          <button
            type="button"
            onClick={onToggleViewMode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 transition-colors whitespace-nowrap shrink-0"
          >
            {isRecipientView ? (
              <>
                <Edit3 className="w-3.5 h-3.5 text-pink-500" />
                <span>กลับไปโหมดตกแต่ง</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-pink-500" />
                <span>มุมมองแฟน</span>
              </>
            )}
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-pink-500 hover:bg-pink-600 rounded-lg shadow-2xs transition-transform active:scale-95 whitespace-nowrap shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>ส่งให้แฟน ❤️</span>
          </button>
        </div>
      </div>
    </header>
  );
};
