'use client';

import React from 'react';
import { CVData } from '@/types/cv';

import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const CompactTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, photoShape, photoSize, photoBorder } = settings;

  const fontClass = getFontClass(fontFamily);
  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-6 text-xs leading-snug min-h-[1080px] shadow-sm print-area`}>
      {/* Header Compact */}
      <header className="border-b-2 pb-3 mb-3 flex justify-between items-center gap-4" style={{ borderColor: primaryColor }}>
        <div className="flex items-center gap-3 flex-1">
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
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              {personalInfo.fullName || 'Votre Nom'}
            </h1>
            {personalInfo.title && (
              <p className="text-xs font-bold uppercase tracking-wide mt-0.5" style={{ color: primaryColor }}>
                {personalInfo.title}
              </p>
            )}
          </div>
        </div>

        <div className="text-right text-[11px] text-slate-600 font-medium space-y-0.5">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-3">
          <FormattedDescription text={personalInfo.summary} className="text-slate-700 italic border-l-2 pl-2" bulletColor={primaryColor} />
        </section>
      )}

      {/* Experience */}
      {workExperiences && workExperiences.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 mb-2 text-slate-900">
            Expériences
          </h2>
          <div className="space-y-2">
            {workExperiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.position} <span className="font-medium text-slate-600">| {exp.company}</span></span>
                  <span className="text-[10px] text-slate-500 font-normal">{exp.startDate} - {exp.current ? 'Présent' : exp.endDate}</span>
                </div>
                {exp.description && (
                  <div className="mt-0.5 pl-2 border-l border-slate-200">
                    <FormattedDescription text={exp.description} className="text-slate-700 leading-snug" bulletColor={primaryColor} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Skills Side-by-side */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        {educations && educations.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 mb-2 text-slate-900">
              Formations
            </h2>
            <div className="space-y-1.5">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 font-medium">{edu.institution} ({edu.startDate}-{edu.endDate})</div>
                  {edu.description && <FormattedDescription text={edu.description} className="text-slate-600 text-[10px] mt-0.5" bulletColor={primaryColor} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 mb-2 text-slate-900">
              Compétences
            </h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((s) => (
                <span key={s.id} className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-800">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Languages & Certifications */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 mb-2 text-slate-900">
              Langues
            </h2>
            <div className="space-y-0.5">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="font-semibold text-slate-900">{l.name}</span>
                  <span className="text-slate-600">{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 mb-2 text-slate-900">
              Certifications
            </h2>
            <div className="space-y-1 text-[11px]">
              {certifications.map((c) => (
                <div key={c.id}>
                  <span className="font-bold text-slate-900">{c.title}</span> ({c.issuer})
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 mb-2 text-slate-900">
            Projets
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {projects.map((p) => (
              <div key={p.id} className="p-1.5 border border-slate-200 rounded">
                <div className="font-bold text-slate-900">{p.title}</div>
                {p.description && <FormattedDescription text={p.description} className="text-slate-600 text-[10px] mt-0.5" bulletColor={primaryColor} />}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((cSec) => (
        <section key={cSec.id} className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 mb-2 text-slate-900">
            {cSec.title}
          </h2>
          <div className="space-y-1">
            {cSec.items.map((item) => (
              <div key={item.id}>
                <span className="font-bold text-slate-900">{item.title}</span> {item.subtitle && <span>— {item.subtitle}</span>}
                {item.description && <FormattedDescription text={item.description} className="text-slate-600 text-[10px] mt-0.5" bulletColor={primaryColor} />}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
