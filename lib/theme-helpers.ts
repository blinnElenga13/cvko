import { TemplateSettings, PhotoShape, PhotoSize, PhotoBorder, HeaderStyle, FontChoice } from '@/types/cv';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  templateId: any;
  primaryColor: string;
  fontFamily: FontChoice;
  spacing: any;
  photoShape: PhotoShape;
  photoSize: PhotoSize;
  photoBorder: PhotoBorder;
  headerStyle: HeaderStyle;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'monochrome_black',
    name: 'Noir & Blanc Minimal',
    description: 'Style épuré haute précision, noir profond et typographie contrastée.',
    templateId: 'modern',
    primaryColor: '#000000',
    fontFamily: 'sans',
    spacing: 'normal',
    photoShape: 'circle',
    photoSize: 'md',
    photoBorder: 'none',
    headerStyle: 'light',
  },
  {
    id: 'executive_luxe',
    name: 'Executive Dark Slate',
    description: 'Style haut de gamme, en-tête sombre & typographie raffinée.',
    templateId: 'executive',
    primaryColor: '#0f172a',
    fontFamily: 'serif',
    spacing: 'normal',
    photoShape: 'circle',
    photoSize: 'md',
    photoBorder: 'accent',
    headerStyle: 'dark',
  },
  {
    id: 'tech_modern',
    name: 'Tech & Développeur',
    description: 'Inspiré des portfolios dev avec accents bleu royal.',
    templateId: 'tech',
    primaryColor: '#2563eb',
    fontFamily: 'mono',
    spacing: 'compact',
    photoShape: 'badge',
    photoSize: 'md',
    photoBorder: 'shadow',
    headerStyle: 'light',
  },
  {
    id: 'creative_teal',
    name: 'Créatif Sarcelle',
    description: 'Sidebar latérale vibrante, parfait pour les profils créatifs.',
    templateId: 'creative',
    primaryColor: '#0d9488',
    fontFamily: 'sans',
    spacing: 'normal',
    photoShape: 'rounded',
    photoSize: 'md',
    photoBorder: 'accent',
    headerStyle: 'colored',
  },
  {
    id: 'minimal_chic',
    name: 'Minimaliste Nordique',
    description: 'Lignes ultra-fines, typographie aérée & rendu sans photo.',
    templateId: 'minimalist',
    primaryColor: '#475569',
    fontFamily: 'sans',
    spacing: 'spacious',
    photoShape: 'hidden',
    photoSize: 'sm',
    photoBorder: 'none',
    headerStyle: 'light',
  },
  {
    id: 'emerald_pro',
    name: 'Émeraude Professionnel',
    description: 'Équilibre parfait entre sobriété et modernité.',
    templateId: 'professional',
    primaryColor: '#047857',
    fontFamily: 'sans',
    spacing: 'normal',
    photoShape: 'circle',
    photoSize: 'md',
    photoBorder: 'shadow',
    headerStyle: 'gradient',
  },
  {
    id: 'bordeaux_chic',
    name: 'Bordeaux Éditorial',
    description: 'Élégance classique avec accents bordeaux & Serif.',
    templateId: 'elegant',
    primaryColor: '#9f1239',
    fontFamily: 'serif',
    spacing: 'normal',
    photoShape: 'oval',
    photoSize: 'md',
    photoBorder: 'accent',
    headerStyle: 'light',
  },
  {
    id: 'artistic_purple',
    name: 'Chef-d\'œuvre Artistique',
    description: 'Une présentation ultra-stylisée avec des motifs géométriques et des accents violet intense.',
    templateId: 'artistic',
    primaryColor: '#7c3aed',
    fontFamily: 'poppins',
    spacing: 'normal',
    photoShape: 'badge',
    photoSize: 'md',
    photoBorder: 'shadow',
    headerStyle: 'light',
  },
  {
    id: 'organic_sage',
    name: 'Botanique & Doux Sauge',
    description: 'Style éco-organique, avec des décorations de feuilles illustrées en vert sauge.',
    templateId: 'organic',
    primaryColor: '#16a34a',
    fontFamily: 'serif',
    spacing: 'normal',
    photoShape: 'circle',
    photoSize: 'md',
    photoBorder: 'thin',
    headerStyle: 'light',
  },
];

export function getPhotoContainerClasses(
  shape: PhotoShape = 'circle',
  size: PhotoSize = 'md',
  border: PhotoBorder = 'accent'
) {
  if (shape === 'hidden') return 'hidden';

  // Size classes
  let sizeClass = 'w-28 h-28';
  if (size === 'sm') sizeClass = 'w-20 h-20';
  if (size === 'lg') sizeClass = 'w-36 h-36';

  // Shape classes
  let shapeClass = 'rounded-full';
  if (shape === 'rounded') shapeClass = 'rounded-2xl';
  if (shape === 'square') shapeClass = 'rounded-none';
  if (shape === 'oval') shapeClass = 'rounded-[45%]';
  if (shape === 'badge') shapeClass = 'rounded-tl-[28px] rounded-br-[28px] rounded-tr-md rounded-bl-md';

  // Border classes
  let borderClass = 'border-2';
  if (border === 'none') borderClass = 'border-0';
  if (border === 'thin') borderClass = 'border border-slate-200';
  if (border === 'accent') borderClass = 'border-4';
  if (border === 'shadow') borderClass = 'border-2 border-white shadow-lg ring-2 ring-offset-2';

  return `${sizeClass} ${shapeClass} ${borderClass} object-cover shrink-0 transition-all duration-200`;
}

export interface FontOption {
  id: FontChoice;
  name: string;
  category: string;
  description: string;
  fontClass: string;
  previewFamily: string;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'sans',
    name: 'Sans-serif Moderne',
    category: 'Standard',
    description: 'Inter / System UI — Équilibré, lisible et universel.',
    fontClass: 'font-sans',
    previewFamily: 'sans-serif',
  },
  {
    id: 'serif',
    name: 'Serif Éditorial',
    category: 'Classique',
    description: 'Georgia / Times — Élégance académique et prestige.',
    fontClass: 'font-serif',
    previewFamily: 'serif',
  },
  {
    id: 'mono',
    name: 'Monospace Tech',
    category: 'Code & Tech',
    description: 'Fira Code / Courier — Alignement strict, style dev.',
    fontClass: 'font-mono',
    previewFamily: 'monospace',
  },
  {
    id: 'playfair',
    name: 'Serif Deluxe (Playfair)',
    category: 'Haute Révolution',
    description: 'Grand contraste typographique, idéal profils exécutifs.',
    fontClass: 'font-serif tracking-tight',
    previewFamily: 'Georgia, serif',
  },
  {
    id: 'poppins',
    name: 'Geometric Smooth (Poppins)',
    category: 'Créatif & Modern',
    description: 'Lignes rondes et modernes, esthétique startup tech.',
    fontClass: 'font-sans tracking-wide',
    previewFamily: 'system-ui, sans-serif',
  },
  {
    id: 'lato',
    name: 'Humaniste Pro (Lato)',
    category: 'Corporate',
    description: 'Chaleureux tout en restant très structuré.',
    fontClass: 'font-sans font-normal',
    previewFamily: 'Arial, sans-serif',
  },
];

export function getFontClass(fontFamily: FontChoice = 'sans'): string {
  const found = FONT_OPTIONS.find((f) => f.id === fontFamily);
  if (found) return found.fontClass;

  switch (fontFamily) {
    case 'serif':
    case 'playfair':
      return 'font-serif';
    case 'mono':
      return 'font-mono';
    case 'poppins':
    case 'lato':
    case 'sans':
    default:
      return 'font-sans';
  }
}
