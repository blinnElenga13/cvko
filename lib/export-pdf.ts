import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CVData } from '@/types/cv';

/**
 * Canvas-based native browser color parser.
 * Converts ANY modern CSS color string (oklch, color-mix, lab, light-dark, hwb, etc.)
 * to standard rgb() or rgba() format using native 2D canvas rendering context.
 */
const dummyCanvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
if (dummyCanvas) {
  dummyCanvas.width = 1;
  dummyCanvas.height = 1;
}
const dummyCtx = dummyCanvas ? dummyCanvas.getContext('2d', { willReadFrequently: true }) : null;

function parseColorToRgb(colorStr: string): string {
  if (
    !colorStr ||
    colorStr === 'transparent' ||
    colorStr === 'inherit' ||
    colorStr === 'initial' ||
    colorStr === 'none'
  ) {
    return colorStr;
  }

  const trimmed = colorStr.trim();

  // Quick return for standard hex, rgb, rgba without complex functions
  if (/^#([0-9a-fA-F]{3,8})$/.test(trimmed)) {
    return trimmed;
  }
  if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(trimmed)) {
    return trimmed;
  }
  if (/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/.test(trimmed)) {
    return trimmed;
  }

  if (!dummyCtx) return trimmed;

  try {
    dummyCtx.clearRect(0, 0, 1, 1);
    dummyCtx.fillStyle = '#00000000';
    dummyCtx.fillStyle = trimmed;
    dummyCtx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = dummyCtx.getImageData(0, 0, 1, 1).data;

    if (a === 0 && (trimmed.includes('transparent') || trimmed.includes('rgba(0, 0, 0, 0)'))) {
      return 'transparent';
    }
    if (a === 255) {
      return `rgb(${r}, ${g}, ${b})`;
    }
    return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
  } catch {
    return 'rgb(0, 0, 0)';
  }
}

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
 * Creates an isolated, hidden <iframe> document without any Tailwind 4 / oklch stylesheets.
 * Bakes computed styles (converted to rgb/rgba) as explicit inline style attributes on every node.
 */
