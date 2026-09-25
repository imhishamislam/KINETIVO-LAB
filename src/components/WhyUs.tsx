import React from 'react';
import { Language, FrontTexts } from '../types';
import { Zap, Globe, TrendingUp, Edit3, Check } from 'lucide-react';

interface WhyUsProps {
  lang: Language;
  frontTexts: FrontTexts;
  isFrontEditMode?: boolean;
  onEditText?: (key: keyof FrontTexts, value: string) => void;
}

const LANGUAGES_LIST = [
  'English', 'Español', 'বাংলা', 'हिन्दी', 'العربية', 'Français', 'Deutsch',
  'Português', 'Türkçe', 'اردو', 'Bahasa', '日本語', '한국어', 'Italiano',
  'Kiswahili', 'Filipino', 'ไทย', 'Tiếng Việt', 'Русский', '中文'
];

export const WhyUs: React.FC<WhyUsProps> = ({
  lang,
  frontTexts,
  isFrontEditMode,
  onEditText
}) => {
  const isBn = lang === 'bn';

  return (
    <section id="why" className="py-20 relative">
      <div className="max-w-[1160px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow-badge text-[#c6f24e] border border-[#c6f24e]/30 bg-[#c6f24e]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6f24e] shadow-[0_0_8px_#c6f24e]" />
            {isBn ? 'কেন কিনেটিভো ল্যাব' : 'Why Kinetivo Lab'}
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2 ${
              isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
            }`}
            contentEditable={isFrontEditMode}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (isFrontEditMode && onEditText) {
                onEditText(isBn ? 'whyHeadingBn' : 'whyHeadingEn', e.currentTarget.innerText);
              }
            }}
          >
            {isBn ? (
              <>
                ধীরগতির ক্রিয়েটরে<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.4px rgba(255,255,255,0.25)' }}>
                  টাকা খরচ বন্ধ করুন
                </span>
              </>
            ) : (
              <>
                Stop burning money on<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.4px rgba(255,255,255,0.25)' }}>
                  slow creators
                </span>
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
                onEditText(isBn ? 'whySubBn' : 'whySubEn', e.currentTarget.innerText);
              }
            }}
          >
            {isBn ? frontTexts.whySubBn : frontTexts.whySubEn}
          </p>
        </div>

        {/* 4 Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-5">
          <article className="border border-white/10 hover:border-[#c6f24e]/35 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-white/[0.035] to-white/[0.01] transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] flex items-center justify-center mb-5">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white font-['Outfit'] mb-2">
              {isBn ? 'অতি দ্রুত ডেলিভারি' : 'Ultra-Fast Delivery'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9aab] leading-relaxed">
              {isBn
                ? '৪৮–৭২ ঘণ্টার মধ্যে লঞ্চ-রেডি ক্রিয়েটিভ। ক্যাম্পেইন অপেক্ষা করতে না পারলে সেম-ডে রাশও আছে।'
                : 'Launch-ready creatives in 48–72 hours. Same-day rush available when your campaign can’t wait.'}
            </p>
          </article>

          <article className="border border-white/10 hover:border-[#2ed9e3]/35 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-white/[0.035] to-white/[0.01] transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#2ed9e3]/10 border border-[#2ed9e3]/30 text-[#2ed9e3] flex items-center justify-center mb-5">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white font-['Outfit'] mb-2">
              {isBn ? '২০০+ ভাষা সাপোর্ট' : '200+ Language Support'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9aab] leading-relaxed">
              {isBn
                ? 'একটা কনসেপ্ট, সব মার্কেটে। বাংলা থেকে স্প্যানিশ থেকে আরবি — নেটিভ লিপ-সিঙ্ক ও ভয়েসওভার।'
                : 'One concept, every market. Native lip-sync & voiceovers from Bangla to Spanish to Arabic.'}
            </p>
          </article>

          <article className="border border-white/10 hover:border-[#ff3d9a]/35 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-white/[0.035] to-white/[0.01] transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#ff3d9a]/10 border border-[#ff3d9a]/30 text-[#ff3d9a] flex items-center justify-center mb-5">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white font-['Outfit'] mb-2">
              {isBn ? 'হাই ROI, লো কস্ট' : 'High ROI, Low Cost'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9aab] leading-relaxed">
              {isBn
                ? 'প্রচলিত শুটিংয়ের চেয়ে ৮০% পর্যন্ত সাশ্রয়ী — কোনো অভিনেতা, স্টুডিও বা রিশুট নেই। শুধু পারফরম্যান্স।'
                : 'Up to 80% cheaper than traditional shoots — no actors, studios or reshoots. Just performance.'}
            </p>
          </article>

          <article className="border border-white/10 hover:border-[#c6f24e]/35 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-white/[0.035] to-white/[0.01] transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] flex items-center justify-center mb-5">
              <Edit3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white font-['Outfit'] mb-2">
              {isBn ? 'ফ্রি কনসেপ্ট ও স্ক্রিপ্ট' : 'Free Concept & Script'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9aab] leading-relaxed">
              {isBn
                ? 'হুক, অ্যাঙ্গেল ও পূর্ণ স্ক্রিপ্ট লিখে দেন ডিরেক্ট-রেসপন্স স্ট্র্যাটেজিস্টরা। প্রতিটি প্যাকেজে ফ্রি।'
                : 'Hooks, angles & full scripts written by direct-response strategists. Free with every package.'}
            </p>
          </article>
        </div>

        {/* Comparison Section (Table Left, Visual Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Comparison Table */}
          <div className="border border-white/10 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-white/[0.03] to-white/[0.008] flex flex-col justify-center">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] pb-3">
                    {isBn ? 'তুলনা' : 'COMPARE'}
                  </th>
                  <th className="text-center text-[10px] font-extrabold tracking-[0.16em] uppercase bg-[#c6f24e] text-black py-2 px-3 rounded-t-xl">
                    KINETIVO LAB
                  </th>
                  <th className="text-center text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] pb-3">
                    {isBn ? 'প্রচলিত পদ্ধতি' : 'TRADITIONAL'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 text-[#9a9aab]">{isBn ? 'প্রতি ভিডিও খরচ' : 'Cost per video'}</td>
                  <td className="py-3 text-center bg-[#c6f24e]/10 text-[#c6f24e] font-bold">
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {isBn ? '3700/= থেকে শুরু' : 'From $30'}
                    </span>
                  </td>
                  <td className="py-3 text-center text-[#6f6f82]">$500 – $5,000+</td>
                </tr>
                <tr>
                  <td className="py-3 text-[#9a9aab]">{isBn ? 'ডেলিভারি সময়' : 'Delivery time'}</td>
                  <td className="py-3 text-center bg-[#c6f24e]/10 text-[#c6f24e] font-bold">
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {isBn ? '৪৮–৭২ ঘণ্টা' : '48–72 hours'}
                    </span>
                  </td>
                  <td className="py-3 text-center text-[#6f6f82]">{isBn ? '২–৪ সপ্তাহ' : '2 – 4 weeks'}</td>
                </tr>
                <tr>
                  <td className="py-3 text-[#9a9aab]">{isBn ? 'রিভিশন' : 'Revisions'}</td>
                  <td className="py-3 text-center bg-[#c6f24e]/10 text-[#c6f24e] font-bold">
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {isBn ? 'দ্রুত ও ফ্লেক্সিবল' : 'Fast & flexible'}
                    </span>
                  </td>
                  <td className="py-3 text-center text-[#6f6f82]">{isBn ? 'ধীর ও ব্যয়বহুল' : 'Slow & costly'}</td>
                </tr>
                <tr>
                  <td className="py-3 text-[#9a9aab]">{isBn ? 'ভাষা' : 'Languages'}</td>
                  <td className="py-3 text-center bg-[#c6f24e]/10 text-[#c6f24e] font-bold">
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {isBn ? '২০০+ লিপ-সিঙ্কসহ' : '200+ with lip-sync'}
                    </span>
                  </td>
                  <td className="py-3 text-center text-[#6f6f82]">{isBn ? '১ অভিনেতায় ১টি' : '1 per actor'}</td>
                </tr>
                <tr>
                  <td className="py-3 text-[#9a9aab]">{isBn ? 'স্ক্রিপ্টরাইটিং' : 'Scriptwriting'}</td>
                  <td className="py-3 text-center bg-[#c6f24e]/10 text-[#c6f24e] font-bold rounded-b-xl">
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {isBn ? 'ফ্রি, ইনক্লুডেড' : 'Free, included'}
                    </span>
                  </td>
                  <td className="py-3 text-center text-[#6f6f82]">{isBn ? 'অতিরিক্ত $$$' : 'Extra $$$'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Visual Card with Glowing Light Bars & Stats */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[260px] bg-[#05050a] flex flex-col justify-end p-5">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
              alt="Performance Metrics Visual"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/60 to-transparent" />

            <div className="relative z-10 grid grid-cols-3 gap-2.5">
              <div className="border border-white/15 rounded-xl bg-[#0a0a10]/80 backdrop-blur-md p-3 text-center">
                <div className="font-extrabold text-xl sm:text-2xl font-['Outfit'] text-[#c6f24e]">
                  -63%
                </div>
                <div className="text-[10px] text-[#9a9aab] mt-1">
                  {isBn ? 'কম CAC' : 'Lower CAC'}
                </div>
              </div>

              <div className="border border-white/15 rounded-xl bg-[#0a0a10]/80 backdrop-blur-md p-3 text-center">
                <div className="font-extrabold text-xl sm:text-2xl font-['Outfit'] text-[#c6f24e]">
                  4.8x
                </div>
                <div className="text-[10px] text-[#9a9aab] mt-1">
                  {isBn ? 'গড় ROAS' : 'Avg. ROAS'}
                </div>
              </div>

              <div className="border border-white/15 rounded-xl bg-[#0a0a10]/80 backdrop-blur-md p-3 text-center">
                <div className="font-extrabold text-xl sm:text-2xl font-['Outfit'] text-[#c6f24e]">
                  +212%
                </div>
                <div className="text-[10px] text-[#9a9aab] mt-1">
                  {isBn ? 'হুক রেট' : 'Hook rate'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 200+ Languages Animated Ribbon */}
        <div className="mt-5 border border-white/10 rounded-2xl py-5 px-4 bg-white/[0.02] overflow-hidden text-center">
          <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#6f6f82] mb-3">
            {isBn
              ? 'একটি ভিডিও — ২০০+ ভাষায়, নেটিভ লিপ-সিঙ্কসহ'
              : 'ONE VIDEO — 200+ LANGUAGES WITH NATIVE LIP-SYNC'}
          </div>
          <div className="animate-marquee flex items-center gap-2.5">
            {LANGUAGES_LIST.concat(LANGUAGES_LIST).map((langName, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs text-white whitespace-nowrap"
              >
                {langName}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
