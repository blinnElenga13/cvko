'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Award, Briefcase, GraduationCap, Code, Languages, FolderGit2 } from 'lucide-react';

import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, spacing, photoShape, photoSize, photoBorder, showIcons } = settings;

  const fontClass = getFontClass(fontFamily);
  const spacingClass = spacing === 'compact' ? 'space-y-3.5 gap-3.5 text-xs' : spacing === 'spacious' ? 'space-y-7 gap-7 text-sm' : 'space-y-5 gap-5 text-sm';
  const itemPaddingClass = spacing === 'compact' ? 'mb-2' : spacing === 'spacious' ? 'mb-4' : 'mb-3';

  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  return (
    <div className={`w-full bg-white text-slate-800 p-8 sm:p-11 ${fontClass} leading-relaxed min-h-[1080px] shadow-sm print-area`}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200">
        {personalInfo.photoUrl && photoShape !== 'hidden' && (
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={photoClass}
              style={{ borderColor: primaryColor }}
            />
          </div>
        )}

        <div className="flex-1 text-center sm:text-left space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {personalInfo.fullName || 'Votre Nom Complet'}
          </h1>
          {personalInfo.title && (
            <p className="text-base sm:text-lg font-semibold tracking-wide" style={{ color: primaryColor }}>
              {personalInfo.title}
            </p>
          )}

          {/* Contact Details */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-y-1.5 gap-x-4 text-xs font-medium text-slate-600 pt-1">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
                {showIcons && <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />}
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
                {showIcons && <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />}
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
                {showIcons && <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />}
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
                {showIcons && <Linkedin className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />}
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
                {showIcons && <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />}
                {personalInfo.website}
              </span>
            )}

          </div>
        </div>
      </header>

      <div className={`mt-6 ${spacingClass}`}>
        {/* Summary */}
        {personalInfo.summary && (
          <section className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 pb-1 border-b border-slate-200" style={{ color: primaryColor }}>
              {showIcons && <Briefcase className="w-4 h-4" />} Profil Professionnel
            </h2>
            <FormattedDescription text={personalInfo.summary} className="text-slate-700 text-xs sm:text-sm leading-relaxed" bulletColor={primaryColor} />
          </section>
        )}

        {/* Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3.5 flex items-center gap-2 pb-1.5 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
              {showIcons && <Briefcase className="w-4 h-4" />} Expériences Professionnelles
            </h2>
            <div className="space-y-4">
              {workExperiences.map((exp) => (
                <div key={exp.id} className={itemPaddingClass}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {exp.position} <span className="font-medium text-slate-600">@ {exp.company}</span>
                    </h3>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 shrink-0 self-start sm:self-auto">
                      {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <p className="text-xs text-slate-500 italic mb-1.5">{exp.location}</p>}
                  {exp.description && (
                    <FormattedDescription
                      text={exp.description}
                      className="text-slate-700 text-xs sm:text-sm mt-1.5 pl-3 border-l-2 border-slate-200"
                      bulletColor={primaryColor}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 pb-1.5 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
              {showIcons && <GraduationCap className="w-4 h-4" />} Formations & Diplômes
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {educations.map((edu) => (
                <div key={edu.id} className={itemPaddingClass}>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                    <span className="text-[11px] text-slate-600 font-semibold px-2 py-0.5 rounded bg-slate-100 shrink-0">
                      {edu.startDate} - {edu.current ? 'En cours' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
                  {edu.fieldOfStudy && <p className="text-xs text-slate-600 italic mt-0.5">{edu.fieldOfStudy}</p>}
                  {edu.description && <FormattedDescription text={edu.description} className="text-xs text-slate-600 mt-1" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Code className="w-4 h-4" />} Compétences
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200/80 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    {skill.name}
                    {skill.level && <span className="text-slate-500 text-[10px] font-normal">({skill.level})</span>}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Languages className="w-4 h-4" />} Langues
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="text-slate-600 font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 pb-1.5 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
              {showIcons && <FolderGit2 className="w-4 h-4" />} Projets & Réalisations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-800 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {proj.description && <FormattedDescription text={proj.description} className="text-xs text-slate-600 mt-1" bulletColor={primaryColor} />}
                  {proj.technologies && <p className="text-[11px] font-mono font-medium text-slate-500 mt-2">Stack: {proj.technologies}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              {showIcons && <Award className="w-4 h-4" />} Certifications
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-900">{cert.title}</span>
                  <span className="text-slate-500"> — {cert.issuer} ({cert.date})</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((cSec) => (
          <section key={cSec.id}>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
              {cSec.title}
            </h2>
            <div className="space-y-3">
              {cSec.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between font-bold text-slate-900 text-xs sm:text-sm">
                    <span>{item.title} {item.subtitle && <span className="font-normal text-slate-600">— {item.subtitle}</span>}</span>
                    {item.date && <span className="text-xs font-normal text-slate-500">{item.date}</span>}
                  </div>
                  {item.description && <FormattedDescription text={item.description} className="text-xs text-slate-700 mt-1" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
