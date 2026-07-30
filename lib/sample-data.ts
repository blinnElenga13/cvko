import { CVData } from '@/types/cv';

export const SAMPLE_CV_DEV: CVData = {
  personalInfo: {
    fullName: 'Thibault Laurent',
    title: 'Développeur Full-Stack Senior & Architecte React/Node',
    email: 'thibault.laurent@example.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France (Disponible en Remote)',
    website: 'https://thibault-laurent.dev',
    linkedin: 'linkedin.com/in/thibault-laurent',
    github: 'github.com/thibault-l',
    photoUrl: 'https://picsum.photos/seed/techman/300/300',
    summary: 'Développeur Full-Stack passionné avec plus de 6 ans d\'expérience dans la conception d\'applications web à fort trafic. Spécialisé en TypeScript, React, Next.js et Node.js. Orienté performance, architecture propre et expérience utilisateur fluide.',
  },
  workExperiences: [
    {
      id: 'exp-1',
      company: 'TechVision Solutions',
      position: 'Lead Développeur Frontend',
      startDate: 'Jan 2022',
      endDate: 'Présent',
      current: true,
      location: 'Paris, France',
      description: '• Management technique d\'une équipe de 5 développeurs sur la refonte de la plateforme SaaS principale.\n• Migration de l\'architecture sous Next.js 15 avec TypeScript, réduisant le temps de chargement de 42%.\n• Mise en place d\'un Design System d\'entreprise réutilisable basé sur Tailwind CSS et Storybook.\n• Optimisation du SEO technique et de l\'accessibilité WCAG AA (+35% de trafic organique en 8 mois).',
    },
    {
      id: 'exp-2',
      company: 'DataFlow Systems',
      position: 'Développeur Full-Stack',
      startDate: 'Sept 2019',
      endDate: 'Déc 2021',
      current: false,
      location: 'Lyon, France',
      description: '• Conception d\'API RESTful et GraphQL hautement scalables en Node.js, Express et PostgreSQL.\n• Intégration de pipelines CI/CD automatisés via GitHub Actions et Docker pour des déploiements sans interruption.\n• Déploiement de microservices sur Google Cloud Platform (Cloud Run, Pub/Sub, Firestore).\n• Réduction de 60% du temps de traitement des requêtes analytiques lourdes.',
    },
    {
      id: 'exp-3',
      company: 'WebPulse Studio',
      position: 'Développeur Web Junior',
      startDate: 'Juil 2018',
      endDate: 'Août 2019',
      current: false,
      location: 'Lyon, France',
      description: '• Développement d\'interfaces utilisateurs réactives en React.js et Redux pour divers clients grands comptes.\n• Collaboration étroite avec les équipes UX/UI pour la traduction fidèle des maquettes Figma.',
    }
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'INSA Lyon',
      degree: 'Master d\'Ingénierie Informatique',
      fieldOfStudy: 'Génie Informatique & Systèmes d\'Information',
      startDate: '2015',
      endDate: '2018',
      current: false,
      location: 'Lyon, France',
      description: 'Major de promo sur le projet de fin d\'études axé sur le développement d\'applications réparties.',
    },
    {
      id: 'edu-2',
      institution: 'Université Claude Bernard',
      degree: 'Licence Informatique',
      fieldOfStudy: 'Informatique & Mathématiques appliquées',
      startDate: '2013',
      endDate: '2015',
      current: false,
      location: 'Lyon, France',
      description: 'Mention Très Bien.',
    }
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript / JavaScript (ES6+)', level: 'Expert', category: 'Langages' },
    { id: 'sk-2', name: 'React.js / Next.js', level: 'Expert', category: 'Frontend' },
    { id: 'sk-3', name: 'Node.js / Express / NestJS', level: 'Avancé', category: 'Backend' },
    { id: 'sk-4', name: 'Tailwind CSS / Sass', level: 'Expert', category: 'Frontend' },
    { id: 'sk-5', name: 'PostgreSQL / MongoDB / Redis', level: 'Avancé', category: 'Base de données' },
    { id: 'sk-6', name: 'Docker / CI/CD / GCP', level: 'Intermédiaire', category: 'DevOps' },
    { id: 'sk-7', name: 'Jest / Cypress / Testing Library', level: 'Avancé', category: 'Testing' },
  ],
  languages: [
    { id: 'lang-1', name: 'Français', level: 'Langue maternelle' },
    { id: 'lang-2', name: 'Anglais', level: 'C1 - Courant (Professionnel)' },
    { id: 'lang-3', name: 'Espagnol', level: 'B1 - Intermédiaire' },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevCraft Studio',
      description: 'Éditeur de code en ligne avec prévisualisation en temps réel et partage collaboratif.',
      link: 'github.com/thibault-l/devcraft',
      technologies: 'React, WebSockets, Monaco Editor, Node.js',
    },
    {
      id: 'proj-2',
      title: 'QuickAnalytics Engine',
      description: 'Dashboard léger d\'analyse web respectueux de la vie privée sans cookies.',
      link: 'quickanalytics.io',
      technologies: 'Next.js, Tailwind, ClickHouse, Recharts',
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: '',
    },
    {
      id: 'cert-2',
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      date: '2021',
      link: '',
    }
  ],
  customSections: [],
  settings: {
    templateId: 'modern',
    primaryColor: '#0f172a',
    fontFamily: 'sans',
    spacing: 'normal',
    photoShape: 'circle',
    photoSize: 'md',
    showIcons: true,
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'languages', 'projects', 'certifications'],
  }
};

