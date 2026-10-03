import React from 'react';
import { Language, ExtraPage } from '../types';
import { parseVideoUrl } from '../utils/videoParser';
import { ArrowLeft, Sparkles, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';

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

  const isAboutPage = page.slug === 'about-us';
  const isTermsPage = page.slug === 'terms-and-privacy';

  return (
    <div className="pt-28 sm:pt-36 pb-24 relative">
      {/* Ambient background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#2ed9e3]/10 via-[#a855f7]/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-[#9a9aab] hover:text-[#c6f24e] hover:border-[#c6f24e]/40 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'হোমপেজে ফিরে যান' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#6f6f82] uppercase tracking-wider">
              {isAboutPage ? (isBn ? 'স্টুডিও পরিচিতি' : 'Official Studio Page') : isTermsPage ? (isBn ? 'আইনি নীতি' : 'Official Legal Notice') : 'Page'}
            </span>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c6f24e]/30 bg-[#c6f24e]/10 text-[#c6f24e] text-xs font-extrabold uppercase tracking-widest mb-4">
            {isAboutPage ? (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isBn ? 'কিনেটিভো স্টুডিও পরিচিতি' : 'Kinetivo Studio Overview'}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[#2ed9e3]" />
                <span className="text-[#2ed9e3]">{isBn ? '১০০% বাণিজ্যিক অধিকার নিশ্চয়তা' : '100% Commercial Protection'}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-['Outfit'] tracking-tight leading-[1.08]">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-[#a9a9bc] mt-4 leading-relaxed max-w-3xl font-normal border-l-2 border-[#c6f24e]/60 pl-4 py-1 bg-white/[0.015] rounded-r-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Feature / Trust Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {isAboutPage ? (
            <>
              <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16]/80 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#2ed9e3] tracking-wider">{isBn ? 'ডেলিভারি গতি' : 'Delivery Speed'}</div>
                <div className="text-xl font-black font-['Outfit'] text-white mt-1">48–72H</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'লঞ্চ-রেডি ক্রিয়েটিভ' : 'Launch-ready ads'}</div>
              </div>
              <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16]/80 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#c6f24e] tracking-wider">{isBn ? 'গ্লোবাল ল্যাঙ্গুয়েজ' : 'Languages'}</div>
                <div className="text-xl font-black font-['Outfit'] text-white mt-1">200+</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'নেটিভ লিপ-সিঙ্ক' : 'Native lip-sync'}</div>
              </div>
              <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16]/80 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#ff3d9a] tracking-wider">{isBn ? 'গড় ROAS স্কেল' : 'Avg. ROAS'}</div>
                <div className="text-xl font-black font-['Outfit'] text-white mt-1">4.8x</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'পরীক্ষিত পেইড ফানেল' : 'Direct response'}</div>
              </div>
              <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16]/80 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#a855f7] tracking-wider">{isBn ? 'বাণিজ্যিক অধিকার' : 'License'}</div>
                <div className="text-xl font-black font-['Outfit'] text-white mt-1">100%</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'আজীবন সম্পূর্ণ মালিকানা' : 'Zero royalty fees'}</div>
              </div>
            </>
          ) : (
            <>
              <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16]/80 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#2ed9e3] tracking-wider">{isBn ? 'লাইসেন্স মেয়াদ' : 'Term'}</div>
                <div className="text-xl font-black font-['Outfit'] text-white mt-1">Perpetual</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'আজীবন বৈধ' : 'Never expires'}</div>
              </div>
              <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16]/80 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#c6f24e] tracking-wider">{isBn ? 'বিজ্ঞাপন প্ল্যাটফর্ম' : 'Ad Coverage'}</div>
                <div className="text-xl font-black font-['Outfit'] text-white mt-1">Unlimited</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'মেটা, টিকটক, ইউটিউব' : 'All digital platforms'}</div>
              </div>
              <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16]/80 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#ff3d9a] tracking-wider">{isBn ? 'গোপনীয়তা' : 'Confidentiality'}</div>
                <div className="text-xl font-black font-['Outfit'] text-white mt-1">Strict NDA</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'নিরাপদ ক্লাউড স্টোরেজ' : 'Enterprise grade'}</div>
              </div>
              <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16]/80 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-[#a855f7] tracking-wider">{isBn ? 'অতিরিক্ত ফি' : 'Hidden Fees'}</div>
                <div className="text-xl font-black font-['Outfit'] text-white mt-1">$0.00</div>
                <div className="text-[10px] text-[#6f6f82] mt-0.5">{isBn ? 'স্বচ্ছ মাইলস্টোন প্রাইসিং' : 'No surprise charges'}</div>
              </div>
            </>
          )}
        </div>

        {/* Hero Video Embed OR High-Fidelity Cover Banner */}
        {page.videoUrl ? (
          <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/15 shadow-2xl bg-black aspect-[16/9] group">
            {page.videoUrl.includes('<div') || page.videoUrl.includes('<iframe') ? (
              <div
                className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 [&_.wistia_responsive_padding]:!p-0 [&_.wistia_responsive_padding]:!h-full [&_.wistia_responsive_wrapper]:!h-full [&_.wistia_responsive_wrapper]:!w-full"
                dangerouslySetInnerHTML={{ __html: page.videoUrl }}
              />
            ) : (
              (() => {
                const parsed = parseVideoUrl(page.videoUrl);
                return (
                  <iframe
                    src={parsed.src}
                    title="Page Video"
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    name="wistia_embed"
                  />
                );
              })()
            )}
          </div>
        ) : page.bannerImg ? (
          <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/15 shadow-2xl bg-black aspect-[16/9] group">
            <img
              src={page.bannerImg}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/80 backdrop-blur-md bg-black/40 px-4 py-2 rounded-xl border border-white/10">
              <span className="font-semibold font-['Outfit'] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#c6f24e] animate-pulse" />
                <span>KINETIVO STUDIO</span>
              </span>
              <span className="text-[11px] text-[#9a9aab]">
                {isAboutPage ? 'Creative Studio & Lab Infrastructure' : 'Commercial IP & Legal Protection'}
              </span>
            </div>
          </div>
        ) : null}

        {/* Content Body with Rich Markdown & Card Formatting */}
        <div className="bg-[#0e0e16]/80 border border-white/10 rounded-3xl p-6 sm:p-12 backdrop-blur-xl shadow-2xl">
          <div className="space-y-8 text-[#d2d2e2] text-[15px] sm:text-[16.5px] leading-relaxed">
            {content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();

              // Horizontal Divider (---)
              if (trimmed === '---') {
                return (
                  <div key={idx} className="my-8 flex items-center justify-center gap-3">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2ed9e3]/60" />
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>
                );
              }

              // Section Heading Level 1 (# )
              if (trimmed.startsWith('# ')) {
                return (
                  <div key={idx} className="pt-8 pb-3 border-b border-white/15 first:pt-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Outfit'] tracking-tight flex items-center gap-3">
                      <span className="w-2 h-7 rounded-full bg-gradient-to-b from-[#2ed9e3] to-[#a855f7]" />
                      <span>{trimmed.replace('# ', '')}</span>
                    </h2>
                  </div>
                );
              }

              // Section Heading Level 2 (## )
              if (trimmed.startsWith('## ')) {
                return (
                  <div key={idx} className="pt-6 pb-2 border-b border-white/10 first:pt-0">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight flex items-center gap-3">
                      <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#2ed9e3] to-[#c6f24e]" />
                      <span>{trimmed.replace('## ', '')}</span>
                    </h3>
                  </div>
                );
              }

              // Section Heading Level 3 (### )
              if (trimmed.startsWith('### ')) {
                return (
                  <div key={idx} className="pt-4 pb-1">
                    <h4 className="text-lg sm:text-xl font-bold text-white font-['Outfit'] tracking-normal flex items-center gap-2">
                      <span className="text-lg">{trimmed.replace('### ', '').split(' ')[0]}</span>
                      <span className="bg-gradient-to-r from-white to-[#e2e2ee] bg-clip-text text-transparent">
                        {trimmed.replace('### ', '').split(' ').slice(1).join(' ')}
                      </span>
                    </h4>
                  </div>
                );
              }

              // Section Heading Level 4 (#### )
              if (trimmed.startsWith('#### ')) {
                return (
                  <div key={idx} className="pt-2 mb-1">
                    <h5 className="text-base sm:text-lg font-bold text-[#2ed9e3] font-['Outfit']">
                      {trimmed.replace('#### ', '')}
                    </h5>
                  </div>
                );
              }

              // Blockquotes (> )
              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote
                    key={idx}
                    className="border-l-4 border-[#2ed9e3] pl-5 pr-4 py-3.5 italic text-white bg-gradient-to-r from-[#2ed9e3]/10 to-transparent rounded-r-2xl my-5 font-medium text-base"
                  >
                    {trimmed.replace('> ', '')}
                  </blockquote>
                );
              }

              // Bullet points (- )
              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').map(line => line.replace('- ', ''));
                return (
                  <ul key={idx} className="space-y-3 my-4">
                    {items.map((it, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-3.5 rounded-xl border border-white/5 text-[#d0d0df]">
                        <CheckCircle2 className="w-4 h-4 text-[#2ed9e3] shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base leading-relaxed">
                          {/* Parse bold text inside list items */}
                          {it.split(/(\*\*.*?\*\*)/).map((chunk, cIdx) => {
                            if (chunk.startsWith('**') && chunk.endsWith('**')) {
                              return <strong key={cIdx} className="text-white font-semibold">{chunk.slice(2, -2)}</strong>;
                            }
                            return chunk;
                          })}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }

              // Standard paragraphs with **bold** parser (strictly clean neutral text color, never green paragraph text)
              return (
                <p key={idx} className="text-[#c3c3d6] leading-relaxed font-normal text-[15px] sm:text-[16.5px]">
                  {trimmed.split(/(\*\*.*?\*\*)/).map((chunk, cIdx) => {
                    if (chunk.startsWith('**') && chunk.endsWith('**')) {
                      return <strong key={cIdx} className="text-white font-bold">{chunk.slice(2, -2)}</strong>;
                    }
                    return chunk;
                  })}
                </p>
              );
            })}
          </div>
        </div>

        {/* Conversion CTA Footer Banner */}
        <div className="mt-12 rounded-3xl p-8 border border-white/15 bg-gradient-to-r from-[#0e0e16] via-[#141424] to-[#0e0e16] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#c6f24e] mb-1">
              {isBn ? 'পরবর্তী পদক্ষেপ' : 'Ready To Launch?'}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
              {isBn ? 'আপনার ব্র্যান্ডের জন্য ফ্রি কনসেপ্ট ও স্ক্রিপ্ট নিন' : 'Get Your Free Custom Ad Concept & Script'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9aab] mt-1 max-w-md">
              {isBn ? '১২ ঘণ্টার মধ্যে আমাদের স্ট্র্যাটেজিস্টরা আপনার পণ্যের ৩টি হুক সহ পূর্ণ প্ল্যান পাঠাবে।' : 'Receive 3 scroll-stopping angles and hooks tailored to your offer within 12 hours.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateHome}
              className="px-5 py-3 rounded-full border border-white/15 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isBn ? 'হোমপেজ' : 'Home'}
            </button>

            <button
              onClick={onOpenBrief}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c6f24e] text-black font-extrabold text-xs sm:text-sm hover:bg-[#d4fc62] transition-all transform hover:-translate-y-0.5 shadow-[0_8px_25px_-6px_rgba(198,242,78,0.7)] cursor-pointer"
            >
              <span>{isBn ? 'প্রজেক্ট শুরু করুন' : 'Start Project'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
