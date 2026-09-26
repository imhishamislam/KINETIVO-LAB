import React from 'react';
import { Language, SiteSettings, FrontTexts } from '../types';
import { Play, Clock, Video, TrendingUp, Globe, Zap, ArrowRight } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenWork: () => void;
  onOpenBrief: () => void;
  settings: SiteSettings;
  frontTexts: FrontTexts;
  isFrontEditMode?: boolean;
  onEditText?: (key: keyof FrontTexts, value: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenWork,
  onOpenBrief,
  settings,
  frontTexts,
  isFrontEditMode,
  onEditText
}) => {
  const isBn = lang === 'bn';

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 overflow-hidden">
      {/* Background Hero Image & Atmospheric Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {settings.heroBgImage && (
          <img
            src={settings.heroBgImage}
            alt="Hero Background"
            className="w-full h-full object-cover object-right lg:object-center opacity-35 select-none"
          />
        )}
        {/* Cinematic gradient overlays matching 1 HERO.png */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070c] via-[#07070c]/85 to-transparent lg:to-[#07070c]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070c]/90 via-transparent to-[#07070c]" />
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-tr from-[#2ed9e3]/12 via-[#a855f7]/15 to-[#ff3d9a]/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-[1160px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-8 lg:gap-12 items-start">
          <div>
            {/* Top Badges (Exact match with 1 HERO.png) */}
            <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2ed9e3]/40 bg-[#2ed9e3]/10 text-[#2ed9e3] text-[11px] sm:text-xs font-extrabold tracking-wider uppercase shadow-[0_0_15px_rgba(46,217,227,0.15)]">
                🚀 {isBn ? frontTexts.heroBadge1Bn : frontTexts.heroBadge1En}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c6f24e]/40 bg-[#c6f24e]/10 text-[#c6f24e] text-[11px] sm:text-xs font-extrabold tracking-wider uppercase shadow-[0_0_15px_rgba(198,242,78,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#c6f24e] shadow-[0_0_8px_#c6f24e] animate-pulse" />
                {isBn ? frontTexts.heroBadge2Bn : frontTexts.heroBadge2En}
              </span>
            </div>

            {/* Display Headline (Exact 100% Match with 1 HERO.png) */}
            <h1
              className={`text-4xl sm:text-6xl lg:text-[76px] font-black uppercase tracking-tight text-white font-['Outfit'] leading-[1.01] max-w-4xl ${
                isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
              }`}
              contentEditable={isFrontEditMode}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isFrontEditMode && onEditText) {
                  onEditText(isBn ? 'heroHeadingBn' : 'heroHeadingEn', e.currentTarget.innerText);
                }
              }}
            >
              {isBn ? (
                <>
                  স্ক্রল-থামানো<br />
                  <span className="text-[#2ed9e3]">ভিডিও</span> <span className="text-[#c6f24e]">বিজ্ঞাপন</span> যা<br />
                  ভিউকে বানায়<br />
                  <span className="text-[#ff3d9a]">কাস্টমার</span>
                </>
              ) : (
                <>
                  SCROLL-STOPPING<br />
                  <span className="text-[#2ed9e3]">VIDEO</span> <span className="text-[#c6f24e]">ADS</span> THAT<br />
                  TURN VIEWS INTO<br />
                  <span className="text-[#ff3d9a]">CUSTOMERS</span>
                </>
              )}
            </h1>

            {/* Hero Subtitle / Paragraph */}
            <p
              className={`text-[#9a9aab] text-sm sm:text-base mt-6 mb-8 max-w-xl leading-relaxed ${
                isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
              }`}
              contentEditable={isFrontEditMode}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isFrontEditMode && onEditText) {
                  onEditText(isBn ? 'heroParagraphBn' : 'heroParagraphEn', e.currentTarget.innerText);
                }
              }}
            >
              {isBn ? (
                <>
                  আমরা তৈরি করি হাই-কনভার্টিং ভিডিও অ্যাড, AI স্পোকসপারসন ও VSL —{' '}
                  <strong className="text-white font-bold">All Digital Platforms</strong>-এর জন্য।
                  ধীরগতির, বেশি দামি ক্রিয়েটরদের পেছনে টাকা খরচ বন্ধ করুন — হাইপার-রিয়েলিস্টিক AI UGC দিয়ে দ্রুত স্কেল করুন।
                </>
              ) : (
                <>
                  We create high-converting video ads, AI spokespersons &amp; VSLs for{' '}
                  <strong className="text-white font-bold">All Digital Platforms</strong>.
                  Stop burning money on slow, overpriced creators — scale faster with hyper-realistic AI UGC.
                </>
              )}
            </p>

            {/* CTA Buttons (Exact match with 1 HERO.png) */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenWork}
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#c6f24e] text-black font-extrabold text-sm sm:text-base hover:bg-[#d4fc62] transition-all transform hover:-translate-y-0.5 shadow-[0_10px_35px_-8px_rgba(198,242,78,0.7)] focus:outline-none cursor-pointer group"
              >
                <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
                  <Play className="w-3 h-3 fill-[#c6f24e] text-[#c6f24e] ml-0.5" />
                </span>
                <span>{isBn ? 'আমাদের কাজ দেখুন' : 'Watch Our Work'}</span>
                <ArrowRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenBrief}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/[0.04] text-white font-bold text-sm sm:text-base hover:bg-white/10 hover:border-white/35 transition-all focus:outline-none cursor-pointer"
              >
                <Clock className="w-4 h-4 text-[#c6f24e]" />
                <span>{isBn ? 'ফ্রি কনসেপ্ট ও স্ক্রিপ্ট নিন' : 'Get Free Concept & Script'}</span>
              </button>
            </div>

            {/* Social Proof Text (Exact match with 1 HERO.png) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 text-xs text-[#6f6f82]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#c6f24e] tracking-widest text-sm font-bold">★★★★★</span>
                <span className="font-extrabold text-white">4.9/5</span>
                <span>{isBn ? '১২০+ ব্র্যান্ডের রিভিউ থেকে' : 'from 120+ brands'}</span>
              </div>
              <span className="hidden sm:inline text-white/20" aria-hidden="true">·</span>
              <span>{isBn ? 'কোনো অভিনেতা নেই। কোনো স্টুডিও নেই। সপ্তাহ অপেক্ষা নেই।' : 'No actors. No studios. No waiting weeks.'}</span>
            </div>
          </div>

          {/* Right Floating Metric Column (Exact Match with 1 HERO.png) */}
          <div className="flex flex-row lg:flex-col gap-3.5 lg:pt-16 w-full lg:max-w-[260px]">
            {/* Card 1: AVG. ROAS */}
            <div className="flex-1 border border-white/15 rounded-2xl bg-[#0e0e18]/85 backdrop-blur-xl p-5 shadow-2xl">
              <div className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-[#2ed9e3]">
                {isBn ? 'গড় ROAS' : 'AVG. ROAS'}
              </div>
              <div className="font-black text-3xl sm:text-4xl font-['Outfit'] text-white mt-1">
                {settings.stats.avgRoas}
              </div>
              <div className="h-1.5 rounded-full bg-gradient-to-r from-[#c6f24e] via-[#c6f24e]/70 to-transparent mt-3" />
            </div>

            {/* Card 2: HOOK RATE */}
            <div className="flex-1 border border-white/15 rounded-2xl bg-[#0e0e18]/85 backdrop-blur-xl p-5 shadow-2xl">
              <div className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-[#ff3d9a]">
                {isBn ? 'হুক রেট' : 'HOOK RATE'}
              </div>
              <div className="font-black text-3xl sm:text-4xl font-['Outfit'] text-white mt-1">
                {settings.stats.hookRate}
              </div>
              <div className="text-[11px] text-[#6f6f82] mt-1.5 font-medium">
                {isBn ? 'প্রচলিত ক্রিয়েটর কনটেন্টের তুলনায়' : 'vs. traditional creator content'}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Primary Stats Banner (Exact Match with 1 HERO.png) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-14 sm:mt-16">
          <div className="border border-white/10 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-4 sm:p-5">
            <Video className="w-5 h-5 text-[#2ed9e3] mb-3" />
            <div className="font-black text-2xl sm:text-3xl font-['Outfit'] text-white">
              {settings.stats.brandsScaled}
            </div>
            <div className="text-xs text-[#6f6f82] mt-1">
              {isBn ? 'ব্র্যান্ড স্কেল করেছি' : 'Brands scaled'}
            </div>
          </div>

          <div className="border border-white/10 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-4 sm:p-5">
            <TrendingUp className="w-5 h-5 text-[#c6f24e] mb-3" />
            <div className="font-black text-2xl sm:text-3xl font-['Outfit'] text-white">
              {settings.stats.viewsGenerated}
            </div>
            <div className="text-xs text-[#6f6f82] mt-1">
              {isBn ? 'অ্যাড ভিউ জেনারেট' : 'Ad views generated'}
            </div>
          </div>

          <div className="border border-white/10 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-4 sm:p-5">
            <Globe className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="font-black text-2xl sm:text-3xl font-['Outfit'] text-white">
              {settings.stats.languagesSupported}
            </div>
            <div className="text-xs text-[#6f6f82] mt-1">
              {isBn ? 'ভাষা সাপোর্ট' : 'Languages supported'}
            </div>
          </div>

          <div className="border border-white/10 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-4 sm:p-5">
            <Zap className="w-5 h-5 text-[#ff3d9a] mb-3" />
            <div className="font-black text-2xl sm:text-3xl font-['Outfit'] text-white">
              {settings.stats.deliveryTime}
            </div>
            <div className="text-xs text-[#6f6f82] mt-1">
              {isBn ? 'এক্সপ্রেস ডেলিভারি' : 'Express delivery'}
            </div>
          </div>
        </div>

        {/* Scroll Indicator (Exact Match with 1 HERO.png) */}
        <div className="flex flex-col items-center gap-2 mt-12 sm:mt-14 text-[#6f6f82] text-[9px] font-bold tracking-[0.3em] uppercase">
          <span>{isBn ? 'স্ক্রল করুন' : 'SCROLL'}</span>
          <div className="w-[18px] h-[30px] rounded-full border border-white/25 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#c6f24e] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
