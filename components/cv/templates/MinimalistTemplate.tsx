'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, spacing, photoShape, photoSize, photoBorder, showIcons } = settings;

  const fontClass = getFontClass(fontFamily);
  const spacingClass = spacing === 'compact' ? 'space-y-4' : spacing === 'spacious' ? 'space-y-8' : 'space-y-6';

  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  return (
    <div className={`w-full bg-white text-slate-800 p-8 sm:p-12 ${fontClass} leading-relaxed min-h-[1080px] shadow-sm print-area`}>
      {/* Header */}
      <header className="pb-8 border-b-2 border-slate-900 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h1 className="text-4xl font-light tracking-tight text-slate-900 uppercase">
            {personalInfo.fullName || 'Votre Nom'}
          </h1>
          {personalInfo.title && (
            <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: primaryColor }}>
              {personalInfo.title}
            </p>
          )}

          {/* Contact Line */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-slate-600 pt-2 font-mono">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                {showIcons && <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Linkedin className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.linkedin}
              </span>
            )}

            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                {showIcons && <Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
                {personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Photo */}
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
      </header>

      {/* Main Content Body */}
      <div className={`mt-8 ${spacingClass}`}>
        {/* Summary */}
        {personalInfo.summary && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <h2 className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Profil
            </h2>
            <div className="md:col-span-9 text-slate-700 text-sm leading-relaxed">
              <FormattedDescription text={personalInfo.summary} className="text-xs sm:text-sm text-slate-700 leading-relaxed" bulletColor={primaryColor} />
            </div>
          </section>
        )}

        {/* Work Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-100">
            <h2 className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Expérience
            </h2>
            <div className="md:col-span-9 space-y-5">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {exp.position} <span className="font-normal text-slate-500">— {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <p className="text-xs text-slate-500 italic font-mono">{exp.location}</p>}
                  {exp.description && (
                    <FormattedDescription text={exp.description} className="text-xs sm:text-sm text-slate-700 pt-1 leading-relaxed" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-100">
            <h2 className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Formation
            </h2>
            <div className="md:col-span-9 space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {edu.startDate} – {edu.current ? 'Présent' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
                  {edu.fieldOfStudy && <p className="text-xs text-slate-500 italic">{edu.fieldOfStudy}</p>}
                  {edu.description && <FormattedDescription text={edu.description} className="text-xs text-slate-600 mt-1" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Languages */}
        {(skills?.length > 0 || languages?.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-100">
            <h2 className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Compétences
            </h2>
            <div className="md:col-span-9 space-y-4">
              {skills?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-800 rounded border border-slate-200"
                    >
                      {skill.name} {skill.level ? <span className="text-slate-500 font-normal">({skill.level})</span> : ''}
                    </span>
                  ))}
                </div>
              )}

              {languages?.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-700 border-t border-slate-100 pt-2">
                  {languages.map((lang) => (
                    <span key={lang.id}>
                      <strong className="text-slate-900">{lang.name}</strong>: {lang.level}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-100">
            <h2 className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Projets
            </h2>
            <div className="md:col-span-9 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {proj.description && <FormattedDescription text={proj.description} className="text-slate-600 mt-1 leading-relaxed" bulletColor={primaryColor} />}
                  {proj.technologies && <p className="font-mono text-slate-500 text-[11px] mt-1">[{proj.technologies}]</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-100">
            <h2 className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Certifs
            </h2>
            <div className="md:col-span-9 flex flex-wrap gap-2 text-xs text-slate-700">
              {certifications.map((cert) => (
                <span key={cert.id} className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                  <strong>{cert.title}</strong> — {cert.issuer} ({cert.date})
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((cSec) => (
          <section key={cSec.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-100">
            <h2 className="md:col-span-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              {cSec.title}
            </h2>
            <div className="md:col-span-9 space-y-2 font-sans text-xs">
              {cSec.items.map((item) => (
                <div key={item.id}>
                  <span className="font-bold text-slate-900">{item.title}</span>
                  {item.subtitle && <span className="text-slate-600"> — {item.subtitle}</span>}
                  {item.description && <FormattedDescription text={item.description} className="text-slate-600 mt-1" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
