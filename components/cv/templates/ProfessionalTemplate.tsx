'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Award, Briefcase, GraduationCap, Code, Languages, FolderGit2, Cake, Flag } from 'lucide-react';

import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, spacing, photoShape, photoSize, photoBorder, showIcons } = settings;

  const fontClass = getFontClass(fontFamily);
  const spacingClass = spacing === 'compact' ? 'space-y-4 gap-4 text-xs' : spacing === 'spacious' ? 'space-y-7 gap-7 text-sm' : 'space-y-5 gap-5 text-sm';

  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} leading-relaxed min-h-[1080px] shadow-sm print-area`}>
      {/* Executive Top Banner Header */}
      <div className="p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6" style={{ backgroundColor: primaryColor }}>
        <div className="space-y-2 text-center sm:text-left flex-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-wide uppercase">
            {personalInfo.fullName || 'Votre Nom'}
          </h1>
          {personalInfo.title && (
            <p className="text-base font-semibold tracking-wider text-slate-100 uppercase">
              {personalInfo.title}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-y-1.5 gap-x-4 text-xs text-slate-100 opacity-95 pt-2 border-t border-white/20 mt-3 font-medium">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Mail className="w-3.5 h-3.5" />} {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Phone className="w-3.5 h-3.5" />} {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                {showIcons && <MapPin className="w-3.5 h-3.5" />} {personalInfo.location}
              </span>
            )}
            {personalInfo.birthDate && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Cake className="w-3.5 h-3.5" />} {personalInfo.birthDate}
              </span>
            )}
            {personalInfo.birthPlace && (
              <span className="flex items-center gap-1.5">
                {showIcons && <MapPin className="w-3.5 h-3.5" />} {`Né(e) à ${personalInfo.birthPlace}`}
              </span>
            )}
            {personalInfo.nationality && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Flag className="w-3.5 h-3.5" />} {personalInfo.nationality}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Linkedin className="w-3.5 h-3.5" />} {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Globe className="w-3.5 h-3.5" />} {personalInfo.website}
              </span>
            )}

          </div>
        </div>

        {personalInfo.photoUrl && photoShape !== 'hidden' && (
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={photoClass}
              style={{ borderColor: '#ffffff' }}
            />
          </div>
        )}
      </div>

      {/* Main Content Body */}
      <div className={`p-8 sm:p-10 ${spacingClass}`}>
        {/* Summary */}
        {personalInfo.summary && (
          <section className="bg-slate-50 p-4.5 rounded-lg border-l-4 shadow-2xs" style={{ borderColor: primaryColor }}>
            <FormattedDescription text={personalInfo.summary} className="text-slate-700 italic leading-relaxed text-xs sm:text-sm" bulletColor={primaryColor} />
          </section>
        )}

        {/* Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3.5 pb-1 border-b-2 flex items-center gap-2" style={{ borderColor: primaryColor, color: primaryColor }}>
              {showIcons && <Briefcase className="w-4 h-4" />} Expériences Professionnelles
            </h2>
            <div className="space-y-4">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {exp.position} — <span className="font-semibold text-slate-700">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {exp.startDate} - {exp.current ? 'Présent' : exp.endDate} {exp.location ? `| ${exp.location}` : ''}
                    </span>
                  </div>
                  {exp.description && (
                    <FormattedDescription text={exp.description} className="text-slate-700 text-xs sm:text-sm mt-1.5" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          {educations && educations.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b-2 flex items-center gap-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <GraduationCap className="w-4 h-4" />} Formations
              </h2>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline gap-1">
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{edu.degree}</h3>
                      <span className="text-[11px] text-slate-500 font-semibold shrink-0">
                        {edu.startDate} - {edu.current ? 'En cours' : edu.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">{edu.institution}</p>
                    {edu.fieldOfStudy && <p className="text-xs text-slate-500 italic">{edu.fieldOfStudy}</p>}
                    {edu.description && <FormattedDescription text={edu.description} className="text-xs text-slate-600 mt-1" bulletColor={primaryColor} />}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b-2 flex items-center gap-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Code className="w-4 h-4" />} Compétences
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {skills.map((skill) => (
                  <div key={skill.id} className="p-2 bg-slate-50 rounded-md border border-slate-200/80">
                    <span className="font-semibold text-slate-800 block">{skill.name}</span>
                    {skill.level && <span className="text-[10px] text-slate-500 block">{skill.level}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languages && languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2 flex items-center gap-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Languages className="w-4 h-4" />} Langues
              </h2>
              <ul className="divide-y divide-slate-100 text-xs">
                {languages.map((lang) => (
                  <li key={lang.id} className="py-1.5 flex justify-between">
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="text-slate-600 font-medium px-2 py-0.5 bg-slate-50 rounded border border-slate-200">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2 flex items-center gap-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Award className="w-4 h-4" />} Certifications
              </h2>
              <ul className="space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-slate-700">
                    <span className="font-bold text-slate-900">{cert.title}</span> — {cert.issuer} ({cert.date})
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b-2 flex items-center gap-2" style={{ borderColor: primaryColor, color: primaryColor }}>
              {showIcons && <FolderGit2 className="w-4 h-4" />} Projets Récents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border border-slate-200 p-3 rounded-lg bg-white">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm flex justify-between items-center">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-700">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {proj.description && <FormattedDescription text={proj.description} className="text-xs text-slate-600 mt-1" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((cSec) => (
          <section key={cSec.id}>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
              {cSec.title}
            </h2>
            <div className="space-y-2">
              {cSec.items.map((item) => (
                <div key={item.id} className="text-xs">
                  <div className="font-bold text-slate-900">
                    {item.title} {item.subtitle && <span className="font-normal text-slate-600">— {item.subtitle}</span>}
                  </div>
                  {item.description && <FormattedDescription text={item.description} className="text-slate-600 mt-0.5 text-xs" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
