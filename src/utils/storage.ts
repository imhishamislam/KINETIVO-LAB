import {
  VideoItem,
  VideoCategory,
  BlogPost,
  ExtraPage,
  ShowreelData,
  SiteSettings,
  FrontTexts,
  Language,
  ProjectLead
} from '../types';
import {
  DEFAULT_VIDEOS,
  DEFAULT_SHOWREEL,
  DEFAULT_BLOGS,
  DEFAULT_EXTRA_PAGES,
  DEFAULT_SETTINGS,
  DEFAULT_FRONT_TEXTS
} from '../data/defaultData';

const STORAGE_KEYS = {
  VIDEOS: 'kinetivo_videos_v2',
  SHOWREEL: 'kinetivo_showreel_v2',
  BLOGS: 'kinetivo_blogs_v2',
  PAGES: 'kinetivo_pages_v2',
  SETTINGS: 'kinetivo_settings_v2',
  FRONT_TEXTS: 'kinetivo_front_texts_v2',
  LANGUAGE: 'kinetivo_language_pref',
  LEADS: 'kinetivo_leads_v2'
};

import { saveToFirestore, loadFromFirestore } from '../services/cloudStorage';

// Background disk & cloud synchronization debounce timer
let syncTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Persists the entire database to both Firebase Firestore (for Netlify/GitHub Pages/all devices)
 * and the server's local file (data/store.json).
 * This ensures changes made from any browser or location are permanently live for all users worldwide!
 */
export async function syncAllToDisk(): Promise<boolean> {
  const payload = {
    version: '2.0.0',
    updatedAt: new Date().toISOString(),
    videos: getStoredVideos(),
    showreel: getStoredShowreel(),
    blogs: getStoredBlogs(),
    pages: getStoredPages(),
    settings: getStoredSettings(),
    frontTexts: getStoredFrontTexts(),
    leads: getStoredLeads()
  };

  // 1. Sync to Firebase Cloud Firestore
  try {
    saveToFirestore(payload);
  } catch (err) {
    console.warn('[Storage] Cloud sync error:', err);
  }

  // 2. Sync to local node server if running
  try {
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    return true;
  }
}

/**
 * Triggers a debounced sync to cloud and local storage
 */
export function triggerDiskSync(): void {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncAllToDisk();
  }, 250);
}

/**
 * Loads data on app start:
 * First attempts to load from Firebase Firestore (works on Netlify, mobile, any IP).
 * Falls back to local /api/data, then to localStorage.
 */
export async function loadInitialDataFromDisk(): Promise<{
  videos?: VideoItem[];
  showreel?: ShowreelData;
  blogs?: BlogPost[];
  pages?: ExtraPage[];
  settings?: SiteSettings;
  frontTexts?: FrontTexts;
  leads?: ProjectLead[];
} | null> {
  // Priority 1: Check Firebase Firestore (Universal cloud storage)
  try {
    const cloudData = await loadFromFirestore();
    if (cloudData && typeof cloudData === 'object') {
      if (Array.isArray(cloudData.videos) && cloudData.videos.length > 0) {
        localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(cloudData.videos));
      }
      if (cloudData.showreel) {
        localStorage.setItem(STORAGE_KEYS.SHOWREEL, JSON.stringify(cloudData.showreel));
      }
      if (Array.isArray(cloudData.blogs) && cloudData.blogs.length > 0) {
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(cloudData.blogs));
      }
      if (Array.isArray(cloudData.pages) && cloudData.pages.length > 0) {
        localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(cloudData.pages));
      }
      if (cloudData.settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(cloudData.settings));
      }
      if (cloudData.frontTexts) {
        localStorage.setItem(STORAGE_KEYS.FRONT_TEXTS, JSON.stringify(cloudData.frontTexts));
      }
      if (Array.isArray(cloudData.leads)) {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(cloudData.leads));
      }
      return cloudData;
    }
  } catch (err) {
    console.warn('[Storage] Firestore initial load warning:', err);
  }

  // Priority 2: Local server fallback (/api/data)
  try {
    const res = await fetch('/api/data');
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        if (Array.isArray(data.videos)) {
          localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(data.videos));
        }
        if (data.showreel) {
          localStorage.setItem(STORAGE_KEYS.SHOWREEL, JSON.stringify(data.showreel));
        }
        if (Array.isArray(data.blogs)) {
          localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(data.blogs));
        }
        if (Array.isArray(data.pages)) {
          localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(data.pages));
        }
        if (data.settings) {
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
        }
        if (data.frontTexts) {
          localStorage.setItem(STORAGE_KEYS.FRONT_TEXTS, JSON.stringify(data.frontTexts));
        }
        if (Array.isArray(data.leads)) {
          localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(data.leads));
        }
        return data;
      }
    }
  } catch (e) {
    // Standalone static hosting
  }
  return null;
}

