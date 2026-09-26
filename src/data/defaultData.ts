import {
  VideoItem,
  BlogPost,
  ExtraPage,
  ShowreelData,
  SiteSettings,
  FrontTexts,
  ImagePreset
} from '../types';

import serumImg from '../assets/images/ugc_cosmetic_serum_1790287393052.jpg';
import fintechImg from '../assets/images/fintech_app_analytics_1790287409792.jpg';
import perfumeImg from '../assets/images/luxury_perfume_blue_1790287424841.jpg';
import warehouseImg from '../assets/images/warehouse_unboxing_1790287438710.jpg';
import heroBgImg from '../assets/images/hero_geometric_bg_1790291197104.jpg';

export const DEFAULT_PRESET_IMAGES: ImagePreset[] = [
  {
    id: 'preset-serum',
    name: 'Beauty & Skincare Serum',
    category: 'UGC & DTC',
    url: serumImg
  },
  {
    id: 'preset-fintech',
    name: 'Fintech & Analytics Chart',
    category: 'App & Finance',
    url: fintechImg
  },
  {
    id: 'preset-perfume',
    name: 'Luxury Blue Perfume Film',
    category: 'Commercial & Brand',
    url: perfumeImg
  },
  {
    id: 'preset-warehouse',
    name: 'E-Commerce Warehouse Pallets',
    category: 'Unboxing & Logistics',
    url: warehouseImg
  },
  {
    id: 'preset-laptop',
    name: 'Modern Laptop SaaS Dashboard',
    category: 'Software & SaaS',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'preset-fitness',
    name: 'High Performance Fitness Workout',
    category: 'VSL & Coaching',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'preset-studio',
    name: 'Cinematic Camera Film Production',
    category: 'Showreel & Commercial',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'preset-gadget',
    name: 'Futuristic Tech & Wireless Gadgets',
    category: 'Other Ads & Hardware',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  }
];

