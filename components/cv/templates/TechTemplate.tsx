'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Terminal, Cpu, Award, ExternalLink, Code2, Cake, Flag } from 'lucide-react';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, spacing, photoShape, photoSize, photoBorder, showIcons } = settings;

  const fontClass = getFontClass(fontFamily);
  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  return (
    <div className={`w-full bg-white text-slate-800 p-8 sm:p-11 ${fontClass} leading-relaxed min-h-[1080px] shadow-sm print-area`}>
      {/* Tech Header Card */}
      <header className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md">
        {/* Subtle background tech accent glow */}
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        <div className="space-y-2 text-center sm:text-left z-10 flex-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            <Terminal className="w-3 h-3" style={{ color: primaryColor }} /> Full-Stack Resume
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white">
            {personalInfo.fullName || 'Votre Nom'}
          </h1>

          {personalInfo.title && (
            <p className="text-sm font-semibold font-mono" style={{ color: primaryColor }}>
              &gt; {personalInfo.title}
            </p>
          )}

          {/* Contact Details in Header */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-300 pt-2 font-mono">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                {showIcons && <Mail className="w-3 h-3 text-slate-400" />}
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                {showIcons && <Phone className="w-3 h-3 text-slate-400" />}
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                {showIcons && <MapPin className="w-3 h-3 text-slate-400" />}
                {personalInfo.location}
              </span>
            )}
            {personalInfo.birthDate && (
              <span className="flex items-center gap-1">
                {showIcons && <Cake className="w-3 h-3 text-slate-400" />}
                {personalInfo.birthDate}
              </span>
            )}
            {personalInfo.birthPlace && (
              <span className="flex items-center gap-1">
                {showIcons && <MapPin className="w-3 h-3 text-slate-400" />}
                {`Né(e) à ${personalInfo.birthPlace}`}
              </span>
            )}
            {personalInfo.nationality && (
              <span className="flex items-center gap-1">
                {showIcons && <Flag className="w-3 h-3 text-slate-400" />}
                {personalInfo.nationality}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1 text-blue-400">
                {showIcons && <Github className="w-3 h-3" />}
                {personalInfo.github}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                {showIcons && <Linkedin className="w-3 h-3 text-slate-400" />}
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                {showIcons && <Globe className="w-3 h-3 text-slate-400" />}
                {personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Photo */}
        {personalInfo.photoUrl && photoShape !== 'hidden' && (
          <div className="shrink-0 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={photoClass}
              style={{ borderColor: primaryColor }}
            />
          </div>
        )}
      </header>

      {/* Main Body */}
      <div className="mt-8 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5" style={{ color: primaryColor }}>
              <Code2 className="w-4 h-4" /> {'// ABOUT_ME'}
            </h2>
            <FormattedDescription text={personalInfo.summary} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans" bulletColor={primaryColor} />
          </section>
        )}

        {/* Skills Tech Pills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono mb-3 flex items-center gap-1.5" style={{ color: primaryColor }}>
              <Cpu className="w-4 h-4" /> {'// TECH_STACK'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-slate-900 text-white font-mono text-xs rounded-lg shadow-2xs flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  {skill.name}
                  {skill.level && <span className="text-slate-400 text-[10px]">({skill.level})</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono mb-3 flex items-center gap-1.5" style={{ color: primaryColor }}>
              <Terminal className="w-4 h-4" /> {'// WORK_EXPERIENCE'}
            </h2>
            <div className="space-y-4">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {exp.position} <span className="text-slate-600 font-medium">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 self-start sm:self-auto">
                      [{exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}]
                    </span>
                  </div>
                  {exp.location && <p className="text-xs text-slate-500 italic font-mono">{exp.location}</p>}
                  {exp.description && (
                    <FormattedDescription text={exp.description} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-1" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider font-mono mb-3" style={{ color: primaryColor }}>
                {'// REPOSITORIES & PROJECTS'}
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs">
                    <div className="flex justify-between items-center font-bold text-slate-900">
                      <span>{proj.title}</span>
                      {proj.link && (
                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    {proj.description && <FormattedDescription text={proj.description} className="text-slate-600 mt-1" bulletColor={primaryColor} />}
                    {proj.technologies && <p className="font-mono text-[11px] text-slate-500 mt-1.5">[{proj.technologies}]</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Certs */}
          <div className="space-y-6">
            {educations && educations.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider font-mono mb-3" style={{ color: primaryColor }}>
                  {'// EDUCATION'}
                </h2>
                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div key={edu.id} className="text-xs p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
                      <p className="font-bold text-slate-900">{edu.degree}</p>
                      <p className="text-slate-700 font-semibold">{edu.institution}</p>
                      <p className="text-slate-500 font-mono text-[11px] mt-1">{edu.startDate} – {edu.endDate}</p>
                      {edu.description && <FormattedDescription text={edu.description} className="text-slate-600 mt-1" bulletColor={primaryColor} />}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider font-mono mb-2" style={{ color: primaryColor }}>
                  {'// LANGUAGES'}
                </h2>
                <div className="flex flex-wrap gap-2 text-xs">
                  {languages.map((lang) => (
                    <span key={lang.id} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md border border-slate-200">
                      <strong>{lang.name}</strong>: {lang.level}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
