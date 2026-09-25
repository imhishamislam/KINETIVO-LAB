import React from 'react';
import { Language, FrontTexts } from '../types';
import { Send, FileText, Target, ArrowRight } from 'lucide-react';

interface ProcessProps {
  lang: Language;
  onOpenBrief: () => void;
  frontTexts: FrontTexts;
  isFrontEditMode?: boolean;
  onEditText?: (key: keyof FrontTexts, value: string) => void;
}

export const Process: React.FC<ProcessProps> = ({
  lang,
  onOpenBrief,
  frontTexts,
  isFrontEditMode,
  onEditText
}) => {
  const isBn = lang === 'bn';

  return (
    <section id="process" className="py-20 relative">
      <div className="max-w-[1160px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow-badge text-[#2ed9e3] border border-[#2ed9e3]/30 bg-[#2ed9e3]/10 mb-4">
            ⏱ {isBn ? 'যেভাবে কাজ করি' : 'HOW IT WORKS'}
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2 ${
              isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
            }`}
            contentEditable={isFrontEditMode}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (isFrontEditMode && onEditText) {
                onEditText(isBn ? 'processHeadingBn' : 'processHeadingEn', e.currentTarget.innerText);
              }
            }}
          >
            {isBn ? (
              <>
                ব্রিফ থেকে <span className="text-[#2ed9e3]">ভাইরাল</span> <span className="text-[#c6f24e]">অ্যাড</span><br />
                মাত্র ৩ ধাপে
              </>
            ) : (
              <>
                From brief to <span className="text-[#2ed9e3]">viral</span> <span className="text-[#c6f24e]">ad</span><br />
                in 3 steps
              </>
            )}
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <article className="relative border border-white/10 rounded-2xl p-7 bg-gradient-to-b from-white/[0.035] to-white/[0.01] overflow-hidden text-center flex flex-col items-center">
            <span className="absolute top-2 right-4 font-black font-['Outfit'] text-5xl sm:text-6xl text-white/[0.06] select-none pointer-events-none">
              01
            </span>
            <div className="w-12 h-12 rounded-xl bg-[#2ed9e3]/10 border border-[#2ed9e3]/30 text-[#2ed9e3] flex items-center justify-center mb-5">
              <Send className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2ed9e3] mb-2">
              {isBn ? 'ধাপ ০১' : 'STEP 01'}
            </div>
            <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
              {isBn ? 'ডিটেইলস শেয়ার করুন' : 'Share Details'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9aab] leading-relaxed">
              {isBn
                ? 'প্রোডাক্ট বা সার্ভিস লিংক + আপনার গোল (সেল, অ্যাপ ইনস্টল, লিড) পাঠান। মাত্র ২ মিনিট লাগবে।'
                : 'Send your product or service link + your goal (sales, app installs, leads). Takes 2 minutes.'}
            </p>
          </article>

          {/* Step 2 */}
          <article className="relative border border-white/10 rounded-2xl p-7 bg-gradient-to-b from-white/[0.035] to-white/[0.01] overflow-hidden text-center flex flex-col items-center">
            <span className="absolute top-2 right-4 font-black font-['Outfit'] text-5xl sm:text-6xl text-white/[0.06] select-none pointer-events-none">
              02
            </span>
            <div className="w-12 h-12 rounded-xl bg-[#ff3d9a]/10 border border-[#ff3d9a]/30 text-[#ff3d9a] flex items-center justify-center mb-5">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ff3d9a] mb-2">
              {isBn ? 'ধাপ ০২' : 'STEP 02'}
            </div>
            <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
              {isBn ? 'স্ক্রিপ্ট দিন — অথবা আমরা লিখে দিই' : 'Provide Script — or We Write It'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9aab] leading-relaxed">
              {isBn
                ? 'স্ক্রিপ্ট আছে? দারুণ। নেই? আমাদের স্ট্র্যাটেজিস্টরা আপনার অডিয়েন্স অনুযায়ী ফ্রি হুক ও স্ক্রিপ্ট লিখে দেবে।'
                : 'Have a script? Great. Don’t? Our strategists write hooks & scripts for free, tailored to your audience.'}
            </p>
          </article>

          {/* Step 3 */}
          <article className="relative border border-white/10 rounded-2xl p-7 bg-gradient-to-b from-white/[0.035] to-white/[0.01] overflow-hidden text-center flex flex-col items-center">
            <span className="absolute top-2 right-4 font-black font-['Outfit'] text-5xl sm:text-6xl text-white/[0.06] select-none pointer-events-none">
              03
            </span>
            <div className="w-12 h-12 rounded-xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] flex items-center justify-center mb-5">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#c6f24e] mb-2">
              {isBn ? 'ধাপ ০৩' : 'STEP 03'}
            </div>
            <h3 className="font-bold text-lg text-white font-['Outfit'] mb-3">
              {isBn ? 'অডিয়েন্স নির্ধারণ করুন' : 'Define Audience'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9aab] leading-relaxed">
              {isBn
                ? 'কাদের টার্গেট করছেন বলুন — প্ল্যাটফর্ম, বয়স, পেইন পয়েন্ট। আমরা সেই অনুযায়ী স্পোকসপারসন, স্টাইল ও ভাষা মিলিয়ে দেব।'
                : 'Tell us who you’re targeting — platform, age, pain points. We match the spokesperson, style & language.'}
            </p>
          </article>
        </div>

        {/* Bottom Large CTA Button */}
        <div className="text-center mt-10">
          <button
            onClick={onOpenBrief}
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#c6f24e] text-black font-bold text-sm sm:text-base hover:bg-[#d4fc62] transition-all transform hover:-translate-y-0.5 shadow-[0_10px_35px_-8px_rgba(198,242,78,0.65)] focus:outline-none"
          >
            <span>{isBn ? 'ধাপ ১ শুরু করুন — প্রোডাক্ট লিংক পাঠান' : 'Start Step 1 — Send Your Product Link'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="text-xs text-[#6f6f82] mt-3">
            {isBn ? 'গড় রিপ্লাই টাইম: ১২ ঘণ্টার কম' : 'Average reply time: under 12 hours'}
          </div>
        </div>
      </div>
    </section>
  );
};
