export type TemplateId =
  | 'modern'
  | 'professional'
  | 'creative'
  | 'elegant'
  | 'compact'
  | 'minimalist'
  | 'executive'
  | 'tech'
  | 'artistic'
  | 'organic';

export type FontChoice = 'sans' | 'serif' | 'mono' | 'playfair' | 'poppins' | 'lato';

export type SpacingChoice = 'compact' | 'normal' | 'spacious';

export type PhotoShape = 'circle' | 'rounded' | 'square' | 'oval' | 'badge' | 'hidden';

export type PhotoSize = 'sm' | 'md' | 'lg';

export type PhotoBorder = 'none' | 'thin' | 'accent' | 'shadow';

export type HeaderStyle = 'light' | 'colored' | 'gradient' | 'dark';

export type SkillLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthDate?: string;
  birthPlace?: string;
  nationality?: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g. "Bilingue", "Langue maternelle", "C1 - Avancé"
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  technologies: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface TemplateSettings {
  templateId: TemplateId;
  primaryColor: string;
  fontFamily: FontChoice;
  spacing: SpacingChoice;
  photoShape: PhotoShape;
  photoSize: PhotoSize;
  photoBorder?: PhotoBorder;
  headerStyle?: HeaderStyle;
  showIcons: boolean;
  sectionOrder: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  workExperiences: WorkExperience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  certifications: Certification[];
  customSections: CustomSection[];
  settings: TemplateSettings;
}

export const DEFAULT_COLOR_PALETTES = [
  { name: 'Noir Absolu', value: '#000000' },
  { name: 'Noir Charbon', value: '#0f172a' },
  { name: 'Ardoise Sombre', value: '#1e293b' },
  { name: 'Gris Minimal', value: '#475569' },
  { name: 'Bleu Royal', value: '#2563eb' },
  { name: 'Bleu Saphir', value: '#0284c7' },
  { name: 'Sarcelle (Teal)', value: '#0d9488' },
  { name: 'Émeraude', value: '#047857' },
  { name: 'Violet Élégant', value: '#7c3aed' },
  { name: 'Bordeaux', value: '#9f1239' },
  { name: 'Terracotta', value: '#c2410c' },
  { name: 'Bronze Dore', value: '#b45309' },
];
