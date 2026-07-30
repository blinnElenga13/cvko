import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CVData } from '@/types/cv';

/**
 * Converts image URL to Base64 data URL to avoid CORS / canvas taint issues.
 */
async function urlToDataURL(url: string): Promise<string> {
  if (!url || url.startsWith('data:')) return url;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 200;
        canvas.height = img.naturalHeight || img.height || 200;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
          return;
        }
      } catch (e) {
        console.warn('Could not convert image to data URL:', e);
      }
      resolve(url);
    };
    img.onerror = () => {
      resolve(url);
    };
    img.src = url;
  });
}

/**
 * Replaces modern CSS color functions (oklab, oklch, color-mix, light-dark, lab, lch, hwb)
 * with standard rgb()/rgba() strings using browser native canvas 2D context.
 */
function replaceColorFunctions(str: string, ctx: CanvasRenderingContext2D | null): string {
  if (
    !str ||
    (!str.includes('oklab') &&
      !str.includes('oklch') &&
      !str.includes('color-mix') &&
      !str.includes('light-dark') &&
      !str.includes('lab') &&
      !str.includes('lch') &&
      !str.includes('hwb'))
  ) {
    return str;
  }
  if (!ctx) return str;

  const keywords = ['oklab(', 'oklch(', 'color-mix(', 'light-dark(', 'lab(', 'lch(', 'hwb('];

  let result = str;
  let maxLoop = 50;

  while (maxLoop-- > 0) {
    let foundIndex = -1;
    for (const kw of keywords) {
      const idx = result.indexOf(kw);
      if (idx !== -1 && (foundIndex === -1 || idx < foundIndex)) {
        foundIndex = idx;
      }
    }

    if (foundIndex === -1) break;

    let depth = 0;
    let endIdx = -1;
    for (let i = foundIndex; i < result.length; i++) {
      if (result[i] === '(') depth++;
      else if (result[i] === ')') {
        depth--;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      }
    }

    if (endIdx === -1) break;

    const fullColorExpr = result.slice(foundIndex, endIdx + 1);

    let rgbValue = fullColorExpr;
    try {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#00000000';
      ctx.fillStyle = fullColorExpr;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      if (a === 0) {
        rgbValue = 'rgba(0,0,0,0)';
      } else if (a === 255) {
        rgbValue = `rgb(${r}, ${g}, ${b})`;
      } else {
        rgbValue = `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
      }
    } catch {
      rgbValue = 'rgb(0,0,0)';
    }

    result = result.slice(0, foundIndex) + rgbValue + result.slice(endIdx + 1);
  }

  return result;
}

export async function exportToPDF(elementId: string, fileName: string = 'mon-cv.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} non trouvé dans le DOM.`);
  }

  // 1. Convert <img> tags to Base64 data URIs
  const images = Array.from(element.querySelectorAll('img'));
  const originalSrcs = images.map((img) => img.src);

  try {
    await Promise.all(
      images.map(async (img) => {
        if (img.src && !img.src.startsWith('data:')) {
          const dataUrl = await urlToDataURL(img.src);
          img.src = dataUrl;
        }
      })
    );
  } catch (err) {
    console.warn('Error converting images for PDF:', err);
  }

  // 2. Save original element styles for restoration
  const originalWidth = element.style.width;
  const originalMaxWidth = element.style.maxWidth;
  const originalTransform = element.style.transform;
  const originalBoxShadow = element.style.boxShadow;
  const originalBorderRadius = element.style.borderRadius;

  const dummyCanvas = document.createElement('canvas');
  dummyCanvas.width = 1;
  dummyCanvas.height = 1;
  const dummyCtx = dummyCanvas.getContext('2d', { willReadFrequently: true });

  try {
    // 3. Set standard A4 dimensions (794px = 210mm at 96dpi)
    element.style.width = '794px';
    element.style.maxWidth = '794px';
    element.style.transform = 'none';
    element.style.boxShadow = 'none';
    element.style.borderRadius = '0px';

    // 4. Capture with html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // ~300dpi resolution
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      windowWidth: 1200,
      onclone: (clonedDoc, clonedEl) => {
        // Sanitize style tags in cloned document
        const styleTags = Array.from(clonedDoc.querySelectorAll('style'));
        styleTags.forEach((styleTag) => {
          if (styleTag.textContent) {
            styleTag.textContent = replaceColorFunctions(styleTag.textContent, dummyCtx);
          }
        });

        // Sanitize inline style attributes in cloned document
        const allClonedElements = Array.from(clonedDoc.querySelectorAll('*'));
        allClonedElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            const styleAttr = el.getAttribute('style');
            if (styleAttr) {
              el.setAttribute('style', replaceColorFunctions(styleAttr, dummyCtx));
            }
          }
        });

        // Explicitly sanitize computed color properties from original elements
        const originalNodes = [element, ...Array.from(element.querySelectorAll('*'))];
        const clonedNodes = [clonedEl, ...Array.from(clonedEl.querySelectorAll('*'))];

        const colorProps = [
          'color',
          'background-color',
          'border-color',
          'border-top-color',
          'border-bottom-color',
          'border-left-color',
          'border-right-color',
          'outline-color',
          'fill',
          'stroke',
          'box-shadow',
        ];

        originalNodes.forEach((origNode, i) => {
          const clonedNode = clonedNodes[i];
          if (!clonedNode || !(clonedNode instanceof HTMLElement) || !(origNode instanceof HTMLElement)) return;

          try {
            const computed = window.getComputedStyle(origNode);
            colorProps.forEach((prop) => {
              const val = computed.getPropertyValue(prop);
              if (
                val &&
                (val.includes('oklab') ||
                  val.includes('oklch') ||
                  val.includes('color-mix') ||
                  val.includes('light-dark') ||
                  val.includes('lab') ||
                  val.includes('lch'))
              ) {
                const fixedVal = replaceColorFunctions(val, dummyCtx);
                clonedNode.style.setProperty(prop, fixedVal, 'important');
              }
            });
          } catch {
            // ignore
          }
        });
      },
    });

    // 5. Slice canvas into crisp A4 pages
    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const pageHeightPx = Math.floor(imgWidthPx * (297 / 210));
    const totalPages = Math.max(1, Math.ceil(imgHeightPx / pageHeightPx));

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    for (let i = 0; i < totalPages; i++) {
      const srcY = i * pageHeightPx;
      const srcH = Math.min(pageHeightPx, imgHeightPx - srcY);

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = imgWidthPx;
      pageCanvas.height = pageHeightPx;

      const pageCtx = pageCanvas.getContext('2d');
      if (pageCtx) {
        pageCtx.fillStyle = '#ffffff';
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(
          canvas,
          0,
          srcY,
          imgWidthPx,
          srcH,
          0,
          0,
          imgWidthPx,
          srcH
        );
      }

      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);

      if (i > 0) {
        pdf.addPage('a4', 'p');
      }

      pdf.addImage(pageImgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
  } finally {
    // 6. Restore original element styles
    element.style.width = originalWidth;
    element.style.maxWidth = originalMaxWidth;
    element.style.transform = originalTransform;
    element.style.boxShadow = originalBoxShadow;
    element.style.borderRadius = originalBorderRadius;

    // Restore original image sources
    images.forEach((img, idx) => {
      img.src = originalSrcs[idx];
    });
  }
}

