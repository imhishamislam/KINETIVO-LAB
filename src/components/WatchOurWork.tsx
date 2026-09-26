import React, { useState } from 'react';
import { Language, VideoItem, VideoCategory, ShowreelData } from '../types';
import { Play, Eye, Video, ArrowRight, Clock } from 'lucide-react';

interface WatchOurWorkProps {
  lang: Language;
  videos: VideoItem[];
  showreel?: ShowreelData;
  onPlayShowreel?: () => void;
  onSelectVideo: (video: VideoItem) => void;
  onOpenOurWorkPage: () => void;
  onOpenBrief: () => void;
}

export const WatchOurWork: React.FC<WatchOurWorkProps> = ({
  lang,
  videos,
  showreel,
  onPlayShowreel,
  onSelectVideo,
  onOpenOurWorkPage,
  onOpenBrief
}) => {
  const isBn = lang === 'bn';
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');

  // Categories: All -> Agency Promo -> Commercial Ads -> UGC Ads -> Product Demo -> SaaS Promo -> Unboxing -> VSL
  const CATEGORIES: { id: VideoCategory; labelEn: string; labelBn: string }[] = [
    { id: 'all', labelEn: 'All', labelBn: 'সব' },
    { id: 'agency_promo', labelEn: 'Agency Promo', labelBn: 'এজেন্সি প্রোমো' },
    { id: 'commercial', labelEn: 'Commercial Ads', labelBn: 'বাণিজ্যিক অ্যাড' },
    { id: 'ugc', labelEn: 'UGC Ads', labelBn: 'UGC অ্যাড' },
    { id: 'demo', labelEn: 'Product Demo', labelBn: 'প্রোডাক্ট ডেমো' },
    { id: 'saas', labelEn: 'SaaS Promo', labelBn: 'SaaS প্রোমো' },
    { id: 'unbox', labelEn: 'Unboxing', labelBn: 'আনবক্সিং' },
    { id: 'vsl', labelEn: 'VSL', labelBn: 'VSL' }
  ];

  const publishedVideos = videos.filter(v => v.status === 'published');

  // Featured videos selected by the admin (tagged with isFeatured === true)
  // For the 'ALL' category on the front page, sort strictly by custom serial order (1, 2, 3, 4, 5, 6)
  const featuredPublishedVideos = publishedVideos
    .filter(v => v.isFeatured)
    .sort((a, b) => {
      const orderA = a.featuredOrder !== undefined && a.featuredOrder !== null ? a.featuredOrder : 999;
      const orderB = b.featuredOrder !== undefined && b.featuredOrder !== null ? b.featuredOrder : 999;
      return orderA - orderB;
    });

  // If the admin has chosen featured videos, use them; if less than 6 or none yet, fall back gracefully
  const displayPool = featuredPublishedVideos.length > 0 
    ? featuredPublishedVideos 
    : publishedVideos;

  // In ALL category, display exactly the top 6 featured in ordered sequence (1, 2, 3, 4, 5, 6)
  // In specific categories, show videos for that category in their natural order as before
  const filteredVideos = activeCategory === 'all'
    ? displayPool.slice(0, 6)
    : publishedVideos.filter(v => v.cat === activeCategory || (activeCategory === 'agency_promo' && v.cat === ('other' as VideoCategory))).slice(0, 6);

  const getCategoryBadgeLabel = (cat: VideoCategory) => {
    switch (cat) {
      case 'ugc': return 'UGC';
      case 'commercial': return 'COMMERCIAL';
      case 'demo': return isBn ? 'ডেমো' : 'PRODUCT DEMO';
      case 'saas': return 'SAAS';
      case 'unbox': return 'UNBOX';
      case 'vsl': return 'VSL';
      case 'agency_promo': return isBn ? 'এজেন্সি প্রোমো' : 'AGENCY PROMO';
      case 'other': return isBn ? 'এজেন্সি প্রোমো' : 'AGENCY PROMO';
      default: return 'AD';
    }
  };

  const getCategoryColor = (cat: VideoCategory, fallback?: string) => {
    if (fallback) return fallback;
    switch (cat) {
      case 'ugc': return '#c6f24e';
      case 'commercial': return '#ff3d9a';
      case 'demo': return '#ff3d9a';
      case 'saas': return '#a855f7';
      case 'unbox': return '#c6f24e';
      case 'vsl': return '#2ed9e3';
      case 'agency_promo': return '#c6f24e';
      case 'other': return '#c6f24e';
      default: return '#c6f24e';
    }
  };

  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-[1160px] mx-auto px-5">
        {/* Top Header & Stat */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="eyebrow-badge text-[#ff3d9a] border border-[#ff3d9a]/30 bg-[#ff3d9a]/10 mb-4">
              🎬 {isBn ? 'আমাদের কাজ দেখুন' : 'Watch Our Work'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2">
              {isBn ? (
                <>
                  আসল অ্যাড। আসল হুক।<br />
                  <span className="text-[#ff3d9a]">আসল</span>{' '}
                  <span className="bg-gradient-to-r from-[#ff3d9a] to-[#a855f7] bg-clip-text text-transparent">
                    রেভিনিউ।
                  </span>
                </>
              ) : (
                <>
                  Real ads. Real hooks.<br />
                  <span className="text-[#ff3d9a]">Real</span>{' '}
                  <span className="bg-gradient-to-r from-[#ff3d9a] to-[#a855f7] bg-clip-text text-transparent">
                    revenue.
                  </span>
                </>
              )}
            </h2>
            <p className="text-[#9a9aab] text-sm sm:text-base mt-4 max-w-xl">
              {isBn
                ? 'প্লে করুন — নিচের প্রতিটি ক্রিয়েটিভ বানানো হয়েছে স্ক্রল থামাতে ও সেল করাতে। পরেরটা হতে পারে আপনারই।'
                : 'Press play — every creative below was crafted to stop the scroll and sell. Yours could be next.'}
            </p>
          </div>

          <div className="flex items-center gap-3.5 border border-white/10 rounded-2xl px-5 py-3.5 bg-white/[0.03] shrink-0 self-start lg:self-auto">
            <Eye className="w-5 h-5 text-[#ff3d9a]" />
            <div>
              <div className="font-extrabold text-xl font-['Outfit'] text-white">
                2.4M+ <span className="text-sm font-medium text-[#9a9aab]">{isBn ? 'ভিউ' : 'views'}</span>
              </div>
              <div className="text-[11px] text-[#6f6f82]">
                {isBn ? '২০২৬ সালে ক্লায়েন্টদের জন্য জেনারেট করা' : 'generated for clients in 2026'}
              </div>
            </div>
          </div>
        </div>

        {/* Featured 2026 Showreel Container */}
        {showreel && (
          <div className="mb-12 border border-white/10 rounded-2xl overflow-hidden bg-[#0e0e16] shadow-2xl group">
            <div className="relative aspect-[16/9.2] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={showreel.thumbnail || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'}
                alt="KINETIVO LAB 2026 Showreel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none" />

              <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-[#ff3d9a]/20 border border-[#ff3d9a]/40 text-[#ff3d9a] text-[10px] font-extrabold tracking-[0.2em] uppercase">
                {isBn ? 'ফিচার্ড শো-রিল' : 'FEATURED SHOWREEL'}
              </div>

              {onPlayShowreel && (
                <button
                  onClick={onPlayShowreel}
                  className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#c6f24e] text-black flex items-center justify-center shadow-[0_0_0_12px_rgba(198,242,78,0.2),0_15px_40px_rgba(198,242,78,0.6)] transform transition-transform duration-200 hover:scale-110 focus:outline-none cursor-pointer"
                  aria-label="Play 2026 Showreel"
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black ml-1" />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:px-6 bg-[#0e0e16] border-t border-white/10">
              <p className="text-xs sm:text-sm text-[#9a9aab] m-0">
                <strong className="text-white font-bold">
                  {isBn ? showreel.titleBn : showreel.titleEn}.{' '}
                </strong>
                {isBn ? showreel.descBn : showreel.descEn}
              </p>

              <button
                onClick={onOpenBrief}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-bold text-white hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none shrink-0 cursor-pointer"
              >
                {isBn ? 'ফ্রি কনসেপ্ট নিন' : 'Get Free Concept'}
              </button>
            </div>
          </div>
        )}

        {/* Filter Tabs (Exact match with reference screenshots) */}
        <div className="flex flex-wrap items-center gap-2 mb-9">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all focus:outline-none ${
                activeCategory === category.id
                  ? 'bg-[#c6f24e] text-black border border-[#c6f24e] shadow-[0_8px_25px_-8px_rgba(198,242,78,0.7)]'
                  : 'bg-white/[0.035] text-[#c4c4d4] border border-white/10 hover:border-[#c6f24e]/40 hover:text-white'
              }`}
            >
              {isBn ? category.labelBn : category.labelEn}
            </button>
          ))}
        </div>

        {/* Video Ads Grid (Matches Watch Our Work - Video AD Showing Style.png exactly) */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 text-[#6f6f82] border border-dashed border-white/10 rounded-2xl text-sm">
            {isBn ? 'এই ক্যাটাগরিতে এখনও কোনো ভিডিও নেই।' : 'No video ads in this category yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredVideos.map(video => {
              const badgeColor = getCategoryColor(video.cat, video.badgeColor);

              return (
                <article
                  key={video.id}
                  onClick={() => onSelectVideo(video)}
                  className="group relative border border-white/10 hover:border-[#c6f24e]/50 rounded-2xl overflow-hidden bg-[#0e0e16] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-20px_rgba(198,242,78,0.4)] text-left flex flex-col"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[4/3.8] overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={video.thumbnail}
                      alt={isBn ? video.titleBn : video.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Top-Left Category Badge */}
                    <span
                      className="absolute top-3 left-3 z-10 text-[9.5px] font-extrabold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10"
                      style={{ color: badgeColor }}
                    >
                      {getCategoryBadgeLabel(video.cat)}
                    </span>

                    {/* Top-Right Duration Pill */}
                    <span className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[10.5px] font-semibold text-white px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{video.duration}</span>
                    </span>

                    {/* Hover Play Button */}
                    <div className="absolute z-20 w-13 h-13 rounded-full bg-[#c6f24e] text-black flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_0_0_10px_rgba(198,242,78,0.2)]">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Card Metadata (Exact format from Watch Our Work - Video AD Showing Style.png) */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#c6f24e]">
                        {video.brand}
                      </div>
                      <h3 className="font-bold text-[15px] sm:text-[16px] text-white font-['Outfit'] mt-1 leading-snug line-clamp-2">
                        {isBn ? video.titleBn : video.titleEn}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-xs text-[#6f6f82]">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{video.views} {isBn ? 'ভিউ' : 'views'}</span>
                      </span>

                      <span className="font-bold text-white group-hover:text-[#c6f24e] transition-colors flex items-center gap-1 text-xs">
                        <span>{isBn ? 'অ্যাড দেখুন' : 'Watch Ad'}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Glowing More Work Button (Exact match with Watch Our Work - Video AD Showing Style.png) */}
        <div className="flex flex-col items-center justify-center text-center mt-14">
          <div className="more-work-glow-btn">
            <button
              onClick={onOpenOurWorkPage}
              className="more-work-inner focus:outline-none"
            >
              <Video className="w-4 h-4 text-[#2ed9e3]" />
              <span>{isBn ? 'আরও কাজ দেখুন' : 'More Work'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          <p className="text-xs text-[#6f6f82] mt-3 max-w-md">
            {isBn
              ? 'আমাদের সম্পূর্ণ হাই-পারফর্মিং ভিডিও লাইব্রেরি দেখুন'
              : 'Explore our complete library of high-performing video creatives'}
          </p>
        </div>
      </div>
    </section>
  );
};
