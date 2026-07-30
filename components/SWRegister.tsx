'use client';

import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, Download, CheckCircle2 } from 'lucide-react';

export function SWRegister() {
  const [isOffline, setIsOffline] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOffline(!navigator.onLine);
    // 1. Service worker registration
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('CVKO ServiceWorker enregistré avec succès:', reg.scope);
          })
          .catch((err) => {
            console.error('Échec enregistrement ServiceWorker:', err);
          });
      });
    } else if ('serviceWorker' in navigator) {
      // Register in dev for local testing too
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // 2. Online / Offline listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 3. PWA install prompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* Offline Alert Banner */}
      {isOffline && (
        <div className="bg-amber-500 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm no-print sticky top-0 z-50">
          <WifiOff className="w-4 h-4" />
          <span>Mode Hors-Ligne activé — Vos modifications dans CVKO restent sauvegardées localement !</span>
        </div>
      )}

      {/* PWA Install Banner */}
      {showInstallBanner && !isInstalled && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-3 max-w-sm animate-in fade-in slide-in-from-bottom-4 no-print">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0">
            KO
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white leading-tight">Installer l&apos;application CVKO</h4>
            <p className="text-[11px] text-slate-400 truncate">Accès rapide & fonctionnement 100% hors-ligne</p>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full transition-colors shrink-0 flex items-center gap-1 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Installer
          </button>
        </div>
      )}
    </>
  );
}
