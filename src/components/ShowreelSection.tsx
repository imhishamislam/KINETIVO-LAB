import React from 'react';
import { Language, ShowreelData } from '../types';
import { Play } from 'lucide-react';

interface ShowreelSectionProps {
  lang: Language;
  showreel: ShowreelData;
  onPlayShowreel: () => void;
  onOpenBrief: () => void;
}

export const ShowreelSection: React.FC<ShowreelSectionProps> = ({
  lang,
  showreel,
  onPlayShowreel,
  onOpenBrief
}) => {
  const isBn = lang === 'bn';

  return (
    <div className="max-w-[1160px] mx-auto px-5 -mt-2 mb-16">
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0e0e16] shadow-2xl group">
        {/* Media Container with Thumbnail and Big Play Button */}
        <div className="relative aspect-[16/9.4] bg-black overflow-hidden flex items-center justify-center">
          <img
            src={showreel.thumbnail || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'}
            alt="KINETIVO LAB 2026 Showreel"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none" />

          {/* Featured Badge */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-[#ff3d9a]/20 border border-[#ff3d9a]/40 text-[#ff3d9a] text-[10px] font-extrabold tracking-[0.2em] uppercase">
            {isBn ? 'ফিচার্ড' : 'FEATURED'}
          </div>

          {/* Big Play Button */}
          <button
            onClick={onPlayShowreel}
            className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#c6f24e] text-black flex items-center justify-center shadow-[0_0_0_12px_rgba(198,242,78,0.2),0_15px_40px_rgba(198,242,78,0.6)] transform transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label="Play 2026 Showreel"
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black ml-1" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:px-6 bg-[#0e0e16] border-t border-white/10">
          <p className="text-xs sm:text-sm text-[#9a9aab] m-0">
            <strong className="text-white font-bold">
              {isBn ? showreel.titleBn : showreel.titleEn}.{' '}
            </strong>
            {isBn ? showreel.descBn : showreel.descEn}
          </p>

          <button
            onClick={onOpenBrief}
            className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-bold text-white hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none shrink-0"
          >
            {isBn ? 'এমন একটা ভিডিও চাই' : 'Get a video like this'}
          </button>
        </div>
      </div>
    </div>
  );
};
