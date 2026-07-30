'use client';

import React, { useState, useEffect } from 'react';
import { CVData } from '@/types/cv';
import { SAMPLE_CV_DEV } from '@/lib/sample-data';
import { ExportBar } from '@/components/cv/ExportBar';
import { CVEditor } from '@/components/cv/CVEditor';
import { CVPreview } from '@/components/cv/CVPreview';
import { LandingPage } from '@/components/cv/LandingPage';
import { Edit3, Eye, Sparkles } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'cvko_draft_v3';

export default function Home() {
  const [cvData, setCvData] = useState<CVData>(SAMPLE_CV_DEV);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [showLanding, setShowLanding] = useState(true);

  // Hydrate from localStorage after client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.personalInfo && parsed.settings) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCvData(parsed);
        }
      }
    } catch (e) {
      console.warn('Impossible de charger la sauvegarde locale:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when cvData changes after initial load
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvData));
    } catch (e) {
      console.warn('Impossible de sauvegarder localement:', e);
    }
  }, [cvData, isLoaded]);

  const handleDataChange = (newData: CVData) => {
    setCvData(newData);
  };

  return (
    <div
      className="min-h-screen font-sans flex flex-col transition-colors duration-200 bg-[#f8fafc] text-slate-800 selection:bg-slate-200/80 selection:text-slate-800"
    >
      {/* Top Export Bar - CVKO */}
      <ExportBar
        cvData={cvData}
        onLoadSample={(sample) => {
          setCvData(sample);
          setShowLanding(false);
        }}
        onImportJSON={(imported) => {
          setCvData(imported);
          setShowLanding(false);
        }}
        showLanding={showLanding}
        onToggleLanding={() => setShowLanding((prev) => !prev)}
      />

      {showLanding ? (
        <LandingPage
          onStartEditing={(sample) => {
            setCvData(sample);
            setShowLanding(false);
          }}
          onClose={() => setShowLanding(false)}
        />
      ) : (
        <>
          {/* Mobile View Switcher - Airbnb Floating Pill Bar */}
          <div
            className="lg:hidden sticky top-[61px] z-30 backdrop-blur-md border-b px-4 py-2.5 flex justify-center no-print shadow-xs transition-colors bg-white/90 border-slate-200/80"
          >
            <div
              className="p-1 rounded-full flex gap-1 w-full max-w-xs border shadow-2xs bg-slate-100 border-slate-200/60"
            >
              <button
                onClick={() => setMobileView('editor')}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  mobileView === 'editor'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Éditeur
              </button>
              <button
                onClick={() => setMobileView('preview')}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  mobileView === 'preview'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Aperçu
              </button>
            </div>
          </div>

          {/* Main Workspace Layout - Pinterest & Airbnb Workspace */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
            {/* Editor Column */}
            <div
              className={`lg:col-span-5 w-full no-print ${
                mobileView === 'editor' ? 'block' : 'hidden lg:block'
              }`}
            >
              <CVEditor data={cvData} onChange={handleDataChange} />
            </div>

            {/* Live Preview Column */}
            <div
              className={`lg:col-span-7 w-full flex justify-center ${
                mobileView === 'preview' ? 'block' : 'hidden lg:block'
              }`}
            >
              <CVPreview data={cvData} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

