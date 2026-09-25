import React, { useState } from 'react';
import { Language } from '../types';
import { Plus } from 'lucide-react';

interface FaqProps {
  lang: Language;
}

const FAQ_ITEMS = [
  {
    qEn: 'How fast can I get my video ad?',
    qBn: 'কত দ্রুত আমার ভিডিও অ্যাড পাব?',
    aEn: 'Standard turnaround is 48–72 hours per video. Need it faster? Rush delivery (under 24 hours) is available on our Standard and Premium packages. For bulk monthly retainers, we assign dedicated production queues to meet your sprint deadlines.',
    aBn: 'স্ট্যান্ডার্ড ডেলিভারি প্রতি ভিডিওতে ৪৮–৭২ ঘণ্টা। আরও দ্রুত লাগবে? স্ট্যান্ডার্ড ও প্রিমিয়াম প্যাকেজে রাশ ডেলিভারি (২৪ ঘণ্টার কম) পাওয়া যায়। বাল্ক মাসিক অর্ডারে ডেডিকেটেড প্রোডাকশন স্লট থাকে।'
  },
  {
    qEn: 'Do I need to provide a script?',
    qBn: 'আমাকে কি স্ক্রিপ্ট দিতে হবে?',
    aEn: 'No. If you have an existing script, our creative strategists will audit and optimize it for scroll-stopping pattern interrupts. If you don’t, we write the entire concept, hook, and persuasive direct-response script for free.',
    aBn: 'না। স্ক্রিপ্ট থাকলে আমরা হুক ও কনভার্সনের জন্য পালিশ করে দেব। না থাকলে, আমাদের স্ট্র্যাটেজিস্টরা আপনার প্রোডাক্ট, অডিয়েন্স ও প্ল্যাটফর্ম অনুযায়ী সম্পূর্ণ কনসেপ্ট + স্ক্রিপ্ট ফ্রিতে লিখে দেবে।'
  },
  {
    qEn: 'Which languages and voices do you support?',
    qBn: 'কোন কোন ভাষা ও ভয়েস সাপোর্ট করেন?',
    aEn: 'Over 200+ languages and localized dialects with realistic lip-sync and native cadence — including English, Spanish, Bangla, Hindi, Arabic, French, German, Portuguese, and more. You choose gender, age, tone, and demographic presentation style.',
    aBn: 'নেটিভ লিপ-সিঙ্কসহ ২০০+ ভাষা ও ডায়ালেক্ট — ইংরেজি, স্প্যানিশ, বাংলা, হিন্দি, আরবি, ফরাসি, জার্মান, পর্তুগিজ ও আরও অনেক। স্পোকসপারসনের স্টাইল, বয়স, অ্যাকসেন্ট ও টোন বেছে নিতে পারবেন।'
  },
  {
    qEn: 'What formats will I receive?',
    qBn: 'আমি কোন কোন ফরম্যাট পাব?',
    aEn: 'Every project delivers platform-native files: 9:16 vertical (TikTok, Instagram Reels, YouTube Shorts), 1:1 square (Meta feed), and 16:9 widescreen (desktop, YouTube, web). High-resolution MP4s with burned-in animated captions and clean export cuts.',
    aBn: 'প্রতিটি প্রজেক্টে প্ল্যাটফর্ম-রেডি ফাইল থাকে: 9:16 (TikTok/Reels/Shorts), 1:1 (ফিড) এবং প্রিমিয়ামে 16:9 (YouTube/ওয়েবসাইট)। প্রাসঙ্গিক ক্ষেত্রে ক্যাপশন, সাউন্ড ডিজাইন ও এন্ড-কার্ড ইনক্লুডেড।'
  },
  {
    qEn: 'Do I own the videos? Can I run paid ads with them?',
    qBn: 'ভিডিওর মালিকানা কার? পেইড অ্যাড চালাতে পারব?',
    aEn: 'Yes! Full perpetual commercial rights are 100% included in every package. You can run them as paid ads on Meta, TikTok, Google, Amazon, use them for Spark Ads or organic posts, with zero ongoing royalties or creator licensing headaches.',
    aBn: 'হ্যাঁ — প্রতিটি প্যাকেজে পূর্ণ কমার্শিয়াল রাইটস ইনক্লুডেড। অর্গানিক পোস্ট, Spark Ads, হোয়াইটলিস্টেড ক্রিয়েটিভ বা যেকোনো পেইড ক্যাম্পেইনে ব্যবহার করতে পারবেন। কখনও রয়্যালটি লাগবে না।'
  },
  {
    qEn: 'What if I don’t like the first version?',
    qBn: 'প্রথম ভার্সন পছন্দ না হলে?',
    aEn: 'Every package includes free revision rounds (1 on Basic, 3 on Standard, and 7-day unlimited tweaks on Premium). We collaborate closely until the hook, visuals, and messaging align with your brand standards.',
    aBn: 'প্রতিটি প্যাকেজে ফ্রি রিভিশন আছে (বেসিকে ১, স্ট্যান্ডার্ডে ৩, প্রিমিয়ামে ৭ দিন আনলিমিটেড টুইক)। হুক, ভিজ্যুয়াল ও মেসেজ কনভার্ট না করা পর্যন্ত আমরা দ্রুত ইটারেট করতে থাকি।'
  }
];

export const Faq: React.FC<FaqProps> = ({ lang }) => {
  const isBn = lang === 'bn';
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-[700px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="eyebrow-badge text-[#2ed9e3] border border-[#2ed9e3]/30 bg-[#2ed9e3]/10 mb-4">
            ? {isBn ? 'FAQ' : 'FAQ'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2">
            {isBn ? (
              <>প্রশ্ন? <span className="text-[#2ed9e3]">উত্তর দিলাম।</span></>
            ) : (
              <>Questions? <span className="text-[#2ed9e3]">Answered.</span></>
            )}
          </h2>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-[#c6f24e]/40 bg-white/[0.045] shadow-lg'
                    : 'border-white/10 bg-white/[0.025] hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:px-6 text-left font-bold text-sm sm:text-base font-['Outfit'] text-white focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{isBn ? item.qBn : item.qEn}</span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#c6f24e] border-[#c6f24e] text-black rotate-45'
                        : 'border-white/15 bg-white/5 text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-[#9a9aab] leading-relaxed border-t border-white/5 mt-1 pt-3 animate-in fade-in duration-200">
                    {isBn ? item.aBn : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
