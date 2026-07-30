'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, Check, RefreshCw, X, HelpCircle, Bot } from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (generatedText: string) => void;
  initialAction?: 'generate_summary' | 'enhance_bullet_points' | 'suggest_skills' | 'proofread';
  jobTitle?: string;
  currentText?: string;
}

export const AIModal: React.FC<AIModalProps> = ({
  isOpen,
  onClose,
  onApply,
  initialAction = 'generate_summary',
  jobTitle = '',
  currentText = '',
}) => {
  const [action, setAction] = useState(initialAction);
  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          jobTitle,
          rawInput: promptInput,
          currentText: currentText || promptInput,
          language: 'fr',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la génération IA.');
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la connexion à l\'assistant IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h3 className="font-bold text-base tracking-tight">Assistant IA - Générateur de Contenu</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Action Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Que souhaitez-vous réaliser ?
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => { setAction('generate_summary'); setResult(''); }}
                className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                  action === 'generate_summary'
                    ? 'border-slate-900 bg-slate-100 text-slate-900 shadow-2xs ring-2 ring-slate-900/20'
                    : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Rédiger un Profil / Résumé
              </button>
              <button
                type="button"
                onClick={() => { setAction('enhance_bullet_points'); setResult(''); }}
                className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                  action === 'enhance_bullet_points'
                    ? 'border-slate-900 bg-slate-100 text-slate-900 shadow-2xs ring-2 ring-slate-900/20'
                    : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Améliorer l&apos;Expérience (Impact IA)
              </button>
              <button
                type="button"
                onClick={() => { setAction('suggest_skills'); setResult(''); }}
                className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                  action === 'suggest_skills'
                    ? 'border-slate-900 bg-slate-100 text-slate-900 shadow-2xs ring-2 ring-slate-900/20'
                    : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Suggérer des Compétences
              </button>
              <button
                type="button"
                onClick={() => { setAction('proofread'); setResult(''); }}
                className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                  action === 'proofread'
                    ? 'border-slate-900 bg-slate-100 text-slate-900 shadow-2xs ring-2 ring-slate-900/20'
                    : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Corriger & Améliorer
              </button>
            </div>
          </div>

          {/* Prompt / Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {action === 'generate_summary'
                ? 'Informations clés à inclure (Mots-clés, objectifs, passions)'
                : action === 'enhance_bullet_points'
                ? 'Description brute de votre poste ou tâches réalisées'
                : action === 'suggest_skills'
                ? 'Intitulé de votre poste'
                : 'Texte à corriger'}
            </label>
            <textarea
              value={promptInput || currentText}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder={
                action === 'generate_summary'
                  ? 'Ex: 5 ans d\'expérience en React, passionné d\'accessibilité, bilingue anglais...'
                  : action === 'enhance_bullet_points'
                  ? 'Ex: J\'ai géré les clients, fait la refonte du site web et augmenté les ventes...'
                  : 'Ex: Chef de Projet Digital...'
              }
              rows={3}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all"
            />
          </div>

          {/* Action Trigger */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-slate-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" /> Générer avec l&apos;assistant IA
              </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
              {error}
            </div>
          )}

          {/* Result Box */}
          {result && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Résultat généré
              </label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {result}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onApply(result)}
                  className="flex-1 py-2 px-3 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Insérer dans mon CV
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="py-2 px-3 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Régénérer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
