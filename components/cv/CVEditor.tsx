'use client';

import React, { useState } from 'react';
import {
  CVData,
  TemplateId,
  FontChoice,
  SpacingChoice,
  PhotoShape,
  PhotoSize,
  PhotoBorder,
  HeaderStyle,
  DEFAULT_COLOR_PALETTES,
  SkillLevel,
} from '@/types/cv';
import { THEME_PRESETS, ThemePreset, FONT_OPTIONS } from '@/lib/theme-helpers';
import { PhotoUpload } from './PhotoUpload';
import { AIModal } from './AIModal';
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Languages as LangIcon,
  Palette,
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Award,
  Layers,
  LayoutGrid,
  Type,
  Maximize2,
  Check,
  Eye,
  EyeOff,
  Wand2,
  Sliders,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';

interface CVEditorProps {
  data: CVData;
  onChange: (updatedData: CVData) => void;
}

export const CVEditor: React.FC<CVEditorProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'customization'>('personal');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiAction, setAiAction] = useState<'generate_summary' | 'enhance_bullet_points' | 'suggest_skills' | 'proofread'>('generate_summary');
  const [activeExpIndex, setActiveExpIndex] = useState<number | null>(null);
  const [enhancingExpIndex, setEnhancingExpIndex] = useState<number | null>(null);

  const handleEnhanceExperience = async (index: number) => {
    const exp = data.workExperiences[index];
    if (!exp) return;

    setEnhancingExpIndex(index);
    try {
      const res = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'enhance_bullet_points',
          jobTitle: exp.position || data.personalInfo.title || 'Professionnel',
          currentText: exp.description || `Responsabilités et missions chez ${exp.company || 'l\'entreprise'}`,
          rawInput: exp.description,
          language: 'fr',
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Erreur lors de la génération IA.');
      }

      if (resData.result) {
        updateWorkExperience(index, 'description', resData.result);
      }
    } catch (err: any) {
      console.error('Erreur amélioration expérience:', err);
      alert(err?.message || 'Erreur lors de la connexion à l\'assistant IA.');
    } finally {
      setEnhancingExpIndex(null);
    }
  };

  // Update handlers
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateSettings = (field: string, value: any) => {
    onChange({
      ...data,
      settings: {
        ...data.settings,
        [field]: value,
      },
    });
  };

  // Work Experience Handlers
  const addWorkExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
    };
    onChange({
      ...data,
      workExperiences: [...data.workExperiences, newExp],
    });
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const updated = [...data.workExperiences];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, workExperiences: updated });
  };

  const deleteWorkExperience = (index: number) => {
    const updated = data.workExperiences.filter((_, i) => i !== index);
    onChange({ ...data, workExperiences: updated });
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu = {
      id: 'edu-' + Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
    };
    onChange({
      ...data,
      educations: [...data.educations, newEdu],
    });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = [...data.educations];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, educations: updated });
  };

  const deleteEducation = (index: number) => {
    const updated = data.educations.filter((_, i) => i !== index);
    onChange({ ...data, educations: updated });
  };

  // Skill Handlers
  const addSkill = () => {
    const newSkill = {
      id: 'sk-' + Date.now(),
      name: '',
      level: 'Avancé' as SkillLevel,
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const updated = [...data.skills];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, skills: updated });
  };

  const deleteSkill = (index: number) => {
    const updated = data.skills.filter((_, i) => i !== index);
    onChange({ ...data, skills: updated });
  };

  // Language Handlers
  const addLanguage = () => {
    const newLang = {
      id: 'lang-' + Date.now(),
      name: '',
      level: 'Courant',
    };
    onChange({ ...data, languages: [...data.languages, newLang] });
  };

  const updateLanguage = (index: number, field: string, value: any) => {
    const updated = [...data.languages];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, languages: updated });
  };

  const deleteLanguage = (index: number) => {
    const updated = data.languages.filter((_, i) => i !== index);
    onChange({ ...data, languages: updated });
  };

  // Project Handlers
  const addProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: '',
      description: '',
      link: '',
      technologies: '',
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, projects: updated });
  };

  const deleteProject = (index: number) => {
    const updated = data.projects.filter((_, i) => i !== index);
    onChange({ ...data, projects: updated });
  };

  // Certification Handlers
  const addCertification = () => {
    const newCert = {
      id: 'cert-' + Date.now(),
      title: '',
      issuer: '',
      date: '',
      link: '',
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const updateCertification = (index: number, field: string, value: any) => {
    const updated = [...data.certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, certifications: updated });
  };

  const deleteCertification = (index: number) => {
    const updated = data.certifications.filter((_, i) => i !== index);
    onChange({ ...data, certifications: updated });
  };

  return (
    <div className="border overflow-hidden flex flex-col h-full rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-200 bg-white border-slate-200/90 text-slate-900">
      {/* Editor Tab Navigation - Airbnb / Pinterest Floating Category Pills */}
      <div className="p-3 border-b flex gap-1.5 overflow-x-auto no-scrollbar transition-colors border-slate-100 bg-slate-50/50">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-3.5 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all ${
            activeTab === 'personal'
              ? 'bg-slate-700 text-white shadow-xs scale-102'
              : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200/80 hover:bg-slate-100/60'
          }`}
        >
          <User className="w-3.5 h-3.5" /> Infos & Photo
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-3.5 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all ${
            activeTab === 'experience'
              ? 'bg-slate-700 text-white shadow-xs scale-102'
              : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200/80 hover:bg-slate-100/60'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" /> Expériences ({data.workExperiences.length})
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-3.5 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all ${
            activeTab === 'education'
              ? 'bg-slate-700 text-white shadow-xs scale-102'
              : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200/80 hover:bg-slate-100/60'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" /> Formations ({data.educations.length})
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-3.5 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all ${
            activeTab === 'skills'
              ? 'bg-slate-700 text-white shadow-xs scale-102'
              : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200/80 hover:bg-slate-100/60'
          }`}
        >
          <Code className="w-3.5 h-3.5" /> Compétences
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-3.5 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all ${
            activeTab === 'projects'
              ? 'bg-slate-700 text-white shadow-xs scale-102'
              : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200/80 hover:bg-slate-100/60'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" /> Projets
        </button>
        <button
          onClick={() => setActiveTab('customization')}
          className={`px-3.5 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all ${
            activeTab === 'customization'
              ? 'bg-slate-700 text-white shadow-xs scale-102'
              : 'bg-slate-100/85 text-slate-700 hover:bg-slate-200/80 border border-slate-200/80'
          }`}
        >
          <Palette className="w-3.5 h-3.5" /> Modèles & Style
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-5 overflow-y-auto max-h-[calc(100vh-140px)] space-y-6">
        {/* TAB 1: PERSONAL INFO */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <PhotoUpload
              photoUrl={data.personalInfo.photoUrl}
              photoShape={data.settings.photoShape}
              onChange={(url) => updatePersonalInfo('photoUrl', url)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom Complet</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="ex: Jean Dupont"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Titre de poste / Recherche</label>
                <input
                  type="text"
                  value={data.personalInfo.title}
                  onChange={(e) => updatePersonalInfo('title', e.target.value)}
                  placeholder="ex: Chef de Projet Digital Senior"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="jean.dupont@email.com"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ville / Localisation</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="Paris, France"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn <span className="text-[10px] text-slate-400 font-normal">(Facultatif)</span>
                </label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/jeandupont"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Site Web / Portfolio <span className="text-[10px] text-slate-400 font-normal">(Facultatif)</span>
                </label>
                <input
                  type="text"
                  value={data.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="https://mon-portfolio.fr"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all bg-white"
                />
              </div>

              {data.settings.templateId === 'tech' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GitHub / Lien Développeur <span className="text-[10px] text-slate-400 font-normal">(Facultatif)</span>
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.github}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    placeholder="github.com/jeandupont"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none transition-all bg-white"
                  />
                </div>
              )}
            </div>

            {/* Summary with AI Trigger */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">Profil / Résumé Professionnel</label>
                <button
                  type="button"
                  onClick={() => {
                    setAiAction('generate_summary');
                    setAiModalOpen(true);
                  }}
                  className="text-xs font-bold text-slate-900 hover:text-black flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full border border-slate-300 transition-all shadow-2xs hover:scale-102"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" /> Rédiger avec l&apos;IA
                </button>
              </div>
              <textarea
                value={data.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder="Présentez brièvement votre profil, vos réussites et vos compétences clés en 2-3 phrases..."
                rows={4}
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 focus:outline-none leading-relaxed transition-all"
              />
            </div>
          </div>
        )}

        {/* TAB 2: WORK EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Expériences Professionnelles
              </h3>
              <button
                type="button"
                onClick={addWorkExperience}
                className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs hover:shadow-md hover:scale-102 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter une expérience
              </button>
            </div>

            {data.workExperiences.length === 0 ? (
              <div className="text-center p-8 bg-slate-50/80 border border-dashed border-slate-300 rounded-2xl">
                <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">Aucune expérience ajoutée pour le moment.</p>
                <button
                  type="button"
                  onClick={addWorkExperience}
                  className="mt-3 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-full shadow-md shadow-slate-300 hover:scale-102 transition-all"
                >
                  + Ajouter la première expérience
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.workExperiences.map((exp, index) => (
                  <div key={exp.id} className="p-4 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-3 relative group hover:border-slate-300 transition-all">
                    <button
                      type="button"
                      onClick={() => deleteWorkExperience(index)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-600 p-1.5 rounded-xl hover:bg-red-50 transition-colors"
                      title="Supprimer l'expérience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Poste occupé</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                          placeholder="ex: Développeur React"
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Entreprise</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                          placeholder="ex: Google France"
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date de début</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                          placeholder="ex: Jan 2021"
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date de fin</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={exp.current ? 'Présent' : exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                            placeholder="ex: Déc 2023"
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white disabled:bg-slate-100 disabled:text-slate-500 transition-all"
                          />
                          <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 shrink-0 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateWorkExperience(index, 'current', e.target.checked)}
                              className="rounded accent-slate-900 border-slate-300"
                            /> En poste
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                        <label className="block text-[11px] font-semibold text-slate-700">
                          Description des missions & réalisations
                        </label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={enhancingExpIndex === index}
                            onClick={() => handleEnhanceExperience(index)}
                            className="text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-2xs hover:scale-102 disabled:opacity-60"
                            title="Réécrire la description avec l'IA pour un impact professionnel accru"
                          >
                            {enhancingExpIndex === index ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-900" />
                                <span>Amélioration...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
                                <span>Améliorer avec l&apos;IA</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveExpIndex(index);
                              setAiAction('enhance_bullet_points');
                              setAiModalOpen(true);
                            }}
                            className="text-[11px] text-slate-500 hover:text-slate-800 underline px-1 py-0.5"
                            title="Ouvrir l'assistant pour personnaliser les options"
                          >
                            Plus d&apos;options...
                          </button>
                        </div>
                      </div>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                        placeholder="• Réalisation de la refonte du site...\n• Augmentation des performances de 30%..."
                        rows={3}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white leading-relaxed transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Formations & Diplômes
              </h3>
              <button
                type="button"
                onClick={addEducation}
                className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs hover:shadow-md hover:scale-102 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter une formation
              </button>
            </div>

            {data.educations.length === 0 ? (
              <div className="text-center p-8 bg-slate-50/80 border border-dashed border-slate-300 rounded-2xl">
                <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">Aucune formation ajoutée.</p>
                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-3 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-full shadow-md shadow-slate-300 hover:scale-102 transition-all"
                >
                  + Ajouter une formation
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.educations.map((edu, index) => (
                  <div key={edu.id} className="p-4 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-3 relative hover:border-slate-300 transition-all">
                    <button
                      type="button"
                      onClick={() => deleteEducation(index)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-600 p-1.5 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Diplôme / Titre</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          placeholder="ex: Master Informatique"
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Établissement / École</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                          placeholder="ex: Université de Paris"
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Spécialité / Domaine</label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                          placeholder="ex: Génie Logiciel & IA"
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Début</label>
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                            placeholder="2018"
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Fin</label>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            placeholder="2020"
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SKILLS & LANGUAGES */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Skills Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-slate-900" /> Compétences Clés
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAiAction('suggest_skills');
                      setAiModalOpen(true);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full flex items-center gap-1.5 transition-all shadow-2xs hover:scale-102"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" /> Suggérer avec IA
                  </button>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-3.5 py-1.5 text-xs font-bold bg-slate-900 hover:bg-black text-white rounded-full flex items-center gap-1.5 shadow-2xs hover:scale-102 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Compétence
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      placeholder="Nom de la compétence (ex: React.js)"
                      className="flex-1 text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                    />
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(index, 'level', e.target.value)}
                      className="text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white"
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Avancé">Avancé</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => deleteSkill(index)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <LangIcon className="w-4 h-4 text-emerald-600" /> Langues Parlées
                </h3>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="px-3 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> + Langue
                </button>
              </div>

              <div className="space-y-2">
                {data.languages.map((lang, index) => (
                  <div key={lang.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                      placeholder="ex: Anglais"
                      className="flex-1 text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                      className="w-40 text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 bg-white"
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Courant">Courant</option>
                      <option value="Langue maternelle">Langue maternelle</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => deleteLanguage(index)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS & CERTIFICATIONS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Projects */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4 text-purple-600" /> Projets & Realisations <span className="text-[10px] text-slate-400 font-normal lowercase">(facultatif)</span>
                </h3>
                <button
                  type="button"
                  onClick={addProject}
                  className="px-3 py-1 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> + Projet
                </button>
              </div>

              {data.projects.map((proj, index) => (
                <div key={proj.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => deleteProject(index)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      placeholder="Titre du projet"
                      className="text-xs p-2 border border-slate-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={proj.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      placeholder="Lien (ex: github.com/projet)"
                      className="text-xs p-2 border border-slate-300 rounded bg-white"
                    />
                  </div>
                  <textarea
                    value={proj.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    placeholder="Description du projet..."
                    rows={2}
                    className="w-full text-xs p-2 border border-slate-300 rounded bg-white"
                  />
                  <input
                    type="text"
                    value={proj.technologies}
                    onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                    placeholder="Technologies utilisées (ex: React, Tailwind, Node)"
                    className="w-full text-xs p-2 border border-slate-300 rounded bg-white"
                  />
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" /> Certifications
                </h3>
                <button
                  type="button"
                  onClick={addCertification}
                  className="px-3 py-1 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> + Certification
                </button>
              </div>

              {data.certifications.map((cert, index) => (
                <div key={cert.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => updateCertification(index, 'title', e.target.value)}
                    placeholder="Titre certif (ex: AWS Certified)"
                    className="flex-1 text-xs p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                    placeholder="Organisme (ex: AWS)"
                    className="w-32 text-xs p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                    placeholder="Année"
                    className="w-20 text-xs p-2 border border-slate-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => deleteCertification(index)}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: TEMPLATES & STYLING */}
        {activeTab === 'customization' && (
          <div className="space-y-8">
            {/* 1. Theme Presets */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="w-4 h-4 text-purple-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Préréglages Thématiques en 1 Clic
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {THEME_PRESETS.map((preset) => {
                  const isActive =
                    data.settings.templateId === preset.templateId &&
                    data.settings.primaryColor === preset.primaryColor;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        onChange({
                          ...data,
                          settings: {
                            ...data.settings,
                            templateId: preset.templateId,
                            primaryColor: preset.primaryColor,
                            fontFamily: preset.fontFamily,
                            spacing: preset.spacing,
                            photoShape: preset.photoShape,
                            photoSize: preset.photoSize,
                            photoBorder: preset.photoBorder,
                            headerStyle: preset.headerStyle,
                          },
                        });
                      }}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                        isActive
                          ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-500/20 shadow-sm'
                          : 'border-slate-200 hover:border-purple-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10 shadow-2xs"
                          style={{ backgroundColor: preset.primaryColor }}
                        />
                        <span className="font-bold text-slate-900 text-xs truncate">{preset.name}</span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 leading-tight line-clamp-2">
                        {preset.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Template Selector (10 Themes) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-slate-900" /> Modèle de Mise en Page (10 Thèmes)
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  {data.settings.templateId.toUpperCase()} actif
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'modern', name: 'Moderne', desc: 'Épuré, neutre & universel (Header clair)' },
                  { id: 'professional', name: 'Professionnel', desc: 'Header exécutif teinté & badges dynamiques' },
                  { id: 'creative', name: 'Créatif', desc: 'Bandeau latéral coloré à fort impact visuel' },
                  { id: 'elegant', name: 'Élégant', desc: 'Typographie raffinée Serif & accents bordeaux' },
                  { id: 'compact', name: 'Compact', desc: 'Haute densité d\'informations pour CV 1 page' },
                  { id: 'minimalist', name: 'Minimaliste', desc: 'Inspiration nordique & lignes ultra-fines' },
                  { id: 'executive', name: 'Executive', desc: 'En-tête sombre luxe & structure 2 colonnes' },
                  { id: 'tech', name: 'Tech & Dev', desc: 'Stack pills, style code & badges développeur' },
                  { id: 'artistic', name: '✨ Artistique Géométrique', desc: 'Motifs vectoriels, monogramme & style ultra-stylisé' },
                  { id: 'organic', name: '🌿 Botanique & Nature', desc: 'Lignes délicates de vignes & feuilles, couleurs douces' },
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => updateSettings('templateId', tpl.id as TemplateId)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      data.settings.templateId === tpl.id
                        ? 'border-slate-900 bg-slate-100/80 ring-2 ring-slate-900/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{tpl.name}</span>
                      {data.settings.templateId === tpl.id && (
                        <span className="w-2 h-2 rounded-full bg-slate-900" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-snug">{tpl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Color Palette & Header Style */}
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-emerald-600" /> Couleur d&apos;accentuation (12 Nuances)
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {DEFAULT_COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.value}
                      type="button"
                      onClick={() => updateSettings('primaryColor', palette.value)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center relative ${
                        data.settings.primaryColor === palette.value ? 'border-slate-900 scale-110 shadow-md ring-2 ring-slate-900/30' : 'border-white'
                      }`}
                      style={{ backgroundColor: palette.value }}
                      title={palette.name}
                    >
                      {data.settings.primaryColor === palette.value && (
                        <Check className="w-4 h-4 text-white drop-shadow-xs" />
                      )}
                    </button>
                  ))}

                  <div className="flex items-center gap-2 ml-2 border-l border-slate-200 pl-3">
                    <span className="text-xs text-slate-600 font-medium">Sélecteur Hex:</span>
                    <input
                      type="color"
                      value={data.settings.primaryColor}
                      onChange={(e) => updateSettings('primaryColor', e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={data.settings.primaryColor}
                      onChange={(e) => updateSettings('primaryColor', e.target.value)}
                      className="w-20 text-xs p-1.5 border border-slate-300 rounded font-mono uppercase bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Header Style Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Style de l&apos;En-tête (Header)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'light', label: 'Clair (Blanc/Gris)' },
                    { id: 'colored', label: 'Teinté (Couleur CV)' },
                    { id: 'gradient', label: 'Dégradé Subtil' },
                    { id: 'dark', label: 'Ardoise Sombre Luxe' },
                  ].map((hStyle) => (
                    <button
                      key={hStyle.id}
                      type="button"
                      onClick={() => updateSettings('headerStyle', hStyle.id as HeaderStyle)}
                      className={`p-2 rounded-lg border text-xs font-medium text-center transition-all ${
                        (data.settings.headerStyle || 'light') === hStyle.id
                          ? 'border-slate-900 bg-slate-100 text-slate-900 font-bold'
                          : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {hStyle.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Photo Customization Controls */}
            <div className="space-y-4 pt-4 border-t border-slate-200 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-slate-900" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Options de la Photo de Profil
                  </h3>
                </div>

                {/* Photo Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const newShape = data.settings.photoShape === 'hidden' ? 'circle' : 'hidden';
                    updateSettings('photoShape', newShape);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    data.settings.photoShape !== 'hidden'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                >
                  {data.settings.photoShape !== 'hidden' ? (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Photo Activée
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" /> Photo Masquée
                    </>
                  )}
                </button>
              </div>

              {data.settings.photoShape !== 'hidden' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {/* Forme de la Photo */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Forme de la Photo
                    </label>
                    <select
                      value={data.settings.photoShape}
                      onChange={(e) => updateSettings('photoShape', e.target.value as PhotoShape)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="circle">Ronde (Cercle parfait)</option>
                      <option value="rounded">Bords arrondis soft</option>
                      <option value="square">Carrée structurée</option>
                      <option value="oval">Ovale chic</option>
                      <option value="badge">Badge asymétrique</option>
                    </select>
                  </div>

                  {/* Taille de la Photo */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Taille de la Photo
                    </label>
                    <select
                      value={data.settings.photoSize || 'md'}
                      onChange={(e) => updateSettings('photoSize', e.target.value as PhotoSize)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="sm">Petite (Compacte - 80px)</option>
                      <option value="md">Moyenne (Standard - 112px)</option>
                      <option value="lg">Grande (Mise en avant - 144px)</option>
                    </select>
                  </div>

                  {/* Style de Bordure */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Style de Bordure
                    </label>
                    <select
                      value={data.settings.photoBorder || 'accent'}
                      onChange={(e) => updateSettings('photoBorder', e.target.value as PhotoBorder)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="none">Aucune bordure</option>
                      <option value="thin">Bordure fine gris neutre</option>
                      <option value="accent">Couleur primaire du CV</option>
                      <option value="shadow">Ombre portée & Ring blanc</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Typography & Font Choice */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-slate-900" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Choix de la Police de Caractères
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  {FONT_OPTIONS.length} Polices Professionnelles
                </span>
              </div>

              {/* Font Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {FONT_OPTIONS.map((font) => {
                  const isSelected = data.settings.fontFamily === font.id;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => updateSettings('fontFamily', font.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-slate-900 bg-slate-100/60 ring-2 ring-slate-900/20 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          {font.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {font.category}
                        </span>
                      </div>

                      <div className="my-2 p-2 rounded bg-slate-50 border border-slate-200/60 overflow-hidden">
                        <div
                          style={{ fontFamily: font.previewFamily }}
                          className={`text-sm text-slate-800 ${font.fontClass} truncate`}
                        >
                          Jean Dupont — Directeur
                        </div>
                        <div
                          style={{ fontFamily: font.previewFamily }}
                          className="text-[11px] text-slate-500 truncate mt-0.5"
                        >
                          Expérience & Compétences Clés
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 line-clamp-1">
                        {font.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Spacing & Icons options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500" /> Espacement du contenu
                  </label>
                  <select
                    value={data.settings.spacing}
                    onChange={(e) => updateSettings('spacing', e.target.value as SpacingChoice)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="compact">Compact (Dense / Plus d&apos;infos)</option>
                    <option value="normal">Normal (Équilibré standard)</option>
                    <option value="spacious">Aéré (Légèreté visuelle)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Icônes dans les rubriques
                  </label>
                  <button
                    type="button"
                    onClick={() => updateSettings('showIcons', !data.settings.showIcons)}
                    className={`w-full text-xs p-2.5 border rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      data.settings.showIcons
                        ? 'bg-slate-100 border-slate-400 text-slate-900'
                        : 'bg-slate-50 border-slate-300 text-slate-600'
                    }`}
                  >
                    {data.settings.showIcons ? '✓ Icônes activées' : '✕ Masquer les icônes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Modal Component */}
      <AIModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialAction={aiAction}
        jobTitle={data.personalInfo.title}
        currentText={
          aiAction === 'generate_summary'
            ? data.personalInfo.summary
            : activeExpIndex !== null
            ? data.workExperiences[activeExpIndex]?.description
            : ''
        }
        onApply={(generatedText) => {
          if (aiAction === 'generate_summary') {
            updatePersonalInfo('summary', generatedText);
          } else if (aiAction === 'enhance_bullet_points' && activeExpIndex !== null) {
            updateWorkExperience(activeExpIndex, 'description', generatedText);
          } else if (aiAction === 'suggest_skills') {
            // Split skills and add them
            const skillNames = generatedText.split(',').map((s) => s.trim()).filter(Boolean);
            const newSkills = skillNames.map((name) => ({
              id: 'sk-' + Math.random(),
              name,
              level: 'Avancé' as SkillLevel,
            }));
            onChange({ ...data, skills: [...data.skills, ...newSkills] });
          }
          setAiModalOpen(false);
        }}
      />
    </div>
  );
};
