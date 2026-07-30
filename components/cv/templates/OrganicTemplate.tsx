'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code, Languages, FolderGit2, Cake, Flag } from 'lucide-react';
import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

// SVG Line-Art leaf branch decoration declared outside render
const LeafDecoration = ({ className = '', primaryColor }: { className?: string; primaryColor: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 80 Q35 65 60 55 T90 20" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />
    {/* Leaf 1 */}
    <path d="M30 72 Q25 60 40 68 Q45 78 30 72" fill={`${primaryColor}20`} stroke={primaryColor} strokeWidth="1" />
    {/* Leaf 2 */}
    <path d="M45 61 Q52 50 54 62 Q45 68 45 61" fill={`${primaryColor}20`} stroke={primaryColor} strokeWidth="1" />
    {/* Leaf 3 */}
    <path d="M52 58 Q40 48 44 54 Q55 58 52 58" fill={`${primaryColor}20`} stroke={primaryColor} strokeWidth="1" />
    {/* Leaf 4 */}
    <path d="M68 47 Q75 35 74 48 Q65 52 68 47" fill={`${primaryColor}20`} stroke={primaryColor} strokeWidth="1" />
    {/* Leaf 5 */}
    <path d="M72 45 Q60 35 65 40 Q75 46 72 45" fill={`${primaryColor}20`} stroke={primaryColor} strokeWidth="1" />
    {/* Leaf 6 */}
    <path d="M82 30 Q92 20 85 28 Q78 35 82 30" fill={`${primaryColor}20`} stroke={primaryColor} strokeWidth="1" />
  </svg>
);

export const OrganicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, photoShape, photoSize, photoBorder, showIcons } = settings;

  const fontClass = getFontClass(fontFamily);
  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  return (
    <div className={`w-full bg-[#fdfcf7] text-stone-800 ${fontClass} relative p-8 sm:p-12 leading-relaxed min-h-[1080px] shadow-sm print-area overflow-hidden`}>
      {/* Delicate Leaf Branch in Top-Left */}
      <div className="absolute -top-6 -left-6 w-32 h-32 opacity-25 pointer-events-none no-print rotate-90">
        <LeafDecoration className="w-full h-full" primaryColor={primaryColor} />
      </div>

      {/* Delicate Leaf Branch in Bottom-Right */}
      <div className="absolute -bottom-6 -right-6 w-36 h-36 opacity-25 pointer-events-none no-print -rotate-90">
        <LeafDecoration className="w-full h-full" primaryColor={primaryColor} />
      </div>

      {/* Header Layout */}
      <header className="relative pb-6 mb-8 border-b border-stone-200/80 text-center flex flex-col items-center">
        {/* Branch separator top */}
        <div className="flex items-center gap-2 mb-3 opacity-60">
          <span className="w-4 h-[1px] bg-stone-300" />
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={primaryColor} strokeWidth="1.5">
            <path d="M12 3a9 9 0 0 0-9 9c0 2 .5 3.5 1.5 4.5S7 18 9 18a9 9 0 0 0 9-9" />
            <path d="M12 3a9 9 0 0 1 9 9c0 2-.5 3.5-1.5 4.5S17 18 15 18a9 9 0 0 1-9-9" />
          </svg>
          <span className="w-4 h-[1px] bg-stone-300" />
        </div>

        {personalInfo.photoUrl && photoShape !== 'hidden' && (
          <div className="relative mb-4">
            {/* Elegant thin leaf shadow ring */}
            <div className="absolute -inset-1.5 rounded-full border border-stone-200 pointer-events-none" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={`${photoClass} relative z-10`}
              style={{ borderColor: primaryColor }}
            />
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-wide text-stone-900">
          {personalInfo.fullName || 'Votre Nom'}
        </h1>
        {personalInfo.title && (
          <p className="text-xs sm:text-sm tracking-widest uppercase mt-2 font-bold font-sans" style={{ color: primaryColor }}>
            {personalInfo.title}
          </p>
        )}

        {/* Contact info list with micro bullet points */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs font-sans text-stone-600 mt-4 max-w-xl">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              {showIcons && <Mail className="w-3.5 h-3.5 opacity-60" />} {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              {showIcons && <Phone className="w-3.5 h-3.5 opacity-60" />} {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              {showIcons && <MapPin className="w-3.5 h-3.5 opacity-60" />} {personalInfo.location}
            </span>
          )}
          {personalInfo.birthDate && (
            <span className="flex items-center gap-1">
              {showIcons && <Cake className="w-3.5 h-3.5 opacity-60" />} {personalInfo.birthDate}
            </span>
          )}
          {personalInfo.birthPlace && (
            <span className="flex items-center gap-1">
              {showIcons && <MapPin className="w-3.5 h-3.5 opacity-60" />} {`Né(e) à ${personalInfo.birthPlace}`}
            </span>
          )}
          {personalInfo.nationality && (
            <span className="flex items-center gap-1">
              {showIcons && <Flag className="w-3.5 h-3.5 opacity-60" />} {personalInfo.nationality}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              {showIcons && <Linkedin className="w-3.5 h-3.5 opacity-60" />} {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              {showIcons && <Globe className="w-3.5 h-3.5 opacity-60" />} {personalInfo.website}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              {showIcons && <Github className="w-3.5 h-3.5 opacity-60" />} {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Grid structure or linear */}
      <div className="space-y-8 text-stone-850 text-sm relative z-10">
        {/* Profile Summary */}
        {personalInfo.summary && (
          <section className="text-center max-w-2xl mx-auto font-serif italic text-stone-700/90 leading-relaxed border-l-2 border-r-2 border-stone-200/50 px-6 py-2">
            <FormattedDescription text={personalInfo.summary} className="text-stone-700 text-xs sm:text-sm" bulletColor={primaryColor} />
          </section>
        )}

        {/* Work Experiences */}
        {workExperiences && workExperiences.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5 justify-center">
              <span className="w-8 h-[1px] bg-stone-300" />
              <div className="flex items-center gap-1.5">
                {showIcons && <Briefcase className="w-4 h-4" style={{ color: primaryColor }} />}
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-serif">
                  Parcours Professionnel
                </h2>
              </div>
              <span className="w-8 h-[1px] bg-stone-300" />
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="relative pl-6">
                  {/* Botanical leaf timeline node */}
                  <div className="absolute left-0 top-1.5 flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full border bg-white" style={{ borderColor: primaryColor }} />
                    <span className="w-[1px] h-16 bg-stone-200/80 mt-1" />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-baseline">
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base font-serif">
                      {exp.position} <span className="font-normal text-stone-400 font-sans">at</span> <span className="text-stone-700">{exp.company}</span>
                    </h3>
                    <span className="text-xs text-stone-500 italic font-medium">
                      {exp.startDate} – {exp.current ? 'Présent' : exp.endDate} {exp.location ? `(${exp.location})` : ''}
                    </span>
                  </div>
                  {exp.description && (
                    <FormattedDescription text={exp.description} className="text-xs sm:text-sm text-stone-650 mt-2 leading-relaxed font-sans" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educations & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {educations && educations.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                {showIcons && <GraduationCap className="w-4 h-4" style={{ color: primaryColor }} />}
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-serif">
                  Formations & Diplômes
                </h2>
                <span className="h-[1px] bg-stone-200 flex-1" />
              </div>

              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id} className="border-l border-stone-200 pl-4 py-0.5">
                    <div className="font-bold text-stone-900 text-sm font-serif">{edu.degree}</div>
                    <div className="text-xs text-stone-600 italic font-medium mt-0.5">{edu.institution}</div>
                    <div className="text-xs text-stone-400 mt-1">{edu.startDate} – {edu.endDate}</div>
                    {edu.fieldOfStudy && <div className="text-xs text-stone-500 font-sans mt-0.5">{edu.fieldOfStudy}</div>}
                    {edu.description && <FormattedDescription text={edu.description} className="text-xs text-stone-600 mt-1.5" bulletColor={primaryColor} />}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills && skills.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                {showIcons && <Code className="w-4 h-4" style={{ color: primaryColor }} />}
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-serif">
                  Compétences & Atouts
                </h2>
                <span className="h-[1px] bg-stone-200 flex-1" />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <div key={s.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100/50 hover:bg-stone-100 border border-stone-200/60 rounded-full transition-all">
                    <span className="text-xs font-medium text-stone-800">{s.name}</span>
                    {s.level && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-white text-stone-500 rounded-full border border-stone-200 font-serif">
                        {s.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {languages && languages.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                {showIcons && <Languages className="w-4 h-4" style={{ color: primaryColor }} />}
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-serif">
                  Langues
                </h2>
                <span className="h-[1px] bg-stone-200 flex-1" />
              </div>

              <div className="space-y-1.5">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center py-1 border-b border-stone-100">
                    <span className="text-xs font-semibold text-stone-800">{l.name}</span>
                    <span className="text-[10px] italic text-stone-500 font-serif">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                {showIcons && <Award className="w-4 h-4" style={{ color: primaryColor }} />}
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-serif">
                  Certifications
                </h2>
                <span className="h-[1px] bg-stone-200 flex-1" />
              </div>

              <div className="space-y-2">
                {certifications.map((c) => (
                  <div key={c.id} className="text-xs">
                    <span className="font-bold text-stone-850 font-serif">{c.title}</span>
                    <div className="text-stone-500 italic mt-0.5">{c.issuer} ({c.date})</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects section */}
        {projects && projects.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              {showIcons && <FolderGit2 className="w-4 h-4" style={{ color: primaryColor }} />}
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-serif">
                Projets Réalisés
              </h2>
              <span className="h-[1px] bg-stone-200 flex-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="p-4 bg-stone-50/30 rounded-xl border border-stone-200/80 hover:bg-stone-50/50 transition-colors">
                  <div className="font-serif font-bold text-stone-900 text-sm">{p.title}</div>
                  {p.technologies && (
                    <div className="text-[9px] uppercase font-bold tracking-wider text-stone-400 mt-1">
                      {p.technologies}
                    </div>
                  )}
                  {p.description && (
                    <FormattedDescription text={p.description} className="text-xs text-stone-600 mt-2" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom sections */}
        {customSections && customSections.map((cSec) => (
          <section key={cSec.id} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-serif">
                {cSec.title}
              </h2>
              <span className="h-[1px] bg-stone-200 flex-1" />
            </div>

            <div className="space-y-4">
              {cSec.items.map((item) => (
                <div key={item.id} className="border-l-2 pl-4 py-0.5" style={{ borderColor: primaryColor }}>
                  <div className="flex flex-col sm:flex-row justify-between items-baseline font-serif">
                    <span className="font-bold text-stone-900 text-sm">{item.title}</span>
                    {item.date && <span className="text-xs text-stone-500 font-sans italic">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="text-xs text-stone-500 font-sans mt-0.5">{item.subtitle}</div>}
                  {item.description && (
                    <FormattedDescription text={item.description} className="text-xs text-stone-650 mt-1.5" bulletColor={primaryColor} />
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
