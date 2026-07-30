'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code, Languages, FolderGit2, Cake, Flag } from 'lucide-react';
import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const ArtisticTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, photoShape, photoSize, photoBorder, showIcons } = settings;

  const fontClass = getFontClass(fontFamily);
  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  // Get initials for custom artistic monogram decoration
  const getInitials = (name: string) => {
    if (!name) return 'CV';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const initials = getInitials(personalInfo.fullName);

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} relative p-8 sm:p-12 leading-relaxed min-h-[1080px] shadow-sm print-area overflow-hidden`}>
      {/* Decorative Geometric Top-Right Motif */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-15 pointer-events-none no-print">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="150" cy="50" r="80" stroke={primaryColor} strokeWidth="1.5" />
          <circle cx="150" cy="50" r="50" stroke={primaryColor} strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="150" cy="50" r="110" stroke={primaryColor} strokeWidth="0.75" />
          <line x1="20" y1="50" x2="180" y2="210" stroke={primaryColor} strokeWidth="1" />
          <line x1="150" y1="0" x2="150" y2="200" stroke={primaryColor} strokeWidth="0.5" />
        </svg>
      </div>

      {/* Decorative Geometric Bottom-Left Motif */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none no-print">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="-50" y="100" width="150" height="150" rx="20" transform="rotate(45 -50 100)" stroke={primaryColor} strokeWidth="1.5" />
          <rect x="-50" y="100" width="110" height="110" rx="15" transform="rotate(45 -50 100)" stroke={primaryColor} strokeWidth="0.75" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Header Section */}
      <header className="relative pb-8 mb-8 border-b-2 border-slate-100 flex flex-col md:flex-row gap-6 items-center">
        {/* Artistic Monogram / Profile Photo */}
        <div className="relative shrink-0">
          {personalInfo.photoUrl && photoShape !== 'hidden' ? (
            <div className="relative">
              {/* Concentric ring decoration around the photo */}
              <div className="absolute -inset-2 rounded-full border border-dashed animate-spin-slow opacity-30" style={{ borderColor: primaryColor }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className={`${photoClass} relative z-10`}
                style={{ borderColor: primaryColor }}
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 font-mono text-xl font-black relative z-10 bg-slate-50" style={{ borderColor: primaryColor, color: primaryColor }}>
              <div className="absolute inset-1 rounded-full border border-dashed opacity-40" style={{ borderColor: primaryColor }} />
              {initials}
            </div>
          )}
        </div>

        {/* Name and Title */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-none">
            {personalInfo.fullName || 'Votre Nom'}
          </h1>
          {personalInfo.title && (
            <div className="inline-flex items-center gap-2 mt-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
              <p className="text-xs sm:text-sm tracking-widest uppercase font-bold text-slate-700 font-mono">
                {personalInfo.title}
              </p>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            </div>
          )}

          {/* Contact Details */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-3.5 gap-y-2 text-xs font-medium text-slate-500 mt-4">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.location}
              </span>
            )}
            {personalInfo.birthDate && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <Cake className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.birthDate}
              </span>
            )}
            {personalInfo.birthPlace && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {`Né(e) à ${personalInfo.birthPlace}`}
              </span>
            )}
            {personalInfo.nationality && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <Flag className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.nationality}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <Linkedin className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.website}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {showIcons && <Github className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.github}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="space-y-8 text-sm relative z-10">
        {/* Summary with dual accent quotes */}
        {personalInfo.summary && (
          <section className="relative p-5 bg-slate-50/60 rounded-2xl border-l-4 border-slate-900/10 italic text-slate-700 leading-relaxed font-serif" style={{ borderLeftColor: primaryColor }}>
            <span className="absolute -top-3 left-4 text-3xl font-serif leading-none select-none" style={{ color: primaryColor }}>“</span>
            <FormattedDescription text={personalInfo.summary} className="text-slate-700 text-xs sm:text-sm pl-2" bulletColor={primaryColor} />
            <span className="absolute -bottom-6 right-4 text-3xl font-serif leading-none select-none" style={{ color: primaryColor }}>”</span>
          </section>
        )}

        {/* Experience Section */}
        {workExperiences && workExperiences.length > 0 && (
          <section>
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-2">
                {showIcons && <Briefcase className="w-4 h-4" style={{ color: primaryColor }} />}
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 font-mono">
                  Expérience Professionnelle
                </h2>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-[2px] w-12 rounded" style={{ backgroundColor: primaryColor }} />
                <div className="h-[2px] w-1.5 rounded" style={{ backgroundColor: primaryColor }} />
                <div className="h-[2px] w-1.5 rounded" style={{ backgroundColor: primaryColor }} />
                <div className="h-[1px] bg-slate-100 flex-1" />
              </div>
            </div>

            <div className="space-y-5">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="group relative pl-4 border-l-2 border-slate-150 hover:border-slate-300 transition-colors">
                  {/* Decorative dot on hover */}
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border bg-white transition-colors group-hover:scale-125" style={{ borderColor: primaryColor }} />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {exp.position} <span className="font-normal text-slate-400">|</span> <span className="font-semibold text-slate-700">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      {exp.startDate} – {exp.current ? 'Présent' : exp.endDate} {exp.location ? `(${exp.location})` : ''}
                    </span>
                  </div>
                  {exp.description && (
                    <FormattedDescription text={exp.description} className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Grid for Educations & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations && educations.length > 0 && (
            <section>
              <div className="flex flex-col mb-4">
                <div className="flex items-center gap-2">
                  {showIcons && <GraduationCap className="w-4 h-4" style={{ color: primaryColor }} />}
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 font-mono">
                    Formations & Études
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-[2px] w-12 rounded" style={{ backgroundColor: primaryColor }} />
                  <div className="h-[1px] bg-slate-100 flex-1" />
                </div>
              </div>

              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id} className="p-3.5 bg-slate-50/50 rounded-xl border border-slate-100 relative overflow-hidden group hover:bg-slate-50 transition-colors">
                    {/* Corner micro deco ribbon */}
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: primaryColor }} />
                    <div className="font-bold text-slate-900 text-sm">{edu.degree}</div>
                    <div className="text-xs text-slate-700 font-medium italic mt-0.5">{edu.institution}</div>
                    <div className="text-xs font-mono text-slate-500 mt-1">{edu.startDate} – {edu.endDate}</div>
                    {edu.fieldOfStudy && <div className="text-xs text-slate-500 font-mono mt-0.5">{edu.fieldOfStudy}</div>}
                    {edu.description && <FormattedDescription text={edu.description} className="text-xs text-slate-600 mt-2" bulletColor={primaryColor} />}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills && skills.length > 0 && (
            <section>
              <div className="flex flex-col mb-4">
                <div className="flex items-center gap-2">
                  {showIcons && <Code className="w-4 h-4" style={{ color: primaryColor }} />}
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 font-mono">
                    Compétences Clés
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-[2px] w-12 rounded" style={{ backgroundColor: primaryColor }} />
                  <div className="h-[1px] bg-slate-100 flex-1" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <div key={s.id} className="group flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 bg-white border border-slate-200/80 hover:border-slate-400 rounded-lg shadow-2xs hover:shadow-xs transition-all">
                    <span className="w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: primaryColor }} />
                    <span className="text-xs font-bold text-slate-800">{s.name}</span>
                    {s.level && (
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-100 ml-1">
                        {s.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages & Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {languages && languages.length > 0 && (
            <section>
              <div className="flex flex-col mb-3">
                <div className="flex items-center gap-2">
                  {showIcons && <Languages className="w-4 h-4" style={{ color: primaryColor }} />}
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 font-mono">
                    Langues
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-[2px] w-12 rounded" style={{ backgroundColor: primaryColor }} />
                  <div className="h-[1px] bg-slate-100 flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                    <span className="text-xs font-bold text-slate-800">{l.name}</span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border text-slate-600 bg-white" style={{ borderColor: `${primaryColor}25` }}>
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <div className="flex flex-col mb-3">
                <div className="flex items-center gap-2">
                  {showIcons && <Award className="w-4 h-4" style={{ color: primaryColor }} />}
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 font-mono">
                    Certifications
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-[2px] w-12 rounded" style={{ backgroundColor: primaryColor }} />
                  <div className="h-[1px] bg-slate-100 flex-1" />
                </div>
              </div>

              <div className="space-y-2.5">
                {certifications.map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5 text-xs">
                    <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <div className="leading-snug">
                      <span className="font-bold text-slate-800">{c.title}</span>
                      <span className="text-slate-400 mx-1">•</span>
                      <span className="text-slate-600 italic font-medium">{c.issuer}</span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{c.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-2">
                {showIcons && <FolderGit2 className="w-4 h-4" style={{ color: primaryColor }} />}
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 font-mono">
                  Projets Marquants & Publications
                </h2>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-[2px] w-12 rounded" style={{ backgroundColor: primaryColor }} />
                <div className="h-[1px] bg-slate-100 flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="p-4 bg-slate-50/40 hover:bg-slate-50 border border-slate-150 rounded-xl relative overflow-hidden group transition-all duration-200">
                  {/* Subtle geometric dot accent */}
                  <div className="absolute right-3 top-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    {p.title}
                  </div>
                  {p.technologies && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {p.technologies.split(',').map((tech, i) => (
                        <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-white text-slate-500 rounded border border-slate-150/60">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.description && (
                    <FormattedDescription text={p.description} className="text-xs text-slate-600 mt-2.5 leading-relaxed" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((cSec) => (
          <section key={cSec.id}>
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}15` }} />
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 font-mono">
                  {cSec.title}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-[2px] w-12 rounded" style={{ backgroundColor: primaryColor }} />
                <div className="h-[1px] bg-slate-100 flex-1" />
              </div>
            </div>

            <div className="space-y-4">
              {cSec.items.map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline">
                    <span className="font-bold text-slate-900">{item.title}</span>
                    {item.date && <span className="text-[10px] font-mono text-slate-500">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="text-xs text-slate-500 font-mono mt-0.5">{item.subtitle}</div>}
                  {item.description && (
                    <FormattedDescription text={item.description} className="text-xs text-slate-600 mt-2" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
