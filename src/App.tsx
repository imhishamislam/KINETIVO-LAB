import React, { useState, useEffect } from 'react';
import {
  Language,
  VideoItem,
  BlogPost,
  ExtraPage,
  ShowreelData,
  SiteSettings,
  FrontTexts,
  ProjectLead
} from './types';
import {
  getStoredVideos,
  saveVideos,
  getStoredShowreel,
  saveShowreel,
  getStoredBlogs,
  saveBlogs,
  getStoredPages,
  savePages,
  getStoredSettings,
  saveSettings,
  getStoredFrontTexts,
  saveFrontTexts,
  getStoredLanguage,
  saveLanguage,
  getStoredLeads,
  saveLeads,
  loadInitialDataFromDisk
} from './utils/storage';
import { subscribeToFirestore } from './services/cloudStorage';
import { DEFAULT_FRONT_TEXTS } from './data/defaultData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { WatchOurWork } from './components/WatchOurWork';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { Pricing } from './components/Pricing';
import { Reviews } from './components/Reviews';
import { Faq } from './components/Faq';
import { ContactBrief } from './components/ContactBrief';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { BriefModal } from './components/BriefModal';
import { OurWorkPage } from './components/OurWorkPage';
import { BlogPage } from './components/BlogPage';
import { CustomPage } from './components/CustomPage';
import { AdminPanel } from './components/AdminPanel';
import { LiveFrontEditorBar } from './components/LiveFrontEditorBar';
import { FloatingWidgets } from './components/FloatingWidgets';

