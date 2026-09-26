import React, { useState } from 'react';
import { Language, SiteSettings, ExtraPage } from '../types';
import { Instagram, Facebook, Youtube, Linkedin, Send, ArrowUp, Lock, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  lang: Language;
  settings: SiteSettings;
  extraPages: ExtraPage[];
  onOpenWork: () => void;
  onOpenBrief: () => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigatePage: (slug: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  settings,
  extraPages,
  onOpenWork,
  onOpenBrief,
  onNavigateHome,
  onNavigatePage,
  onOpenAdmin
}) => {
  const isBn = lang === 'bn';
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [nlSuccess, setNlSuccess] = useState(false);

  const handleNlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNlSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNlSuccess(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerPages = extraPages.filter(p => p.showInFooter && p.status === 'published');

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-[#a855f7]/[0.04] via-transparent to-transparent pt-16 pb-10 relative">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14">
          {/* Brand Info & Newsletter */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt="KINETIVO STUDIO Logo"
                  className="w-10 h-10 rounded-lg object-contain bg-black/40 border border-white/10 p-0.5"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c6f24e] via-[#2ed9e3] to-[#a855f7] p-[1.5px] flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-[#07070c] rounded-[7px] flex items-center justify-center">
                    <span className="font-extrabold text-sm tracking-tighter bg-gradient-to-r from-[#c6f24e] to-[#2ed9e3] bg-clip-text text-transparent">
                      KS
                    </span>
                  </div>
                </div>
              )}
              <div className="leading-none">
                <div className="font-extrabold text-[17px] tracking-tight font-['Outfit'] text-white">
                  KINETIVO <span className="bg-gradient-to-r from-[#c6f24e] to-[#2ed9e3] bg-clip-text text-transparent">STUDIO</span>
                </div>
                <div className="text-[8px] font-semibold tracking-[0.28em] text-[#6f6f82] uppercase mt-1">
                  {isBn ? settings.taglineBn : settings.taglineEn}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9a9aab] max-w-xs leading-relaxed mb-6">
              {isBn
                ? 'All Digital Platforms-এর জন্য হাই-কনভার্টিং ভিডিও অ্যাড, AI স্পোকসপারসন ও VSL। স্ক্রল-থামানো ক্রিয়েটিভ, সপ্তাহ নয় — দিনের মধ্যে ডেলিভারি।'
                : 'High-converting video ads, AI spokespersons & VSLs for All Digital Platforms. Scroll-stopping creatives, delivered in days — not weeks.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mb-8">
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.035] flex items-center justify-center text-[#c8c8d6] hover:text-[#c6f24e] hover:border-[#c6f24e] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.035] flex items-center justify-center text-[#c8c8d6] hover:text-[#c6f24e] hover:border-[#c6f24e] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.035] flex items-center justify-center text-[#c8c8d6] hover:text-[#c6f24e] hover:border-[#c6f24e] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.035] flex items-center justify-center text-[#c8c8d6] hover:text-[#c6f24e] hover:border-[#c6f24e] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter Form */}
            <div className="max-w-xs">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6f6f82] mb-3">
                {isBn ? 'অ্যাড টিপস ও অফার পান' : 'GET AD TIPS & OFFERS'}
              </div>
              <form onSubmit={handleNlSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@brand.com"
                  className="flex-1 border border-white/15 rounded-xl bg-white/[0.035] px-3.5 py-2.5 text-xs text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isBn ? 'যুক্ত হন' : 'Join'}</span>
                </button>
              </form>
              {nlSuccess && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#c6f24e] mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isBn ? 'যুক্ত হয়েছেন! ধন্যবাদ।' : 'You are in. Tips on the way!'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 1: Services */}
          <div>
            <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6f6f82] mb-4 font-['Inter']">
              {isBn ? 'সার্ভিস' : 'SERVICES'}
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#c7c7d6]">
              <li>
                <button
                  onClick={() => onNavigateHome('services')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'ভিডিও অ্যাড ও UGC' : 'Video Ads & UGC'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('services')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'AI স্পোকসপারসন' : 'AI Spokespersons'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('services')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'প্রোডাক্ট ডেমো' : 'Product Demos'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('services')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'SaaS প্রোমো' : 'SaaS Promos'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('services')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'VSL ও সেলস ভিডিও' : 'VSLs & Sales Videos'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio */}
          <div>
            <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6f6f82] mb-4 font-['Inter']">
              {isBn ? 'স্টুডিও' : 'STUDIO'}
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#c7c7d6]">
              <li>
                <button
                  onClick={onOpenWork}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'আমাদের কাজ দেখুন' : 'Watch Our Work'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('why')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'কেন আমরা' : 'Why Choose Us'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('process')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'আমাদের প্রসেস' : 'Our Process'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('pricing')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'মূল্য' : 'Pricing'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('reviews')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'রিভিউ' : 'Reviews'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Pages */}
          <div>
            <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6f6f82] mb-4 font-['Inter']">
              {isBn ? 'সাপোর্ট' : 'SUPPORT'}
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#c7c7d6]">
              <li>
                <button
                  onClick={() => onNavigateHome('faq')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'FAQ' : 'FAQ'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBrief}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'ফ্রি কনসেপ্ট নিন' : 'Get Free Concept'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateHome('contact')}
                  className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                >
                  {isBn ? 'স্টুডিওতে যোগাযোগ' : 'Contact Studio'}
                </button>
              </li>

              {/* Extra pages marked for footer */}
              {footerPages.map(page => (
                <li key={page.id}>
                  <button
                    onClick={() => onNavigatePage(page.slug)}
                    className="hover:text-[#c6f24e] transition-colors hover:translate-x-1 transform inline-block text-left"
                  >
                    {isBn ? page.titleBn : page.titleEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-[#6f6f82]">
          <div className="flex items-center gap-2">
            <span>© 2026 KINETIVO LAB. All rights reserved.</span>
            {/* Discrete admin portal button / link */}
            <button
              onClick={onOpenAdmin}
              className="text-[#6f6f82] hover:text-[#c6f24e] transition-colors p-1"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>

          <div>
            {isBn ? (
              <span>যারা মিশে যেতে চান না, তাদের জন্য <span className="text-[#ff3d9a]">♥</span> দিয়ে বানানো।</span>
            ) : (
              <span>Crafted with <span className="text-[#ff3d9a]">♥</span> for brands that refuse to blend in.</span>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-white hover:border-[#c6f24e] hover:text-[#c6f24e] transition-colors"
          >
            <span>{isBn ? 'উপরে যান' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
