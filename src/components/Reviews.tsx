import React from 'react';
import { Language, FrontTexts } from '../types';

interface ReviewsProps {
  lang: Language;
  frontTexts: FrontTexts;
  isFrontEditMode?: boolean;
  onEditText?: (key: keyof FrontTexts, value: string) => void;
}

const REVIEWS_DATA = [
  {
    initials: 'SM',
    color: '#2ed9e3',
    name: 'Sarah Mitchell',
    roleEn: 'Founder · GlowSkin Co.',
    roleBn: 'প্রতিষ্ঠাতা · GlowSkin Co.',
    quoteEn: 'We replaced a $2,000 influencer package with three KINETIVO ads. The hook rate doubled and our best creative is still scaling after two months.',
    quoteBn: 'আমরা $2,000-এর ইনফ্লুয়েন্সার প্যাকেজ বদলে তিনটি KINETIVO অ্যাড নিয়েছি। হুক রেট দ্বিগুণ হয়েছে আর আমাদের সেরা ক্রিয়েটিভ এখনও দুই মাস পরেও স্কেল করছে।',
    metricEn: '4.2x ROAS in 30 days',
    metricBn: '৩০ দিনে 4.2x ROAS'
  },
  {
    initials: 'RI',
    color: '#a855f7',
    name: 'Rubina Islam Rubi',
    roleEn: 'CEO · DTF Print Bangladesh',
    roleBn: 'সিইও · ডিটিএফ প্রিন্ট বাংলাদেশ',
    quoteEn: 'They turned our boring feature list into a 40-second story people actually watch. Signups jumped the week we launched the promo.',
    quoteBn: 'ওরা আমাদের বোরিং ফিচার লিস্টকে ৪০-সেকেন্ডের এমন গল্পে বদলে দিয়েছে যা মানুষ আসলেই দেখে। প্রোমো লঞ্চের সপ্তাহেই সাইনআপ বেড়ে গেছে।',
    metricEn: '+61% trial signups',
    metricBn: '+৬১% ট্রায়াল সাইনআপ'
  },
  {
    initials: 'EL',
    color: '#c6f24e',
    name: 'Emma Larsen',
    roleEn: 'E-commerce Manager · Nordic Box',
    roleBn: 'ই-কমার্স ম্যানেজার · Nordic Box',
    quoteEn: 'The unboxing ad felt so real our customers asked which influencer made it. One video did more than six months of posting.',
    quoteBn: 'আনবক্সিং অ্যাডটা এত রিয়েল লেগেছে যে আমাদের কাস্টমাররা জিজ্ঞেস করেছে কোন ইনফ্লুয়েন্সার বানিয়েছে। একটা ভিডিওই ছয় মাসের পোস্টিংয়ের চেয়ে বেশি কাজ করেছে।',
    metricEn: '1.1M organic views',
    metricBn: '১.১M অর্গানিক ভিউ'
  },
  {
    initials: 'AO',
    color: '#ff3d9a',
    name: 'Adnan Orco',
    roleEn: 'Founder · Orokko Garments & Accessories',
    roleBn: 'প্রতিষ্ঠাতা · ওরোক্কো গার্মেন্টস অ্যান্ড অ্যাক্সেসরিজ',
    quoteEn: 'We launched in 8 markets with one concept. The lip-sync is scary good — our Spanish audience had no idea it was AI.',
    quoteBn: 'আমরা একটা কনসেপ্ট দিয়ে ৮টা মার্কেটে লঞ্চ করেছি। লিপ-সিঙ্ক এত ভালো যে আমাদের স্প্যানিশ অডিয়েন্স বুঝতেই পারেনি এটা AI।',
    metricEn: '8 languages, 1 shoot-day: zero',
    metricBn: '৮ ভাষা, শুটিং-ডে: শূন্য'
  },
  {
    initials: 'JT',
    color: '#2ed9e3',
    name: 'Jessica Tan',
    roleEn: 'Performance Marketer · FitFuel Nutrition',
    roleBn: 'পারফরম্যান্স মার্কেটার · FitFuel Nutrition',
    quoteEn: 'CAC dropped by almost two-thirds. Fast delivery, free script, zero drama. This is how all ad creative should be made.',
    quoteBn: 'CAC প্রায় দুই-তৃতীয়াংশ কমে গেছে। দ্রুত ডেলিভারি, ফ্রি স্ক্রিপ্ট, কোনো ঝামেলা নেই। সব অ্যাড ক্রিয়েটিভ এভাবেই বানানো উচিত।',
    metricEn: '-63% cost per acquisition',
    metricBn: '-৬৩% কস্ট পার অ্যাকুইজিশন'
  },
  {
    initials: 'MB',
    color: '#c6f24e',
    name: 'Marcus Bennett',
    roleEn: 'Business Coach · Coach Marcus B.',
    roleBn: 'বিজনেস কোচ · Coach Marcus B.',
    quoteEn: 'My VSL finally sounds like a seven-figure funnel. Hook, story, close — they nailed the structure and the delivery was unreal.',
    quoteBn: 'আমার VSL এখন সাত-অঙ্কের ফানেলের মতো শোনায়। হুক, স্টোরি, ক্লোজ — স্ট্রাকচারটা পারফেক্ট, ডেলিভারিও অবিশ্বাস্য।',
    metricEn: '3.1% cold-traffic conversion',
    metricBn: '৩.১% কোল্ড-ট্রাফিক কনভার্সন'
  }
];

