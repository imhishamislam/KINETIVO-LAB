import React, { useState } from 'react';
import { Language, VideoItem, VideoCategory } from '../types';
import { Play, Eye, Search, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface OurWorkPageProps {
  lang: Language;
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onNavigateHome: () => void;
  onOpenBrief: () => void;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({
  lang,
  videos,
  onSelectVideo,
  onNavigateHome,
  onOpenBrief
}) => {
  const isBn = lang === 'bn';
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES: { id: VideoCategory; labelEn: string; labelBn: string }[] = [
    { id: 'all', labelEn: 'All', labelBn: 'সব' },
    { id: 'commercial', labelEn: 'Commercial Ads', labelBn: 'বাণিজ্যিক অ্যাড' },
    { id: 'ugc', labelEn: 'UGC Ads', labelBn: 'UGC অ্যাড' },
    { id: 'demo', labelEn: 'Product Demo', labelBn: 'প্রোডাক্ট ডেমো' },
    { id: 'saas', labelEn: 'SaaS Promo', labelBn: 'SaaS প্রোমো' },
    { id: 'unbox', labelEn: 'Unboxing', labelBn: 'আনবক্সিং' },
    { id: 'vsl', labelEn: 'VSL', labelBn: 'VSL' },
    { id: 'other', labelEn: 'Other Ads', labelBn: 'অন্যান্য অ্যাড' }
  ];

  const publishedVideos = videos.filter(v => v.status === 'published');

  const filteredVideos = publishedVideos.filter(v => {
    const matchesCat = activeCategory === 'all' || v.cat === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      v.brand.toLowerCase().includes(q) ||
      v.titleEn.toLowerCase().includes(q) ||
      v.titleBn.toLowerCase().includes(q) ||
      v.descEn.toLowerCase().includes(q) ||
      v.descBn.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const getCategoryBadgeLabel = (cat: VideoCategory) => {
    switch (cat) {
      case 'ugc': return 'UGC';
      case 'commercial': return 'COMMERCIAL';
      case 'demo': return isBn ? 'ডেমো' : 'PRODUCT DEMO';
      case 'saas': return 'SAAS';
      case 'unbox': return 'UNBOX';
      case 'vsl': return 'VSL';
      case 'other': return isBn ? 'অন্যান্য' : 'OTHER ADS';
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
      case 'other': return '#2ed9e3';
      default: return '#c6f24e';
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1160px] mx-auto px-5">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#9a9aab] hover:text-[#c6f24e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBn ? 'হোমপেজে ফিরে যান' : 'Back to Home'}</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <span className="eyebrow-badge text-[#2ed9e3] border border-[#2ed9e3]/30 bg-[#2ed9e3]/10 mb-3">
              🎬 {isBn ? 'সম্পূর্ণ কাজের লাইব্রেরি' : 'COMPLETE WORK LIBRARY'}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2">
              {isBn ? (
                <>আমাদের <span className="text-[#c6f24e]">কাজ</span></>
              ) : (
                <>Our <span className="text-[#c6f24e]">Work</span></>
              )}
            </h1>
            <p className="text-[#9a9aab] text-sm sm:text-base mt-3 max-w-xl">
              {isBn
                ? 'আমাদের সমস্ত হাই-কনভার্টিং কমার্শিয়াল ভিডিও বিজ্ঞাপন, UGC অ্যাড, ডেমো ও VSL ক্যাটাগরি অনুযায়ী এক্সপ্লোর করুন।'
                : 'Explore our complete library of high-performing video ads, AI UGC, commercial product films & VSLs.'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#6f6f82] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'ব্র্যান্ড বা শিরোনাম দিয়ে খুঁজুন...' : 'Search brand or title...'}
              className="w-full border border-white/15 rounded-full bg-white/[0.035] pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
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

        {/* Video Grid matching Watch Our Work - Video AD Showing Style.png */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-20 text-[#6f6f82] border border-dashed border-white/10 rounded-2xl">
            <p className="text-sm">{isBn ? 'কোনো ভিডিও পাওয়া যায়নি।' : 'No video ads matched your filter criteria.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

                    {/* Top-Left Badge */}
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

                  {/* Metadata */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#c6f24e]">
                        {video.brand}
                      </div>
                      <h3 className="font-bold text-[15px] sm:text-[16px] text-white font-['Outfit'] mt-1 leading-snug line-clamp-2">
                        {isBn ? video.titleBn : video.titleEn}
                      </h3>
                      <p className="text-xs text-[#9a9aab] mt-2 line-clamp-2 leading-relaxed">
                        {isBn ? video.descBn : video.descEn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/5 text-xs text-[#6f6f82]">
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

        {/* Bottom Call to Action Card */}
        <div className="mt-16 border border-white/10 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#2ed9e3]/10 via-[#a855f7]/10 to-[#c6f24e]/10 text-center">
          <h3 className="font-black text-2xl sm:text-3xl text-white font-['Outfit'] mb-3">
            {isBn ? 'পরবর্তী উইনিং অ্যাড তৈরি করতে প্রস্তুত?' : 'Ready to craft your next winning creative?'}
          </h3>
          <p className="text-sm text-[#9a9aab] max-w-lg mx-auto mb-6">
            {isBn
              ? 'আপনার পণ্যের তথ্য দিন — ১২ ঘণ্টার মধ্যে ফ্রি হুক ও স্ক্রিপ্ট নিয়ে রিপ্লাই দেব।'
              : 'Send us your product brief — we will reply within 12 hours with free hooks and scripts.'}
          </p>
          <button
            onClick={onOpenBrief}
            className="px-8 py-3.5 rounded-full bg-[#c6f24e] text-black font-bold text-sm sm:text-base hover:bg-[#d4fc62] transition-all transform hover:-translate-y-0.5 shadow-[0_10px_35px_-8px_rgba(198,242,78,0.7)]"
          >
            {isBn ? 'প্রজেক্ট শুরু করুন' : 'Start a Project'}
          </button>
        </div>
      </div>
    </div>
  );
};