export const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    cat: 'ugc',
    brand: 'GLOWSKIN CO.',
    titleEn: 'Glow Serum — 3-Second Hook UGC Ad',
    titleBn: 'গ্লো সিরাম — ৩-সেকেন্ড হুক UGC',
    descEn: 'A hyper-realistic UGC creator hook that stops the scroll in under 3 seconds — 4.2x ROAS in the first 30 days.',
    descBn: 'একটি হাইপার-রিয়েলিস্টিক UGC ক্রিয়েটর হুক যা ৩ সেকেন্ডের মধ্যে স্ক্রল থামিয়ে দেয় — প্রথম ৩০ দিনে 4.2x ROAS।',
    duration: '0:32',
    views: '812K',
    thumbnail: serumImg,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeColor: '#c6f24e',
    isFeatured: true,
    status: 'published',
    createdAt: '2026-02-15'
  },
  {
    id: 'vid-2',
    cat: 'other', // Replaced 'spokesperson' with 'other'
    brand: 'FINEDGE APP',
    titleEn: 'FinEdge — AI Explainer & Motion Ad',
    titleBn: 'FinEdge — AI এক্সপ্লেইনার ও মোশন অ্যাড',
    descEn: 'Explaining a complex finance app in plain language — localized into 8 languages with seamless lip-sync and motion design.',
    descBn: 'একটি সহজ ভাষায় ফিনটেক অ্যাপ বোঝার অ্যাড — নিখুঁত মোশন ও লিপ-সিঙ্কসহ ৮টি ভাষায় রূপান্তর উপযোগী।',
    duration: '0:45',
    views: '428K',
    thumbnail: fintechImg,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeColor: '#2ed9e3',
    isFeatured: true,
    status: 'published',
    createdAt: '2026-02-20'
  },
  {
    id: 'vid-3',
    cat: 'commercial',
    brand: 'LUMIÈRE PARIS',
    titleEn: 'Lumière — Cinematic Commercial Product Film',
    titleBn: 'Lumière — সিনেমাটিক কমার্শিয়াল প্রোডাক্ট ফিল্ম',
    descEn: 'A cinematic product film with impossible camera moves — zero shoot days, full luxury-brand finish.',
    descBn: 'অসম্ভব ক্যামেরা মুভের সিনেমাটিক প্রোডাক্ট ফিল্ম — শূন্য শুটিং-ডে, ফুল লাক্সারি-ব্র্যান্ড ফিনিশ।',
    duration: '0:28',
    views: '356K',
    thumbnail: perfumeImg,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeColor: '#ff3d9a',
    isFeatured: true,
    status: 'published',
    createdAt: '2026-02-28'
  },
  {
    id: 'vid-4',
    cat: 'saas',
    brand: 'FLOWTASK',
    titleEn: 'FlowTask — High-Converting SaaS Promo Video',
    titleBn: 'FlowTask — হাই-কনভার্টিং SaaS প্রোমো ভিডিও',
    descEn: 'A fast-paced SaaS promo turning a complex workflow tool into one simple promise — signups jumped 61% after launch.',
    descBn: 'একটি জটিল ওয়ার্কফ্লো টুলকে এক সহজ প্রতিশ্রুতিতে রূপান্তরিত করা দ্রুতগতির SaaS প্রোমো — লঞ্চের পর সাইনআপ বেড়েছে ৬১%।',
    duration: '0:40',
    views: '194K',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeColor: '#a855f7',
    isFeatured: true,
    status: 'published',
    createdAt: '2026-03-01'
  },
  {
    id: 'vid-5',
    cat: 'unbox',
    brand: 'NORDIC BOX',
    titleEn: 'Nordic Box — Viral Unboxing Cut',
    titleBn: 'Nordic Box — ভাইরাল আনবক্সিং কাট',
    descEn: 'A review-style unboxing that felt so real customers asked which influencer made it — 1.1M organic views.',
    descBn: 'এত রিয়েল লাগা একটি রিভিউ-স্টাইল আনবক্সিং যে কাস্টমাররা জিজ্ঞেস করেছে কোন ইনফ্লুয়েন্সার বানিয়েছে — ১.১M অর্গানিক ভিউ।',
    duration: '0:35',
    views: '267K',
    thumbnail: warehouseImg,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeColor: '#c6f24e',
    isFeatured: true,
    status: 'published',
    createdAt: '2026-03-04'
  },
  {
    id: 'vid-6',
    cat: 'vsl',
    brand: 'COACH MARCUS B.',
    titleEn: 'High-Ticket Coaching Funnel VSL',
    titleBn: 'হাই-টিকিট কোচিং ফানেল VSL',
    descEn: 'A full direct-response VSL — hook, story, offer, close — converting cold traffic at 3.1% on a high-ticket coaching funnel.',
    descBn: 'একটি সম্পূর্ণ ডিরেক্ট-রেসপন্স VSL — হুক, স্টোরি, অফার, ক্লোজ — হাই-টিকিট কোচিং ফানেলে কোল্ড ট্রাফিক ৩.১% কনভার্ট করছে।',
    duration: '2:15',
    views: '145K',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeColor: '#2ed9e3',
    isFeatured: true,
    status: 'published',
    createdAt: '2026-03-08'
  },
  {
    id: 'vid-7',
    cat: 'demo',
    brand: 'AURA AUDIO',
    titleEn: 'Aura Pro — Active Noise Cancelling Product Demo',
    titleBn: 'Aura Pro — অ্যাক্টিভ নয়েজ ক্যানসেলিং প্রোডাক্ট ডেমো',
    descEn: 'Interactive 3D product showcase demonstrating audio driver isolation and battery longevity for e-commerce checkout boost.',
    descBn: 'অডিও ড্রাইভার আইসোলেশন ও দীর্ঘ ব্যাটারি লাইফ প্রদর্শনের ইন্টারেক্টিভ প্রোডাক্ট ডেমো যা কনভার্সন বৃদ্ধি করে।',
    duration: '0:38',
    views: '215K',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeColor: '#ff3d9a',
    isFeatured: false,
    status: 'published',
    createdAt: '2026-03-10'
  },
  {
    id: 'vid-8',
    cat: 'agency_promo',
    brand: 'SOLARIS ECO',
    titleEn: 'Solaris — Clean Tech Storytelling Brand Film',
    titleBn: 'Solaris — ক্লিন টেক ব্র্যান্ড স্টোরিটেলিং ফিল্ম',
    descEn: 'A high-impact environmental technology commercial connecting solar adoption with tangible customer savings.',
    descBn: 'সৌর শক্তি গ্রহণ ও প্রত্যক্ষ গ্রাহক সাশ্রয়ের মধ্যে সংযোগকারী একটি প্রভাবশালী ব্র্যান্ড ফিল্ম।',
    duration: '0:50',
    views: '310K',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeColor: '#c6f24e',
    isFeatured: false,
    status: 'published',
    createdAt: '2026-03-12'
  }
];

