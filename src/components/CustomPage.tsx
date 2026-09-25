import React from 'react';
import { Language, ExtraPage } from '../types';
import { parseVideoUrl } from '../utils/videoParser';
import { ArrowLeft } from 'lucide-react';

interface CustomPageProps {
  lang: Language;
  page: ExtraPage;
  onNavigateHome: () => void;
  onOpenBrief: () => void;
}

export const CustomPage: React.FC<CustomPageProps> = ({
  lang,
  page,
  onNavigateHome,
  onOpenBrief
}) => {
  const isBn = lang === 'bn';
  const title = isBn ? page.titleBn : page.titleEn;
  const subtitle = isBn ? page.subtitleBn : page.subtitleEn;
  const content = isBn ? page.contentBn : page.contentEn;

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-5">
        {/* Breadcrumb Back */}
        <div className="mb-6">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#9a9aab] hover:text-[#c6f24e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBn ? 'হোমপেজে ফিরে যান' : 'Back to Home'}</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-[#9a9aab] mt-3 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Banner image if present */}
        {page.bannerImg && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 aspect-[16/9] bg-black">
            <img
              src={page.bannerImg}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Video if present */}
        {page.videoUrl && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 aspect-[16/9] bg-black">
            {(() => {
              const parsed = parseVideoUrl(page.videoUrl);
              return (
                <iframe
                  src={parsed.src}
                  title="Page Video"
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              );
            })()}
          </div>
        )}

        {/* Content body formatted */}
        <div className="prose prose-invert max-w-none text-[#d5d5e2] text-sm sm:text-base leading-relaxed space-y-5">
          {content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-bold text-[#c6f24e] font-['Outfit'] mt-6 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote
                  key={idx}
                  className="border-l-2 border-[#2ed9e3] pl-4 py-1 italic text-white bg-white/[0.02] rounded-r-xl my-4"
                >
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n').map(line => line.replace('- ', ''));
              return (
                <ul key={idx} className="list-disc list-inside space-y-1.5 my-3 text-[#9a9aab]">
                  {items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-[#9a9aab] hover:text-white"
          >
            {isBn ? 'হোমপেজে যান' : 'Go to Homepage'}
          </button>

          <button
            onClick={onOpenBrief}
            className="px-6 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62] transition-colors"
          >
            {isBn ? 'প্রজেক্ট শুরু করুন' : 'Start a Project'}
          </button>
        </div>
      </div>
    </div>
  );
};