export async function exportToPNG(elementId: string, fileName: string = 'mon-cv.png'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} non trouvé dans le DOM.`);
  }

  const images = Array.from(element.querySelectorAll('img'));
  const originalSrcs = images.map((img) => img.src);

  try {
    await Promise.all(
      images.map(async (img) => {
        if (img.src && !img.src.startsWith('data:')) {
          const dataUrl = await urlToDataURL(img.src);
          img.src = dataUrl;
        }
      })
    );
  } catch (err) {
    console.warn('Error converting images for PNG:', err);
  }

  const originalWidth = element.style.width;
  const originalMaxWidth = element.style.maxWidth;
  const originalTransform = element.style.transform;
  const originalBoxShadow = element.style.boxShadow;
  const originalBorderRadius = element.style.borderRadius;

  const dummyCanvas = document.createElement('canvas');
  dummyCanvas.width = 1;
  dummyCanvas.height = 1;
  const dummyCtx = dummyCanvas.getContext('2d', { willReadFrequently: true });

  try {
    element.style.width = '794px';
    element.style.maxWidth = '794px';
    element.style.transform = 'none';
    element.style.boxShadow = 'none';
    element.style.borderRadius = '0px';

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc, clonedEl) => {
        const styleTags = Array.from(clonedDoc.querySelectorAll('style'));
        styleTags.forEach((styleTag) => {
          if (styleTag.textContent) {
            styleTag.textContent = replaceColorFunctions(styleTag.textContent, dummyCtx);
          }
        });
        const allClonedElements = Array.from(clonedDoc.querySelectorAll('*'));
        allClonedElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            const styleAttr = el.getAttribute('style');
            if (styleAttr) {
              el.setAttribute('style', replaceColorFunctions(styleAttr, dummyCtx));
            }
          }
        });
      },
    });

    const link = document.createElement('a');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    element.style.width = originalWidth;
    element.style.maxWidth = originalMaxWidth;
    element.style.transform = originalTransform;
    element.style.boxShadow = originalBoxShadow;
    element.style.borderRadius = originalBorderRadius;

    images.forEach((img, idx) => {
      img.src = originalSrcs[idx];
    });
  }
}

export function generateATSText(cvData: CVData): string {
  const { personalInfo, workExperiences, educations, skills, languages, projects, certifications, customSections } = cvData;
  const lines: string[] = [];

  lines.push(`=== ${personalInfo.fullName || 'CURRICULUM VITAE'} ===`);
  if (personalInfo.title) lines.push(personalInfo.title);
  lines.push('');

  const contact: string[] = [];
  if (personalInfo.email) contact.push(`Email: ${personalInfo.email}`);
  if (personalInfo.phone) contact.push(`Téléphone: ${personalInfo.phone}`);
  if (personalInfo.location) contact.push(`Adresse: ${personalInfo.location}`);
  if (personalInfo.linkedin) contact.push(`LinkedIn: ${personalInfo.linkedin}`);
  if (personalInfo.website) contact.push(`Site web: ${personalInfo.website}`);
  if (personalInfo.github) contact.push(`GitHub: ${personalInfo.github}`);
  if (contact.length > 0) {
    lines.push('--- COORDONNÉES ---');
    lines.push(contact.join('\n'));
    lines.push('');
  }

  if (personalInfo.summary) {
    lines.push('--- PROFIL PROFESSIONNEL ---');
    lines.push(personalInfo.summary);
    lines.push('');
  }

  if (workExperiences && workExperiences.length > 0) {
    lines.push('--- EXPÉRIENCES PROFESSIONNELLES ---');
    workExperiences.forEach((exp) => {
      lines.push(`${exp.position} - ${exp.company}`);
      lines.push(`Période: ${exp.startDate || ''} - ${exp.current ? 'Présent' : exp.endDate || ''}`);
      if (exp.location) lines.push(`Lieu: ${exp.location}`);
      if (exp.description) lines.push(exp.description);
      lines.push('');
    });
  }

  if (educations && educations.length > 0) {
    lines.push('--- FORMATIONS ET DIPLÔMES ---');
    educations.forEach((edu) => {
      lines.push(`${edu.degree} - ${edu.institution}`);
      lines.push(`Période: ${edu.startDate || ''} - ${edu.current ? 'En cours' : edu.endDate || ''}`);
      if (edu.fieldOfStudy) lines.push(`Domaine: ${edu.fieldOfStudy}`);
      if (edu.description) lines.push(edu.description);
      lines.push('');
    });
  }

  if (skills && skills.length > 0) {
    lines.push('--- COMPÉTENCES ---');
    lines.push(skills.map((s) => `- ${s.name}${s.level ? ` (${s.level})` : ''}`).join('\n'));
    lines.push('');
  }

  if (languages && languages.length > 0) {
    lines.push('--- LANGUES ---');
    lines.push(languages.map((l) => `- ${l.name}: ${l.level}`).join('\n'));
    lines.push('');
  }

  if (projects && projects.length > 0) {
    lines.push('--- PROJETS ET RÉALISATIONS ---');
    projects.forEach((proj) => {
      lines.push(`• ${proj.title}`);
      if (proj.link) lines.push(`  Lien: ${proj.link}`);
      if (proj.description) lines.push(`  Description: ${proj.description}`);
      if (proj.technologies) lines.push(`  Technologies: ${proj.technologies}`);
      lines.push('');
    });
  }

  if (certifications && certifications.length > 0) {
    lines.push('--- CERTIFICATIONS ---');
    certifications.forEach((cert) => {
      lines.push(`• ${cert.title} - ${cert.issuer} (${cert.date})`);
    });
    lines.push('');
  }

  if (customSections && customSections.length > 0) {
    customSections.forEach((cSec) => {
      if (cSec.title && cSec.items.length > 0) {
        lines.push(`--- ${cSec.title.toUpperCase()} ---`);
        cSec.items.forEach((item) => {
          lines.push(`• ${item.title}${item.subtitle ? ` (${item.subtitle})` : ''} ${item.date ? `[${item.date}]` : ''}`);
          if (item.description) lines.push(`  ${item.description}`);
        });
        lines.push('');
      }
    });
  }

  return lines.join('\n');
}

export function printCV(): void {
  window.print();
}
