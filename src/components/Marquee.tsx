import React from 'react';
import { Language } from '../types';

interface MarqueeProps {
  lang: Language;
}

const ITEMS = [
  { bn: 'UGC ক্রিয়েটিভ', en: 'UGC Creatives', color: '#c6f24e' },
  { bn: 'VSL ফানেল', en: 'VSL Funnels', color: '#2ed9e3' },
  { bn: 'প্রোডাক্ট ডেমো', en: 'Product Demos', color: '#ff3d9a' },
  { bn: 'SaaS প্রোমো', en: 'SaaS Promos', color: '#a855f7' },
  { bn: 'ড্রপশিপিং অ্যাড', en: 'Dropshipping Ads', color: '#c6f24e' },
  { bn: 'TikTok অ্যাড', en: 'TikTok Ads', color: '#2ed9e3' },
  { bn: 'Instagram রিলস', en: 'Instagram Reels', color: '#ff3d9a' },
  { bn: 'Facebook অ্যাড', en: 'Facebook Ads', color: '#a855f7' },
  { bn: 'YouTube শর্টস', en: 'YouTube Shorts', color: '#c6f24e' },
  { bn: 'AI স্পোকসপারসন', en: 'AI Spokesperson', color: '#2ed9e3' }
];

export const Marquee: React.FC<MarqueeProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  return (
    <div className="border-y border-white/10 bg-white/[0.015] py-3.5 overflow-hidden select-none relative">
      <div className="animate-marquee flex items-center gap-0">
        {ITEMS.concat(ITEMS).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 px-6 font-['Outfit'] font-bold text-xs tracking-[0.16em] uppercase whitespace-nowrap"
            style={{ color: item.color }}
          >
            <span>{isBn ? item.bn : item.en}</span>
            <svg
              className="w-2.5 h-2.5 opacity-70 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};
