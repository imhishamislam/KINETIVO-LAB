import React from 'react';
import { Language, FrontTexts } from '../types';
import { Video, UserCheck, Package, Laptop, FileText, Sparkles, CheckCircle, Palette, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  lang: Language;
  onOpenBrief: (interest?: string) => void;
  frontTexts: FrontTexts;
  isFrontEditMode?: boolean;
  onEditText?: (key: keyof FrontTexts, value: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  lang,
  onOpenBrief,
  frontTexts,
  isFrontEditMode,
  onEditText
}) => {
  const isBn = lang === 'bn';

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-[1160px] mx-auto px-5">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="eyebrow-badge text-[#c6f24e] border border-[#c6f24e]/30 bg-[#c6f24e]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6f24e] shadow-[0_0_8px_#c6f24e]" />
            {isBn ? 'আমরা যা তৈরি করি' : 'What We Create'}
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2 ${
              isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
            }`}
            contentEditable={isFrontEditMode}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (isFrontEditMode && onEditText) {
                onEditText(isBn ? 'servicesHeadingBn' : 'servicesHeadingEn', e.currentTarget.innerText);
              }
            }}
          >
            {isBn ? (
              <>
                আপনার ব্র্যান্ডের জন্য দরকার<br />
                <span className="text-[#2ed9e3]">এমন সবকিছু</span>, যা<br />
                <span className="text-[#c6f24e]">ফিড দখল করবে</span>
              </>
            ) : (
              <>
                Everything your brand<br />
                needs to <span className="text-[#2ed9e3]">dominate</span> the<br />
                <span className="text-[#c6f24e]">feed</span>
              </>
            )}
          </h2>
          <p
            className={`text-[#9a9aab] text-sm sm:text-base mt-4 ${
              isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
            }`}
            contentEditable={isFrontEditMode}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (isFrontEditMode && onEditText) {
                onEditText(isBn ? 'servicesSubBn' : 'servicesSubEn', e.currentTarget.innerText);
              }
            }}
          >
            {isBn ? frontTexts.servicesSubBn : frontTexts.servicesSubEn}
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Commercial & Short Form UGC */}
          <article className="border border-white/10 hover:border-[#2ed9e3]/40 rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.012] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(46,217,227,0.4)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2ed9e3]/10 border border-[#2ed9e3]/30 text-[#2ed9e3] flex items-center justify-center mb-6">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
                {isBn ? 'বাণিজ্যিক ভিডিও বিজ্ঞাপন এবং স্বল্পদৈর্ঘ্যের UGC' : 'Commercial Video Ads & Short-Form UGC'}
              </h3>
              <p className="text-[#9a9aab] text-xs sm:text-sm leading-relaxed mb-6">
                {isBn
                  ? 'বাণিজ্যিক ভিডিও বিজ্ঞাপন এবং স্বল্পদৈর্ঘ্যের ইউজার-জেনারেটেড কন্টেন্ট UGC মনোযোগ আকর্ষণ, স্পষ্টতা এবং পদক্ষেপ গ্রহণের উদ্দেশ্যে নির্মিত টিভি-ধাঁচের পণ্যের বিজ্ঞাপন এবং স্বল্পদৈর্ঘ্যের বিজ্ঞাপন। টিভি, রিলস ও শর্টস-এর জন্য বিশেষভাবে তৈরি।'
                  : 'TV-style product commercials and short-form ads designed for attention, clarity and action. Hook-first creatives engineered for TV, Reels & Shorts — pattern interrupts, captions & CTAs included.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Commercial AD</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">TV</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">UGC</span>
            </div>
          </article>

          {/* Card 2: Realistic AI Spokesperson */}
          <article className="border border-white/10 hover:border-[#ff3d9a]/40 rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.012] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(255,61,154,0.4)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ff3d9a]/10 border border-[#ff3d9a]/30 text-[#ff3d9a] flex items-center justify-center mb-6">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
                {isBn ? 'রিয়েলিস্টিক AI স্পোকসপারসন' : 'Realistic AI Spokesperson'}
              </h3>
              <p className="text-[#9a9aab] text-xs sm:text-sm leading-relaxed mb-6">
                {isBn
                  ? 'অত্যন্ত বাস্তবসম্মত এআই উপস্থাপক, যারা দেখতে, চলাফেরা করতে এবং কথা বলতে আসল ইনফ্লুয়েন্সারদের মতোই — কাস্টমাইজড জনসংখ্যাতাত্ত্বিক গোষ্ঠী, ভাষা এবং ব্র্যান্ড শৈলী অনুযায়ী।'
                  : 'Hyper-realistic AI presenters that look, move & speak like real influencers — in custom demographics, languages and brand styles.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">AI Actors</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Lip-sync</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">200+ langs</span>
            </div>
          </article>

          {/* Card 3: Demos & Unboxings */}
          <article className="border border-white/10 hover:border-[#c6f24e]/40 rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.012] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(198,242,78,0.4)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] flex items-center justify-center mb-6">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
                {isBn ? 'ডেমো, আনবক্সিং ও টেস্টিমোনিয়াল' : 'Demos, Unboxings & Testimonials'}
              </h3>
              <p className="text-[#9a9aab] text-xs sm:text-sm leading-relaxed mb-6">
                {isBn
                  ? 'প্রোডাক্ট ডেমো, আনবক্সিং ও রিভিউ-স্টাইল ভিডিও — চেকআউটের আগে আস্থা তৈরি করে, দ্বিধা দূর করে।'
                  : 'Product demos, unboxings & review-style videos that build trust and crush objections before checkout.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">E-commerce</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">DTC</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Reviews</span>
            </div>
          </article>

          {/* Card 4: App & SaaS Promos */}
          <article className="border border-white/10 hover:border-[#2ed9e3]/40 rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.012] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(46,217,227,0.4)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2ed9e3]/10 border border-[#2ed9e3]/30 text-[#2ed9e3] flex items-center justify-center mb-6">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
                {isBn ? 'অ্যাপ ও SaaS প্রোমো ভিডিও' : 'App & SaaS Promo Videos'}
              </h3>
              <p className="text-[#9a9aab] text-xs sm:text-sm leading-relaxed mb-6">
                {isBn
                  ? 'ফিচার ওয়াকথ্রু, লঞ্চ টিজার ও এক্সপ্লেইনার অ্যাড — জটিল সফটওয়্যারকে সহজ সাইনআপে রূপান্তর করে।'
                  : 'Feature walkthroughs, launch teasers & explainer ads that turn complex software into simple signups.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">SaaS</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Apps</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Explainers</span>
            </div>
          </article>

          {/* Card 5: High-Converting VSLs */}
          <article className="border border-white/10 hover:border-[#ff3d9a]/40 rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.012] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(255,61,154,0.4)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ff3d9a]/10 border border-[#ff3d9a]/30 text-[#ff3d9a] flex items-center justify-center mb-6">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
                {isBn ? 'হাই-কনভার্টিং VSL' : 'High-Converting VSLs'}
              </h3>
              <p className="text-[#9a9aab] text-xs sm:text-sm leading-relaxed mb-6">
                {isBn
                  ? 'প্রমাণিত ডিরেক্ট-রেসপন্স স্ট্রাকচারের লং-ফর্ম ভিডিও সেলস লেটার: হুক, স্টোরি, অফার, আর্জেন্সি, ক্লোজ।'
                  : 'Long-form Video Sales Letters with proven direct-response structure: hook, story, offer, urgency, close.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Funnels</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Sales pages</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Webinars</span>
            </div>
          </article>

          {/* Card 6: Cinematic AI Concepts */}
          <article className="border border-white/10 hover:border-[#c6f24e]/40 rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.012] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(198,242,78,0.4)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] flex items-center justify-center mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
                {isBn ? 'সিনেমাটিক AI কনসেপ্ট' : 'Cinematic AI Concepts'}
              </h3>
              <p className="text-[#9a9aab] text-xs sm:text-sm leading-relaxed mb-6">
                {isBn
                  ? 'ব্র্যান্ড ফিল্ম, স্টোরিটেলিং ও ওয়ার্ল্ড-বিল্ডিং ভিজ্যুয়াল — অসম্ভব শট, শূন্য শুটিং-ডে, ফুল সিনেমা ফিল।'
                  : 'Brand films, storytelling & world-building visuals — impossible shots, zero shoot days, full cinema feel.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Brand films</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">Storytelling</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10.5px] text-[#c2c2d2]">CGI look</span>
            </div>
          </article>
        </div>

        {/* Banner Strip 1: Green Free Concept & Script */}
        <div className="mt-5 border border-[#c6f24e]/30 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#c6f24e]/10 via-[#a855f7]/10 to-[#2ed9e3]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#c6f24e]/20 border border-[#c6f24e]/40 text-[#c6f24e] flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base sm:text-lg">
                {isBn ? 'প্রতিটি অর্ডারে ফ্রি কনসেপ্ট ও স্ক্রিপ্ট রাইটিং' : 'Free concept & scriptwriting with every order'}
              </h4>
              <p className="text-xs sm:text-sm text-[#9a9aab] mt-1">
                {isBn
                  ? 'স্ক্রিপ্ট নেই? সমস্যা নেই। আমাদের স্ট্র্যাটেজিস্টরা আপনার অডিয়েন্সের জন্য স্ক্রল-থামানো হুক ও স্ক্রিপ্ট লিখে দেবে — একদম ফ্রি।'
                  : 'No script? No problem. Our strategists write scroll-stopping hooks & scripts for your audience — free.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBrief()}
            className="px-6 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs sm:text-sm hover:bg-[#d4fc62] transition-colors whitespace-nowrap shrink-0 w-full sm:w-auto"
          >
            {isBn ? 'ফ্রি কনসেপ্ট নিন' : 'Claim Free Concept'}
          </button>
        </div>

        {/* Banner Strip 2: Pink Graphics & Branding */}
        <div className="mt-4 border border-[#ff3d9a]/35 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#ff3d9a]/12 via-[#a855f7]/10 to-[#c6f24e]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#ff3d9a]/20 border border-[#ff3d9a]/40 text-[#ff3d9a] flex items-center justify-center shrink-0">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ff3d9a] mb-1">
                {isBn ? 'গ্রাফিক্স ও ব্র্যান্ডিং' : 'GRAPHICS & BRANDING'}
              </div>
              <h4 className="font-bold text-white text-base sm:text-lg">
                {isBn
                  ? 'কমার্শিয়াল লোগো ডিজাইন, Facebook/TikTok ব্যানার, YouTube থাম্বনেইল ও ভাইরাল সোশ্যাল পোস্টের জন্য যোগাযোগ করুন!'
                  : 'Contact us for commercial Logo design, Facebook/TikTok Banners, YouTube Thumbnails, and viral Social Posts!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#9a9aab] mt-1">
                {isBn
                  ? 'আপনার ব্র্যান্ড লুক সম্পূর্ণ করুন — ভিডিও অ্যাডের সাথে মিলিয়ে স্ক্রল-থামানো স্ট্যাটিক ক্রিয়েটিভ।'
                  : 'Complete your brand look — scroll-stopping static creatives designed to match your video ads.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBrief('graphics')}
            className="px-6 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs sm:text-sm hover:bg-[#d4fc62] transition-colors whitespace-nowrap shrink-0 w-full sm:w-auto"
          >
            {isBn ? 'গ্রাফিক্স প্যাকেজ জানতে চাই' : 'Inquire Graphics Package'}
          </button>
        </div>
      </div>
    </section>
  );
};
