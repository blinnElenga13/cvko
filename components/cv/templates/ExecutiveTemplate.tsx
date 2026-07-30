'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { getPhotoContainerClasses, getFontClass } from '@/lib/theme-helpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, Award, Code, Languages, ExternalLink } from 'lucide-react';
import { FormattedDescription } from '../FormattedDescription';

interface TemplateProps {
  data: CVData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = data;
  const { primaryColor, fontFamily, spacing, photoShape, photoSize, photoBorder, showIcons, headerStyle } = settings;

  const fontClass = getFontClass(fontFamily);
  const photoClass = getPhotoContainerClasses(photoShape, photoSize, photoBorder);

  // Determine header bg and text colors based on headerStyle
  const isDarkHeader = headerStyle === 'dark' || !headerStyle;
  const isGradientHeader = headerStyle === 'gradient';
  const isColoredHeader = headerStyle === 'colored';

  let headerBgStyle = { backgroundColor: '#1e293b' }; // dark default
  let headerTextColor = 'text-white';
  let subTextColor = 'text-slate-300';

  if (isColoredHeader) {
    headerBgStyle = { backgroundColor: primaryColor };
  } else if (isGradientHeader) {
    headerBgStyle = { backgroundColor: primaryColor }; // fallback for print
  } else if (headerStyle === 'light') {
    headerBgStyle = { backgroundColor: '#f8fafc' };
    headerTextColor = 'text-slate-900';
    subTextColor = 'text-slate-600';
  }

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} min-h-[1080px] shadow-sm print-area`}>
      {/* Top Banner Header */}
      <header
        className={`p-8 sm:p-10 ${headerTextColor} transition-colors`}
        style={headerBgStyle}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left flex-1">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {personalInfo.fullName || 'Votre Nom'}
            </h1>
            {personalInfo.title && (
              <p className={`text-base sm:text-lg font-semibold tracking-wide ${subTextColor}`}>
                {personalInfo.title}
              </p>
            )}

            {/* Contact details */}
            <div className={`flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs ${subTextColor} pt-2 font-medium`}>
              {personalInfo.email && (
                <span className="flex items-center gap-1.5">
                  {showIcons && <Mail className="w-3.5 h-3.5" />}
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  {showIcons && <Phone className="w-3.5 h-3.5" />}
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  {showIcons && <MapPin className="w-3.5 h-3.5" />}
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5">
                  {showIcons && <Linkedin className="w-3.5 h-3.5" />}
                  {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1.5">
                  {showIcons && <Globe className="w-3.5 h-3.5" />}
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
                style={{ borderColor: headerStyle === 'light' ? primaryColor : '#ffffff' }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Body Grid: Two columns */}
      <div className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="bg-slate-50/80 p-4.5 rounded-xl border border-slate-200/80">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                Profil Executive
              </h2>
              <FormattedDescription text={personalInfo.summary} className="text-xs sm:text-sm text-slate-700 leading-relaxed" bulletColor={primaryColor} />
            </section>
          )}

          {/* Work Experience */}
          {workExperiences && workExperiences.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Briefcase className="w-4 h-4" />} Expériences Professionnelles
              </h2>
              <div className="space-y-4">
                {workExperiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline gap-1">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">{exp.position}</h3>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/80">
                        {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </p>
                    {exp.description && (
                      <FormattedDescription text={exp.description} className="text-xs sm:text-sm text-slate-700 pt-1 leading-relaxed" bulletColor={primaryColor} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="space-y-3 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                Projets & Réalisations
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs">
                    <div className="font-bold text-slate-900 flex justify-between">
                      <span>{proj.title}</span>
                      {proj.link && (
                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    {proj.description && <FormattedDescription text={proj.description} className="text-slate-600 mt-1" bulletColor={primaryColor} />}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {customSections && customSections.map((cSec) => (
            <section key={cSec.id} className="space-y-3 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                {cSec.title}
              </h2>
              <div className="space-y-2.5">
                {cSec.items.map((item) => (
                  <div key={item.id} className="text-xs">
                    <div className="font-bold text-slate-900">
                      {item.title} {item.subtitle && <span className="font-normal text-slate-600">— {item.subtitle}</span>}
                    </div>
                    {item.description && <FormattedDescription text={item.description} className="text-slate-600 mt-1" bulletColor={primaryColor} />}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Right Sidebar Column (4 cols) */}
        <div className="md:col-span-4 space-y-6 border-l border-slate-200 md:pl-6">
          {/* Education */}
          {educations && educations.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <GraduationCap className="w-3.5 h-3.5 inline mr-1" />} Formation
              </h2>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-700 font-semibold">{edu.institution}</p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {edu.startDate} – {edu.current ? 'Présent' : edu.endDate}
                    </p>
                    {edu.description && <FormattedDescription text={edu.description} className="text-slate-600 mt-1" bulletColor={primaryColor} />}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Code className="w-3.5 h-3.5 inline mr-1" />} Compétences
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md border border-slate-200/80">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Languages className="w-3.5 h-3.5 inline mr-1" />} Langues
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-slate-600 font-medium px-2 py-0.5 bg-slate-50 rounded border border-slate-200">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ borderColor: primaryColor, color: primaryColor }}>
                {showIcons && <Award className="w-3.5 h-3.5 inline mr-1" />} Certifications
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-slate-700">
                    <p className="font-bold text-slate-900">{cert.title}</p>
                    <p className="text-slate-500 text-[11px]">{cert.issuer} ({cert.date})</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
