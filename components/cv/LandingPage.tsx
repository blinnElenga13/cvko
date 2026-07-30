'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  FileText, 
  Layers, 
  Eye, 
  Download, 
  ArrowRight, 
  User, 
  CheckCircle2, 
  Heart,
  Palette,
  Bot,
  Zap,
  Globe,
  BookOpen
} from 'lucide-react';
import { CVData } from '@/types/cv';
import { SAMPLE_CV_DEV, SAMPLE_CV_MARKETING, EMPTY_CV_DATA } from '@/lib/sample-data';

interface LandingPageProps {
  onStartEditing: (data: CVData) => void;
  onClose: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartEditing, onClose }) => {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] py-10 px-4 md:px-8 transition-colors duration-200 bg-[#f8fafc] text-slate-800">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold font-mono tracking-wider shadow-2xs uppercase"
            style={{ 
              borderColor: '#e2e8f0',
              backgroundColor: '#ffffff',
              color: '#2563eb'
            }}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{"L'Éditeur de CV Ultime assisté par l'IA"}</span>
          </motion.div>
 
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none"
          >
            {"Démarquez-vous avec un"} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {"CV d'Exception"}
            </span>
          </motion.h1>
 
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-slate-600 font-medium"
          >
            {"CVKO Studio est une application moderne de création de CV qui allie design de précision, modèles artistiques et écriture assistée par l'intelligence artificielle pour propulser votre carrière."}
          </motion.p>
 
          {/* Designer Credit Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center gap-2 mt-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-xs text-xs font-semibold bg-white border-slate-200 text-slate-700">
              <User className="w-4 h-4 text-emerald-500" />
              <span>{"Conçu et développé par "} <strong className="text-slate-800">{"Blinn ELENGA"}</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </motion.div>
        </div>
 
        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all hover:scale-102 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{"Accéder directement à l'éditeur"}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
 
        {/* Quick Launch Template Chooser */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {"🚀 Choisissez une inspiration pour commencer"}
            </h2>
            <p className="text-xs sm:text-sm mt-1 text-slate-500">
              {"Vous pourrez changer de modèle ou modifier tout le contenu à tout moment dans l'éditeur."}
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tech Template Card */}
            <div 
              onClick={() => onStartEditing(SAMPLE_CV_DEV)}
              className="p-6 rounded-2xl border text-left cursor-pointer transition-all hover:scale-102 group bg-white border-slate-200/80 hover:border-blue-500 hover:bg-slate-50/50 shadow-xs"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600">
                  {"Populaire"}
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-blue-500 transition-colors">
                {"Tech & Développement"}
              </h3>
              <p className="text-xs leading-relaxed mb-4 text-slate-500">
                {"Idéal pour les ingénieurs, développeurs et profils scientifiques. Intègre des badges de compétences et un rendu style code épuré."}
              </p>
              <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1">
                {"Utiliser cette inspiration"} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
 
            {/* Creative/Marketing Card */}
            <div 
              onClick={() => onStartEditing(SAMPLE_CV_MARKETING)}
              className="p-6 rounded-2xl border text-left cursor-pointer transition-all hover:scale-102 group bg-white border-slate-200/80 hover:border-purple-500 hover:bg-slate-50/50 shadow-xs"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600">
                  {"Créatif"}
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-purple-500 transition-colors">
                {"Marketing & Design"}
              </h3>
              <p className="text-xs leading-relaxed mb-4 text-slate-500">
                {"Une disposition élégante avec des colonnes équilibrées pour mettre en valeur vos projets, campagnes et compétences créatives."}
              </p>
              <span className="text-xs font-bold text-purple-600 inline-flex items-center gap-1">
                {"Utiliser cette inspiration"} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
 
            {/* Blank Canvas Card */}
            <div 
              onClick={() => onStartEditing(EMPTY_CV_DATA)}
              className="p-6 rounded-2xl border text-left cursor-pointer transition-all hover:scale-102 group bg-white border-slate-200/80 hover:border-emerald-500 hover:bg-slate-50/50 shadow-xs"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                  {"Nouveau"}
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-emerald-500 transition-colors">
                {"Partir de Zéro (Vide)"}
              </h3>
              <p className="text-xs leading-relaxed mb-4 text-slate-500">
                {"Commencez avec une structure vierge pour saisir vos informations manuellement ou importer votre fichier de sauvegarde JSON."}
              </p>
              <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1">
                {"Créer un CV vierge"} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </motion.div>
 
        {/* Features Showcase Section */}
        <div className="p-8 md:p-10 rounded-3xl border bg-white border-slate-200/60 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-8 text-center sm:text-left">
            {"✨ Pourquoi choisir CVKO Studio ?"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 shrink-0 h-10 w-10 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm sm:text-base">{"10 Thèmes Graphiques & Modèles Décorés"}</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  {"Bénéficiez de mises en page uniques, allant de l'Ultra-Minimaliste au style Executive haut de gamme, sans oublier les nouveaux modèles ornés (✨ Artistique Géométrique et 🌿 Botanique & Nature)."}
                </p>
              </div>
            </div>
 
            <div className="flex gap-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0 h-10 w-10 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm sm:text-base">{"Intelligence Artificielle Intégrée"}</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  {"Rédigez avec aisance grâce à l'intégration de Gemini 2.5 Flash : générez votre résumé professionnel, optimisez vos puces de réalisations, ou suggérez des compétences pertinentes."}
                </p>
              </div>
            </div>
 
            <div className="flex gap-4">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 shrink-0 h-10 w-10 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm sm:text-base">{"Export Multi-Format Haute Fidélité"}</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  {"Exportez instantanément votre CV au format PDF vectoriel, imprimez au format A4 réglementaire, ou générez un document Word (.docx) compatible Microsoft Office. Sauvegardez et restaurez vos CVs en format JSON."}
                </p>
              </div>
            </div>
 
            <div className="flex gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 h-10 w-10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm sm:text-base">{"Confidentialité Totale & Offline-First"}</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  {"Vos données personnelles restent stockées exclusivement dans le navigateur local. Aucun serveur externe ne conserve vos informations privées."}
                </p>
              </div>
            </div>
          </div>
        </div>
 
        {/* Footer info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-200/60 pt-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>{"Fait avec passion par Blinn ELENGA"}</span>
          </div>
        </div>
 
      </div>
    </div>
  );
};
