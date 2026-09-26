export type Language = 'en' | 'bn';

export type VideoCategory =
  | 'all'
  | 'commercial'
  | 'ugc'
  | 'demo'
  | 'saas'
  | 'unbox'
  | 'vsl'
  | 'agency_promo'
  | 'other';

export interface VideoItem {
  id: string;
  cat: VideoCategory;
  brand: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
  badgeColor?: string;
  isFeatured?: boolean;
  featuredOrder?: number; // 1 to 6 position order in ALL category on homepage
  status: 'published' | 'draft';
  createdAt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  contentEn: string;
  contentBn: string;
  bannerImg: string;
  videoUrl?: string;
  author: string;
  date: string;
  readTime: string;
  showInNav: boolean;
  showInFooter: boolean;
  status: 'published' | 'draft';
}

export interface ExtraPage {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  contentEn: string;
  contentBn: string;
  bannerImg: string;
  videoUrl?: string;
  showInNav: boolean;
  showInFooter: boolean;
  status: 'published' | 'draft';
}

export interface ShowreelData {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
}

export interface SiteSettings {
  siteNameEn: string;
  siteNameBn: string;
  taglineEn: string;
  taglineBn: string;
  logoUrl: string;
  heroBgImage: string;
  contactEmail: string;
  responseTime: string;
  location: string;
  passcode: string; // Default: "KineL1525"
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
    linkedin: string;
  };
  stats: {
    brandsScaled: string;
    viewsGenerated: string;
    languagesSupported: string;
    deliveryTime: string;
    avgRoas: string;
    hookRate: string;
  };
}

export interface FrontTexts {
  heroBadge1En: string;
  heroBadge1Bn: string;
  heroBadge2En: string;
  heroBadge2Bn: string;
  heroHeadingEn: string;
  heroHeadingBn: string;
  heroParagraphEn: string;
  heroParagraphBn: string;
  servicesHeadingEn: string;
  servicesHeadingBn: string;
  servicesSubEn: string;
  servicesSubBn: string;
  whyHeadingEn: string;
  whyHeadingBn: string;
  whySubEn: string;
  whySubBn: string;
  processHeadingEn: string;
  processHeadingBn: string;
  pricingHeadingEn: string;
  pricingHeadingBn: string;
  reviewsHeadingEn: string;
  reviewsHeadingBn: string;
  contactHeadingEn: string;
  contactHeadingBn: string;
  contactSubEn: string;
  contactSubBn: string;
}

export interface ImagePreset {
  id: string;
  name: string;
  category: string;
  url: string;
}

export interface ProjectLead {
  id: string;
  name: string;
  email: string;
  brand?: string;
  link?: string;
  interest: string;
  budget?: string;
  goal?: string;
  submittedAt: string;
  source: 'contact-section' | 'brief-modal';
  status: 'new' | 'contacted' | 'archived';
}