export const DEFAULT_SHOWREEL: ShowreelData = {
  titleEn: 'KINETIVO LAB — 2026 Showreel',
  titleBn: 'কিনেটিভো ল্যাব — ২০২৬ শোরিল',
  descEn: 'UGC ads, AI spokespersons, VSLs & cinematic concepts in one cut.',
  descBn: 'UGC অ্যাড, AI স্পোকসপারসন, VSL ও সিনেমাটিক কনসেপ্ট — এক কাটে।',
  duration: '0:08',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'
};

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: '3-second-hook-secret',
    titleEn: 'The 3-Second Rule: Why 90% of Video Ads Die in the Feed',
    titleBn: '৩-সেকেন্ড রুল: কেন ৯০% ভিডিও বিজ্ঞাপন ফিডে ব্যর্থ হয়',
    subtitleEn: 'How direct-response visual pattern interrupts can double your hook rate without raising ad spend.',
    subtitleBn: 'কীভাবে ভিজ্যুয়াল প্যাটার্ন ইন্টারাপ্ট অ্যাড স্পেন্ড না বাড়িয়েই আপনার হুক রেট দ্বিগুণ করতে পারে।',
    contentEn: `## The Modern Feed Is Merciless

In 2026, social media users scroll through hundreds of feet of digital content daily. If your video ad begins with a slow logo animation, corporate intro, or polite greeting, viewers have already swiped away.

### 1. The Anatomy of an Unstoppable Hook
- **Pattern Interrupt**: An unexpected visual or jarring sound in the first 0.8 seconds.
- **Immediate Value or Problem Statement**: Address a visceral pain point immediately.
- **Relatable Human Element**: UGC and authentic presentations convert up to 300% better than sterile studio shoots.

> "A great ad doesn't feel like an ad; it feels like an urgent secret a friend is sharing with you."

### 2. Testing Multiple Angles
Never rely on a single hook. Top DTC brands test 3 to 5 opening variations for every core ad concept to find the 10x winner.`,
    contentBn: `## ফিডের বর্তমান বাস্তবতা

২০২৬ সালে একজন সোশ্যাল মিডিয়া ব্যবহারকারী প্রতিদিন কয়েকশ ফুট কনটেন্ট স্ক্রল করেন। আপনার বিজ্ঞাপন যদি একটি ধীরগতির লোগো অ্যানিমেশন বা নম্র সম্ভাষণ দিয়ে শুরু হয়, তবে ভিউয়ার ইতিমধ্যেই স্ক্রল করে চলে গেছেন।

### ১. কার্যকর হুকের মূল উপাদান
- **প্যাটার্ন ইন্টারাপ্ট**: প্রথম ০.৮ সেকেন্ডে একটি অপ্রত্যাশিত দৃশ্য বা শব্দ।
- **স্পষ্ট সমস্যা সমাধান**: সরাসরি কাস্টমারের পেইন পয়েন্ট তুলে ধরা।
- **স্বাভাবিক উপস্থাপন**: আসল অনুভূতির মতো উপস্থাপনা কৃত্রিম কর্পোরেট বিজ্ঞাপনের চেয়ে ৩০০% বেশি ফলপ্রসূ।

> "একটি সেরা বিজ্ঞাপন বিজ্ঞাপনের মতো মনে হয় না; মনে হয় একজন বিশ্বস্ত বন্ধুর দরকারি পরামর্শ।"

### ২. একাধিক অ্যাঙ্গেল পরীক্ষা
কখনও একটিমাত্র হুকের উপর নির্ভর করবেন না। সফল ব্র্যান্ডগুলো প্রতিটি কনসেপ্টের জন্য কমপক্ষে ৩ থেকে ৫টি ভিন্ন হুক টেস্ট করে।`,
    bannerImg: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    author: 'Hisham Islam',
    date: 'March 2026',
    readTime: '4 min read',
    showInNav: true,
    showInFooter: true,
    status: 'published'
  },
  {
    id: 'blog-2',
    slug: 'ai-ugc-vs-traditional-creators',
    titleEn: 'AI UGC vs Traditional Influencers: The 2026 Performance Study',
    titleBn: 'AI UGC বনাম প্রচলিত ইনফ্লুয়েন্সার: ২০২৬-এর পারফরম্যান্স সমীক্ষা',
    subtitleEn: 'Why top DTC brands are cutting creator fees by 75% while scaling campaign variations across 12 markets.',
    subtitleBn: 'কেন শীর্ষ DTC ব্র্যান্ডগুলো ক্রিয়েটর ফি ৭৫% কমাচ্ছে এবং একই সাথে ১২টি বাজারে ক্যাম্পেইন স্কেল করছে।',
    contentEn: `## The Influencer Fatigue

Traditional creator marketing has hit a bottleneck: high fees, delayed turnaround times of 3-4 weeks, unpredictable delivery, and expensive reshoots.

### The Advantage of AI Creative Direction
1. **Speed to Market**: 48 to 72 hours from brief to live ad.
2. **Localization at Scale**: One concept natively translated and lip-synced into 200+ languages without shooting 200 actors.
3. **Iterative Freedom**: Tweak a single sentence or pricing offer in minutes, not weeks.

Brands leveraging automated creative production are achieving higher ROAS and lower customer acquisition costs.`,
    contentBn: `## ইনফ্লুয়েন্সার জটিলতা

প্রচলিত ক্রিয়েটর মার্কেটিংয়ে নানা সীমাবদ্ধতা তৈরি হয়েছে: অতিরিক্ত ফি, ৩-৪ সপ্তাহের দীর্ঘ সময়, অনিয়মিত ডেলিভারি এবং পুনরায় শুটিংয়ের চড়া খরচ।

### কৃত্রিম বুদ্ধিমত্তা চালিত ক্রিয়েটিভের সুবিধা
১. **তাত্ক্ষণিক ডেলিভারি**: ব্রিফ থেকে লঞ্চ মাত্র ৪৮ থেকে ৭২ ঘণ্টায়।
২. **আন্তর্জাতিক সম্প্রসারণ**: একটি কনসেপ্ট সহজেই ২০০টির বেশি ভাষায় স্থানীয় লিপ-সিঙ্কসহ তৈরি করা যায়।
৩. **সহজ পরিবর্তন**: অফার বা দাম কয়েক মিনিটেই আপডেট করা সম্ভব।`,
    bannerImg: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
    videoUrl: '',
    author: 'KINETIVO Team',
    date: 'February 2026',
    readTime: '5 min read',
    showInNav: true,
    showInFooter: true,
    status: 'published'
  }
];

