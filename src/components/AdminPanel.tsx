import React, { useState, useEffect } from 'react';
import {
  VideoItem,
  BlogPost,
  ExtraPage,
  ShowreelData,
  SiteSettings,
  FrontTexts,
  VideoCategory,
  Language,
  ImagePreset
} from '../types';
import { parseVideoUrl } from '../utils/videoParser';
import { DEFAULT_PRESET_IMAGES } from '../data/defaultData';
import { exportBackupJson, importBackupJson, syncAllToDisk } from '../utils/storage';
import {
  Lock,
  Unlock,
  Video,
  FileText,
  Layers,
  Film,
  Settings,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  HardDrive,
  Upload,
  Check,
  X,
  ExternalLink,
  Shield,
  Download,
  Copy,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  videos: VideoItem[];
  onSaveVideos: (videos: VideoItem[]) => void;
  blogs: BlogPost[];
  onSaveBlogs: (blogs: BlogPost[]) => void;
  pages: ExtraPage[];
  onSavePages: (pages: ExtraPage[]) => void;
  showreel: ShowreelData;
  onSaveShowreel: (showreel: ShowreelData) => void;
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  frontTexts: FrontTexts;
  onSaveFrontTexts: (texts: FrontTexts) => void;
  onActivateFrontEdit: () => void;
  onPreviewPost: (slug: string) => void;
  onPreviewPage: (slug: string) => void;
  onPreviewVideo: (video: VideoItem) => void;
}

