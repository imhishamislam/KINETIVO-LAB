import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {
  VideoItem,
  BlogPost,
  ExtraPage,
  ShowreelData,
  SiteSettings,
  FrontTexts,
  ProjectLead
} from '../types';

export interface CloudStorePayload {
  videos?: VideoItem[];
  showreel?: ShowreelData;
  blogs?: BlogPost[];
  pages?: ExtraPage[];
  settings?: SiteSettings;
  frontTexts?: FrontTexts;
  leads?: ProjectLead[];
  updatedAt?: string;
}

const CONTENT_DOC_REF = doc(db, 'studio', 'content');

/**
 * Loads the latest website data directly from Firebase Firestore.
 */
export async function loadFromFirestore(): Promise<CloudStorePayload | null> {
  try {
    const snap = await getDoc(CONTENT_DOC_REF);
    if (snap.exists()) {
      const data = snap.data() as CloudStorePayload;
      return data;
    }
  } catch (err) {
    console.warn('[Firebase] Could not fetch document, falling back to local cache:', err);
  }
  return null;
}

/**
 * Saves current website data to Firebase Firestore so every visitor across devices,
 * IPs, and browsers instantly sees the changes.
 */
export async function saveToFirestore(payload: CloudStorePayload): Promise<boolean> {
  try {
    await setDoc(CONTENT_DOC_REF, {
      ...payload,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('[Firebase] Failed to write data to Firestore:', err);
    return false;
  }
}

/**
 * Real-time listener for live updates across multiple tabs/devices.
 */
export function subscribeToFirestore(onUpdate: (data: CloudStorePayload) => void): () => void {
  try {
    return onSnapshot(CONTENT_DOC_REF, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as CloudStorePayload;
        onUpdate(data);
      }
    }, (error) => {
      console.warn('[Firebase] Snapshot error:', error);
    });
  } catch (e) {
    console.warn('[Firebase] Snapshot subscription failed:', e);
    return () => {};
  }
}
