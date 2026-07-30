'use client';

import React, { useRef } from 'react';
import { Upload, X, Camera, Image as ImageIcon } from 'lucide-react';

interface PhotoUploadProps {
  photoUrl: string;
  onChange: (url: string) => void;
  photoShape: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ photoUrl, onChange, photoShape }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('La taille de la photo ne doit pas dépasser 5 Mo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onChange(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          onChange(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Photo de profil (Facultative)
        </label>
        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
          Optionnelle
        </span>
      </div>

      {photoUrl ? (
        <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt="Photo de profil"
              className={`w-16 h-16 object-cover border border-slate-300 ${
                photoShape === 'circle'
                  ? 'rounded-full'
                  : photoShape === 'rounded'
                  ? 'rounded-lg'
                  : 'rounded-none'
              }`}
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-xs text-slate-600 font-medium">Photo chargée avec succès</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
              >
                Changer
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-5 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/30 group"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Cliquez ou glissez une photo ici</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{"JPG, PNG, WEBP (max 5 Mo) — facultatif"}</p>
            </div>
          </div>
        </div>
      )}
      <p className="text-[11px] text-slate-500 leading-normal">
        {"💡 Sans photo, l'en-tête s'adaptera automatiquement de façon élégante (avec vos initiales ou un recentrage typographique selon le modèle de CV)."}
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
