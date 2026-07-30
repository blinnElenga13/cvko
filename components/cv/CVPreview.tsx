'use client';

import React, { useState } from 'react';
import { CVData } from '@/types/cv';
import { ModernTemplate } from './templates/ModernTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { ArtisticTemplate } from './templates/ArtisticTemplate';
import { OrganicTemplate } from './templates/OrganicTemplate';
import { ZoomIn, ZoomOut, RotateCcw, FileText } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  const { templateId } = data.settings;
  const [zoom, setZoom] = useState<number>(100);

  const templateNames: Record<string, string> = {
    modern: 'Moderne Premium',
    professional: 'Professionnel Émeraude',
    creative: 'Créatif & Coloré',
    elegant: 'Élégant & Serif',
    compact: 'Compact & Dense',
    minimalist: 'Minimaliste Nordique',
    executive: 'Executive Dark Slate',
    tech: 'Tech & Développeur',
    artistic: 'Artistique Géométrique (Décoré)',
    organic: 'Botanique & Nature (Décoré)',
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      case 'compact':
        return <CompactTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'tech':
        return <TechTemplate data={data} />;
      case 'artistic':
        return <ArtisticTemplate data={data} />;
      case 'organic':
        return <OrganicTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 130));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="w-full flex flex-col items-center p-3 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl min-h-[calc(100vh-100px)] transition-colors duration-200 bg-slate-100/60">
      {/* Top Preview Controls Bar (Hidden in Print) */}
      <div className="w-full max-w-[800px] mb-4 flex flex-wrap items-center justify-between gap-2 px-4 py-2 backdrop-blur-md rounded-2xl border shadow-xs no-print text-xs transition-colors duration-200 bg-white/90 border-slate-200/80 text-slate-900">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>{templateNames[templateId] || 'Modèle Personnalisé'}</span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full border bg-slate-100 text-slate-600 border-slate-200">
            Format A4 • 210 × 297 mm
          </span>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl border bg-slate-100 border-slate-200">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 70}
            className="p-1.5 rounded-lg disabled:opacity-40 transition-all cursor-pointer hover:bg-white text-slate-700"
            title="Zoom arrière (-10%)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-mono font-semibold text-[11px] min-w-[42px] text-center text-slate-700">
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 130}
            className="p-1.5 rounded-lg disabled:opacity-40 transition-all cursor-pointer hover:bg-white text-slate-700"
            title="Zoom avant (+10%)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoom !== 100 && (
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg transition-all ml-0.5 cursor-pointer hover:bg-white text-slate-700"
              title="Réinitialiser le zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* CV Sheet Container */}
      <div className="w-full flex justify-center overflow-x-auto pb-6">
        <div
          id="cv-preview-container"
          className="w-full max-w-[800px] shadow-2xl rounded-md overflow-hidden transition-all duration-200 bg-white border border-slate-300/80 origin-top ring-1 ring-black/5"
          style={{
            transform: zoom !== 100 ? `scale(${zoom / 100})` : 'none',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
