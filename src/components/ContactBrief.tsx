import React, { useState } from 'react';
import { Language, FrontTexts, SiteSettings } from '../types';
import { Edit3, Clock, Shield, Mail, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactBriefProps {
  lang: Language;
  settings: SiteSettings;
  frontTexts: FrontTexts;
  isFrontEditMode?: boolean;
  onEditText?: (key: keyof FrontTexts, value: string) => void;
}

export const ContactBrief: React.FC<ContactBriefProps> = ({
  lang,
  settings,
  frontTexts,
  isFrontEditMode,
  onEditText
}) => {
  const isBn = lang === 'bn';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    link: '',
    interest: 'standard',
    budget: '',
    goal: ''
  });

  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({
        type: 'error',
        message: isBn
          ? 'অনুগ্রহ করে আপনার নাম এবং একটি বৈধ ইমেইল ঠিকানা দিন।'
          : 'Please enter your name and a valid email address.'
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus({
        type: 'error',
        message: isBn
          ? 'সঠিক ইমেইল ঠিকানা প্রদান করুন।'
          : 'Please enter a valid email address format.'
      });
      return;
    }

    // Success response
    setStatus({
      type: 'success',
      message: isBn
        ? `ধন্যবাদ ${formData.name.split(' ')[0]}! আপনার ব্রিফ গ্রহণ করা হয়েছে। ${formData.email}-এ ১২ ঘণ্টার মধ্যে ফ্রি স্ক্রিপ্ট ও হুক আইডিয়া পাঠানো হবে।`
        : `Thank you ${formData.name.split(' ')[0]}! Brief received. We will reply to ${formData.email} within 12 hours with your free hook + script concept.`
    });

    setFormData({
      name: '',
      email: '',
      brand: '',
      link: '',
      interest: 'standard',
      budget: '',
      goal: ''
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          {/* Left Column: Proposition & Perks */}
          <div>
            <span className="eyebrow-badge text-[#c6f24e] border border-[#c6f24e]/30 bg-[#c6f24e]/10 mb-4">
              ✈ {isBn ? 'কথা বলি' : "LET'S TALK"}
            </span>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2 ${
                isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
              }`}
              contentEditable={isFrontEditMode}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isFrontEditMode && onEditText) {
                  onEditText(isBn ? 'contactHeadingBn' : 'contactHeadingEn', e.currentTarget.innerText);
                }
              }}
            >
              {isBn ? (
                <>
                  আপনার ব্র্যান্ডকে<br />
                  বানাতে চান<br />
                  <span className="text-[#2ed9e3]">অপ্রতিরোধ্য?</span>
                </>
              ) : (
                <>
                  Ready to make<br />
                  your brand<br />
                  <span className="text-[#2ed9e3]">unmissable?</span>
                </>
              )}
            </h2>

            <p
              className={`text-[#9a9aab] text-sm sm:text-base mt-4 mb-8 leading-relaxed max-w-lg ${
                isFrontEditMode ? 'ring-2 ring-dashed ring-amber-400 p-2 rounded-xl cursor-text' : ''
              }`}
              contentEditable={isFrontEditMode}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isFrontEditMode && onEditText) {
                  onEditText(isBn ? 'contactSubBn' : 'contactSubEn', e.currentTarget.innerText);
                }
              }}
            >
              {isBn ? frontTexts.contactSubBn : frontTexts.contactSubEn}
            </p>

            {/* 3 Value Perks */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-4 border border-white/10 rounded-2xl p-4 bg-white/[0.028]">
                <div className="w-10 h-10 rounded-xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] flex items-center justify-center shrink-0">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">
                    {isBn ? 'ফ্রি কনসেপ্ট + স্ক্রিপ্ট' : 'Free concept + script'}
                  </div>
                  <div className="text-xs text-[#6f6f82] mt-0.5">
                    {isBn ? 'আপনার অডিয়েন্সের জন্য স্ট্র্যাটেজিস্ট-লিখিত হুক' : 'Strategist-written hooks for your audience'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border border-white/10 rounded-2xl p-4 bg-white/[0.028]">
                <div className="w-10 h-10 rounded-xl bg-[#2ed9e3]/10 border border-[#2ed9e3]/30 text-[#2ed9e3] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">
                    {isBn ? '১২ ঘণ্টার মধ্যে রিপ্লাই' : 'Reply within 12 hours'}
                  </div>
                  <div className="text-xs text-[#6f6f82] mt-0.5">
                    {isBn ? 'আসল মানুষ, আসল প্ল্যান, আসল টাইমলাইন' : 'Real human, real plan, real timeline'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border border-white/10 rounded-2xl p-4 bg-white/[0.028]">
                <div className="w-10 h-10 rounded-xl bg-[#ff3d9a]/10 border border-[#ff3d9a]/30 text-[#ff3d9a] flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">
                    {isBn ? 'শুরুতে কোনো পেমেন্ট লাগবে না' : 'No payment to start chatting'}
                  </div>
                  <div className="text-xs text-[#6f6f82] mt-0.5">
                    {isBn ? 'কনসেপ্ট পছন্দ হলেই শুধু পেমেন্ট করবেন' : 'You only pay when you love the concept'}
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Mini Contact Boxes (Fixed '&' and '<' per user request) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-white/10 rounded-2xl p-4 text-center bg-white/[0.028]">
                <Mail className="w-4 h-4 text-[#2ed9e3] mx-auto mb-2" />
                <div className="font-bold text-xs text-white truncate">{settings.contactEmail}</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'যেকোনো সময় ইমেইল করুন' : 'Email us anytime'}</div>
              </div>

              <div className="border border-white/10 rounded-2xl p-4 text-center bg-white/[0.028]">
                <Clock className="w-4 h-4 text-[#ff3d9a] mx-auto mb-2" />
                <div className="font-bold text-xs text-white">{settings.responseTime}</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'গড় রেসপন্স টাইম' : 'Avg. response'}</div>
              </div>

              <div className="border border-white/10 rounded-2xl p-4 text-center bg-white/[0.028]">
                <Globe className="w-4 h-4 text-[#c6f24e] mx-auto mb-2" />
                <div className="font-bold text-xs text-white">{settings.location}</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? '১০০% রিমোট' : '100% remote'}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Color Gradient Border Form Card */}
          <div className="gradient-border-card p-6 sm:p-8">
            <h3 className="font-bold text-xl sm:text-2xl text-white font-['Outfit'] mb-1">
              {isBn ? 'আপনার ফ্রি অ্যাড কনসেপ্ট নিন' : 'Get your free ad concept'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6f6f82] mb-6">
              {isBn ? 'মাত্র ৬০ সেকেন্ডে ফর্মটি পূরণ করুন।' : 'Fill this in — takes 60 seconds.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-2">
                    {isBn ? 'আপনার নাম' : 'YOUR NAME'} <span className="text-[#ff3d9a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isBn ? 'রহিম উদ্দিন' : 'Rahim Uddin'}
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] focus:ring-1 focus:ring-[#c6f24e] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-2">
                    {isBn ? 'ইমেইল' : 'EMAIL'} <span className="text-[#ff3d9a]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@brand.com"
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] focus:ring-1 focus:ring-[#c6f24e] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-2">
                    {isBn ? 'ব্র্যান্ড / কোম্পানি' : 'BRAND / COMPANY'}
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder={isBn ? 'গ্লো স্কিন কো.' : 'GlowSkin Co.'}
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-2">
                    {isBn ? 'প্রোডাক্ট / সার্ভিস লিংক' : 'PRODUCT / SERVICE LINK'}
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://yourstore.com/product"
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-2">
                    {isBn ? 'কোন প্যাকেজে আগ্রহী' : 'PACKAGE INTEREST'}
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full border border-white/15 rounded-xl bg-[#12121c] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c6f24e] transition-all"
                  >
                    <option value="standard">{isBn ? 'স্ট্যান্ডার্ড ($60)' : 'Standard ($60)'}</option>
                    <option value="basic">{isBn ? 'বেসিক ($30)' : 'Basic ($30)'}</option>
                    <option value="premium">{isBn ? 'প্রিমিয়াম ($150)' : 'Premium ($150)'}</option>
                    <option value="graphics">{isBn ? 'গ্রাফিক্স অ্যাড-অন' : 'Graphic Add-On'}</option>
                    <option value="notsure">{isBn ? 'নিশ্চিত না' : 'Not sure yet'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-2">
                    {isBn ? 'বাজেট' : 'BUDGET'}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full border border-white/15 rounded-xl bg-[#12121c] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c6f24e] transition-all"
                  >
                    <option value="">{isBn ? 'রেঞ্জ বাছাই করুন...' : 'Select range...'}</option>
                    <option value="Under $100">Under $100</option>
                    <option value="$100 - $300">$100 – $300</option>
                    <option value="$300 - $1,000">$300 – $1,000</option>
                    <option value="$1,000+">$1,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-2">
                  {isBn ? 'আপনার লক্ষ্য বলুন' : 'TELL US ABOUT YOUR GOAL'}
                </label>
                <textarea
                  rows={3}
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder={
                    isBn
                      ? 'আমি Shopify-তে স্কিনকেয়ার সিরাম বিক্রি করি। ২৫-৪০ বছর বয়সী নারীদের জন্য ৩টি TikTok UGC অ্যাড চাই...'
                      : 'I sell a skincare serum on Shopify. I want 3 TikTok UGC ads targeting women 25-40...'
                  }
                  className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all resize-y"
                />
              </div>

              {/* Status Message */}
              {status.type !== 'idle' && (
                <div
                  className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                    status.type === 'success'
                      ? 'bg-[#c6f24e]/10 border border-[#c6f24e]/40 text-[#c6f24e]'
                      : 'bg-[#ff3d9a]/10 border border-[#ff3d9a]/40 text-[#ff3d9a]'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#c6f24e] text-black font-bold text-sm sm:text-base hover:bg-[#d4fc62] transition-all transform hover:-translate-y-0.5 shadow-[0_10px_35px_-8px_rgba(198,242,78,0.7)] flex items-center justify-center gap-2 focus:outline-none mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{isBn ? 'ব্রিফ পাঠান — ফ্রি কনসেপ্ট নিন' : 'Send Brief — Get Free Concept'}</span>
              </button>

              <div className="text-center text-[11px] text-[#6f6f82] pt-2">
                {isBn
                  ? 'কোনো স্প্যাম নেই। রিটেইনার বাধ্যতামূলক নয়। আপনার তথ্য প্রাইভেট থাকবে।'
                  : 'No spam. No retainers required. Your data stays private.'}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
