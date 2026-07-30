'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Cake, Flag } from 'lucide-react';

import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, photoShape, photoSize, photoBorder } = settings;

  const fontClass = getFontClass(fontFamily);
  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-12 leading-relaxed min-h-[1080px] shadow-sm print-area`}>
      {/* Header Centered */}
      <header className="text-center pb-6 border-b border-slate-200">
        {personalInfo.photoUrl && photoShape !== 'hidden' && (
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={photoClass}
              style={{ borderColor: primaryColor }}
            />
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-normal tracking-wide text-slate-900 font-serif">
          {personalInfo.fullName || 'Votre Nom'}
        </h1>
        {personalInfo.title && (
          <p className="text-sm font-sans tracking-widest uppercase mt-1.5 font-semibold" style={{ color: primaryColor }}>
            {personalInfo.title}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs font-sans font-medium text-slate-600 mt-3 pt-2">
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.location}</span>}
          {personalInfo.birthDate && <span className="flex items-center gap-1.5"><Cake className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.birthDate}</span>}
          {personalInfo.birthPlace && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {`Né(e) à ${personalInfo.birthPlace}`}</span>}
          {personalInfo.nationality && <span className="flex items-center gap-1.5"><Flag className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.nationality}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.website}</span>}

        </div>
      </header>

      {/* Content */}
      <div className="mt-6 space-y-6 text-sm">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="text-center max-w-2xl mx-auto italic text-slate-700 leading-relaxed font-serif">
            <FormattedDescription text={personalInfo.summary} className="text-slate-700 text-xs sm:text-sm font-serif italic" bulletColor={primaryColor} />
          </section>
        )}

        {/* Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 shrink-0">
                Expérience Professionnelle
              </h2>
              <div className="h-[1px] bg-slate-200 flex-1" />
            </div>
            <div className="space-y-4">
              {workExperiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row justify-between items-baseline font-serif">
                    <h3 className="font-bold text-base text-slate-900">
                      {exp.position} — <span className="font-normal italic text-slate-700">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-sans text-slate-500 italic">
                      {exp.startDate} – {exp.current ? 'Présent' : exp.endDate} {exp.location ? `(${exp.location})` : ''}
                    </span>
                  </div>
                  {exp.description && (
                    <FormattedDescription text={exp.description} className="text-xs sm:text-sm text-slate-700 font-sans mt-1.5 leading-relaxed" bulletColor={primaryColor} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations && educations.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 shrink-0">
                  Formations
                </h2>
                <div className="h-[1px] bg-slate-200 flex-1" />
              </div>
              <div className="space-y-3 font-serif">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900 text-sm">{edu.degree}</div>
                    <div className="text-xs text-slate-700 italic">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                    {edu.fieldOfStudy && <div className="text-xs font-sans text-slate-500">{edu.fieldOfStudy}</div>}
                    {edu.description && <FormattedDescription text={edu.description} className="text-xs font-sans text-slate-600 mt-1" bulletColor={primaryColor} />}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills && skills.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 shrink-0">
                  Compétences Clés
                </h2>
                <div className="h-[1px] bg-slate-200 flex-1" />
              </div>
              <div className="font-sans text-xs flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.id} className="px-2.5 py-1 bg-slate-100 rounded-full text-slate-800 border border-slate-200">
                    {s.name} {s.level ? `(${s.level})` : ''}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs">
          {languages && languages.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 shrink-0">
                  Langues
                </h2>
                <div className="h-[1px] bg-slate-200 flex-1" />
              </div>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between border-b border-slate-100 py-1">
                    <span className="font-semibold text-slate-900">{l.name}</span>
                    <span className="text-slate-600 font-medium px-2 py-0.5 bg-slate-50 rounded border border-slate-200">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 shrink-0">
                  Certifications
                </h2>
                <div className="h-[1px] bg-slate-200 flex-1" />
              </div>
              <div className="space-y-1.5 text-slate-700">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <span className="font-bold text-slate-900">{c.title}</span> — {c.issuer} ({c.date})
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 shrink-0">
                Projets & Publications
              </h2>
              <div className="h-[1px] bg-slate-200 flex-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
              {projects.map((p) => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">{p.title}</div>
                  {p.description && <FormattedDescription text={p.description} className="text-slate-600 mt-1" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((cSec) => (
          <section key={cSec.id}>
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 shrink-0">
                {cSec.title}
              </h2>
              <div className="h-[1px] bg-slate-200 flex-1" />
            </div>
            <div className="space-y-2 font-sans text-xs">
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
