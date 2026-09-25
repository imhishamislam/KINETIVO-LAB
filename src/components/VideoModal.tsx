import React from 'react';
import { Language, VideoItem, ShowreelData } from '../types';
import { parseVideoUrl } from '../utils/videoParser';
import { X, ArrowUpRight } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoItem | ShowreelData | null;
  lang: Language;
  onOpenBrief: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  video,
  lang,
  onOpenBrief
}) => {
  if (!isOpen || !video) return null;

  const isBn = lang === 'bn';
  const isVideoItem = 'cat' in video;
  const brand = isVideoItem ? (video as VideoItem).brand : 'KINETIVO LAB';
  const title = isBn ? video.titleBn : video.titleEn;
  const desc = isBn ? video.descBn : video.descEn;

  const parsed = parseVideoUrl(video.videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#12121c] border border-white/15 rounded-2xl overflow-hidden shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:px-6 border-b border-white/10 bg-[#0e0e16]">
          <div>
            <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#2ed9e3]">
              {brand}
            </div>
            <h3 className="font-bold text-lg sm:text-xl text-white font-['Outfit'] mt-1">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-[#ff3d9a] hover:border-[#ff3d9a] transition-colors focus:outline-none cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-[16/10] bg-black overflow-hidden">
          {parsed.type === 'youtube' || parsed.type === 'vimeo' || parsed.type === 'iframe' ? (
            <iframe
              src={parsed.src}
              title={title}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : parsed.type === 'mp4' ? (
            <video
              src={parsed.src}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white">
              {video.thumbnail && (
                <img
                  src={video.thumbnail}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="relative z-10 max-w-md bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#c6f24e] text-black flex items-center justify-center mx-auto mb-3">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  {isBn ? 'ভিডিও প্রিভিউ' : 'High Performance Video Ad'}
                </div>
                <p className="text-xs text-[#9a9aab] mb-4">
                  {isBn
                    ? 'এই ভিডিওর জন্য অ্যাডমিন প্যানেল থেকে একটি আসল YouTube বা Vimeo লিংক যুক্ত করতে পারেন।'
                    : 'You can connect a live YouTube or Vimeo link for this video in the Admin Panel.'}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBrief();
                  }}
                  className="px-5 py-2 rounded-full bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62] transition-colors"
                >
                  {isBn ? 'এমন একটি ভিডিও চাই' : 'Order This Creative Style'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:px-6 bg-[#0e0e16] border-t border-white/10">
          <div className="flex-1 max-w-md">
            <p className="text-xs text-[#9a9aab] m-0 leading-relaxed">
              {desc || (isBn ? 'কোনো ডেসক্রিপশন যুক্ত করা হয়নি।' : 'No description provided for this video.')}
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBrief();
            }}
            className="px-5 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs sm:text-sm hover:bg-[#d4fc62] transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer shadow-md"
          >
            <span>{isBn ? 'এমন একটা চাই' : 'I want one like this'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
