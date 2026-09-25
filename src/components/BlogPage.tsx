import React, { useState } from 'react';
import { Language, BlogPost } from '../types';
import { parseVideoUrl } from '../utils/videoParser';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Play } from 'lucide-react';

interface BlogPageProps {
  lang: Language;
  posts: BlogPost[];
  initialSlug?: string;
  onNavigateHome: () => void;
  onOpenBrief: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  lang,
  posts,
  initialSlug,
  onNavigateHome,
  onOpenBrief
}) => {
  const isBn = lang === 'bn';
  const publishedPosts = posts.filter(p => p.status === 'published');

  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);
  const activePost = activeSlug ? publishedPosts.find(p => p.slug === activeSlug) || null : null;

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1160px] mx-auto px-5">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => {
              if (activePost) {
                setActiveSlug(null);
              } else {
                onNavigateHome();
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#9a9aab] hover:text-[#c6f24e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {activePost
                ? isBn
                  ? 'সকল ব্লগে ফিরে যান'
                  : 'Back to all posts'
                : isBn
                ? 'হোমপেজে ফিরে যান'
                : 'Back to Home'}
            </span>
          </button>
        </div>

        {activePost ? (
          /* Single Article Reader View */
          <article className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="eyebrow-badge text-[#2ed9e3] border border-[#2ed9e3]/30 bg-[#2ed9e3]/10 mb-3">
                {isBn ? 'ইনসাইট ও স্ট্র্যাটেজি' : 'INSIGHTS & STRATEGY'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight mt-2 leading-tight">
                {isBn ? activePost.titleBn : activePost.titleEn}
              </h1>
              <p className="text-sm sm:text-base text-[#9a9aab] mt-3 leading-relaxed">
                {isBn ? activePost.subtitleBn : activePost.subtitleEn}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-white/10 text-xs text-[#6f6f82]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#c6f24e]" />
                  <span>{activePost.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activePost.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activePost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Banner Image */}
            {activePost.bannerImg && (
              <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 aspect-[16/9] bg-black">
                <img
                  src={activePost.bannerImg}
                  alt={isBn ? activePost.titleBn : activePost.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Optional Embedded Video in Article */}
            {activePost.videoUrl && (
              <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 aspect-[16/9] bg-black">
                {(() => {
                  const parsed = parseVideoUrl(activePost.videoUrl);
                  return (
                    <iframe
                      src={parsed.src}
                      title="Post Video"
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                    />
                  );
                })()}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-invert max-w-none text-[#d5d5e2] text-sm sm:text-base leading-relaxed space-y-5">
              {(isBn ? activePost.contentBn : activePost.contentEn)
                .split('\n\n')
                .map((paragraph, idx) => {
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

            {/* Article Footer & CTA */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setActiveSlug(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#9a9aab] hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isBn ? 'অন্যান্য পোস্ট পড়ুন' : 'Read more posts'}</span>
              </button>

              <button
                onClick={onOpenBrief}
                className="px-6 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62] transition-colors"
              >
                {isBn ? 'আপনার ব্র্যান্ডের জন্য কনসেপ্ট নিন' : 'Get a concept for your brand'}
              </button>
            </div>
          </article>
        ) : (
          /* Blog Posts Grid */
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="eyebrow-badge text-[#2ed9e3] border border-[#2ed9e3]/30 bg-[#2ed9e3]/10 mb-3">
                📝 {isBn ? 'ব্লগ ও ক্রিয়েটিভ ইনসাইট' : 'BLOG & CREATIVE INSIGHTS'}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase text-white font-['Outfit'] tracking-tight mt-2">
                {isBn ? (
                  <>লেটেস্ট <span className="text-[#c6f24e]">ইনসাইট</span></>
                ) : (
                  <>Latest <span className="text-[#c6f24e]">Insights</span></>
                )}
              </h1>
              <p className="text-sm sm:text-base text-[#9a9aab] mt-3">
                {isBn
                  ? 'ভিডিও বিজ্ঞাপন হুক, AI ক্রিয়েটিভ অপ্টিমাইজেশন এবং পেইড স্কেলিং নিয়ে আমাদের স্ট্র্যাটেজি।'
                  : 'Practical guides on video ad hooks, AI creative optimization and paid media scaling.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publishedPosts.map(post => (
                <article
                  key={post.id}
                  onClick={() => setActiveSlug(post.slug)}
                  className="border border-white/10 hover:border-[#2ed9e3]/40 rounded-2xl overflow-hidden bg-[#0e0e16] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(46,217,227,0.3)] flex flex-col group"
                >
                  {post.bannerImg && (
                    <div className="aspect-[16/9] overflow-hidden bg-black">
                      <img
                        src={post.bannerImg}
                        alt={isBn ? post.titleBn : post.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-[#6f6f82] mb-3">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="font-bold text-lg sm:text-xl text-white font-['Outfit'] group-hover:text-[#2ed9e3] transition-colors leading-snug mb-2">
                        {isBn ? post.titleBn : post.titleEn}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#9a9aab] leading-relaxed line-clamp-2 mb-4">
                        {isBn ? post.subtitleBn : post.subtitleEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#c6f24e]">
                      <span>{isBn ? 'পুরো পোস্ট পড়ুন' : 'Read Full Post'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