type AdminTab = 'videos' | 'blogs' | 'pages' | 'showreel' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  lang,
  videos,
  onSaveVideos,
  blogs,
  onSaveBlogs,
  pages,
  onSavePages,
  showreel,
  onSaveShowreel,
  settings,
  onSaveSettings,
  frontTexts,
  onSaveFrontTexts,
  onActivateFrontEdit,
  onPreviewPost,
  onPreviewPage,
  onPreviewVideo
}) => {
  if (!isOpen) return null;

  // Passcode verification state: user specified "KineL1525"
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Active navigation tab inside Admin
  const [activeTab, setActiveTab] = useState<AdminTab>('videos');

  // Video Ad Editing State
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isCreatingVideo, setIsCreatingVideo] = useState(false);

  // Blog Editing State
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);

  // Extra Page Editing State
  const [editingPage, setEditingPage] = useState<ExtraPage | null>(null);
  const [isCreatingPage, setIsCreatingPage] = useState(false);

  // Showreel form state
  const [showreelForm, setShowreelForm] = useState<ShowreelData>({ ...showreel });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...settings });

  // Keep settingsForm synced when settings prop updates from disk/storage
  useEffect(() => {
    setSettingsForm({ ...settings });
  }, [settings]);

  // Passcode update state in Settings Security box
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [showCurrentPasscode, setShowCurrentPasscode] = useState(false);
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [passcodeErrorMsg, setPasscodeErrorMsg] = useState('');
  const [passcodeUpdatedMessage, setPasscodeUpdatedMessage] = useState(false);
  const [diskSyncStatus, setDiskSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeAttempt === settings.passcode) {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  // -------------------------------------------------------------
  // 1. VIDEO MANAGEMENT HANDLERS
  // -------------------------------------------------------------
  const handleSaveVideoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    if (isCreatingVideo) {
      const newItems = [editingVideo, ...videos];
      onSaveVideos(newItems);
      showToast('Video Ad created successfully!');
    } else {
      const updated = videos.map(v => (v.id === editingVideo.id ? editingVideo : v));
      onSaveVideos(updated);
      showToast('Video Ad updated successfully!');
    }
    setEditingVideo(null);
    setIsCreatingVideo(false);
  };

  const handleDeleteVideo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this video ad?')) {
      const updated = videos.filter(v => v.id !== id);
      onSaveVideos(updated);
      showToast('Video Ad deleted.');
    }
  };

  const handleDuplicateVideo = (v: VideoItem) => {
    const dup: VideoItem = {
      ...v,
      id: `vid-${Date.now()}`,
      titleEn: `${v.titleEn} (Copy)`,
      titleBn: `${v.titleBn} (কপি)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    onSaveVideos([dup, ...videos]);
    showToast('Video Ad duplicated.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
          showToast('Image uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // -------------------------------------------------------------
  // 2. BLOG POSTS HANDLERS
  // -------------------------------------------------------------
  const handleSaveBlogItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    // ensure slug format
    const cleanSlug = editingBlog.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const preparedBlog = { ...editingBlog, slug: cleanSlug };

    if (isCreatingBlog) {
      onSaveBlogs([preparedBlog, ...blogs]);
      showToast('Blog post created successfully!');
    } else {
      const updated = blogs.map(b => (b.id === preparedBlog.id ? preparedBlog : b));
      onSaveBlogs(updated);
      showToast('Blog post updated successfully!');
    }
    setEditingBlog(null);
    setIsCreatingBlog(false);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Delete this blog post?')) {
      const updated = blogs.filter(b => b.id !== id);
      onSaveBlogs(updated);
      showToast('Blog post deleted.');
    }
  };

  // -------------------------------------------------------------
  // 3. EXTRA PAGES HANDLERS
  // -------------------------------------------------------------
  const handleSavePageItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    const cleanSlug = editingPage.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const preparedPage = { ...editingPage, slug: cleanSlug };

    if (isCreatingPage) {
      onSavePages([preparedPage, ...pages]);
      showToast('Extra page created successfully!');
    } else {
      const updated = pages.map(p => (p.id === preparedPage.id ? preparedPage : p));
      onSavePages(updated);
      showToast('Extra page updated successfully!');
    }
    setEditingPage(null);
    setIsCreatingPage(false);
  };

  const handleDeletePage = (id: string) => {
    if (window.confirm('Delete this custom page?')) {
      const updated = pages.filter(p => p.id !== id);
      onSavePages(updated);
      showToast('Page deleted.');
    }
  };

  // -------------------------------------------------------------
  // 4. SHOWREEL HANDLER
  // -------------------------------------------------------------
  const handleSaveShowreelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveShowreel(showreelForm);
    showToast('Showreel video updated successfully!');
  };

  // -------------------------------------------------------------
  // 5. SETTINGS HANDLERS
  // -------------------------------------------------------------
  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(settingsForm);
    showToast('Settings saved successfully!');
  };

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeErrorMsg('');
    const trimmed = newPasscode.trim();
    if (trimmed.length < 4) {
      setPasscodeErrorMsg('Passcode must be at least 4 characters long (কমপক্ষে ৪ অক্ষরের পাসকোড দিন)।');
      return;
    }
    if (confirmPasscode && trimmed !== confirmPasscode.trim()) {
      setPasscodeErrorMsg('Confirm Passcode does not match (পাসকোড দুটি মেলেনি)।');
      return;
    }
    const updated = { ...settings, ...settingsForm, passcode: trimmed };
    onSaveSettings(updated);
    setSettingsForm(updated);
    setNewPasscode('');
    setConfirmPasscode('');
    setPasscodeUpdatedMessage(true);
    setTimeout(() => setPasscodeUpdatedMessage(false), 5000);
    showToast('অ্যাডমিন পাসকোড সফলভাবে পরিবর্তন ও ডিস্কে সেভ করা হয়েছে!');
  };

  const handleManualDiskSync = async () => {
    setDiskSyncStatus('syncing');
    await syncAllToDisk();
    setDiskSyncStatus('synced');
    showToast('সমস্ত ডেটা সরাসরি লোকাল ডিস্কে (data/store.json) সেভ করা হয়েছে!');
    setTimeout(() => setDiskSyncStatus('idle'), 3000);
  };

  const handleDownloadBackup = () => {
    const json = exportBackupJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kinetivo-backup-${Date.now()}.json`;
    a.click();
    showToast('Backup JSON downloaded!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const success = importBackupJson(text);
          if (success) {
            window.location.reload();
          } else {
            alert('Invalid backup JSON format.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // -------------------------------------------------------------
  // PASSCODE UNLOCK SCREEN (Exact passcode: "KineL1525")
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#12121c] border border-white/15 rounded-3xl p-8 shadow-2xl relative text-center">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-[#ff3d9a] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(198,242,78,0.2)]">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-bold text-white font-['Outfit'] mb-1">
            KINETIVO LAB Admin
          </h2>
          <p className="text-xs text-[#9a9aab] mb-6">
            Enter the authorized studio passcode to access management controls.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                required
                autoFocus
                value={passcodeAttempt}
                onChange={(e) => {
                  setPasscodeAttempt(e.target.value);
                  setPasscodeError(false);
                }}
                placeholder="Enter Passcode"
                className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-3 text-center text-lg font-mono text-white placeholder:text-[#55556a] focus:outline-none focus:border-[#c6f24e] transition-all"
              />
            </div>

            {passcodeError && (
              <div className="text-xs text-[#ff3d9a] font-semibold">
                Incorrect passcode. Please try again.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#c6f24e] text-black font-bold text-sm hover:bg-[#d4fc62] transition-colors flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(198,242,78,0.5)] cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN ADMIN DASHBOARD INTERFACE
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-[#07070c] text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Admin Header Bar */}
      <header className="border-b border-white/10 bg-[#0e0e16] px-6 py-4 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c6f24e] via-[#2ed9e3] to-[#a855f7] p-[1.5px] flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#07070c] rounded-[7px] flex items-center justify-center font-bold text-xs bg-gradient-to-r from-[#c6f24e] to-[#2ed9e3] bg-clip-text text-transparent">
              KL
            </div>
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              <span>KINETIVO LAB Admin</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c6f24e]/10 text-[#c6f24e] border border-[#c6f24e]/30 font-mono">
                SECURE
              </span>
            </div>
            <div className="text-[10px] text-[#6f6f82]">
              Passcode: <span className="text-white font-mono">{settings.passcode}</span>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onActivateFrontEdit();
            }}
            className="px-4 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 font-bold text-xs hover:bg-amber-400/20 transition-colors flex items-center gap-1.5"
            title="Edit front view texts directly on the page"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Front Text Editor</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Site</span>
          </button>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              onClose();
            }}
            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-[#ff3d9a] transition-colors"
            title="Close Admin"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Admin Navigation Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-[#0a0a11] p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'videos'
                  ? 'bg-[#c6f24e] text-black shadow-md'
                  : 'text-[#9a9aab] hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Ads ({videos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'blogs'
                  ? 'bg-[#c6f24e] text-black shadow-md'
                  : 'text-[#9a9aab] hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog Posts ({blogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'pages'
                  ? 'bg-[#c6f24e] text-black shadow-md'
                  : 'text-[#9a9aab] hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Extra Pages ({pages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('showreel')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'showreel'
                  ? 'bg-[#c6f24e] text-black shadow-md'
                  : 'text-[#9a9aab] hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Showreel &amp; Banner</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'settings'
                  ? 'bg-[#c6f24e] text-black shadow-md'
                  : 'text-[#9a9aab] hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings &amp; Security</span>
            </button>
          </div>

          {/* Backup & Deployment Box */}
          <div className="border border-white/10 rounded-2xl p-4 bg-[#0e0e16] text-[11px] text-[#9a9aab] space-y-2 mt-4">
            <div className="font-bold text-white text-xs flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#2ed9e3]" />
              <span>GitHub &amp; Netlify Ready</span>
            </div>
            <p className="text-[10.5px] leading-relaxed">
              Export all site data to JSON for safe version control and instant backup.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleDownloadBackup}
                className="flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors text-center"
              >
                Export JSON
              </button>
              <label className="flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors text-center cursor-pointer">
                <span>Import</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportBackup}
                />
              </label>
            </div>
          </div>
        </aside>

        {/* Tab Content Display Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#07070c]">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-20 right-8 z-50 px-5 py-3 rounded-2xl bg-[#c6f24e] text-black font-bold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-top">
              <Check className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: VIDEO ADS MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'videos' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold font-['Outfit'] text-white">
                    Video Ads Management ({videos.length})
                  </h1>
                  <p className="text-xs text-[#9a9aab] mt-1">
                    Manage videos on the Homepage and the dedicated "Our Work" page.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingVideo({
                      id: `vid-${Date.now()}`,
                      cat: 'ugc',
                      brand: 'NEW BRAND',
                      titleEn: 'New Video Ad Title',
                      titleBn: 'নতুন ভিডিও বিজ্ঞাপনের শিরোনাম',
                      descEn: 'High-converting video creative description...',
                      descBn: 'হাই-কনভার্টিং ভিডিও বিজ্ঞাপনের বিবরণ...',
                      duration: '0:30',
                      views: '100K',
                      thumbnail: DEFAULT_PRESET_IMAGES[0].url,
                      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                      badgeColor: '#c6f24e',
                      isFeatured: false,
                      status: 'published',
                      createdAt: new Date().toISOString().split('T')[0]
                    });
                    setIsCreatingVideo(true);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs flex items-center gap-2 hover:bg-[#d4fc62] transition-colors shrink-0 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Video Ad</span>
                </button>
              </div>

              {/* Videos Table */}
              <div className="border border-white/10 rounded-2xl bg-[#0e0e16] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#12121c] border-b border-white/10 text-[10px] font-extrabold uppercase text-[#6f6f82]">
                    <tr>
                      <th className="py-3.5 px-4">Preview</th>
                      <th className="py-3.5 px-4">Brand &amp; Title</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Metrics</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {videos.map(v => (
                      <tr key={v.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 w-20">
                          <div className="w-16 h-12 rounded-lg bg-black overflow-hidden relative border border-white/10">
                            <img
                              src={v.thumbnail}
                              alt={v.titleEn}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-extrabold text-[10px] uppercase text-[#c6f24e]">
                            {v.brand}
                          </div>
                          <div className="font-bold text-white text-xs mt-0.5">
                            {v.titleEn}
                          </div>
                          {v.descEn && (
                            <div className="text-[10px] text-[#9a9aab] line-clamp-1 max-w-xs mt-0.5 italic">
                              &quot;{v.descEn}&quot;
                            </div>
                          )}
                          <div className="text-[10px] text-[#6f6f82]">
                            {v.titleBn}
                          </div>
                        </td>
                        <td className="py-3 px-4 uppercase text-[10px] font-bold">
                          <span
                            className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                            style={{ color: v.badgeColor || '#2ed9e3' }}
                          >
                            {v.cat}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[11px] text-[#9a9aab]">
                          <div>⏱ {v.duration}</div>
                          <div>👁 {v.views}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              v.status === 'published'
                                ? 'bg-[#c6f24e]/10 text-[#c6f24e] border border-[#c6f24e]/30'
                                : 'bg-white/5 text-[#9a9aab]'
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onPreviewVideo(v)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-white"
                              title="Play Video"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicateVideo(v)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#9a9aab] hover:text-white"
                              title="Duplicate"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingVideo({ ...v });
                                setIsCreatingVideo(false);
                              }}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#2ed9e3]"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(v.id)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#ff3d9a]"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Video Add / Edit Modal */}
              {editingVideo && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                  <div className="w-full max-w-3xl bg-[#12121c] border border-white/15 rounded-3xl p-6 sm:p-8 my-auto shadow-2xl">
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                      <h3 className="font-bold text-xl text-white font-['Outfit']">
                        {isCreatingVideo ? 'Add New Video Ad' : 'Edit Video Ad'}
                      </h3>
                      <button
                        onClick={() => setEditingVideo(null)}
                        className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveVideoItem} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Brand Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingVideo.brand}
                            onChange={(e) => setEditingVideo({ ...editingVideo, brand: e.target.value })}
                            placeholder="e.g. GLOWSKIN CO."
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6f24e]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Category *
                          </label>
                          <select
                            value={editingVideo.cat}
                            onChange={(e) => setEditingVideo({ ...editingVideo, cat: e.target.value as VideoCategory })}
                            className="w-full border border-white/15 rounded-xl bg-[#0e0e16] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6f24e]"
                          >
                            <option value="commercial">Commercial Ads</option>
                            <option value="ugc">UGC Ads</option>
                            <option value="demo">Product Demo</option>
                            <option value="saas">SaaS Promo</option>
                            <option value="unbox">Unboxing</option>
                            <option value="vsl">VSL</option>
                            <option value="other">Other Ads</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Title (English) *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingVideo.titleEn}
                            onChange={(e) => setEditingVideo({ ...editingVideo, titleEn: e.target.value })}
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6f24e]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Title (Bengali)
                          </label>
                          <input
                            type="text"
                            value={editingVideo.titleBn}
                            onChange={(e) => setEditingVideo({ ...editingVideo, titleBn: e.target.value })}
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6f24e]"
                          />
                        </div>
                      </div>

                      {/* Video Popup Content Description (English & Bengali) */}
                      <div className="border border-white/10 rounded-2xl p-4 bg-white/[0.02] space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <label className="block text-[11px] font-bold uppercase text-[#c6f24e]">
                            Video Popup Content Description (পপ-আপ কনটেন্ট ডেসক্রিপশন) *
                          </label>
                          <span className="text-[10px] text-[#2ed9e3] px-2 py-0.5 rounded bg-[#2ed9e3]/10 border border-[#2ed9e3]/20 font-mono">
                            Work Pop-up Footer
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9a9aab] leading-relaxed">
                          'Work' পেজ বা হোমপেজে ভিজিটর যখন এই ভিডিওর প্লে বাটনে ক্লিক করে, তখন পপ-আপ উইন্ডোর নিচে এই ডেসক্রিপশনটি প্রদর্শিত হয়।
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                              Content Description (English) *
                            </label>
                            <textarea
                              rows={3}
                              required
                              value={editingVideo.descEn}
                              onChange={(e) => setEditingVideo({ ...editingVideo, descEn: e.target.value })}
                              placeholder="e.g. 4.8x ROAS direct-response UGC creative for Meta & TikTok ads. Built to stop the feed in 3 seconds."
                              className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6f24e] resize-y leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                              Content Description (Bengali)
                            </label>
                            <textarea
                              rows={3}
                              value={editingVideo.descBn}
                              onChange={(e) => setEditingVideo({ ...editingVideo, descBn: e.target.value })}
                              placeholder="e.g. মেটা ও টিকটক বিজ্ঞাপনের জন্য ৪.৮ গুণ ROAS ড্রাইভকারী ডিরেক্ট-রেসপন্স UGC ক্রিয়েটিভ।"
                              className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6f24e] resize-y leading-relaxed"
                            />
                          </div>
                        </div>

                        {/* Live preview box of how this description appears in the popup */}
                        <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6f6f82] mb-1">
                            Popup Preview ({editingVideo.brand || 'BRAND'}):
                          </div>
                          <p className="text-xs text-[#9a9aab] italic m-0">
                            &quot;{editingVideo.descEn || 'No description entered yet.'}&quot;
                          </p>
                        </div>
                      </div>

                      {/* Video Embed Link & Live Parsing Preview */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                          Video Embed Link (YouTube, Vimeo, MP4, or &lt;iframe&gt;)
                        </label>
                        <input
                          type="text"
                          value={editingVideo.videoUrl}
                          onChange={(e) => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })}
                          placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/... or mp4 link"
                          className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6f24e]"
                        />

                        {/* Live Video Parser Preview inside the Admin Form */}
                        {editingVideo.videoUrl && (
                          <div className="mt-3 rounded-xl overflow-hidden border border-white/10 aspect-[16/9] max-h-48 bg-black relative">
                            {(() => {
                              const parsed = parseVideoUrl(editingVideo.videoUrl);
                              if (parsed.type === 'youtube' || parsed.type === 'vimeo' || parsed.type === 'iframe') {
                                return (
                                  <iframe
                                    src={parsed.src}
                                    title="Preview"
                                    className="w-full h-full border-0"
                                  />
                                );
                              } else if (parsed.type === 'mp4') {
                                return <video src={parsed.src} controls className="w-full h-full" />;
                              }
                              return (
                                <div className="flex items-center justify-center h-full text-xs text-[#9a9aab]">
                                  Video link parsed. Ready to play.
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>

                      {/* Thumbnail Image: URL + File Upload + Preset Library */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                          Thumbnail Image
                        </label>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={editingVideo.thumbnail}
                            onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                            placeholder="Direct image URL or select from presets below"
                            className="flex-1 border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6f24e]"
                          />
                          <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (url) => setEditingVideo({ ...editingVideo, thumbnail: url }))}
                            />
                          </label>
                        </div>

                        {/* 8 Preset Images Library */}
                        <div className="border border-white/10 rounded-2xl p-3 bg-white/[0.02]">
                          <div className="text-[10px] font-bold uppercase text-[#6f6f82] mb-2">
                            Curated Preset Library (Click to select 1-click):
                          </div>
                          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {DEFAULT_PRESET_IMAGES.map(pr => (
                              <button
                                key={pr.id}
                                type="button"
                                onClick={() => setEditingVideo({ ...editingVideo, thumbnail: pr.url })}
                                className={`aspect-[4/3] rounded-lg overflow-hidden border relative group ${
                                  editingVideo.thumbnail === pr.url ? 'border-[#c6f24e] ring-2 ring-[#c6f24e]' : 'border-white/10'
                                }`}
                                title={pr.name}
                              >
                                <img src={pr.url} alt={pr.name} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Duration, Views, Status */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={editingVideo.duration}
                            onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                            placeholder="0:32"
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Views Count
                          </label>
                          <input
                            type="text"
                            value={editingVideo.views}
                            onChange={(e) => setEditingVideo({ ...editingVideo, views: e.target.value })}
                            placeholder="812K"
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Status
                          </label>
                          <select
                            value={editingVideo.status}
                            onChange={(e) => setEditingVideo({ ...editingVideo, status: e.target.value as 'published' | 'draft' })}
                            className="w-full border border-white/15 rounded-xl bg-[#0e0e16] px-4 py-2 text-xs text-white"
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingVideo(null)}
                          className="px-5 py-2.5 rounded-full bg-white/5 text-white text-xs font-bold hover:bg-white/10"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62]"
                        >
                          Save Video Ad
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: BLOG POSTS MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'blogs' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold font-['Outfit'] text-white">
                    Blog Posts Management ({blogs.length})
                  </h1>
                  <p className="text-xs text-[#9a9aab] mt-1">
                    Create and publish insights, SEO articles, and performance creative studies.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingBlog({
                      id: `blog-${Date.now()}`,
                      slug: 'new-creative-strategy',
                      titleEn: 'New Creative Strategy Guide',
                      titleBn: 'নতুন ক্রিয়েটিভ স্ট্র্যাটেজি গাইড',
                      subtitleEn: 'Short summary of the article...',
                      subtitleBn: 'নিবন্ধের সংক্ষিপ্ত সারসংক্ষেপ...',
                      contentEn: '## Main Heading\n\nWrite your content here...',
                      contentBn: '## মূল শিরোনাম\n\nএখানে বাংলায় লিখুন...',
                      bannerImg: DEFAULT_PRESET_IMAGES[0].url,
                      videoUrl: '',
                      author: 'KINETIVO Team',
                      date: 'March 2026',
                      readTime: '4 min read',
                      showInNav: true,
                      showInFooter: true,
                      status: 'published'
                    });
                    setIsCreatingBlog(true);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs flex items-center gap-2 hover:bg-[#d4fc62] transition-colors shrink-0 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Blog Post</span>
                </button>
              </div>

              {/* Blog Table */}
              <div className="border border-white/10 rounded-2xl bg-[#0e0e16] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#12121c] border-b border-white/10 text-[10px] font-extrabold uppercase text-[#6f6f82]">
                    <tr>
                      <th className="py-3.5 px-4">Title</th>
                      <th className="py-3.5 px-4">Slug URL</th>
                      <th className="py-3.5 px-4">Nav &amp; Footer</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {blogs.map(b => (
                      <tr key={b.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-bold text-white max-w-xs">
                          <div>{b.titleEn}</div>
                          <div className="text-[11px] text-[#6f6f82] font-normal">{b.titleBn}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[#2ed9e3]">
                          /blog/{b.slug}
                        </td>
                        <td className="py-3 px-4 text-[10px]">
                          {b.showInNav && <span className="mr-2 text-[#c6f24e]">● Header</span>}
                          {b.showInFooter && <span className="text-[#a855f7]">● Footer</span>}
                        </td>
                        <td className="py-3 px-4 text-[#9a9aab]">{b.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              b.status === 'published' ? 'bg-[#c6f24e]/10 text-[#c6f24e]' : 'bg-white/5 text-[#9a9aab]'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onPreviewPost(b.slug)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#c6f24e]"
                              title="Live Preview"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingBlog({ ...b });
                                setIsCreatingBlog(false);
                              }}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#2ed9e3]"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#ff3d9a]"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Blog Create / Edit Modal */}
              {editingBlog && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                  <div className="w-full max-w-3xl bg-[#12121c] border border-white/15 rounded-3xl p-6 sm:p-8 my-auto shadow-2xl">
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                      <h3 className="font-bold text-xl text-white font-['Outfit']">
                        {isCreatingBlog ? 'Create New Blog Post' : 'Edit Blog Post'}
                      </h3>
                      <button
                        onClick={() => setEditingBlog(null)}
                        className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveBlogItem} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Title (English) *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingBlog.titleEn}
                            onChange={(e) => setEditingBlog({ ...editingBlog, titleEn: e.target.value })}
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Title (Bengali)
                          </label>
                          <input
                            type="text"
                            value={editingBlog.titleBn}
                            onChange={(e) => setEditingBlog({ ...editingBlog, titleBn: e.target.value })}
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            URL Slug (/blog/[slug]) *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingBlog.slug}
                            onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                            placeholder="e.g. 3-second-hook-secret"
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Banner Image URL
                          </label>
                          <input
                            type="text"
                            value={editingBlog.bannerImg}
                            onChange={(e) => setEditingBlog({ ...editingBlog, bannerImg: e.target.value })}
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                          Subtitle / Excerpt (English)
                        </label>
                        <input
                          type="text"
                          value={editingBlog.subtitleEn}
                          onChange={(e) => setEditingBlog({ ...editingBlog, subtitleEn: e.target.value })}
                          className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      {/* Content Editor */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold uppercase text-[#6f6f82]">
                            Content (Markdown: ## H2, ### H3, - Bullet, &gt; Quote)
                          </label>
                          <div className="flex gap-2 text-[10px]">
                            <button
                              type="button"
                              onClick={() => setEditingBlog({ ...editingBlog, contentEn: editingBlog.contentEn + '\n\n## New Heading' })}
                              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20"
                            >
                              + H2
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingBlog({ ...editingBlog, contentEn: editingBlog.contentEn + '\n\n### Subheading' })}
                              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20"
                            >
                              + H3
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingBlog({ ...editingBlog, contentEn: editingBlog.contentEn + '\n- Bullet point' })}
                              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20"
                            >
                              + List
                            </button>
                          </div>
                        </div>
                        <textarea
                          rows={6}
                          value={editingBlog.contentEn}
                          onChange={(e) => setEditingBlog({ ...editingBlog, contentEn: e.target.value })}
                          className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-3 text-xs text-white font-mono resize-y"
                        />
                      </div>

                      {/* Nav & Footer Toggles */}
                      <div className="flex flex-wrap items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={editingBlog.showInNav}
                            onChange={(e) => setEditingBlog({ ...editingBlog, showInNav: e.target.checked })}
                            className="rounded border-white/20 bg-white/10 text-[#c6f24e]"
                          />
                          <span>Show in Header Menu</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={editingBlog.showInFooter}
                            onChange={(e) => setEditingBlog({ ...editingBlog, showInFooter: e.target.checked })}
                            className="rounded border-white/20 bg-white/10 text-[#c6f24e]"
                          />
                          <span>Show in Footer Links</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingBlog(null)}
                          className="px-5 py-2.5 rounded-full bg-white/5 text-white text-xs font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs"
                        >
                          Save Blog Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: EXTRA PAGES MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'pages' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold font-['Outfit'] text-white">
                    Extra Pages Management ({pages.length})
                  </h1>
                  <p className="text-xs text-[#9a9aab] mt-1">
                    Create standalone pages like About Us, Tips, Case Studies, Terms, or Policies.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingPage({
                      id: `page-${Date.now()}`,
                      slug: 'custom-page',
                      titleEn: 'New Page Title',
                      titleBn: 'নতুন পেজের শিরোনাম',
                      subtitleEn: 'Page subtitle...',
                      subtitleBn: 'পেজের বিবরণ...',
                      contentEn: '## Section Title\n\nEnter page details here...',
                      contentBn: '## সেকশন টাইটেল\n\nএখানে বিস্তারিত লিখুন...',
                      bannerImg: DEFAULT_PRESET_IMAGES[0].url,
                      videoUrl: '',
                      showInNav: true,
                      showInFooter: true,
                      status: 'published'
                    });
                    setIsCreatingPage(true);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs flex items-center gap-2 hover:bg-[#d4fc62] transition-colors shrink-0 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Page</span>
                </button>
              </div>

              {/* Pages Table */}
              <div className="border border-white/10 rounded-2xl bg-[#0e0e16] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#12121c] border-b border-white/10 text-[10px] font-extrabold uppercase text-[#6f6f82]">
                    <tr>
                      <th className="py-3.5 px-4">Title</th>
                      <th className="py-3.5 px-4">URL Slug</th>
                      <th className="py-3.5 px-4">Nav &amp; Footer</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pages.map(p => (
                      <tr key={p.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-bold text-white">
                          <div>{p.titleEn}</div>
                          <div className="text-[11px] text-[#6f6f82] font-normal">{p.titleBn}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[#2ed9e3]">
                          /page/{p.slug}
                        </td>
                        <td className="py-3 px-4 text-[10px]">
                          {p.showInNav && <span className="mr-2 text-[#c6f24e]">● Header</span>}
                          {p.showInFooter && <span className="text-[#a855f7]">● Footer</span>}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'published' ? 'bg-[#c6f24e]/10 text-[#c6f24e]' : 'bg-white/5 text-[#9a9aab]'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onPreviewPage(p.slug)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#c6f24e]"
                              title="Live Preview"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingPage({ ...p });
                                setIsCreatingPage(false);
                              }}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#2ed9e3]"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePage(p.id)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-[#ff3d9a]"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Extra Page Add/Edit Modal */}
              {editingPage && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                  <div className="w-full max-w-3xl bg-[#12121c] border border-white/15 rounded-3xl p-6 sm:p-8 my-auto shadow-2xl">
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                      <h3 className="font-bold text-xl text-white font-['Outfit']">
                        {isCreatingPage ? 'Create Extra Page' : 'Edit Extra Page'}
                      </h3>
                      <button
                        onClick={() => setEditingPage(null)}
                        className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSavePageItem} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Page Title (English) *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingPage.titleEn}
                            onChange={(e) => setEditingPage({ ...editingPage, titleEn: e.target.value })}
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Page Title (Bengali)
                          </label>
                          <input
                            type="text"
                            value={editingPage.titleBn}
                            onChange={(e) => setEditingPage({ ...editingPage, titleBn: e.target.value })}
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            URL Slug (/page/[slug]) *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingPage.slug}
                            onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                            placeholder="e.g. about-us"
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                            Banner Image URL
                          </label>
                          <input
                            type="text"
                            value={editingPage.bannerImg}
                            onChange={(e) => setEditingPage({ ...editingPage, bannerImg: e.target.value })}
                            className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Content editor */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                          Content (Markdown: ## H2, ### H3, - Bullet, &gt; Quote)
                        </label>
                        <textarea
                          rows={6}
                          value={editingPage.contentEn}
                          onChange={(e) => setEditingPage({ ...editingPage, contentEn: e.target.value })}
                          className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-3 text-xs text-white font-mono resize-y"
                        />
                      </div>

                      {/* Nav & Footer Toggles */}
                      <div className="flex flex-wrap items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={editingPage.showInNav}
                            onChange={(e) => setEditingPage({ ...editingPage, showInNav: e.target.checked })}
                            className="rounded border-white/20 bg-white/10 text-[#c6f24e]"
                          />
                          <span>Show in Header Menu</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={editingPage.showInFooter}
                            onChange={(e) => setEditingPage({ ...editingPage, showInFooter: e.target.checked })}
                            className="rounded border-white/20 bg-white/10 text-[#c6f24e]"
                          />
                          <span>Show in Footer Links</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingPage(null)}
                          className="px-5 py-2.5 rounded-full bg-white/5 text-white text-xs font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs"
                        >
                          Save Page
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: SHOWREEL & BANNER VIDEO */}
          {/* ========================================================= */}
          {activeTab === 'showreel' && (
            <div className="max-w-2xl">
              <div className="mb-8">
                <h1 className="text-2xl font-bold font-['Outfit'] text-white">
                  Showreel &amp; Banner Video
                </h1>
                <p className="text-xs text-[#9a9aab] mt-1">
                  Customize the main featured 2026 Showreel video player on the Homepage.
                </p>
              </div>

              <form onSubmit={handleSaveShowreelSubmit} className="space-y-5 border border-white/10 rounded-2xl p-6 bg-[#0e0e16]">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                    Showreel Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={showreelForm.titleEn}
                    onChange={(e) => setShowreelForm({ ...showreelForm, titleEn: e.target.value })}
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                    Showreel Title (Bengali)
                  </label>
                  <input
                    type="text"
                    value={showreelForm.titleBn}
                    onChange={(e) => setShowreelForm({ ...showreelForm, titleBn: e.target.value })}
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                    Description (English)
                  </label>
                  <input
                    type="text"
                    value={showreelForm.descEn}
                    onChange={(e) => setShowreelForm({ ...showreelForm, descEn: e.target.value })}
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                    Video Embed Link (YouTube, Vimeo, MP4, or iframe)
                  </label>
                  <input
                    type="text"
                    value={showreelForm.videoUrl}
                    onChange={(e) => setShowreelForm({ ...showreelForm, videoUrl: e.target.value })}
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                    Thumbnail Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={showreelForm.thumbnail}
                      onChange={(e) => setShowreelForm({ ...showreelForm, thumbnail: e.target.value })}
                      className="flex-1 border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white"
                    />
                    <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setShowreelForm({ ...showreelForm, thumbnail: url }))}
                      />
                    </label>
                  </div>
                </div>

                {/* Live Preview Container */}
                <div className="rounded-xl overflow-hidden border border-white/10 aspect-[16/9] bg-black relative mt-3">
                  <img
                    src={showreelForm.thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#c6f24e] text-black flex items-center justify-center">
                      <Film className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62] transition-colors"
                >
                  Save Showreel Settings
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: SETTINGS & SECURITY (WITH PASSCODE CARD) */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h1 className="text-2xl font-bold font-['Outfit'] text-white">
                  Settings &amp; Security
                </h1>
                <p className="text-xs text-[#9a9aab] mt-1">
                  Manage branding, contact info, security passcode, and data backups.
                </p>
              </div>

              {/* SECURITY CARD WITH ACTIVE PASSCODE */}
              <div className="border border-[#c6f24e]/40 rounded-2xl p-6 bg-gradient-to-r from-[#c6f24e]/10 to-[#2ed9e3]/5 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c6f24e]/20 text-[#c6f24e] flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Outfit']">
                      Admin Security &amp; Passcode
                    </h3>
                    <div className="text-xs text-[#9a9aab]">
                      Current Active Passcode:{' '}
                      <span className="text-[#c6f24e] font-mono font-extrabold text-sm px-2 py-0.5 rounded bg-black/60 border border-[#c6f24e]/30">
                        {settings.passcode}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#9a9aab] mb-4">
                  You can change this passcode at any time. When set, entering the new passcode will grant instant access.
                </p>

                <form onSubmit={handleUpdatePasscode} className="flex gap-3 max-w-md">
                  <input
                    type="text"
                    required
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Enter new passcode (min 4 chars)"
                    className="flex-1 border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#c6f24e]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62] shrink-0"
                  >
                    Update Passcode
                  </button>
                </form>

                {passcodeUpdatedMessage && (
                  <div className="text-xs text-[#c6f24e] mt-2 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Passcode updated successfully!</span>
                  </div>
                )}
              </div>

              {/* GENERAL BRANDING SETTINGS */}
              <form onSubmit={handleSaveSettingsSubmit} className="border border-white/10 rounded-2xl p-6 bg-[#0e0e16] space-y-6">
                <div>
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider text-[#2ed9e3] mb-1">
                    Studio Identity &amp; Logo
                  </h3>
                  <p className="text-xs text-[#9a9aab]">
                    Upload custom studio logo mark, change taglines, and customize brand identity.
                  </p>
                </div>

                {/* LOGO UPLOAD & MANAGEMENT */}
                <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
                  <label className="block text-[11px] font-bold uppercase text-[#c6f24e] mb-2">
                    Studio Brand Logo
                  </label>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Logo Preview */}
                    <div className="flex items-center gap-3 shrink-0">
                      {settingsForm.logoUrl ? (
                        <div className="w-16 h-16 rounded-xl border border-white/20 bg-black/60 p-2 flex items-center justify-center overflow-hidden shadow-lg">
                          <img
                            src={settingsForm.logoUrl}
                            alt="Logo Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#c6f24e] via-[#2ed9e3] to-[#a855f7] p-[2px] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(46,217,227,0.3)]">
                          <div className="w-full h-full bg-[#07070c] rounded-[10px] flex items-center justify-center">
                            <span className="font-black text-xl tracking-tighter bg-gradient-to-r from-[#c6f24e] to-[#2ed9e3] bg-clip-text text-transparent">
                              KL
                            </span>
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-white">
                          {settingsForm.logoUrl ? 'Custom Uploaded Logo' : 'Default KL Gradient Icon'}
                        </div>
                        <div className="text-[11px] text-[#6f6f82]">
                          Appears in top navbar, footer, and brand headers
                        </div>
                      </div>
                    </div>

                    {/* Logo Upload & Reset Controls */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex gap-2">
                        <label className="px-4 py-2 rounded-xl bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setSettingsForm({ ...settingsForm, logoUrl: url }))}
                          />
                        </label>

                        {settingsForm.logoUrl && (
                          <button
                            type="button"
                            onClick={() => setSettingsForm({ ...settingsForm, logoUrl: '' })}
                            className="px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-[#9a9aab] hover:text-white transition-colors"
                          >
                            Reset to Default KL Logo
                          </button>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settingsForm.logoUrl}
                          onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                          placeholder="Or paste direct image URL (PNG, SVG, JPG)"
                          className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-3.5 py-2 text-xs text-white placeholder:text-[#55556a]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* HERO BACKGROUND IMAGE MANAGEMENT */}
                <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
                  <label className="block text-[11px] font-bold uppercase text-[#2ed9e3] mb-2">
                    Hero Section Background Image (হিরো ব্যাকগ্রাউন্ড ছবি)
                  </label>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Hero BG Preview */}
                    <div className="w-28 h-16 rounded-xl border border-white/20 bg-black/60 overflow-hidden relative shadow-lg shrink-0">
                      {settingsForm.heroBgImage ? (
                        <img
                          src={settingsForm.heroBgImage}
                          alt="Hero BG Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#6f6f82]">
                          No BG
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                    </div>

                    {/* Hero BG Controls */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <label className="px-4 py-2 rounded-xl bg-[#2ed9e3] text-black font-bold text-xs hover:bg-[#4be4ed] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Hero BG</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setSettingsForm({ ...settingsForm, heroBgImage: url }))}
                          />
                        </label>

                        {settingsForm.heroBgImage && (
                          <button
                            type="button"
                            onClick={() => setSettingsForm({ ...settingsForm, heroBgImage: '' })}
                            className="px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-[#9a9aab] hover:text-white transition-colors"
                          >
                            Remove Hero BG
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        value={settingsForm.heroBgImage || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroBgImage: e.target.value })}
                        placeholder="Or enter direct hero background image URL (JPG, PNG, WebP)"
                        className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-3.5 py-2 text-xs text-white placeholder:text-[#55556a]"
                      />
                    </div>
                  </div>
                </div>

                {/* BRAND NAME & TAGLINE INPUTS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                      Site Name (English)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.siteNameEn}
                      onChange={(e) => setSettingsForm({ ...settingsForm, siteNameEn: e.target.value })}
                      className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                      Site Name (Bengali)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.siteNameBn}
                      onChange={(e) => setSettingsForm({ ...settingsForm, siteNameBn: e.target.value })}
                      className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#c6f24e] mb-1">
                      Tagline (English) *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.taglineEn}
                      onChange={(e) => setSettingsForm({ ...settingsForm, taglineEn: e.target.value })}
                      placeholder="e.g. Ideas In Motion"
                      className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2 text-xs text-white font-medium focus:outline-none focus:border-[#c6f24e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#c6f24e] mb-1">
                      Tagline (Bengali) *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.taglineBn}
                      onChange={(e) => setSettingsForm({ ...settingsForm, taglineBn: e.target.value })}
                      placeholder="e.g. আইডিয়া যখন গতিশীল"
                      className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2 text-xs text-white font-medium focus:outline-none focus:border-[#c6f24e]"
                    />
                  </div>
                </div>

                {/* LIVE BRAND HEADER PREVIEW */}
                <div className="border border-white/10 rounded-xl p-4 bg-black/40">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6f6f82] mb-2">
                    Live Navbar Brand Preview
                  </div>
                  <div className="flex items-center gap-3">
                    {settingsForm.logoUrl ? (
                      <img
                        src={settingsForm.logoUrl}
                        alt="Logo Preview"
                        className="w-9 h-9 rounded-lg object-contain bg-black/60 border border-white/10"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c6f24e] via-[#2ed9e3] to-[#a855f7] p-[1.5px] flex items-center justify-center shrink-0">
                        <div className="w-full h-full bg-[#07070c] rounded-[7px] flex items-center justify-center">
                          <span className="font-extrabold text-sm tracking-tighter bg-gradient-to-r from-[#c6f24e] to-[#2ed9e3] bg-clip-text text-transparent">
                            KL
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="leading-none">
                      <div className="font-extrabold text-[16px] tracking-tight font-['Outfit'] text-white">
                        KINETIVO <span className="bg-gradient-to-r from-[#c6f24e] to-[#2ed9e3] bg-clip-text text-transparent">LAB</span>
                      </div>
                      <div className="text-[8px] font-semibold tracking-[0.28em] text-[#6f6f82] uppercase mt-1">
                        {settingsForm.taglineEn || 'IDEAS IN MOTION'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTACT FORM EMAIL & DETAILS */}
                <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="block text-[11px] font-bold uppercase text-[#ff3d9a]">
                      Contact Form Recipient Email (কন্টাক্ট ফর্মের ইমেইল ID) *
                    </label>
                    <span className="text-[10px] text-[#2ed9e3] font-mono px-2 py-0.5 rounded bg-[#2ed9e3]/10 border border-[#2ed9e3]/20">
                      Live Form Target
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9a9aab] mb-3">
                    এই ইমেইল অ্যাড্রেসটি ওয়েবসাইটের Contact Form এবং Let&apos;s Talk সেকশনে প্রদর্শিত হবে। সমস্ত ক্লায়েন্ট ইনকোয়ারি ও ব্রিফ এই ঠিকানায় পাঠানো হবে।
                  </p>
                  <input
                    type="email"
                    required
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    placeholder="e.g. hello@kinetivo.lab or your business email"
                    className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#ff3d9a]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                      Response Time
                    </label>
                    <input
                      type="text"
                      value={settingsForm.responseTime}
                      onChange={(e) => setSettingsForm({ ...settingsForm, responseTime: e.target.value })}
                      className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={settingsForm.location}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                      className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#c6f24e] text-black font-bold text-xs hover:bg-[#d4fc62] mt-4 cursor-pointer shadow-md"
                >
                  Save General Settings
                </button>
              </form>

              {/* ADMIN SECURITY & PASSCODE MANAGEMENT */}
              <div className="border border-white/10 rounded-2xl p-5 sm:p-6 bg-[#0e0e16]/80 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#ff3d9a]/15 text-[#ff3d9a] border border-[#ff3d9a]/30 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white font-['Outfit']">
                        Admin Security & Passcode (অ্যাডমিন পাসকোড পরিবর্তন)
                      </h4>
                      <p className="text-[11px] text-[#9a9aab]">
                        নতুন পাসকোড সেট করলে তা লোকাল ডিস্কে সেভ হবে এবং পরের বার এই পাসকোড দিয়েই লগইন করতে হবে।
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#6f6f82]">
                      Current:
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-black/60 border border-white/15 text-[#c6f24e] flex items-center gap-1.5">
                      {showCurrentPasscode ? settings.passcode : '••••••••'}
                      <button
                        type="button"
                        onClick={() => setShowCurrentPasscode(!showCurrentPasscode)}
                        className="text-[#9a9aab] hover:text-white transition-colors cursor-pointer"
                        title={showCurrentPasscode ? 'Hide' : 'Show'}
                      >
                        {showCurrentPasscode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </span>
                  </div>
                </div>

                {passcodeUpdatedMessage && (
                  <div className="p-3.5 rounded-xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>
                      পাসকোড সফলভাবে পরিবর্তন হয়েছে এবং লোকাল ফাইলে সেভ হয়েছে! নতুন পাসকোড: <strong>{settings.passcode}</strong>
                    </span>
                  </div>
                )}

                {passcodeErrorMsg && (
                  <div className="p-3 rounded-xl bg-[#ff3d9a]/10 border border-[#ff3d9a]/30 text-[#ff3d9a] text-xs">
                    {passcodeErrorMsg}
                  </div>
                )}

                <form onSubmit={handleUpdatePasscode} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                        New Passcode (নতুন পাসকোড) *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPasscode ? 'text' : 'password'}
                          required
                          value={newPasscode}
                          onChange={(e) => setNewPasscode(e.target.value)}
                          placeholder="Enter at least 4 characters"
                          className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white pr-10 focus:outline-none focus:border-[#ff3d9a]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPasscode(!showNewPasscode)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6f6f82] hover:text-white transition-colors cursor-pointer"
                        >
                          {showNewPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#6f6f82] mb-1">
                        Confirm New Passcode (পাসকোড নিশ্চিত করুন) *
                      </label>
                      <input
                        type={showNewPasscode ? 'text' : 'password'}
                        required
                        value={confirmPasscode}
                        onChange={(e) => setConfirmPasscode(e.target.value)}
                        placeholder="Re-enter new passcode"
                        className="w-full border border-white/15 rounded-xl bg-white/[0.035] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3d9a]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#ff3d9a] text-white font-bold text-xs hover:bg-[#ff5ca8] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Save New Passcode (পাসকোড পরিবর্তন করুন)</span>
                  </button>
                </form>
              </div>

              {/* LOCAL DISK SYNC & BACKUP MANAGEMENT */}
              <div className="border border-white/10 rounded-2xl p-5 sm:p-6 bg-[#0e0e16]/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2ed9e3]/15 text-[#2ed9e3] border border-[#2ed9e3]/30 flex items-center justify-center shrink-0">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white font-['Outfit']">
                        Windows Local Storage & File Persistence (ডিস্ক স্টোরেজ)
                      </h4>
                      <p className="text-[11px] text-[#9a9aab]">
                        টার্মিনাল বা ব্রাউজার বন্ধ করলেও সমস্ত ডেটা আপনার কম্পিউটারের <code className="text-[#2ed9e3] bg-white/5 px-1 py-0.5 rounded">data/store.json</code> ফাইলে সেভ থাকে।
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleManualDiskSync}
                    disabled={diskSyncStatus === 'syncing'}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-[#2ed9e3]" />
                    <span>{diskSyncStatus === 'syncing' ? 'Syncing...' : diskSyncStatus === 'synced' ? '✓ Synced to Disk' : 'Force Save to Disk'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="text-[11px] text-[#9a9aab]">
                    প্রয়োজনে সমস্ত ভিডিও, ব্লগ ও সেটিংস ব্যাকআপ ফাইল হিসেবে ডাউনলোড বা আপলোড করতে পারেন:
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadBackup}
                      className="px-4 py-2 rounded-xl bg-[#c6f24e]/10 border border-[#c6f24e]/30 text-[#c6f24e] hover:bg-[#c6f24e]/20 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Backup JSON</span>
                    </button>

                    <label className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-[#ff3d9a]" />
                      <span>Restore Backup</span>
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleImportBackup}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