export default function App() {
  // CRITICAL REQUIREMENT: Default language is English (en) for all first-time visitors!
  const [lang, setLang] = useState<Language>(() => getStoredLanguage());

  // Persistent site data
  const [videos, setVideos] = useState<VideoItem[]>(() => getStoredVideos());
  const [showreel, setShowreel] = useState<ShowreelData>(() => getStoredShowreel());
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getStoredBlogs());
  const [pages, setPages] = useState<ExtraPage[]>(() => getStoredPages());
  const [settings, setSettings] = useState<SiteSettings>(() => getStoredSettings());
  const [frontTexts, setFrontTexts] = useState<FrontTexts>(() => getStoredFrontTexts());
  const [leads, setLeads] = useState<ProjectLead[]>(() => getStoredLeads());

  // Navigation views: 'home' | 'work' | 'blog' | 'page'
  const currentViewDefault: 'home' | 'work' | 'blog' | 'page' = 'home';
  const [currentView, setCurrentView] = useState<'home' | 'work' | 'blog' | 'page'>(currentViewDefault);
  const [activePageSlug, setActivePageSlug] = useState<string | null>(null);
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);

  // Modals state
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | ShowreelData | null>(null);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [briefInterest, setBriefInterest] = useState<string | undefined>();
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Live Front Edit Mode state
  const [isFrontEditMode, setIsFrontEditMode] = useState(false);
  const [workingFrontTexts, setWorkingFrontTexts] = useState<FrontTexts>(frontTexts);
  const [hasUnsavedFrontChanges, setHasUnsavedFrontChanges] = useState(false);

  // Auto-sync persistent database from Cloud Firestore & local disk
  useEffect(() => {
    // 1. Initial load
    loadInitialDataFromDisk().then((diskData) => {
      if (diskData) {
        if (Array.isArray(diskData.videos) && diskData.videos.length > 0) setVideos(diskData.videos);
        if (diskData.showreel) setShowreel(diskData.showreel);
        if (Array.isArray(diskData.blogs) && diskData.blogs.length > 0) setBlogs(diskData.blogs);
        if (Array.isArray(diskData.pages) && diskData.pages.length > 0) setPages(diskData.pages);
        if (diskData.settings) setSettings(diskData.settings);
        if (Array.isArray(diskData.leads)) setLeads(diskData.leads);
        if (diskData.frontTexts) {
          setFrontTexts(diskData.frontTexts);
          setWorkingFrontTexts(diskData.frontTexts);
        }
      }
    });

    // 2. Real-time subscription to cloud changes across all devices/browsers
    const unsubscribe = subscribeToFirestore((cloudData) => {
      if (cloudData) {
        if (Array.isArray(cloudData.videos) && cloudData.videos.length > 0) setVideos(cloudData.videos);
        if (cloudData.showreel) setShowreel(cloudData.showreel);
        if (Array.isArray(cloudData.blogs) && cloudData.blogs.length > 0) setBlogs(cloudData.blogs);
        if (Array.isArray(cloudData.pages) && cloudData.pages.length > 0) setPages(cloudData.pages);
        if (cloudData.settings) setSettings(cloudData.settings);
        if (Array.isArray(cloudData.leads)) setLeads(cloudData.leads);
        if (cloudData.frontTexts) {
          setFrontTexts(cloudData.frontTexts);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Listen to hash changes (e.g. #admin, #work, #blog)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#/admin') {
        setAdminPanelOpen(true);
      } else if (hash === '#work' || hash === '#/work') {
        setCurrentView('work');
      } else if (hash === '#blog' || hash === '#/blog') {
        setCurrentView('blog');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync document language and title
  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.className = `bg-[#07070c] text-[#f2f3f7] antialiased selection:bg-[#c6f24e] selection:text-black ${
      lang === 'bn' ? 'lang-bn' : 'lang-en'
    }`;
    document.title = lang === 'bn' ? settings.siteNameBn : settings.siteNameEn;
  }, [lang, settings]);

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
    saveLanguage(nextLang);
  };

  // Live Front Edit Handlers
  const handleEditText = (key: keyof FrontTexts, value: string) => {
    setWorkingFrontTexts(prev => ({ ...prev, [key]: value }));
    setHasUnsavedFrontChanges(true);
  };

  const handleSaveFrontEdit = () => {
    setFrontTexts(workingFrontTexts);
    saveFrontTexts(workingFrontTexts);
    setHasUnsavedFrontChanges(false);
    alert('Front view texts saved successfully!');
  };

  const handleResetFrontEdit = () => {
    if (window.confirm('Reset all front page texts to factory default?')) {
      setWorkingFrontTexts(DEFAULT_FRONT_TEXTS);
      setFrontTexts(DEFAULT_FRONT_TEXTS);
      saveFrontTexts(DEFAULT_FRONT_TEXTS);
      setHasUnsavedFrontChanges(false);
    }
  };

  // Navigation callbacks
  const navigateHome = (sectionId?: string) => {
    setCurrentView('home');
    setActivePageSlug(null);
    setActiveBlogSlug(null);
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateWork = () => {
    setCurrentView('work');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBlog = (slug?: string) => {
    setCurrentView('blog');
    setActiveBlogSlug(slug || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigatePage = (slug: string) => {
    setCurrentView('page');
    setActivePageSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBrief = (interest?: string) => {
    setBriefInterest(interest);
    setBriefModalOpen(true);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between">
      {/* Background grid matrix with radial blur */}
      <div className="gridbg" aria-hidden="true" />

      {/* Floating Toolbar for Live Front Text Editing */}
      {isFrontEditMode && (
        <LiveFrontEditorBar
          onSave={handleSaveFrontEdit}
          onReset={handleResetFrontEdit}
          onExit={() => {
            setIsFrontEditMode(false);
            setAdminPanelOpen(true);
          }}
          hasUnsavedChanges={hasUnsavedFrontChanges}
        />
      )}

      {/* Navigation Header */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenBrief={openBrief}
        onOpenWork={navigateWork}
        onNavigateHome={navigateHome}
        onNavigateBlog={navigateBlog}
        onNavigatePage={navigatePage}
        onOpenAdmin={() => setAdminPanelOpen(true)}
        settings={settings}
        extraPages={pages}
        blogPosts={blogs}
        currentView={currentView}
      />

      {/* Main View Switching */}
      <main className="flex-1 relative z-10">
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              lang={lang}
              onOpenWork={navigateWork}
              onOpenBrief={() => openBrief()}
              settings={settings}
              frontTexts={isFrontEditMode ? workingFrontTexts : frontTexts}
              isFrontEditMode={isFrontEditMode}
              onEditText={handleEditText}
            />

            {/* 2. Continuous Creative Marquee */}
            <Marquee lang={lang} />

            {/* Gradient Divider Rule */}
            <div className="max-w-[1160px] mx-auto px-5">
              <div className="rule-gradient" />
            </div>

            {/* 3. Services Section (What We Create) */}
            <Services
              lang={lang}
              onOpenBrief={openBrief}
              frontTexts={isFrontEditMode ? workingFrontTexts : frontTexts}
              isFrontEditMode={isFrontEditMode}
              onEditText={handleEditText}
            />

            <div className="max-w-[1160px] mx-auto px-5">
              <div className="rule-gradient" />
            </div>

            {/* 4. Watch Our Work (Featured Showreel + Category Filters + Video Ads + Glowing More Work button) */}
            <WatchOurWork
              lang={lang}
              videos={videos}
              showreel={showreel}
              onPlayShowreel={() => setActiveVideoModal(showreel)}
              onSelectVideo={(v) => setActiveVideoModal(v)}
              onOpenOurWorkPage={navigateWork}
              onOpenBrief={() => openBrief()}
            />

            <div className="max-w-[1160px] mx-auto px-5">
              <div className="rule-gradient" />
            </div>

            {/* 5. Why Kinetivo Lab Section with comparison table & stats */}
            <WhyUs
              lang={lang}
              frontTexts={isFrontEditMode ? workingFrontTexts : frontTexts}
              isFrontEditMode={isFrontEditMode}
              onEditText={handleEditText}
            />

            <div className="max-w-[1160px] mx-auto px-5">
              <div className="rule-gradient" />
            </div>

            {/* Process (3 Steps) Section */}
            <Process
              lang={lang}
              onOpenBrief={() => openBrief()}
              frontTexts={isFrontEditMode ? workingFrontTexts : frontTexts}
              isFrontEditMode={isFrontEditMode}
              onEditText={handleEditText}
            />

            <div className="max-w-[1160px] mx-auto px-5">
              <div className="rule-gradient" />
            </div>

            {/* Pricing Packages Section */}
            <Pricing
              lang={lang}
              onOpenBrief={openBrief}
              frontTexts={isFrontEditMode ? workingFrontTexts : frontTexts}
              isFrontEditMode={isFrontEditMode}
              onEditText={handleEditText}
            />

            <div className="max-w-[1160px] mx-auto px-5">
              <div className="rule-gradient" />
            </div>

            {/* Client Reviews Section */}
            <Reviews
              lang={lang}
              frontTexts={isFrontEditMode ? workingFrontTexts : frontTexts}
              isFrontEditMode={isFrontEditMode}
              onEditText={handleEditText}
            />

            <div className="max-w-[1160px] mx-auto px-5">
              <div className="rule-gradient" />
            </div>

            {/* FAQ Accordion Section */}
            <Faq lang={lang} />

            <div className="max-w-[1160px] mx-auto px-5">
              <div className="rule-gradient" />
            </div>

            {/* Contact & Free Ad Concept Form */}
            <ContactBrief
              lang={lang}
              settings={settings}
              frontTexts={isFrontEditMode ? workingFrontTexts : frontTexts}
              isFrontEditMode={isFrontEditMode}
              onEditText={handleEditText}
              onNewLead={(l) => setLeads(prev => [l, ...prev])}
            />
          </>
        )}

        {/* Dedicated "Our Work" Full Page View */}
        {currentView === 'work' && (
          <OurWorkPage
            lang={lang}
            videos={videos}
            onSelectVideo={(v) => setActiveVideoModal(v)}
            onNavigateHome={() => navigateHome()}
            onOpenBrief={() => openBrief()}
          />
        )}

        {/* Dedicated "Blog" View */}
        {currentView === 'blog' && (
          <BlogPage
            lang={lang}
            posts={blogs}
            initialSlug={activeBlogSlug || undefined}
            onNavigateHome={() => navigateHome()}
            onOpenBrief={() => openBrief()}
          />
        )}

        {/* Dedicated Custom Extra Page View */}
        {currentView === 'page' && activePageSlug && (
          (() => {
            const pageItem = pages.find(p => p.slug === activePageSlug) || pages[0];
            return (
              <CustomPage
                lang={lang}
                page={pageItem}
                onNavigateHome={() => navigateHome()}
                onOpenBrief={() => openBrief()}
              />
            );
          })()
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        settings={settings}
        extraPages={pages}
        onOpenWork={navigateWork}
        onOpenBrief={() => openBrief()}
        onNavigateHome={navigateHome}
        onNavigatePage={navigatePage}
        onOpenAdmin={() => setAdminPanelOpen(true)}
      />

      {/* Floating Action Buttons on Right Edge: Back to Top & Message Button */}
      <FloatingWidgets
        lang={lang}
        onOpenMessage={() => openBrief()}
      />

      {/* Interactive Video Player Modal */}
      <VideoModal
        isOpen={!!activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
        video={activeVideoModal}
        lang={lang}
        onOpenBrief={() => openBrief()}
      />

      {/* Quick Project Brief Form Modal */}
      <BriefModal
        isOpen={briefModalOpen}
        onClose={() => setBriefModalOpen(false)}
        lang={lang}
        initialInterest={briefInterest}
        settings={settings}
        onNewLead={(l) => setLeads(prev => [l, ...prev])}
      />

      {/* Admin Panel Modal / Dashboard with Passcode 'KineL1525' */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        lang={lang}
        videos={videos}
        onSaveVideos={(newVideos) => {
          setVideos(newVideos);
          saveVideos(newVideos);
        }}
        blogs={blogs}
        onSaveBlogs={(newBlogs) => {
          setBlogs(newBlogs);
          saveBlogs(newBlogs);
        }}
        pages={pages}
        onSavePages={(newPages) => {
          setPages(newPages);
          savePages(newPages);
        }}
        showreel={showreel}
        onSaveShowreel={(newShowreel) => {
          setShowreel(newShowreel);
          saveShowreel(newShowreel);
        }}
        settings={settings}
        onSaveSettings={(newSettings) => {
          setSettings(newSettings);
          saveSettings(newSettings);
        }}
        frontTexts={frontTexts}
        onSaveFrontTexts={(newTexts) => {
          setFrontTexts(newTexts);
          saveFrontTexts(newTexts);
        }}
        onActivateFrontEdit={() => {
          setAdminPanelOpen(false);
          setIsFrontEditMode(true);
          setWorkingFrontTexts(frontTexts);
          navigateHome();
        }}
        onPreviewPost={(slug) => {
          setAdminPanelOpen(false);
          navigateBlog(slug);
        }}
        onPreviewPage={(slug) => {
          setAdminPanelOpen(false);
          navigatePage(slug);
        }}
        onPreviewVideo={(v) => {
          setAdminPanelOpen(false);
          setActiveVideoModal(v);
        }}
        leads={leads}
        onSaveLeads={(newLeads) => {
          setLeads(newLeads);
          saveLeads(newLeads);
        }}
      />
    </div>
  );
}