export const DEFAULT_EXTRA_PAGES: ExtraPage[] = [
  {
    id: 'page-about',
    slug: 'about-us',
    titleEn: 'About KINETIVO LAB',
    titleBn: 'কিনেটিভো ল্যাব সম্পর্কে',
    subtitleEn: 'We bridge hyper-realistic creative AI and direct-response performance advertising.',
    subtitleBn: 'আমরা বাস্তবসম্মত ক্রিয়েটিভ এআই এবং ডিরেক্ট-রেসপন্স বিজ্ঞাপনের সমন্বয় ঘটাই।',
    contentEn: `## Who We Are

KINETIVO LAB is an elite AI-powered video advertising studio based in Bangladesh and serving visionary e-commerce brands, SaaS companies, and digital creators worldwide.

### Our Philosophy: Ideas In Motion
We believe that creative fatigue is the single biggest threat to paid media ROI. To win in today's algorithmic landscape, brands need continuous, high-volume testing of scroll-stopping creative assets.

### What Sets Us Apart
- **Speed**: Ready-to-launch creatives delivered in 48–72 hours.
- **Global Reach**: 200+ languages supported with native accents and realistic lip-sync.
- **ROI-Driven**: Built for Meta, TikTok, and YouTube direct response funnels.
- **Full Commercial Rights**: Every video belongs to you 100% with no ongoing royalty strings attached.`,
    contentBn: `## আমরা কারা

কিনেটিভো ল্যাব একটি আধুনিক AI-চালিত ভিডিও বিজ্ঞাপন স্টুডিও। বাংলাদেশ থেকে পরিচালিত হলেও আমরা বিশ্বের শীর্ষ ই-কমার্স ব্র্যান্ড, SaaS কোম্পানি ও ডিজিটাল উদ্যোক্তাদের সেবা প্রদান করি।

### আমাদের দর্শন: আইডিয়া যখন গতিশীল
আমরা বিশ্বাস করি যে ক্রিয়েটিভের ক্লান্তিই পেইড ক্যাম্পেইনের সবচেয়ে বড় অন্তরায়। বর্তমান অ্যালগরিদমে জয়ী হতে হলে ব্র্যান্ডগুলোর নিয়মিত স্ক্রল-থামানো বৈচিত্র্যময় কনটেন্ট দরকার।

### কেন আমরা ব্যতিক্রমী
- **গতি**: ৪৮ থেকে ৭২ ঘণ্টার মধ্যে লঞ্চ-রেডি ভিডিও ডেলিভারি।
- **বিশ্বব্যাপী পরিধি**: ২০০টির বেশি ভাষায় নেটিভ লিপ-সিঙ্ক সাপোর্ট।
- **বাণিজ্যিক অধিকার**: প্রতিটি ভিডিওর শতভাগ মালিকানা আপনার।`,
    bannerImg: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
    videoUrl: '',
    showInNav: true,
    showInFooter: true,
    status: 'published'
  },
  {
    id: 'page-terms',
    slug: 'terms-and-privacy',
    titleEn: 'Commercial Terms & Privacy Policy',
    titleBn: 'শর্তাবলী ও গোপনীয়তা নীতি',
    subtitleEn: 'Full commercial rights, transparent licensing, and ironclad client privacy guarantee.',
    subtitleBn: 'সম্পূর্ণ বাণিজ্যিক অধিকার, স্বচ্ছ লাইসেন্স এবং নির্ভরযোগ্য গোপনীয়তা নিশ্চয়তা।',
    contentEn: `## Commercial Licensing

All video ads, graphics, and copy created by KINETIVO LAB come with full, perpetual, worldwide commercial usage rights.

### Key Points:
1. **Ownership**: You own 100% of the delivered deliverables once final balance is settled.
2. **Paid Advertising**: You have unrestricted rights to whitelist, run Spark Ads, TV commercials, and paid digital campaigns across Meta, TikTok, Google, YouTube, and Amazon.
3. **Data Privacy**: We never share your product briefs, unreleased assets, or proprietary funnel data with third parties.`,
    contentBn: `## বাণিজ্যিক লাইসেন্স

কিনেটিভো ল্যাব কর্তৃক তৈরি প্রতিটি ভিডিও বিজ্ঞাপন, গ্রাফিক্স এবং স্ক্রিপ্টের সাথে আপনি পাবেন অনির্দিষ্টকালের সম্পূর্ণ বাণিজ্যিক ব্যবহারের অধিকার।

### মূল নীতিসমূহ:
১. **মালিকানা**: চূড়ান্ত কাজ হস্তান্তরের সাথে সাথে আপনি এর ১০০% মালিকানা লাভ করবেন।
২. **পেইড অ্যাডভার্টাইজিং**: ফেসবুক, টিকটক, গুগল ও ইউটিউবে কোনো অতিরিক্ত রয়্যালটি ছাড়াই বিজ্ঞাপন চালাতে পারবেন।
৩. **ডেটা নিরাপত্তা**: আপনার কোনো তথ্য বা পণ্যের বিবরণ কখনোই তৃতীয় পক্ষের কাছে প্রকাশ করা হয় না।`,
    bannerImg: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    videoUrl: '',
    showInNav: false,
    showInFooter: true,
    status: 'published'
  }
];