function createIsolatedIframeContainer(targetElement: HTMLElement): {
  iframe: HTMLIFrameElement;
  exportRoot: HTMLDivElement;
  clonedNode: HTMLElement;
  cleanup: () => void;
} {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-9999px';
  iframe.style.top = '0';
  iframe.style.width = '794px';
  iframe.style.height = '1123px';
  iframe.style.border = 'none';
  iframe.style.visibility = 'hidden';
  iframe.style.zIndex = '-9999';

  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    throw new Error('Impossible d\'accéder à l\'iframe isolée.');
  }

  iframeDoc.open();
  iframeDoc.write(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #ffffff; width: 794px; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; overflow: hidden; }
    #export-root { width: 794px; background: #ffffff; margin: 0; padding: 0; overflow: hidden; }
  </style>
</head>
<body>
  <div id="export-root"></div>
</body>
</html>`);
  iframeDoc.close();

  const exportRoot = iframeDoc.getElementById('export-root') as HTMLDivElement;
  const clonedNode = targetElement.cloneNode(true) as HTMLElement;

  clonedNode.style.width = '794px';
  clonedNode.style.maxWidth = '794px';
  clonedNode.style.transform = 'none';
  clonedNode.style.boxShadow = 'none';
  clonedNode.style.borderRadius = '0px';

  exportRoot.appendChild(clonedNode);

  // Recursively copy computed styles from parent window DOM to iframe DOM
  const originalNodes = [targetElement, ...Array.from(targetElement.querySelectorAll('*'))];
  const clonedNodes = [clonedNode, ...Array.from(clonedNode.querySelectorAll('*'))];

  originalNodes.forEach((origNode, idx) => {
    const cloneNode = clonedNodes[idx];
    if (!(origNode instanceof HTMLElement) || !(cloneNode instanceof HTMLElement)) return;

    try {
      const computed = window.getComputedStyle(origNode);

      // Layout & Sizing
      if (computed.display !== 'none') cloneNode.style.display = computed.display;
      cloneNode.style.flexDirection = computed.flexDirection;
      cloneNode.style.flexWrap = computed.flexWrap;
      cloneNode.style.justifyContent = computed.justifyContent;
      cloneNode.style.alignItems = computed.alignItems;
      cloneNode.style.gap = computed.gap;
      cloneNode.style.padding = computed.padding;
      cloneNode.style.margin = computed.margin;
      cloneNode.style.width = computed.width;
      cloneNode.style.height = computed.height;
      cloneNode.style.minWidth = computed.minWidth;
      cloneNode.style.minHeight = computed.minHeight;
      cloneNode.style.maxWidth = computed.maxWidth;
      cloneNode.style.maxHeight = computed.maxHeight;

      // Typography
      cloneNode.style.fontFamily = computed.fontFamily;
      cloneNode.style.fontSize = computed.fontSize;
      cloneNode.style.fontWeight = computed.fontWeight;
      cloneNode.style.lineHeight = computed.lineHeight;
      cloneNode.style.letterSpacing = computed.letterSpacing;
      cloneNode.style.textAlign = computed.textAlign;
      cloneNode.style.textTransform = computed.textTransform;

      // Borders & Radius
      cloneNode.style.borderRadius = computed.borderRadius;
      cloneNode.style.borderWidth = computed.borderWidth;
      cloneNode.style.borderStyle = computed.borderStyle;

      // Colors (Converted from oklch / lab / color-mix to rgb/rgba)
      cloneNode.style.color = parseColorToRgb(computed.color);
      cloneNode.style.backgroundColor = parseColorToRgb(computed.backgroundColor);
      cloneNode.style.borderColor = parseColorToRgb(computed.borderColor);
      cloneNode.style.borderTopColor = parseColorToRgb(computed.borderTopColor);
      cloneNode.style.borderBottomColor = parseColorToRgb(computed.borderBottomColor);
      cloneNode.style.borderLeftColor = parseColorToRgb(computed.borderLeftColor);
      cloneNode.style.borderRightColor = parseColorToRgb(computed.borderRightColor);
      cloneNode.style.outlineColor = parseColorToRgb(computed.outlineColor);

      // SVG Elements
      if (origNode instanceof SVGElement || origNode.tagName === 'svg' || origNode.tagName === 'path') {
        const fill = computed.fill;
        const stroke = computed.stroke;
        if (fill && fill !== 'none') cloneNode.style.fill = parseColorToRgb(fill);
        if (stroke && stroke !== 'none') cloneNode.style.stroke = parseColorToRgb(stroke);
      }

      // Clear box shadow to avoid canvas artifacts or unparsed oklch shadows
      cloneNode.style.boxShadow = 'none';
    } catch {
      // Ignore element style copy issues
    }
  });

  const cleanup = () => {
    if (iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  };

  return { iframe, exportRoot, clonedNode, cleanup };
}

/**
 * Main exportToPDF function.
 * ALWAYS generates a single A4 page (210mm x 297mm) with auto-fit scaling.
 * No content overflow, no extra pages, 100% clean single-page rendering.
 */
export async function exportToPDF(
  elementId: string,
  fileName: string = 'mon-cv.pdf'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} non trouvé dans le DOM.`);
  }

  // 1. Convert <img> tags to Base64 data URLs
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

  // 2. Create isolated iframe without oklch stylesheets
  const { exportRoot, clonedNode, cleanup } = createIsolatedIframeContainer(element);

  try {
    // Target single-page A4 height in pixels at 794px width is ~1123px (794 * 297 / 210)
    const targetA4HeightPx = 1123;
    const initialContentHeight = clonedNode.offsetHeight || targetA4HeightPx;

    // If the content is longer than 1123px, scale it down cleanly inside the container
    // so that all content fits within a single A4 page!
    if (initialContentHeight > targetA4HeightPx) {
      const scaleFactor = targetA4HeightPx / initialContentHeight;
      clonedNode.style.transform = `scale(${scaleFactor})`;
      clonedNode.style.transformOrigin = 'top left';
      clonedNode.style.width = '794px';
      exportRoot.style.height = `${targetA4HeightPx}px`;
      exportRoot.style.overflow = 'hidden';
    } else {
      exportRoot.style.height = `${Math.max(initialContentHeight, targetA4HeightPx)}px`;
    }

    // 3. Capture canvas using html2canvas on exportRoot (exact 794px x 1123px A4 frame)
    const canvas = await html2canvas(exportRoot, {
      scale: 2.5, // Crisp 300 DPI high resolution
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: targetA4HeightPx,
    });

    // 4. Create strictly ONE single-page A4 PDF (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.96);

    // Fit canvas onto the 210mm x 297mm single A4 page
    const canvasRatio = canvas.height / canvas.width;
    let renderW_mm = 210;
    let renderH_mm = 210 * canvasRatio;
    let x_mm = 0;
    let y_mm = 0;

    if (renderH_mm > 297) {
      renderH_mm = 297;
      renderW_mm = 297 / canvasRatio;
      x_mm = (210 - renderW_mm) / 2; // Center horizontally if scaled
    }

    // Add image onto the SINGLE page
    pdf.addImage(imgData, 'JPEG', x_mm, y_mm, renderW_mm, renderH_mm, undefined, 'FAST');

    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
  } finally {
    cleanup();
    images.forEach((img, idx) => {
      img.src = originalSrcs[idx];
    });
  }
}

