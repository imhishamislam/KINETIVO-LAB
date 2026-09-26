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
import aboutCoverImg from '../assets/images/about_studio_creative_1790453486299.jpg';
import termsCoverImg from '../assets/images/legal_security_guarantee_1790453500441.jpg';

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
    featuredOrder: 1,
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
    featuredOrder: 2,
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
    featuredOrder: 3,
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
    featuredOrder: 4,
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
    featuredOrder: 5,
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
    featuredOrder: 6,
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
  titleEn: 'KINETIVO STUDIO — 2026 Showreel',
  titleBn: 'কিনেটিভো স্টুডিও — ২০২৬ শোরিল',
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
    titleEn: 'About KINETIVO STUDIO',
    titleBn: 'কিনেটিভো স্টুডিও সম্পর্কে',
    subtitleEn: 'An elite AI-powered video advertising and performance creative studio engineering high-converting direct response assets for ambitious global brands.',
    subtitleBn: 'উচ্চ-রূপান্তরকারী ভিডিও বিজ্ঞাপন এবং পারফরম্যান্স ক্রিয়েটিভ স্টুডিও — যা উচ্চাকাঙ্ক্ষী গ্লোবাল ব্র্যান্ডের জন্য তৈরি করে স্ক্রল-থামানো আসল রেভিনিউ ক্রিয়েটিভ।',
    contentEn: `## Who We Are: The New Paradigm of Creative Production

KINETIVO STUDIO is a modern AI-first commercial production and performance creative powerhouse. Headquartered in Bangladesh and engineering high-impact campaigns worldwide, we bridge cutting-edge generative cinematography, algorithmic direct response architecture, and deep consumer psychology.

We exist for one relentless mission: **to eradicate creative fatigue and build unstoppable paid media funnels for visionaries, DTC founders, and digital enterprises.**

### Why Traditional Video Production Fails in 2026
In today's fast-moving algorithmic media landscape (TikTok, Meta, Reels, YouTube Shorts), ad fatigue sets in within 5 to 9 days. Traditional agency models are structurally broken:
- **Painfully Slow**: 3 to 6 weeks from kickoff to delivery.
- **Exorbitantly Expensive**: $3,000–$10,000+ per shoot day with actors, equipment rentals, location scouting, and catering.
- **Zero Agility**: If a creative angle flops, reshooting requires new contracts, new invoices, and another month of wasted momentum.

### The KINETIVO Advantage: Hyper-Realistic Production at Warp Speed
At KINETIVO STUDIO, we replace slow shoot days with proprietary generative video pipelines, high-fidelity lip-sync engines, and direct-response performance scripts:
- **Lightning 48–72 Hour Turnaround**: Test fresh creative angles every single week before your competitors even finish their storyboard meetings.
- **Infinite Native Localization (200+ Languages)**: Scale winning winning ad hooks across European, Middle Eastern, Asian, and Latin American markets with authentic local dialects and natural facial resonance.
- **Performance-First DNA**: Every second of video is engineered around the **3-Second Hook Rate**, **Hold Rate**, and **Click-to-Purchase Conversion**.
- **100% Complete Commercial Ownership**: No royalties, no talent buyout renewals, and no usage limitations.

### Our 3-Pillar Creative Philosophy

#### 1. The 0.8-Second Pattern Interrupt
The modern human thumb scrolls 300 feet of content daily. Our creative scientists engineer sensory disruption in the first frame — unexpected camera moves, sound cues, and visceral curiosity gaps that compel the viewer to stop immediately.

#### 2. Direct-Response Emotional Resonance
Great visuals mean nothing without buyer conviction. Our scripts combine problem agitation, empathetic founder or customer narratives, hyper-detailed social proof, and undeniable value demonstrations that build rapid trust.

#### 3. Algorithmic Iteration & Angle Diversity
We believe creative volume beats guesswork. By testing 5 to 10 distinct hook angles for each product, we identify 10x winners that drop your blended Customer Acquisition Cost (CAC) by up to 60%.

### Global Reach & Technical Excellence
From high-converting TikTok UGC and luxury 3D product commercials to complex B2B SaaS explainers and 15-minute high-ticket VSLs, KINETIVO STUDIO equips your brand with elite visual assets that dominate ad feeds worldwide.`,
    contentBn: `## আমরা কারা: ক্রিয়েটিভ প্রোডাকশনের আধুনিক রূপান্তর

কিনেটিভো স্টুডিও একটি সর্বাধুনিক এআই-চালিত কর্মার্শিয়াল ভিডিও বিজ্ঞাপন ও পারফরম্যান্স ক্রিয়েটিভ স্টুডিও। বাংলাদেশ থেকে পরিচালিত হলেও আমরা যুক্তরাষ্ট্র, যুক্তরাজ্য, মধ্যপ্রাচ্য ও বিশ্বজুড়ে নেতৃস্থানীয় ইকমার্স ব্র্যান্ড, স্যাজ (SaaS) কোম্পানি ও ডিজিটাল প্রতিষ্ঠানে সেবা প্রদান করি।

আমাদের মূল লক্ষ্য: **ক্রিয়েটিভের ক্লান্তি দূর করে পেইড অ্যাডভার্টাইজিংয়ে সর্বোচ্চ আরওএএস (ROAS) ও কাস্টমার অ্যাকুইজিশন নিশ্চিত করা।**

### কেন প্রচলিত ভিডিও শুটিং ২০২৬ সালে অচল?
বর্তমান দ্রুতগতির মেটা (Facebook/Instagram), টিকটক ও ইউটিউব অ্যালগরিদমে যেকোনো ভালো ক্রিয়েটিভ ৭ থেকে ১০ দিনের মধ্যেই দর্শককে ক্লান্ত করে ফেলে। সনাতন প্রোডাকশন হাউজের মডেল এখন অকার্যকর:
- **অত্যন্ত ধীরগতি**: শুটিং ব্রিফ থেকে ডেলিভারি পেতে ৩ থেকে ৬ সপ্তাহ সময় নষ্ট হয়।
- **অতিরিক্ত ব্যয়বহুল**: প্রতিটি শুটিং-ডেতে অভিনেতা, স্টুডিও ভাড়া ও টেকনিক্যাল ক্রু বাবদ হাজার হাজার ডলার খরচ হয়।
- **পরিবর্তন অসম্ভব**: একটি কনসেপ্ট বাজারে কাজ না করলে নতুন করে রিশুটিং করতে আরও কয়েক সপ্তাহ ও অর্থ ব্যয় হয়।

### কিনেটিভো স্টুডিওর অনন্য সুবিধাসমূহ
কিনেটিভো স্টুডিও আধুনিক জেনারেটিভ এআই ও হাইপার-রিয়েলিস্টিক ভিজ্যুয়াল প্রযুক্তির সাহায্যে পুরো প্রক্রিয়াটিকে গতিশীল করেছে:
- **৪৮ থেকে ৭২ ঘণ্টায় ডেলিভারি**: সপ্তাহ নয়, দিনের মধ্যেই লঞ্চ-রেডি হাই-কনভার্টিং বিজ্ঞাপন হাতে পান।
- **২০০+ ভাষায় নেটিভ লোকালাইজেশন**: একই বিজ্ঞাপন নিখুঁত লিপ-সিঙ্ক ও স্থানীয় উচ্চারণে বিশ্বের যেকোনো প্রান্তের দর্শকের কাছে পৌঁছে দিন।
- **ডিরেক্ট-রেসপন্স ভিত্তিক স্ক্রিপ্ট**: প্রতিটি সেকেন্ড পরিকল্পিত হয় প্রথম ৩-সেকেন্ডের হুক রেট ও সেলস কনভার্সন বৃদ্ধির জন্য।
- **শতভাগ বাণিজ্যিক মালিকানা**: আজীবন সম্পূর্ণ ব্যবহারের অধিকার, কোনো অতিরিক্ত রয়্যালটি বা ফি ছাড়া।

### আমাদের ৩টি মূল কর্মপদ্ধতি

#### ১. ০.৮-সেকেন্ডের প্যাটার্ন ইন্টারাপ্ট
সোশ্যাল মিডিয়ার দ্রুতগতির ফিডে দর্শককে প্রথম মুহূর্তেই থামিয়ে দেওয়া আমাদের প্রথম কাজ। অদ্ভুত ফ্রেম মুভমেন্ট, অপ্রত্যাশিত সাউন্ড ও চোখ ধাঁধানো ভিজ্যুয়াল দিয়ে আমরা স্ক্রল থামাই।

#### ২. মানসিক সংযোগ ও বিশ্বাসযোগ্যতা
শুধু সুন্দর ছবি নয়, পণ্যের আসল মূল্য ও কাস্টমারের দৈনন্দিন সমস্যার সমাধান স্পষ্টভাবে তুলে ধরা হয় যাতে দ্রুত কেনার সিদ্ধান্ত তৈরি হয়।

#### ৩. বৈচিত্র্যময় হুক ও অ্যাঙ্গেল টেস্টিং
একই পণ্যের বিভিন্ন দৃষ্টিকোণ (UGC রিভিউ, আনবক্সিং, তুলনা, সিনেমাটিক ফিল) দ্রুত তৈরি করে টেস্ট করার সুবিধা, যা অ্যাড স্পেন্ড কমাতে সাহায্য করে।`,
    bannerImg: aboutCoverImg,
    videoUrl: '',
    showInNav: true,
    showInFooter: true,
    status: 'published'
  },
  {
    id: 'page-terms',
    slug: 'terms-and-privacy',
    titleEn: 'Commercial Terms & Privacy Policy',
    titleBn: 'বাণিজ্যিক শর্তাবলী ও গোপনীয়তা নীতি',
    subtitleEn: 'Ironclad commercial IP ownership, worldwide perpetual licensing, transparent deliverables, and enterprise-grade client data confidentiality.',
    subtitleBn: 'সম্পূর্ণ আইপি মালিকানা, আন্তর্জাতিক বাণিজ্যিক লাইসেন্স, স্বচ্ছ ডেলিভারি গ্যারান্টি এবং নির্ভরযোগ্য প্রাতিষ্ঠানিক গোপনীয়তা নীতি।',
    contentEn: `## Master Commercial Terms & Service Agreement

At KINETIVO STUDIO, we believe in complete operational transparency, mutual trust, and uncompromising legal clarity. All creative services, video assets, copy, scripts, and rendered media delivered by KINETIVO STUDIO are governed by the following master terms.

### 1. 100% Perpetual Worldwide Commercial Rights
Upon settlement of the final invoice or package payment, **you receive 100% full, irrevocable, and perpetual commercial exploitation rights** for all finalized deliverables:
- **Unrestricted Whitelisting & Paid Ads**: Run Spark Ads, Meta Dark Posts, YouTube Pre-Rolls, Google Performance Max, Amazon Video Ads, and digital TV without any usage renewal fees.
- **Broadcast & Digital Distribution**: Freely publish across websites, OTT platforms, landing pages, digital billboards, and brand social channels worldwide.
- **No Royalty Clawbacks**: Unlike traditional talent agencies that impose 6-month or 1-year likeness caps, KINETIVO STUDIO deliverables have **zero talent expiration dates**.

### 2. Intellectual Property & Brand Assets
- **Client Materials**: You retain absolute, exclusive ownership of all logos, trademarks, product samples, proprietary raw footage, and brand assets provided to KINETIVO STUDIO.
- **Final Deliverables**: KINETIVO STUDIO transfers full title to the finished, rendered video files and accompanying advertising scripts upon completion.
- **Portfolio Showcase**: Unless you explicitly request a Non-Disclosure Agreement (NDA), KINETIVO STUDIO reserves the customary right to display finished work in our public portfolio and showreel to celebrate creative excellence.

### 3. Turnaround, Delivery & Revision Policy
- **Turnaround Guarantee**: Standard deliverables are completed within 48 to 72 business hours after brief sign-off and asset receipt.
- **Iterative Revisions**: Every standard creative tier includes dedicated revision rounds to fine-tune pacing, audio balance, copy adjustments, subtitles, or color grading.
- **Concept Pivot**: If a script adjustment is requested prior to final rendering, we pivot immediately at no structural penalty.

### 4. Enterprise-Grade Client Privacy & Confidentiality
Your proprietary funnel metrics, unreleased product launches, and strategic advertising angles are protected under strict confidentiality protocols:
- **Strict Non-Disclosure**: We never disclose your ad spend, ROAS performance metrics, supplier contacts, or unreleased SKU specifications to third parties.
- **Encrypted Asset Handling**: All client briefs and confidential assets are transferred and stored in secure, encrypted cloud environments.
- **Mutual NDAs**: We gladly execute custom Non-Disclosure Agreements for enterprise and venture-backed clients upon request.

### 5. Payment, Invoicing & Satisfaction Guarantee
- **Transparent Milestone Pricing**: Clear, upfront pricing with zero hidden surcharges, zero rendering fees, and zero licensing markups.
- **Secure Processing**: Payments are securely processed through verified international payment gateways.
- **Dedicated Account Support**: Direct point of contact for project continuity, rapid script adjustments, and ongoing creative strategy consultation.`,
    contentBn: `## সার্বজনীন বাণিজ্যিক শর্তাবলী ও প্রাতিষ্ঠানিক নীতি

কিনেটিভো স্টুডিওর সাথে চুক্তিবদ্ধ প্রতিটি ক্লায়েন্টের জন্য আমাদের নীতি সম্পূর্ণ স্বচ্ছ, নির্ভরযোগ্য এবং আইনিভাবে সুরক্ষিত। আমাদের দ্বারা তৈরিকৃত প্রতিটি ভিডিও ক্রিয়েটিভ ও সেবার ক্ষেত্রে নিচের নীতিমালা প্রযোজ্য:

### ১. শতভাগ বাণিজ্যিক ও আজীবন মালিকানা অধিকার
চূড়ান্ত পেমেন্ট সম্পন্ন হওয়ার সাথে সাথে গ্রাহক তৈরিকৃত সমস্ত ভিডিও ফাইলের **১০০% আজীবন, আন্তর্জাতিক ও অপ্রতিরোধ্য বাণিজ্যিক স্বত্বাধিকার** লাভ করবেন:
- **পেইড অ্যাডভার্টাইজিং**: ফেসবুক, ইনস্টাগ্রাম, টিকটক, গুগল, ইউটিউব ও ডিজিটাল প্ল্যাটফর্মে কোনো অতিরিক্ত রয়্যালটি বা মেয়াদোত্তীর্ণের ফি ছাড়াই যতখুশি বিজ্ঞাপন চালাতে পারবেন।
- **মেয়াদহীন ব্যবহার**: কোনো অভিনেতা বা মডেলের ১ বছর মেয়াদের লিমিটেশন নেই; আজীবন ব্যবহার করতে পারবেন।
- **মাল্টি-প্ল্যাটফর্ম সুবিধা**: ওয়েবসাইট, সোশ্যাল মিডিয়া, ইমেইল ফানেল বা টিভিসি সর্বত্র প্রকাশের অবাধ স্বাধীনতা।

### ২. বুদ্ধিবৃত্তিক সম্পদ ও ক্লায়েন্টের স্বত্ব
- **ক্লায়েন্টের উপাদান**: আপনার নিজস্ব লোগো, ট্রেডমার্ক, প্রডাক্ট ফটো ও কাঁচামালের শতভাগ মালিকানা সর্বদা আপনারই থাকবে।
- **চুড়ান্ত ফাইল**: প্রজেক্ট সম্পূর্ণ হলে হাই-রেজোলিউশন ৪K/১০৮০p রেন্ডার করা ভিডিও এবং স্ক্রিপ্টের পূর্ণ অধিকার আপনাকে হস্তান্তর করা হয়।
- **পোর্টফোলিও প্রদর্শন**: গোপনীয়তা চুক্তি (NDA) না থাকলে আমরা আমাদের সেরা কাজের স্বীকৃতিস্বরূপ পোর্টফোলিও বা শোরিলে ভিডিও প্রদর্শন করতে পারি।

### ৩. ডেলিভারি সময়সীমা ও রিভিশন নীতি
- **দ্রুত ডেলিভারি**: ব্রিফ ফাইনাল হওয়ার পর সাধারণত ৪৮ থেকে ৭২ ঘণ্টার মধ্যে প্রথম ড্রাফট হস্তান্তর করা হয়।
- **রিভিশন সাপোর্ট**: প্রতিটি প্যাকেজে টেক্সট, সাবটাইটেল, মিউজিক বা কালার পরিবর্তনের জন্য প্রয়োজনীয় রিভিশন সুবিধা অন্তর্ভুক্ত থাকে।
- **মান নিশ্চয়তা**: ক্লায়েন্টের সন্তুষ্টি আমাদের শীর্ষ অগ্রাধিকার।

### ৪. ডেটা নিরাপত্তা ও ব্যবসায়িক গোপনীয়তা
- **পণ্যের গোপনীয়তা**: আপনার অপ্রকাশিত পণ্য, সাপ্লায়ার বা ব্যবসায়িক ডেটা কখনো তৃতীয় পক্ষের কাছে প্রকাশ করা হয় না।
- **এনক্রিপ্টেড ক্লাউড স্টোরেজ**: আপনার পাঠানো ব্রিফ ও ফাইল আধুনিক নিরাপত্তা ব্যবস্থায় সংরক্ষিত থাকে।
- **কাস্টম এনডিএ (NDA)**: ক্লায়েন্টের প্রয়োজনে আমরা প্রাতিষ্ঠানিক নন-ডিসক্লোজার এগ্রিমেন্টে স্বাক্ষর করতে সদা প্রস্তুত।`,
    bannerImg: termsCoverImg,
    videoUrl: '',
    showInNav: false,
    showInFooter: true,
    status: 'published'
  }
];

export const DEFAULT_SETTINGS: SiteSettings = {
  siteNameEn: 'KINETIVO STUDIO — AI Ad Studio',
  siteNameBn: 'কিনেটিভো স্টুডিও — AI অ্যাড স্টুডিও',
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
  heroParagraphEn: 'We create high-converting video ads, AI spokespersons & VSLs for All Digital Platforms. Stop burning money on slow, overpriced creators — scale faster with hyper-realistic AI UGC.',
  heroParagraphBn: 'আমরা তৈরি করি হাই-কনভার্টিং ভিডিও অ্যাড, AI স্পোকসপারসন ও VSL — All Digital Platforms-এর জন্য। ধীরগতির, বেশি দামি ক্রিয়েটরদের পেছনে টাকা খরচ বন্ধ করুন — হাইপার-রিয়েলিস্টিক AI UGC দিয়ে দ্রুত স্কেল করুন।',
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
