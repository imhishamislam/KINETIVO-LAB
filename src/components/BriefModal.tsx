import React, { useState, useEffect } from 'react';
import { Language, SiteSettings, ProjectLead } from '../types';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { addStoredLead } from '../utils/storage';
import { sendProjectBriefEmail } from '../utils/emailService';

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialInterest?: string;
  settings: SiteSettings;
  onNewLead?: (lead: ProjectLead) => void;
}

export const BriefModal: React.FC<BriefModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialInterest,
  settings,
  onNewLead
}) => {
  if (!isOpen) return null;

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  useEffect(() => {
    if (initialInterest) {
      setFormData(prev => ({ ...prev, interest: initialInterest }));
    }
  }, [initialInterest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({
        type: 'error',
        message: isBn
          ? 'নাম ও একটি সঠিক ইমেইল দিন।'
          : 'Please enter your name and a valid email.'
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus({
        type: 'error',
        message: isBn
          ? 'একটি সঠিক ইমেইল ঠিকানা দিন।'
          : 'Please enter a valid email format.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    // 1. Record lead locally & in Admin CRM immediately
    const lead: ProjectLead = {
      id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: formData.name.trim(),
      email: formData.email.trim(),
      brand: formData.brand.trim() || undefined,
      link: formData.link.trim() || undefined,
      interest: formData.interest,
      budget: formData.budget.trim() || undefined,
      goal: formData.goal.trim() || undefined,
      submittedAt: new Date().toISOString(),
      source: 'brief-modal',
      status: 'new'
    };
    addStoredLead(lead);
    if (onNewLead) {
      onNewLead(lead);
    }

    // 2. Dispatch real email to the configured recipient email
    const targetEmail = settings?.contactEmail || 'hello@kinetivo.lab';
    const emailResult = await sendProjectBriefEmail(targetEmail, {
      name: formData.name.trim(),
      email: formData.email.trim(),
      brand: formData.brand.trim(),
      link: formData.link.trim(),
      interest: formData.interest,
      budget: formData.budget.trim(),
      goal: formData.goal.trim(),
      source: 'brief-modal'
    });

    setIsSubmitting(false);

    if (emailResult.isActivationRequired) {
      setStatus({
        type: 'success',
        message: isBn
          ? `ধন্যবাদ ${formData.name.split(' ')[0]}! আপনার ব্রিফ পাঠানো হয়েছে। আপনার ইমেইল (${targetEmail})-এ FormSubmit থেকে একটি অ্যাক্টিভেশন লিংক পাঠানো হয়েছে। লিংকে একবার ক্লিক করলে সব মেসেজ সরাসরি ইনবক্সে আসবে।`
          : `Thank you ${formData.name.split(' ')[0]}! Brief sent. A one-time activation email was sent to ${targetEmail}. Please check your inbox or spam to confirm FormSubmit.`
      });
    } else {
      setStatus({
        type: 'success',
        message: isBn
          ? `ধন্যবাদ ${formData.name.split(' ')[0]}! ব্রিফ সরাসরি আমাদের স্টুডিও ইমেইলে (${targetEmail}) পাঠানো হয়েছে। ১২ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করা হবে।`
          : `Thank you ${formData.name.split(' ')[0]}! Brief sent directly to ${targetEmail}. We will review and reply within 12 hours.`
      });
    }

    setTimeout(() => {
      onClose();
      setStatus({ type: 'idle', message: '' });
      setFormData({
        name: '',
        email: '',
        brand: '',
        link: '',
        interest: 'standard',
        budget: '',
        goal: ''
      });
    }, 4500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#12121c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl relative my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#c6f24e]">
              {isBn ? 'প্রজেক্ট শুরু' : 'START PROJECT'}
            </div>
            <h3 className="font-bold text-xl sm:text-2xl text-white font-['Outfit'] mt-1">
              {isBn ? 'আপনার ফ্রি অ্যাড কনসেপ্ট নিন' : 'Get your free ad concept'}
            </h3>
            <p className="text-xs text-[#9a9aab] mt-1">
              {isBn
                ? 'আপনার প্রোডাক্ট সম্পর্কে বলুন — ১২ ঘণ্টার মধ্যে ফ্রি হুক + স্ক্রিপ্ট আইডিয়া নিয়ে রিপ্লাই দেব।'
                : 'Tell us about your product — we reply within 12 hours with a free hook + script idea.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-[#ff3d9a] hover:border-[#ff3d9a] transition-colors focus:outline-none"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-1.5">
                {isBn ? 'আপনার নাম' : 'YOUR NAME'} <span className="text-[#ff3d9a]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={isBn ? 'রহিম উদ্দিন' : 'Rahim Uddin'}
                className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-1.5">
                {isBn ? 'ইমেইল' : 'EMAIL'} <span className="text-[#ff3d9a]">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@brand.com"
                className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-1.5">
                {isBn ? 'ব্র্যান্ড / কোম্পানি' : 'BRAND / COMPANY'}
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder={isBn ? 'গ্লো স্কিন কো.' : 'GlowSkin Co.'}
                className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-1.5">
                {isBn ? 'প্রোডাক্ট লিংক' : 'PRODUCT LINK'}
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://yourstore.com/product"
                className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-1.5">
                {isBn ? 'প্যাকেজ' : 'PACKAGE'}
              </label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full border border-white/15 rounded-xl bg-[#12121c] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c6f24e] transition-all"
              >
                <option value="standard">{isBn ? 'স্ট্যান্ডার্ড ($60)' : 'Standard ($60)'}</option>
                <option value="basic">{isBn ? 'বেসিক ($30)' : 'Basic ($30)'}</option>
                <option value="premium">{isBn ? 'প্রিমিয়াম ($150)' : 'Premium ($150)'}</option>
                <option value="graphics">{isBn ? 'গ্রাফিক্স অ্যাড-অন' : 'Graphic Add-On'}</option>
                <option value="notsure">{isBn ? 'নিশ্চিত না' : 'Not sure yet'}</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-1.5">
                {isBn ? 'বাজেট' : 'BUDGET'}
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full border border-white/15 rounded-xl bg-[#12121c] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c6f24e] transition-all"
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
            <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#6f6f82] mb-1.5">
              {isBn ? 'আপনার গোল' : 'YOUR GOAL'}
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
              className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-sm text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all resize-y"
            />
          </div>

          {status.type !== 'idle' && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
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
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-[#c6f24e] text-black font-bold text-sm hover:bg-[#d4fc62] transition-all transform hover:-translate-y-0.5 shadow-[0_8px_30px_-6px_rgba(198,242,78,0.7)] flex items-center justify-center gap-2 focus:outline-none mt-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isBn ? 'পাঠানো হচ্ছে...' : 'Submitting Brief...'}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{isBn ? 'ব্রিফ পাঠান — ফ্রি কনসেপ্ট নিন' : 'Send Brief — Get Free Concept'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