export function getStoredVideos(): VideoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VIDEOS);
    if (raw) {
      const parsed: VideoItem[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(v => v.cat === ('other' as VideoCategory) ? { ...v, cat: 'agency_promo' } : v);
      }
    }
  } catch (e) {
    console.error('Failed to load videos from storage', e);
  }
  return DEFAULT_VIDEOS;
}

export function saveVideos(videos: VideoItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  } catch (e) {
    console.error('Failed to save videos to storage', e);
  }
  triggerDiskSync();
}

export function getStoredShowreel(): ShowreelData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SHOWREEL);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load showreel from storage', e);
  }
  return DEFAULT_SHOWREEL;
}

export function saveShowreel(data: ShowreelData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SHOWREEL, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save showreel to storage', e);
  }
  triggerDiskSync();
}

export function getStoredBlogs(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load blogs from storage', e);
  }
  return DEFAULT_BLOGS;
}

export function saveBlogs(blogs: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  } catch (e) {
    console.error('Failed to save blogs to storage', e);
  }
  triggerDiskSync();
}

export function getStoredPages(): ExtraPage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PAGES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load pages from storage', e);
  }
  return DEFAULT_EXTRA_PAGES;
}

export function savePages(pages: ExtraPage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
  } catch (e) {
    console.error('Failed to save pages to storage', e);
  }
  triggerDiskSync();
}

export function getStoredSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate old default site name if still present
      const siteNameEn = parsed.siteNameEn === 'KINETIVO LAB — AI Ad Studio' ? DEFAULT_SETTINGS.siteNameEn : (parsed.siteNameEn || DEFAULT_SETTINGS.siteNameEn);
      const siteNameBn = parsed.siteNameBn === 'কিনেটিভো ল্যাব — AI অ্যাড স্টুডিও' ? DEFAULT_SETTINGS.siteNameBn : (parsed.siteNameBn || DEFAULT_SETTINGS.siteNameBn);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        siteNameEn,
        siteNameBn,
        passcode: parsed.passcode || DEFAULT_SETTINGS.passcode,
        heroBgImage: parsed.heroBgImage !== undefined ? parsed.heroBgImage : DEFAULT_SETTINGS.heroBgImage
      };
    }
  } catch (e) {
    console.error('Failed to load settings from storage', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to storage', e);
  }
  triggerDiskSync();
}

export function getStoredFrontTexts(): FrontTexts {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FRONT_TEXTS);
    if (raw) return { ...DEFAULT_FRONT_TEXTS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load front texts from storage', e);
  }
  return DEFAULT_FRONT_TEXTS;
}

export function saveFrontTexts(texts: FrontTexts): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FRONT_TEXTS, JSON.stringify(texts));
  } catch (e) {
    console.error('Failed to save front texts to storage', e);
  }
  triggerDiskSync();
}

export function getStoredLanguage(): Language {
  // CRITICAL REQUIREMENT: Default language is English (en) for all first-time visitors!
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (raw === 'bn' || raw === 'en') return raw;
  } catch (e) {
    console.error('Failed to load language', e);
  }
  return 'en';
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  } catch (e) {
    console.error('Failed to save language', e);
  }
}

export function getStoredLeads(): ProjectLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load leads from storage', e);
  }
  return [];
}

export function saveLeads(leads: ProjectLead[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  } catch (e) {
    console.error('Failed to save leads to storage', e);
  }
  triggerDiskSync();
}

export function addStoredLead(lead: ProjectLead): ProjectLead[] {
  const current = getStoredLeads();
  const updated = [lead, ...current];
  saveLeads(updated);
  return updated;
}

export function deleteStoredLead(id: string): ProjectLead[] {
  const current = getStoredLeads();
  const updated = current.filter(l => l.id !== id);
  saveLeads(updated);
  return updated;
}

export function updateStoredLeadStatus(id: string, status: 'new' | 'contacted' | 'archived'): ProjectLead[] {
  const current = getStoredLeads();
  const updated = current.map(l => l.id === id ? { ...l, status } : l);
  saveLeads(updated);
  return updated;
}

export function exportBackupJson(): string {
  const payload = {
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    videos: getStoredVideos(),
    showreel: getStoredShowreel(),
    blogs: getStoredBlogs(),
    pages: getStoredPages(),
    settings: getStoredSettings(),
    frontTexts: getStoredFrontTexts(),
    leads: getStoredLeads()
  };
  return JSON.stringify(payload, null, 2);
}

export function importBackupJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.videos) saveVideos(parsed.videos);
    if (parsed.showreel) saveShowreel(parsed.showreel);
    if (parsed.blogs) saveBlogs(parsed.blogs);
    if (parsed.pages) savePages(parsed.pages);
    if (parsed.settings) saveSettings(parsed.settings);
    if (parsed.frontTexts) saveFrontTexts(parsed.frontTexts);
    if (Array.isArray(parsed.leads)) saveLeads(parsed.leads);
    triggerDiskSync();
    return true;
  } catch (e) {
    console.error('Import backup failed', e);
    return false;
  }
}
