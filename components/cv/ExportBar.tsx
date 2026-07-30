'use client';

import React, { useRef, useState } from 'react';
import {
  Download,
  FileText,
  Printer,
  FileCode,
  Upload,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  Copy,
  Check,
  ChevronDown,
} from 'lucide-react';
import { exportToPDF, exportToPNG, generateATSText, printCV } from '@/lib/export-pdf';
import { generateDocx } from '@/lib/export-docx';
import { CVData } from '@/types/cv';
import { SAMPLE_CV_DEV, SAMPLE_CV_MARKETING, EMPTY_CV_DATA } from '@/lib/sample-data';

interface ExportBarProps {
  cvData: CVData;
  onLoadSample: (sample: CVData) => void;
  onImportJSON: (data: CVData) => void;
  showLanding?: boolean;
  onToggleLanding?: () => void;
}

export const ExportBar: React.FC<ExportBarProps> = ({
  cvData,
  onLoadSample,
  onImportJSON,
  showLanding = false,
  onToggleLanding,
}) => {
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [downloadingPNG, setDownloadingPNG] = useState(false);
  const [copiedATS, setCopiedATS] = useState(false);
  const [showMoreExports, setShowMoreExports] = useState(false);

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try {
      const fileName = `${cvData.personalInfo.fullName || 'cv'}_CVKO.pdf`.replace(/\s+/g, '_');
      await exportToPDF('cv-preview-container', fileName);
    } catch (err: any) {
      console.error('Erreur lors du téléchargement du PDF:', err);
      if (confirm(`Le téléchargement direct du PDF a rencontré un problème (${err?.message || 'Erreur indéfinie'}).\n\nSouhaitez-vous ouvrir la boîte d'impression ? Vous pourrez y choisir "Enregistrer au format PDF".`)) {
        printCV();
      }
    } finally {
      setDownloadingPDF(false);
    }
  };

  const handleDownloadDocx = async () => {
    setDownloadingDocx(true);
    try {
      const blob = await generateDocx(cvData);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvData.personalInfo.fullName || 'cv'}_CVKO.docx`.replace(/\s+/g, '_');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert('Erreur lors de la création du document Word: ' + err?.message);
    } finally {
      setDownloadingDocx(false);
    }
  };

  const handleDownloadPNG = async () => {
    setDownloadingPNG(true);
    try {
      const fileName = `${cvData.personalInfo.fullName || 'cv'}_CVKO.png`.replace(/\s+/g, '_');
      await exportToPNG('cv-preview-container', fileName);
    } catch (err: any) {
      alert('Erreur lors de la création de la photo PNG: ' + err?.message);
    } finally {
      setDownloadingPNG(false);
    }
  };

  const handleCopyATS = () => {
    const text = generateATSText(cvData);
    navigator.clipboard.writeText(text);
    setCopiedATS(true);
    setTimeout(() => setCopiedATS(false), 2000);
  };

  const handleDownloadTXT = () => {
    const text = generateATSText(cvData);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cvData.personalInfo.fullName || 'cv'}_ATS.txt`.replace(/\s+/g, '_');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(cvData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `cvko_backup_${cvData.personalInfo.fullName || 'data'}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSONFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personalInfo) {
          onImportJSON(parsed);
          alert('CV importé dans CVKO avec succès !');
        } else {
          alert('Fichier JSON non valide.');
        }
      } catch (err) {
        alert('Erreur de lecture du fichier JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b shadow-xs no-print transition-colors bg-white/90 border-slate-200/80 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h1 className="font-black text-base sm:text-lg tracking-tight text-slate-800">
              CV<span>KO</span>
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-slate-800 text-white border-slate-800">
              Studio CV
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 relative">
          {/* Landing/Presentation Toggle Button */}
          {onToggleLanding && (
            <button
              onClick={onToggleLanding}
              title={showLanding ? "Retourner à l'éditeur" : "Voir la présentation de l'outil"}
              className={`p-2 sm:px-3 sm:py-2 border rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer ${
                showLanding
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showLanding ? 'Créer mon CV' : 'Présentation'}</span>
            </button>
          )}

          {/* Sample Loader Pills */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full border mr-1 bg-slate-100/80 border-slate-200/60">
            <span className="text-[11px] font-semibold pl-2 pr-1 text-slate-500">
              Inspirations:
            </span>
            <button
              onClick={() => onLoadSample(SAMPLE_CV_DEV)}
              className="px-3 py-1 text-xs font-semibold rounded-full shadow-2xs border transition-all hover:scale-102 bg-white hover:bg-slate-50 text-slate-700 border-slate-200/60"
            >
              Tech & Dev
            </button>
            <button
              onClick={() => onLoadSample(SAMPLE_CV_MARKETING)}
              className="px-3 py-1 text-xs font-semibold rounded-full shadow-2xs border transition-all hover:scale-102 bg-white hover:bg-slate-50 text-slate-700 border-slate-200/60"
            >
              Marketing
            </button>
            <button
              onClick={() => {
                if (confirm('Voulez-vous effacer tous les champs pour repartir de zéro dans CVKO ?')) {
                  onLoadSample(EMPTY_CV_DATA);
                }
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-full transition-colors text-slate-500 hover:text-red-600 hover:bg-red-50"
              title="Réinitialiser les données"
            >
              Effacer
            </button>
          </div>

          {/* Import / Backup JSON */}
          <button
            onClick={() => jsonInputRef.current?.click()}
            title="Importer une sauvegarde JSON"
            className="p-2 sm:px-3 sm:py-2 border rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Importer</span>
          </button>
          <input
            ref={jsonInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJSONFile}
            className="hidden"
          />

          <button
            onClick={handleExportJSON}
            title="Sauvegarder les données au format JSON"
            className="p-2 sm:px-3 sm:py-2 border rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          {/* Print */}
          <button
            onClick={printCV}
            className="p-2 sm:px-3.5 sm:py-2 border rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
            title="Imprimer ou enregistrer au format PDF via le navigateur"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>

          {/* Word (.docx) */}
          <button
            onClick={handleDownloadDocx}
            disabled={downloadingDocx}
            className="px-3.5 py-2 border rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs disabled:opacity-50 bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
            title="Exporter en Word (.docx) éditable"
          >
            {downloadingDocx ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span>Word</span>
          </button>

          {/* PNG Image Export */}
          <button
            onClick={handleDownloadPNG}
            disabled={downloadingPNG}
            className="px-3.5 py-2 border rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs disabled:opacity-50 bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
            title="Exporter l'image haute définition (PNG)"
          >
            {downloadingPNG ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span>PNG</span>
          </button>

          {/* ATS Copier / Text Export */}
          <button
            onClick={handleCopyATS}
            className="px-3.5 py-2 border rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
            title="Copier le texte optimisé pour les logiciels de recrutement (ATS)"
          >
            {copiedATS ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>{copiedATS ? 'Copié !' : 'Texte ATS'}</span>
          </button>

          {/* PDF Download Primary */}
          <button
            onClick={handleDownloadPDF}
            disabled={downloadingPDF}
            className="px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all hover:scale-102 active:scale-98 disabled:opacity-50 bg-slate-900 hover:bg-black text-white shadow-md shadow-slate-300"
          >
            {downloadingPDF ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Télécharger PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
