import React, { useState, useEffect } from 'react';
import { Language, SiteSettings, ExtraPage, BlogPost } from '../types';
import { Play, ArrowUpRight, Globe, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenBrief: (interest?: string) => void;
  onOpenWork: () => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateBlog: (slug?: string) => void;
  onNavigatePage: (slug: string) => void;
  onOpenAdmin: () => void;
  settings: SiteSettings;
  extraPages: ExtraPage[];
  blogPosts: BlogPost[];
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenBrief,
  onOpenWork,
  onNavigateHome,
  onNavigateBlog,
  onNavigatePage,
  onOpenAdmin,
  settings,
  extraPages,
  blogPosts,
  currentView
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPages = extraPages.filter(p => p.showInNav && p.status === 'published');
  const hasBlogsInNav = blogPosts.some(b => b.showInNav && b.status === 'published');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
    if (currentView !== 'home') {
      onNavigateHome(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07070c]/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-xl'
          : 'bg-[#07070c]/75 backdrop-blur-md border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-[1160px] mx-auto px-5 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            onNavigateHome();
          }}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0 cursor-pointer"
        >
          {settings.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt="KINETIVO LAB Logo"
              className="w-9 h-9 rounded-lg object-contain bg-black/40 border border-white/10 p-0.5"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c6f24e] via-[#2ed9e3] to-[#a855f7] p-[1.5px] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(46,217,227,0.3)]">
              <div className="w-full h-full bg-[#07070c] rounded-[7px] flex items-center justify-center">
                <span className="font-extrabold text-sm tracking-tighter bg-gradient-to-r from-[#c6f24e] to-[#2ed9e3] bg-clip-text text-transparent">
                  KL
                </span>
              </div>
            </div>
          )}
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-[16px] sm:text-[18px] tracking-tight font-['Outfit'] text-white whitespace-nowrap leading-none flex items-center gap-1.5">
              <span>KINETIVO</span>
              <span className="bg-gradient-to-r from-[#c6f24e] to-[#2ed9e3] bg-clip-text text-transparent">LAB</span>
            </span>
            <span className="text-[8px] font-semibold tracking-[0.28em] text-[#6f6f82] uppercase mt-1 whitespace-nowrap leading-none">
              {lang === 'bn' ? settings.taglineBn : settings.taglineEn}
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#c8c8d6]">
          <button
            onClick={onOpenWork}
            className={`hover:text-white transition-colors relative py-1 focus:outline-none cursor-pointer ${
              currentView === 'work' ? 'text-[#c6f24e] font-semibold' : ''
            }`}
          >
            {lang === 'bn' ? 'আমাদের কাজ' : 'Work'}
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none cursor-pointer"
          >
            {lang === 'bn' ? 'সার্ভিস' : 'Services'}
          </button>
          <button
            onClick={() => scrollToSection('why')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none cursor-pointer"
          >
            {lang === 'bn' ? 'কেন আমরা' : 'Why Us'}
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none cursor-pointer"
          >
            {lang === 'bn' ? 'প্রসেস' : 'Process'}
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none cursor-pointer"
          >
            {lang === 'bn' ? 'মূল্য' : 'Pricing'}
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none cursor-pointer"
          >
            {lang === 'bn' ? 'রিভিউ' : 'Reviews'}
          </button>

          {/* Pages Dropdown with Hover (Contains Blog & Extra Custom Pages) */}
          <div
            className="relative py-2"
            onMouseEnter={() => setPagesDropdownOpen(true)}
            onMouseLeave={() => setPagesDropdownOpen(false)}
          >
            <button
              onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
              className={`flex items-center gap-1.5 hover:text-white transition-colors py-1 focus:outline-none cursor-pointer ${
                currentView === 'page' || currentView === 'blog' ? 'text-[#c6f24e] font-semibold' : ''
              }`}
            >
              <span>{lang === 'bn' ? 'পেজ' : 'Pages'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  pagesDropdownOpen ? 'rotate-180 text-[#c6f24e]' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu on Hover */}
            <div
              className={`absolute top-full left-0 pt-2 w-52 transition-all duration-200 z-50 ${
                pagesDropdownOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="bg-[#0e0e16]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl py-2 overflow-hidden">
                {/* 1. Blog link moved inside Pages hover menu */}
                <button
                  onClick={() => {
                    setPagesDropdownOpen(false);
                    onNavigateBlog();
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between group/item hover:bg-white/5 cursor-pointer ${
                    currentView === 'blog' ? 'text-[#c6f24e] bg-white/[0.04]' : 'text-[#c8c8d6] hover:text-white'
                  }`}
                >
                  <span>{lang === 'bn' ? 'ব্লগ' : 'Blog'}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#9a9aab] group-hover/item:text-[#c6f24e] group-hover/item:bg-[#c6f24e]/10 transition-colors">
                    Articles
                  </span>
                </button>

                {/* Extra custom pages if any */}
                {navPages.length > 0 && (
                  <>
                    <div className="my-1 border-t border-white/10" />
                    {navPages.map(page => (
                      <button
                        key={page.id}
                        onClick={() => {
                          setPagesDropdownOpen(false);
                          onNavigatePage(page.slug);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-[#c8c8d6] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        {lang === 'bn' ? page.titleBn : page.titleEn}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Right CTA cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Button */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] sm:text-[12px] font-bold text-white hover:border-[#c6f24e] hover:text-[#c6f24e] transition-colors focus:outline-none"
            title={lang === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Watch Work Ghost Button (Visible on sm screens and up) */}
          <button
            onClick={onOpenWork}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-[13px] font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all focus:outline-none"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{lang === 'bn' ? 'কাজ দেখুন' : 'Watch Work'}</span>
          </button>

          {/* Start Project CTA Button */}
          <button
            onClick={() => onOpenBrief()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-[13px] sm:text-[14px] hover:bg-[#d4fc62] transition-all transform hover:-translate-y-0.5 shadow-[0_8px_30px_-6px_rgba(198,242,78,0.6)] focus:outline-none whitespace-nowrap"
          >
            <span>{lang === 'bn' ? 'প্রজেক্ট শুরু করুন' : 'Start Project'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger (Always clearly visible and high contrast on mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white focus:outline-none transition-colors active:scale-95 flex items-center justify-center shrink-0 cursor-pointer shadow-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#c6f24e]" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07070c]/98 backdrop-blur-2xl border-t border-white/10 px-5 sm:px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2 font-semibold text-sm">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWork();
              }}
              className="text-left py-2.5 px-3 rounded-lg text-white font-bold bg-[#c6f24e]/10 border border-[#c6f24e]/30 flex items-center justify-between"
            >
              <span>{lang === 'bn' ? 'আমাদের কাজ (Our Work)' : 'Our Work'}</span>
              <span className="text-[10px] uppercase tracking-wider text-[#c6f24e] px-2 py-0.5 rounded bg-[#c6f24e]/20 font-mono">
                Featured
              </span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2.5 px-3 rounded-lg text-[#c8c8d6] hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"
            >
              {lang === 'bn' ? 'সার্ভিস (Services)' : 'Services'}
            </button>
            <button
              onClick={() => scrollToSection('why')}
              className="text-left py-2.5 px-3 rounded-lg text-[#c8c8d6] hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"
            >
              {lang === 'bn' ? 'কেন আমরা' : 'Why Us'}
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-left py-2.5 px-3 rounded-lg text-[#c8c8d6] hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"
            >
              {lang === 'bn' ? 'প্রসেস' : 'Process'}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2.5 px-3 rounded-lg text-[#c8c8d6] hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"
            >
              {lang === 'bn' ? 'মূল্য' : 'Pricing'}
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-left py-2.5 px-3 rounded-lg text-[#c8c8d6] hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"
            >
              {lang === 'bn' ? 'রিভিউ' : 'Reviews'}
            </button>

            {/* Pages & Blog in Mobile Menu */}
            <div className="pt-3 mt-1 border-t border-white/10">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#6f6f82] mb-1">
                {lang === 'bn' ? 'পেজ ও ব্লগ' : 'Pages & Blog'}
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateBlog();
                }}
                className={`w-full text-left py-2 text-sm flex items-center justify-between border-b border-white/5 ${
                  currentView === 'blog' ? 'text-[#c6f24e] font-bold' : 'text-[#c8c8d6] hover:text-white'
                }`}
              >
                <span>{lang === 'bn' ? 'ব্লগ' : 'Blog'}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#9a9aab]">
                  Articles
                </span>
              </button>

              {navPages.map(page => (
                <button
                  key={page.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigatePage(page.slug);
                  }}
                  className={`w-full text-left py-2 text-sm border-b border-white/5 ${
                    currentView === 'page' ? 'text-white font-medium' : 'text-[#c8c8d6] hover:text-white'
                  }`}
                >
                  {lang === 'bn' ? page.titleBn : page.titleEn}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrief();
              }}
              className="w-full mt-4 py-3 rounded-full bg-[#c6f24e] text-black font-bold text-center flex items-center justify-center gap-2"
            >
              <span>{lang === 'bn' ? 'প্রজেক্ট শুরু করুন' : 'Start Project'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
