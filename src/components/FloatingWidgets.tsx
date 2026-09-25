import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface FloatingWidgetsProps {
  lang: Language;
  onOpenMessage: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  lang,
  onOpenMessage
}) => {
  const isBn = lang === 'bn';
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-40 flex flex-col items-center gap-3 select-none pointer-events-none">
      {/* 1. Floating Message / Chat Button */}
      <div className="relative group pointer-events-auto">
        <button
          onClick={onOpenMessage}
          aria-label={isBn ? 'মেসেজ পাঠান' : 'Send a Message'}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#c6f24e] via-[#2ed9e3] to-[#a855f7] p-[1.5px] shadow-[0_10px_30px_rgba(46,217,227,0.45)] hover:shadow-[0_12px_35px_rgba(198,242,78,0.6)] transform hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none"
        >
          <div className="w-full h-full bg-[#07070c] rounded-full flex items-center justify-center text-[#c6f24e] group-hover:text-white group-hover:bg-[#07070c]/80 transition-colors">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>

          {/* Glowing pulse indicator dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#c6f24e] border-2 border-[#07070c] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
          </span>
        </button>

        {/* Hover Tooltip */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-[#0e0e16] border border-white/15 text-xs font-semibold text-white whitespace-nowrap shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
          {isBn ? 'মেসেজ বা ব্রিফ পাঠান' : 'Get Free Concept & Brief'}
        </div>
      </div>

      {/* 2. Floating Back to Top Button */}
      <div className="relative group pointer-events-auto">
        <button
          onClick={scrollToTop}
          aria-label={isBn ? 'উপরে যান' : 'Back to Top'}
          className={`w-11 h-11 rounded-full bg-[#0e0e16]/90 border border-white/20 text-[#c8c8d6] hover:text-[#c6f24e] hover:border-[#c6f24e]/50 backdrop-blur-md shadow-xl flex items-center justify-center transform transition-all duration-300 focus:outline-none cursor-pointer ${
            showTopButton
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
          }`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* Hover Tooltip */}
        {showTopButton && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-[#0e0e16] border border-white/15 text-xs font-semibold text-white whitespace-nowrap shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
            {isBn ? 'উপরে যান' : 'Back to Top'}
          </div>
        )}
      </div>
    </div>
  );
};