export const Reviews: React.FC<ReviewsProps> = ({
  lang,
  frontTexts,
  isFrontEditMode,
  onEditText
}) => {
  const isBn = lang === 'bn';

  return (
    <section id="reviews" className="py-20 relative">
      <div className="max-w-[1160px] mx-auto px-5">
        {/* Header and Rating Card */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow-badge text-[#ff3d9a] border border-[#ff3d9a]/30 bg-[#ff3d9a]/10 mb-4">
              ♥ {isBn ? 'ক্লায়েন্ট লাভ' : 'CLIENT LOVE'}
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2 ${
                isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
              }`}
              contentEditable={isFrontEditMode}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isFrontEditMode && onEditText) {
                  onEditText(isBn ? 'reviewsHeadingBn' : 'reviewsHeadingEn', e.currentTarget.innerText);
                }
              }}
            >
              {isBn ? (
                <>
                  ব্র্যান্ড যারা স্ক্রলিং থামিয়ে<br />
                  <span className="text-[#ff3d9a]">সেলিং</span>{' '}
                  <span className="text-[#c6f24e]">শুরু করেছে</span>
                </>
              ) : (
                <>
                  Brands that stopped<br />
                  <span className="text-[#ff3d9a]">scrolling</span>{' '}
                  <span className="text-[#c6f24e]">&amp; started selling</span>
                </>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-3.5 border border-white/10 rounded-2xl px-6 py-4 bg-white/[0.03] self-start lg:self-auto shadow-lg">
            <div className="font-extrabold text-3xl font-['Outfit'] text-white">4.9</div>
            <div>
              <div className="text-[#c6f24e] text-sm tracking-widest leading-none mb-1">★★★★★</div>
              <div className="text-[11px] text-[#6f6f82]">
                {isBn ? '১২০+ ভেরিফাইড রিভিউ' : '120+ verified reviews'}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS_DATA.map((rev, idx) => (
            <article
              key={idx}
              className="relative border border-white/10 hover:border-[#2ed9e3]/30 rounded-2xl p-6 bg-gradient-to-b from-white/[0.035] to-white/[0.008] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <span className="absolute top-5 right-5 text-2xl font-['Outfit'] text-white/10 select-none">
                ❞
              </span>

              <div>
                <div className="text-[#c6f24e] text-xs tracking-wider mb-3">★★★★★</div>
                <p className="text-xs sm:text-sm text-[#d5d5e2] leading-relaxed mb-4">
                  "{isBn ? rev.quoteBn : rev.quoteEn}"
                </p>

                <div className="inline-block px-3 py-1 rounded-full bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] text-[11px] font-bold">
                  {isBn ? rev.metricBn : rev.metricEn}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/10">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs text-black shrink-0"
                  style={{ backgroundColor: rev.color }}
                >
                  {rev.initials}
                </span>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-white">{rev.name}</div>
                  <div className="text-[11px] text-[#6f6f82]">{isBn ? rev.roleBn : rev.roleEn}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
