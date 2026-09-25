import React from 'react';
import { Language, FrontTexts } from '../types';
import { Check, Video, Clock, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';

interface PricingProps {
  lang: Language;
  onOpenBrief: (interest?: string) => void;
  frontTexts: FrontTexts;
  isFrontEditMode?: boolean;
  onEditText?: (key: keyof FrontTexts, value: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({
  lang,
  onOpenBrief,
  frontTexts,
  isFrontEditMode,
  onEditText
}) => {
  const isBn = lang === 'bn';

  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-[1160px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow-badge text-[#c6f24e] border border-[#c6f24e]/30 bg-[#c6f24e]/10 mb-4">
            ⭐ {isBn ? 'প্যাকেজ' : 'PACKAGES'}
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2 ${
              isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
            }`}
            contentEditable={isFrontEditMode}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (isFrontEditMode && onEditText) {
                onEditText(isBn ? 'pricingHeadingBn' : 'pricingHeadingEn', e.currentTarget.innerText);
              }
            }}
          >
            {isBn ? (
              <>
                প্রিমিয়াম অ্যাড, <span className="text-[#2ed9e3]">স্টার্টআপ-</span><br />
                <span className="text-[#c6f24e]">ফ্রেন্ডলি</span> দামে
              </>
            ) : (
              <>
                Premium ads, <span className="text-[#2ed9e3]">startup-</span><br />
                <span className="text-[#c6f24e]">friendly</span> pricing
              </>
            )}
          </h2>
          <p className="text-[#9a9aab] text-sm sm:text-base mt-4">
            {isBn
              ? 'এককালীন পেমেন্ট। কমার্শিয়াল ইউসেজ রাইটস ইনক্লুডেড। প্রতিটি প্ল্যানে ফ্রি কনসেপ্ট ও স্ক্রিপ্টরাইটিং।'
              : 'One-time payment. Commercial rights included. Free concept & scriptwriting on every plan.'}
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
          {/* 1. BASIC */}
          <article className="border border-white/10 rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-white/[0.035] to-white/[0.008] flex flex-col justify-between h-full">
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#2ed9e3] mb-2 font-['Outfit']">
                {isBn ? 'বেসিক' : 'BASIC'}
              </div>
              <div className="text-xs text-[#9a9aab] mb-5">
                {isBn ? 'একটা উইনিং ক্রিয়েটিভ টেস্ট করার জন্য পারফেক্ট।' : 'Perfect for testing one winning creative.'}
              </div>
              <div className="flex items-baseline gap-2.5 mb-6">
                <span className="font-extrabold text-4xl sm:text-5xl font-['Outfit'] text-white">$30</span>
                <span className="text-base text-[#6f6f82] line-through">$40</span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="border border-white/10 rounded-xl p-2.5 text-center bg-white/[0.03]">
                  <Video className="w-3.5 h-3.5 text-[#2ed9e3] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? '২০ সে. পর্যন্ত' : 'Up to 20s'}</div>
                </div>
                <div className="border border-white/10 rounded-xl p-2.5 text-center bg-white/[0.03]">
                  <Clock className="w-3.5 h-3.5 text-[#ff3d9a] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? '৪৮ ঘণ্টা' : '48 hrs'}</div>
                </div>
                <div className="border border-white/10 rounded-xl p-2.5 text-center bg-white/[0.03]">
                  <RotateCcw className="w-3.5 h-3.5 text-[#c6f24e] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? '১ রাউন্ড' : '1 round'}</div>
                </div>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#c9c9d8]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '১টি স্ক্রল-থামানো ভিডিও অ্যাড (২০ সে. পর্যন্ত)' : '1 scroll-stopping video ad (up to 20s)'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'ফ্রি কনসেপ্ট + স্ক্রিপ্টরাইটিং' : 'Free concept + scriptwriting'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '১টি AI স্পোকসপারসন স্টাইল' : '1 AI spokesperson style'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'ক্যাপশন + ট্রেন্ডিং সাউন্ড ডিজাইন' : 'Captions + trending sound design'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '১টি ফ্রি রিভিশন রাউন্ড' : '1 free revision round'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '9:16 / 1:1 / 16:9 ফরম্যাট ইনক্লুডেড' : '9:16 / 1:1 / 16:9 formats included'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'কমার্শিয়াল ইউসেজ রাইটস' : 'Commercial usage rights'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenBrief('basic')}
              className="w-full py-3.5 rounded-full border border-white/15 bg-white/5 text-white font-bold text-sm hover:bg-white/10 hover:border-white/30 transition-all focus:outline-none"
            >
              {isBn ? 'বেসিক দিয়ে শুরু করুন' : 'Start with Basic'}
            </button>
          </article>

          {/* 2. STANDARD (Most Popular) */}
          <article className="relative border border-[#c6f24e]/50 rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-[#c6f24e]/[0.08] to-white/[0.012] flex flex-col justify-between h-full shadow-[0_0_60px_-20px_rgba(198,242,78,0.4)] lg:-translate-y-4">
            {/* Most popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c6f24e] text-black text-[10px] font-extrabold tracking-[0.16em] uppercase flex items-center gap-1.5 shadow-md whitespace-nowrap">
              <span>⚡</span> {isBn ? 'সবচেয়ে জনপ্রিয়' : 'MOST POPULAR'}
            </div>

            <div>
              <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#c6f24e] mb-2 font-['Outfit'] mt-1">
                {isBn ? 'স্ট্যান্ডার্ড' : 'STANDARD'}
              </div>
              <div className="text-xs text-[#9a9aab] mb-5">
                {isBn ? 'আমাদের বেস্ট সেলার — টেস্ট অ্যাঙ্গেল ও স্কেল উইনার।' : 'Our best seller — test angles & scale winners.'}
              </div>
              <div className="flex items-baseline gap-2.5 mb-6">
                <span className="font-extrabold text-4xl sm:text-5xl font-['Outfit'] text-white">$60</span>
                <span className="text-base text-[#6f6f82] line-through">$80</span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="border border-[#c6f24e]/20 rounded-xl p-2.5 text-center bg-[#c6f24e]/5">
                  <Video className="w-3.5 h-3.5 text-[#2ed9e3] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? '৪০ সে. পর্যন্ত' : 'Up to 45s'}</div>
                </div>
                <div className="border border-[#c6f24e]/20 rounded-xl p-2.5 text-center bg-[#c6f24e]/5">
                  <Clock className="w-3.5 h-3.5 text-[#ff3d9a] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? '৭২ ঘণ্টা' : '72 hrs'}</div>
                </div>
                <div className="border border-[#c6f24e]/20 rounded-xl p-2.5 text-center bg-[#c6f24e]/5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#c6f24e] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? '৩ রাউন্ড' : '3 rounds'}</div>
                </div>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#c9c9d8]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '১টি ভিডিও অ্যাড (৪০ সে. পর্যন্ত) — ৩টি হুক টেস্ট' : '1 video ads (up to 40s each) — test 3 hooks'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'ফ্রি কনসেপ্ট + স্ক্রিপ্টরাইটিং' : 'Free concept + scriptwriting'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '৩টি AI স্পোকসপারসন স্টাইল' : '3 AI spokesperson styles'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'প্রোডাক্ট ডেমো / আনবক্সিং স্টাইল' : 'Product demo / unboxing style available'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'প্রিমিয়াম ক্যাপশন + সাউন্ড ডিজাইন' : 'Premium captions + sound design'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '৩টি ফ্রি রিভিশন রাউন্ড' : '3 free revision rounds'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '9:16 + 1:1 / 16:9 ফরম্যাট' : '9:16 + 1:1  / 16:9 formats'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'Spark Ads হোয়াইটলিস্টিং রেডি' : 'Spark Ads whitelisting ready'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'কমার্শিয়াল ইউসেজ রাইটস' : 'Commercial usage rights'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenBrief('standard')}
              className="w-full py-3.5 rounded-full bg-[#c6f24e] text-black font-bold text-sm hover:bg-[#d4fc62] transition-all transform hover:-translate-y-0.5 shadow-[0_10px_30px_-6px_rgba(198,242,78,0.7)] focus:outline-none"
            >
              {isBn ? 'স্ট্যান্ডার্ড দিয়ে স্কেল করুন' : 'Scale with Standard'}
            </button>
          </article>

          {/* 3. PREMIUM */}
          <article className="border border-white/10 rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-white/[0.035] to-white/[0.008] flex flex-col justify-between h-full">
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#ff3d9a] mb-2 font-['Outfit']">
                {isBn ? 'প্রিমিয়াম' : 'PREMIUM'}
              </div>
              <div className="text-xs text-[#9a9aab] mb-5">
                {isBn ? 'উচ্চ-রূপান্তরকারী বিজ্ঞাপন + ক্রিয়েটিভ প্যাক।' : 'High-converting ads + Creative pack.'}
              </div>
              <div className="flex items-baseline gap-2.5 mb-6">
                <span className="font-extrabold text-4xl sm:text-5xl font-['Outfit'] text-white">$150</span>
                <span className="text-base text-[#6f6f82] line-through">$200</span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="border border-white/10 rounded-xl p-2.5 text-center bg-white/[0.03]">
                  <Video className="w-3.5 h-3.5 text-[#2ed9e3] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? '৩ মিনিট পর্যন্ত' : 'Up to 3 min'}</div>
                </div>
                <div className="border border-white/10 rounded-xl p-2.5 text-center bg-white/[0.03]">
                  <Clock className="w-3.5 h-3.5 text-[#ff3d9a] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? '৫ দিন' : '5 days'}</div>
                </div>
                <div className="border border-white/10 rounded-xl p-2.5 text-center bg-white/[0.03]">
                  <RotateCcw className="w-3.5 h-3.5 text-[#c6f24e] mx-auto mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#d2d2de]">{isBn ? 'আনলিমিটেড*' : 'Unlimited*'}</div>
                </div>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#c9c9d8]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '২টি ভিডিও: যেকোনো ধরনের বিজ্ঞাপন (৩ মিনিট পর্যন্ত)' : '2 videos: Any type of ad (up to 3 min)'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'ফ্রি কনসেপ্ট + স্ক্রিপ্টরাইটিং' : 'Free concept + scriptwriting'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'আনলিমিটেড স্পোকসপারসন স্টাইল' : 'Unlimited spokesperson styles'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'সিনেমাটিক AI সিন ও স্টোরিটেলিং' : 'Cinematic AI scenes & storytelling'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'একাধিক দৃশ্য, বি-রোল ও গ্রাফিক্স' : 'Multiple scenes, B-roll & graphics'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? '৭ দিন আনলিমিটেড টুইক' : 'Unlimited tweaks for 7 days'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'সব ফরম্যাট + আসল প্রজেক্ট ফাইল' : 'All formats + raw project files'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'প্রায়োরিটি ২৪ ঘণ্টা রাশ' : 'Priority 24h rush available'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c6f24e] shrink-0 mt-0.5" />
                  <span>{isBn ? 'স্ট্র্যাটেজি কল + ফানেল রিভিউ' : 'Strategy call + funnel review'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenBrief('premium')}
              className="w-full py-3.5 rounded-full border border-white/15 bg-white/5 text-white font-bold text-sm hover:bg-white/10 hover:border-white/30 transition-all focus:outline-none"
            >
              {isBn ? 'প্রিমিয়াম নিন' : 'Go Premium'}
            </button>
          </article>
        </div>

        {/* Special Graphic Add-on Banner (Matches Screenshot 2026-09-25 014112.png) */}
        <div className="border border-[#ff3d9a]/30 rounded-3xl p-6 sm:p-9 bg-gradient-to-r from-[#ff3d9a]/10 via-[#a855f7]/8 to-[#c6f24e]/5 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start mb-8">
          <div>
            <div className="flex flex-wrap gap-2.5 mb-5">
              <span className="eyebrow-badge text-[#ff3d9a] border border-[#ff3d9a]/30 bg-[#ff3d9a]/10">
                ✦ {isBn ? 'এক্সট্রা প্যাকেজ' : 'EXTRA PACKAGE'}
              </span>
              <span className="eyebrow-badge text-[#c6f24e] border border-[#c6f24e]/30 bg-[#c6f24e]/10">
                🏷 {isBn ? 'দাম আলোচনাসাপেক্ষ' : 'PRICING NEGOTIABLE'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-['Outfit'] leading-tight mb-4">
              {isBn ? (
                <>
                  স্পেশাল গ্রাফিক অ্যাড-অন:{' '}
                  <span className="text-[#ff3d9a]">সোশ্যাল মিডিয়া ও ব্র্যান্ডিং</span>{' '}
                  <span className="text-[#c6f24e]">ডিজাইন প্যাকেজ</span>
                </>
              ) : (
                <>
                  Special Graphic Add-On:{' '}
                  <span className="text-[#ff3d9a]">Social Media & Branding</span>{' '}
                  <span className="text-[#c6f24e]">Design Package</span>
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-[#9a9aab] mb-6 max-w-xl leading-relaxed">
              {isBn
                ? 'কমার্শিয়াল ব্যবহারের জন্য যোগাযোগ করুন। আপনার ভিডিও অ্যাডের সাথে একটা সম্পূর্ণ ভিজ্যুয়াল আইডেন্টিটি যোগ করুন — দাম ফ্লেক্সিবল ও আপনার প্রজেক্টের সাইজ অনুযায়ী। কী লাগবে বলুন, দ্রুত কোট দিয়ে দেব।'
                : 'Contact us for commercial. Pair your video ads with a complete visual identity — pricing is flexible and tailored to your project size. Tell us what you need and we will quote it fast.'}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#c9c9d8]">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff3d9a] shrink-0 mt-0.5" />
                <span>{isBn ? 'কমার্শিয়াল লোগো ডিজাইন + মিনি ব্র্যান্ড কিট' : 'Commercial logo design + mini brand kit'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff3d9a] shrink-0 mt-0.5" />
                <span>{isBn ? 'Facebook ও TikTok ব্যানার / কভার' : 'Facebook & TikTok banners / covers'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff3d9a] shrink-0 mt-0.5" />
                <span>{isBn ? 'হাই-CTR YouTube থাম্বনেইল (৫টির প্যাক)' : 'High-CTR YouTube thumbnails (pack of 5)'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff3d9a] shrink-0 mt-0.5" />
                <span>{isBn ? 'ভাইরাল সোশ্যাল পোস্ট ও ক্যারোসেল (১০টির প্যাক)' : 'Viral social posts & carousels (pack of 10)'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff3d9a] shrink-0 mt-0.5" />
                <span>{isBn ? 'প্রোফাইল পিকচার, হাইলাইটস ও স্টোরি টেমপ্লেট' : 'Profile pictures, highlights & story templates'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff3d9a] shrink-0 mt-0.5" />
                <span>{isBn ? 'সব প্ল্যাটফর্মের জন্য অ্যাড ক্রিয়েটিভ রিসাইজিং' : 'Ad creative resizing for every platform'}</span>
              </li>
            </ul>
          </div>

          {/* Right Quote Box */}
          <div className="border border-white/15 rounded-2xl bg-[#0a0a10]/80 backdrop-blur-md p-6 text-center flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6f6f82] mb-1">
                {isBn ? 'শুরু হচ্ছে' : 'STARTING FROM'}
              </div>
              <div className="font-extrabold text-3xl sm:text-4xl font-['Outfit'] text-white my-2">
                Custom<span className="text-[#ff3d9a]">*</span>
              </div>
              <div className="text-xs text-[#9a9aab] mb-4">
                {isBn
                  ? '*দাম আলোচনাসাপেক্ষ — স্কোপের উপর নির্ভর করে। বেশিরভাগ ব্র্যান্ডিং প্যাক $39 – $199-এর মধ্যে।'
                  : '*Pricing negotiable — depends on scope. Most branding packs range $39 – $199.'}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="border border-white/10 rounded-xl p-2 bg-white/[0.03]">
                  <Clock className="w-3.5 h-3.5 text-[#ff3d9a] mx-auto mb-1" />
                  <div className="text-[10.5px] font-semibold text-[#d2d2de]">{isBn ? '৪৮–৯৬ ঘণ্টা' : '48–96 hrs'}</div>
                </div>
                <div className="border border-white/10 rounded-xl p-2 bg-white/[0.03]">
                  <RotateCcw className="w-3.5 h-3.5 text-[#c6f24e] mx-auto mb-1" />
                  <div className="text-[10.5px] font-semibold text-[#d2d2de]">{isBn ? '২ রিভিশন' : '2 revisions'}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenBrief('graphics')}
              className="w-full py-3 rounded-full bg-[#c6f24e] text-black font-bold text-xs sm:text-sm hover:bg-[#d4fc62] transition-colors focus:outline-none"
            >
              {isBn ? 'গ্রাফিক্স প্যাকেজ জানতে চাই' : 'Inquire Graphics Package'}
            </button>
            <div className="text-[10.5px] text-[#6f6f82] mt-2">
              {isBn ? 'ফ্রি কোট — ১২ ঘণ্টার মধ্যে রিপ্লাই।' : 'Free quote — reply within 12 hours.'}
            </div>
          </div>
        </div>

        {/* Quality Promise */}
        <div className="border border-white/10 rounded-2xl p-4 sm:p-5 bg-white/[0.02] flex items-start gap-3.5 max-w-3xl mx-auto text-xs sm:text-sm text-[#9a9aab]">
          <ShieldCheck className="w-5 h-5 text-[#c6f24e] shrink-0 mt-0.5" />
          <p className="m-0 leading-relaxed">
            <strong className="text-white font-bold">{isBn ? 'কোয়ালিটি প্রমিজ: ' : 'Quality promise: '}</strong>
            {isBn
              ? 'প্রতিটি প্রজেক্টে ফ্রি কনসেপ্ট + স্ক্রিপ্ট, কমার্শিয়াল ইউসেজ রাইটস ও প্ল্যাটফর্ম-রেডি ফরম্যাট (9:16, 1:1, 16:9) ইনক্লুডেড। মাসিক কনটেন্ট দরকার? রিটেইনার প্ল্যান সম্পর্কে জিজ্ঞেস করুন।'
              : 'Every project includes free concept + script, commercial usage rights & platform-ready formats (9:16, 1:1, 16:9). Need monthly content? Ask about retainer plans.'}
          </p>
        </div>
      </div>
    </section>
  );
};