export const DEFAULT_SETTINGS: SiteSettings = {
  siteNameEn: 'KINETIVO LAB — AI Ad Studio',
  siteNameBn: 'কিনেটিভো ল্যাব — AI অ্যাড স্টুডিও',
  taglineEn: 'Ideas In Motion',
  taglineBn: 'আইডিয়া যখন গতিশীল',
  logoUrl: '', // Default logo mark rendered via SVG/Base64
  heroBgImage: heroBgImg,
  contactEmail: 'hello@kinetivo.lab',
  responseTime: '< 12 hrs', // Clean & fixed
  location: 'Bangladesh & worldwide — 100% remote', // Clean & fixed
  passcode: 'KineL1525', // Default security passcode requested by user
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    tiktok: 'https://tiktok.com',
    linkedin: 'https://linkedin.com'
  },
  stats: {
    brandsScaled: '340+',
    viewsGenerated: '2.4M+',
    languagesSupported: '200+',
    deliveryTime: '48H',
    avgRoas: '4.8x',
    hookRate: '+212%'
  }
};

export const DEFAULT_FRONT_TEXTS: FrontTexts = {
  heroBadge1En: 'AI-Powered UGC Ad Studio',
  heroBadge1Bn: 'AI-চালিত UGC অ্যাড স্টুডিও',
  heroBadge2En: 'Accepting New Brands',
  heroBadge2Bn: 'নতুন ব্র্যান্ড নেওয়া হচ্ছে',
  heroHeadingEn: 'Scroll-Stopping Video Ads That Turn Views Into Customers',
  heroHeadingBn: 'স্ক্রল-থামানো ভিডিও বিজ্ঞাপন যা ভিউকে বানায় কাস্টমার',
  heroParagraphEn: 'We create high-converting video ads, AI spokespersons & VSLs for TikTok, Instagram & Facebook. Stop burning money on slow, overpriced creators — scale faster with hyper-realistic AI UGC.',
  heroParagraphBn: 'আমরা তৈরি করি হাই-কনভার্টিং ভিডিও অ্যাড, AI স্পোকসপারসন ও VSL — TikTok, Instagram ও Facebook-এর জন্য। ধীরগতির, বেশি দামি ক্রিয়েটরদের পেছনে টাকা খরচ বন্ধ করুন — হাইপার-রিয়েলিস্টিক AI UGC দিয়ে দ্রুত স্কেল করুন।',
  servicesHeadingEn: 'Everything your brand needs to dominate the feed',
  servicesHeadingBn: 'আপনার ব্র্যান্ডের জন্য দরকার এমন সবকিছু, যা ফিড দখল করবে',
  servicesSubEn: 'Custom AI ads, hyper-realistic UGC, spokespersons, VSLs & viral social content — designed to hook attention in 3 seconds and drive real sales.',
  servicesSubBn: 'কাস্টম AI অ্যাড, হাইপার-রিয়েলিস্টিক UGC, স্পোকসপারসন, VSL ও ভাইরাল সোশ্যাল কনটেন্ট — মাত্র ৩ সেকেন্ডে অ্যাটেনশন হুক করতে এবং আসল সেল আনতে ডিজাইন করা।',
  whyHeadingEn: 'Stop burning money on slow creators',
  whyHeadingBn: 'ধীরগতির ক্রিয়েটরে টাকা খরচ বন্ধ করুন',
  whySubEn: 'Traditional influencers charge hundreds and take weeks. We deliver premium, realistic AI ads in days — built to convert, priced to scale.',
  whySubBn: 'প্রচলিত ইনফ্লুয়েন্সাররা শত শত ডলার নেয়, সপ্তাহ সময় নেয়। আমরা প্রিমিয়াম, রিয়েলিস্টিক AI অ্যাড দিচ্ছি দিনের মধ্যে — কনভার্ট করার জন্য বানানো, স্কেল করার জন্য দামে।',
  processHeadingEn: 'From brief to viral ad in 3 steps',
  processHeadingBn: 'ব্রিফ থেকে ভাইরাল অ্যাড মাত্র ৩ ধাপে',
  pricingHeadingEn: 'Premium ads, startup-friendly pricing',
  pricingHeadingBn: 'প্রিমিয়াম অ্যাড, স্টার্টআপ-ফ্রেন্ডলি দামে',
  reviewsHeadingEn: 'Brands that stopped scrolling & started selling',
  reviewsHeadingBn: 'ব্র্যান্ড যারা স্ক্রলিং থামিয়ে সেলিং শুরু করেছে',
  contactHeadingEn: 'Ready to make your brand unmissable?',
  contactHeadingBn: 'আপনার ব্র্যান্ডকে বানাতে চান অপ্রতিরোধ্য?',
  contactSubEn: 'Send your product or service link and let us see how AI video ads can turn your audience into customers. Free concept, zero pressure.',
  contactSubBn: 'আপনার প্রোডাক্ট বা সার্ভিস লিংক পাঠান — দেখুন কীভাবে AI ভিডিও অ্যাড আপনার অডিয়েন্সকে কাস্টমারে রূপান্তর করতে পারে। ফ্রি কনসেপ্ট, কোনো চাপ নেই।'
};