/**
 * High quality PNG Image export (Single A4 Page layout).
 */
export async function exportToPNG(
  elementId: string,
  fileName: string = 'mon-cv.png'
): Promise<void> {
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

  const { exportRoot, clonedNode, cleanup } = createIsolatedIframeContainer(element);

  try {
    const targetA4HeightPx = 1123;
    const initialContentHeight = clonedNode.offsetHeight || targetA4HeightPx;

    if (initialContentHeight > targetA4HeightPx) {
      const scaleFactor = targetA4HeightPx / initialContentHeight;
      clonedNode.style.transform = `scale(${scaleFactor})`;
      clonedNode.style.transformOrigin = 'top left';
      exportRoot.style.height = `${targetA4HeightPx}px`;
      exportRoot.style.overflow = 'hidden';
    }

    const canvas = await html2canvas(exportRoot, {
      scale: 2.5,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: targetA4HeightPx,
    });

    const link = document.createElement('a');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    cleanup();
    images.forEach((img, idx) => {
      img.src = originalSrcs[idx];
    });
  }
}

/**
 * Standalone HTML web page export.
 */
export function exportToHTML(
  cvData: CVData,
  elementId: string = 'cv-preview-container',
  fileName?: string
): void {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} non trouvé.`);
  }

  const name = cvData.personalInfo.fullName || 'cv';
  const finalFileName = fileName || `${name}_CVKO.html`.replace(/\s+/g, '_');

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV - ${cvData.personalInfo.fullName || 'Curriculum Vitae'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      justify-content: center;
      padding: 2rem 1rem;
      margin: 0;
    }
    .cv-card {
      background: white;
      max-width: 800px;
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    @media print {
      body {
        padding: 0;
        background: white;
      }
      .cv-card {
        box-shadow: none;
        max-width: 100%;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <div class="cv-card">
    ${element.innerHTML}
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = finalFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Text output formatted for Applicant Tracking Systems (ATS).
 */
export function generateATSText(cvData: CVData): string {
  const {
    personalInfo,
    workExperiences,
    educations,
    skills,
    languages,
    projects,
    certifications,
    customSections,
  } = cvData;
  const lines: string[] = [];

  lines.push(`=== ${personalInfo.fullName || 'CURRICULUM VITAE'} ===`);
  if (personalInfo.title) lines.push(personalInfo.title);
  lines.push('');

  const contact: string[] = [];
  if (personalInfo.email) contact.push(`Email: ${personalInfo.email}`);
  if (personalInfo.phone) contact.push(`Téléphone: ${personalInfo.phone}`);
  if (personalInfo.location) contact.push(`Adresse: ${personalInfo.location}`);
  if (personalInfo.birthDate) contact.push(`Date de naissance: ${personalInfo.birthDate}`);
  if (personalInfo.birthPlace) contact.push(`Lieu de naissance: ${personalInfo.birthPlace}`);
  if (personalInfo.nationality) contact.push(`Nationalité: ${personalInfo.nationality}`);
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
      lines.push(
        `Période: ${exp.startDate || ''} - ${exp.current ? 'Présent' : exp.endDate || ''}`
      );
      if (exp.location) lines.push(`Lieu: ${exp.location}`);
      if (exp.description) lines.push(exp.description);
      lines.push('');
    });
  }

  if (educations && educations.length > 0) {
    lines.push('--- FORMATIONS ET DIPLÔMES ---');
    educations.forEach((edu) => {
      lines.push(`${edu.degree} - ${edu.institution}`);
      lines.push(
        `Période: ${edu.startDate || ''} - ${edu.current ? 'En cours' : edu.endDate || ''}`
      );
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
          lines.push(
            `• ${item.title}${item.subtitle ? ` (${item.subtitle})` : ''} ${
              item.date ? `[${item.date}]` : ''
            }`
          );
          if (item.description) lines.push(`  ${item.description}`);
        });
        lines.push('');
      }
    });
  }

  return lines.join('\n');
}

/**
 * Triggers native browser print dialog.
 */
export function printCV(): void {
  window.print();
}
