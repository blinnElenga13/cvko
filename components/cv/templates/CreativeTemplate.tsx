'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Award, Briefcase, GraduationCap, Code, Languages, FolderGit2 } from 'lucide-react';

import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, spacing, photoShape, photoSize, photoBorder, showIcons } = settings;

  const fontClass = getFontClass(fontFamily);
  const spacingClass = spacing === 'compact' ? 'space-y-3.5 gap-3.5 text-xs' : spacing === 'spacious' ? 'space-y-7 gap-7 text-sm' : 'space-y-5 gap-5 text-sm';

  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} flex flex-col md:flex-row min-h-[1080px] shadow-sm print-area`}>
      {/* Left Sidebar */}
      <aside className="w-full md:w-72 shrink-0 p-6 sm:p-7 text-white space-y-6 flex flex-col justify-between" style={{ backgroundColor: primaryColor }}>
        <div className="space-y-6">
          {/* Photo */}
          {personalInfo.photoUrl && photoShape !== 'hidden' && (
            <div className="flex justify-center pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className={photoClass}
                style={{ borderColor: '#ffffff' }}
              />
            </div>
          )}

          {/* Name & Title */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black tracking-tight">
              {personalInfo.fullName || 'Votre Nom'}
            </h1>
            {personalInfo.title && (
              <p className="text-xs uppercase tracking-widest text-white/90 font-semibold">
                {personalInfo.title}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-2 text-xs border-t border-white/20 pt-4">
            <h3 className="font-bold uppercase tracking-wider text-[11px] text-white/75 mb-2">Contact</h3>
            {personalInfo.email && (
              <div className="flex items-center gap-2 text-white/95 break-all">
                {showIcons && <Mail className="w-3.5 h-3.5 shrink-0" />} {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 text-white/95">
                {showIcons && <Phone className="w-3.5 h-3.5 shrink-0" />} {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 text-white/95">
                {showIcons && <MapPin className="w-3.5 h-3.5 shrink-0" />} {personalInfo.location}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2 text-white/95 break-all">
                {showIcons && <Linkedin className="w-3.5 h-3.5 shrink-0" />} {personalInfo.linkedin}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2 text-white/95 break-all">
                {showIcons && <Globe className="w-3.5 h-3.5 shrink-0" />} {personalInfo.website}
              </div>
            )}

          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="border-t border-white/20 pt-4 space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[11px] text-white/75 mb-2 flex items-center gap-1.5">
                {showIcons && <Code className="w-3.5 h-3.5" />} Compétences
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-2.5 py-1 rounded-md bg-white/20 text-white font-medium text-[11px] backdrop-blur-xs">
                    {skill.name} {skill.level && <span className="opacity-80">({skill.level})</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="border-t border-white/20 pt-4 space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[11px] text-white/75 mb-2 flex items-center gap-1.5">
                {showIcons && <Languages className="w-3.5 h-3.5" />} Langues
              </h3>
              <div className="space-y-1.5 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-white/95">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-white/80 font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/10">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="border-t border-white/20 pt-4 space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[11px] text-white/75 mb-2 flex items-center gap-1.5">
                {showIcons && <Award className="w-3.5 h-3.5" />} Certifications
              </h3>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-white/95 text-[11px]">
                    <div className="font-bold">{cert.title}</div>
                    <div className="text-white/75">{cert.issuer} ({cert.date})</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 p-8 sm:p-10 ${spacingClass}`}>
        {/* Summary */}
        {personalInfo.summary && (
          <section className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
            <h2 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-900 border-b pb-1 flex items-center gap-2" style={{ borderColor: primaryColor }}>
              Profil & Objectifs
            </h2>
            <FormattedDescription text={personalInfo.summary} className="text-slate-700 text-xs sm:text-sm leading-relaxed" bulletColor={primaryColor} />
          </section>
        )}

        {/* Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-wider mb-4 text-slate-900 border-b-2 pb-1.5 flex items-center gap-2" style={{ borderColor: primaryColor }}>
              {showIcons && <Briefcase className="w-4 h-4" style={{ color: primaryColor }} />} Expérience Professionnelle
            </h2>
            <div className="space-y-4.5">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {exp.position} <span style={{ color: primaryColor }}>@ {exp.company}</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/80">
                      {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <p className="text-xs text-slate-500 italic mb-1">{exp.location}</p>}
                  {exp.description && (
                    <FormattedDescription text={exp.description} className="text-slate-700 text-xs sm:text-sm mt-1.5 pl-3 border-l-2 border-slate-200" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-wider mb-3 text-slate-900 border-b-2 pb-1.5 flex items-center gap-2" style={{ borderColor: primaryColor }}>
              {showIcons && <GraduationCap className="w-4 h-4" style={{ color: primaryColor }} />} Formations
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs sm:text-sm">
                    <span>{edu.degree} — <span className="font-semibold text-slate-700">{edu.institution}</span></span>
                    <span className="text-xs text-slate-500 font-normal">{edu.startDate} - {edu.current ? 'En cours' : edu.endDate}</span>
                  </div>
                  {edu.fieldOfStudy && <p className="text-xs text-slate-600 italic mt-0.5">{edu.fieldOfStudy}</p>}
                  {edu.description && <FormattedDescription text={edu.description} className="text-xs text-slate-600 mt-1" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-wider mb-3 text-slate-900 border-b-2 pb-1.5 flex items-center gap-2" style={{ borderColor: primaryColor }}>
              {showIcons && <FolderGit2 className="w-4 h-4" style={{ color: primaryColor }} />} Projets
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <div className="flex justify-between items-center font-bold text-slate-900 text-xs sm:text-sm">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {proj.description && <FormattedDescription text={proj.description} className="text-xs text-slate-600 mt-1" bulletColor={primaryColor} />}
                  {proj.technologies && <p className="text-[11px] font-mono text-slate-500 mt-1.5">Stack: {proj.technologies}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((cSec) => (
          <section key={cSec.id}>
            <h2 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-900 border-b-2 pb-1" style={{ borderColor: primaryColor }}>
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
      </main>
    </div>
  );
};