export const SAMPLE_CV_MARKETING: CVData = {
  personalInfo: {
    fullName: 'Camille Moreau',
    title: 'Responsable Marketing Digital & Growth Manager',
    email: 'camille.moreau@example.com',
    phone: '+33 6 98 76 54 32',
    location: 'Bordeaux, France',
    website: 'https://camillem-growth.fr',
    linkedin: 'linkedin.com/in/camille-moreau-mkt',
    github: '',
    photoUrl: 'https://picsum.photos/seed/businesswoman/300/300',
    summary: 'Spécialiste du marketing digital et de l\'acquisition client avec 5 ans d\'expérience dans l\'écosystème Start-up & E-commerce. Expertise avérée en SEA, SEO, Inbound Marketing et optimisation du taux de conversion (CRO).',
  },
  workExperiences: [
    {
      id: 'mkt-exp-1',
      company: 'E-Shop Global',
      position: 'Head of Growth & Digital Marketing',
      startDate: 'Mars 2022',
      endDate: 'Présent',
      current: true,
      location: 'Bordeaux, France',
      description: '• Gestion d\'un budget d\'acquisition annuel de 350K€ sur Google Ads, Meta Ads et TikTok.\n• Augmentation du chiffre d\'affaires e-commerce de +85% en 18 mois via le levier Inbound & SEO.\n• Refonte complète de la stratégie d\'automatisation emailing (Klaviyo), générant +28% de ventes répétées.',
    },
    {
      id: 'mkt-exp-2',
      company: 'Agence Horizon Digital',
      position: 'Chef de Projet Stratégie Digitale',
      startDate: 'Jan 2020',
      endDate: 'Fév 2022',
      current: false,
      location: 'Bordeaux, France',
      description: '• Pilote de compte pour 12 clients PME & E-commerce dans divers secteurs d\'activité.\n• Création et exécution de campagnes de brand content, copywriting et netlinking.',
    }
  ],
  educations: [
    {
      id: 'mkt-edu-1',
      institution: 'KEDGE Business School',
      degree: 'Master 2 Marketing Strategy & Data Science',
      fieldOfStudy: 'Marketing & Communication',
      startDate: '2018',
      endDate: '2020',
      current: false,
      location: 'Bordeaux, France',
      description: 'Mémoire sur l\'impact de l\'IA générative dans les stratégies d\'acquisition B2B.',
    }
  ],
  skills: [
    { id: 'mkt-sk-1', name: 'Google Ads & Analytics 4 (GA4)', level: 'Expert', category: 'Acquisition' },
    { id: 'mkt-sk-2', name: 'Meta Ads Manager & TikTok Ads', level: 'Expert', category: 'Acquisition' },
    { id: 'mkt-sk-3', name: 'SEO & Content Marketing (Semrush)', level: 'Avancé', category: 'Organic' },
    { id: 'mkt-sk-4', name: 'Copywriting & UX Writing', level: 'Expert', category: 'Contenu' },
    { id: 'mkt-sk-5', name: 'Klaviyo / Hubspot / Mailchimp', level: 'Avancé', category: 'CRM' },
  ],
  languages: [
    { id: 'mkt-lang-1', name: 'Français', level: 'Langue maternelle' },
    { id: 'mkt-lang-2', name: 'Anglais', level: 'C2 - Bilingue' },
    { id: 'mkt-lang-3', name: 'Allemand', level: 'B2 - Intermédiaire' },
  ],
  projects: [],
  certifications: [
    {
      id: 'mkt-cert-1',
      title: 'Certification Google Search & Display Ads',
      issuer: 'Google Skillshop',
      date: '2024',
      link: '',
    },
    {
      id: 'mkt-cert-2',
      title: 'HubSpot Inbound Marketing Certified',
      issuer: 'HubSpot Academy',
      date: '2023',
      link: '',
    }
  ],
  customSections: [],
  settings: {
    templateId: 'creative',
    primaryColor: '#000000',
    fontFamily: 'sans',
    spacing: 'normal',
    photoShape: 'rounded',
    photoSize: 'md',
    showIcons: true,
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
  }
};

export const EMPTY_CV_DATA: CVData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: '',
    summary: '',
  },
  workExperiences: [],
  educations: [],
  skills: [],
  languages: [],
  projects: [],
  certifications: [],
  customSections: [],
  settings: {
    templateId: 'modern',
    primaryColor: '#0f172a',
    fontFamily: 'sans',
    spacing: 'normal',
    photoShape: 'circle',
    photoSize: 'md',
    showIcons: true,
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'languages', 'projects', 'certifications'],
  }
};
