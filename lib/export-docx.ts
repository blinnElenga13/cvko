import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { CVData } from '@/types/cv';

export async function generateDocx(cvData: CVData): Promise<Blob> {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections, settings } = cvData;
  const primaryColorHex = settings.primaryColor.replace('#', '');

  const children: Paragraph[] = [];

  // Name Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: personalInfo.fullName || 'Mon CV',
          bold: true,
          size: 32, // 16pt
          color: primaryColorHex,
        }),
      ],
      spacing: { after: 100 },
    })
  );

  // Job Title
  if (personalInfo.title) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: personalInfo.title,
            size: 24, // 12pt
            italics: true,
            color: '475569',
          }),
        ],
        spacing: { after: 150 },
      })
    );
  }

  // Contact Info Line
  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
    settings.templateId === 'tech' ? personalInfo.github : '',
  ].filter(Boolean);

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: contactParts.join(' | '),
            size: 18, // 9pt
            color: '64748b',
          }),
        ],
        spacing: { after: 300 },
      })
    );
  }

  // Helper for Section Titles
  const addSectionHeading = (title: string) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 22, // 11pt
            color: primaryColorHex,
          }),
        ],
        spacing: { before: 240, after: 120 },
        border: {
          bottom: {
            color: primaryColorHex,
            space: 4,
            style: BorderStyle.SINGLE,
            size: 12,
          },
        },
      })
    );
  };

  // 1. Summary Section
  if (personalInfo.summary) {
    addSectionHeading('Profil Professionnel');
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo.summary,
            size: 20,
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  // 2. Work Experiences
  if (workExperiences && workExperiences.length > 0) {
    addSectionHeading('Expériences Professionnelles');
    workExperiences.forEach((exp) => {
      const dates = `${exp.startDate || ''} - ${exp.current ? 'Présent' : exp.endDate || ''}`;
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.position,
              bold: true,
              size: 22,
            }),
            new TextRun({
              text: ` | ${exp.company}`,
              bold: true,
              color: '334155',
              size: 20,
            }),
            new TextRun({
              text: `  (${dates})`,
              italics: true,
              size: 18,
              color: '64748b',
            }),
          ],
          spacing: { before: 120, after: 40 },
        })
      );

      if (exp.location) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.location,
                italics: true,
                size: 18,
                color: '64748b',
              }),
            ],
            spacing: { after: 40 },
          })
        );
      }

      if (exp.description) {
        const lines = exp.description.split('\n');
        lines.forEach((line) => {
          if (line.trim()) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: line.trim(),
                    size: 20,
                  }),
                ],
                spacing: { after: 40 },
              })
            );
          }
        });
      }
      children.push(new Paragraph({ spacing: { after: 120 } }));
    });
  }

  // 3. Education
  if (educations && educations.length > 0) {
    addSectionHeading('Formations & Diplômes');
    educations.forEach((edu) => {
      const dates = `${edu.startDate || ''} - ${edu.current ? 'En cours' : edu.endDate || ''}`;
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 22,
            }),
            new TextRun({
              text: ` – ${edu.institution}`,
              bold: true,
              color: '334155',
              size: 20,
            }),
            new TextRun({
              text: `  (${dates})`,
              italics: true,
              size: 18,
              color: '64748b',
            }),
          ],
          spacing: { before: 120, after: 40 },
        })
      );

      if (edu.fieldOfStudy) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: edu.fieldOfStudy,
                size: 20,
                color: '475569',
              }),
            ],
            spacing: { after: 40 },
          })
        );
      }

      if (edu.description) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: edu.description,
                size: 18,
                italics: true,
              }),
            ],
            spacing: { after: 100 },
          })
        );
      }
    });
  }

  // 4. Skills
  if (skills && skills.length > 0) {
    addSectionHeading('Compétences Clés');
    const skillTexts = skills.map((s) => `${s.name}${s.level ? ` (${s.level})` : ''}`).join(' • ');
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: skillTexts,
            size: 20,
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  // 5. Languages
  if (languages && languages.length > 0) {
    addSectionHeading('Langues');
    const langTexts = languages.map((l) => `${l.name}: ${l.level}`).join(' | ');
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: langTexts,
            size: 20,
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  // 6. Projects
  if (projects && projects.length > 0) {
    addSectionHeading('Projets & Réalisations');
    projects.forEach((proj) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: proj.title,
              bold: true,
              size: 20,
            }),
            ...(proj.link
              ? [
                  new TextRun({
                    text: ` (${proj.link})`,
                    italics: true,
                    size: 18,
                    color: primaryColorHex,
                  }),
                ]
              : []),
          ],
          spacing: { before: 100, after: 40 },
        })
      );

      if (proj.description) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: proj.description,
                size: 20,
              }),
            ],
            spacing: { after: 40 },
          })
        );
      }

      if (proj.technologies) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Technologies: ${proj.technologies}`,
                size: 18,
                italics: true,
                color: '64748b',
              }),
            ],
            spacing: { after: 120 },
          })
        );
      }
    });
  }

  // 7. Certifications
  if (certifications && certifications.length > 0) {
    addSectionHeading('Certifications & Diplômes');
    certifications.forEach((cert) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: cert.title,
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: ` – ${cert.issuer} (${cert.date})`,
              size: 18,
              color: '475569',
            }),
          ],
          spacing: { before: 80, after: 60 },
        })
      );
    });
  }

  // 8. Custom Sections
  if (customSections && customSections.length > 0) {
    customSections.forEach((cSec) => {
      if (cSec.title && cSec.items.length > 0) {
        addSectionHeading(cSec.title);
        cSec.items.forEach((item) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: item.title,
                  bold: true,
                  size: 20,
                }),
                ...(item.subtitle ? [new TextRun({ text: ` – ${item.subtitle}`, size: 18, color: '475569' })] : []),
                ...(item.date ? [new TextRun({ text: ` (${item.date})`, italics: true, size: 18, color: '64748b' })] : []),
              ],
              spacing: { before: 80, after: 40 },
            })
          );
          if (item.description) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: item.description,
                    size: 20,
                  }),
                ],
                spacing: { after: 80 },
              })
            );
          }
        });
      }
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
