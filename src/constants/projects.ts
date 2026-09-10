import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'fundwave',
    title: 'FundWave',
    description:
      'Personal finance tracker for managing income, expenses, transactions, and savings goals, with personalized financial insights powered by Gemini.',
    tags: ['MERN Stack', 'Personal Finance'],
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Gemini API',
      'Docker',
    ],
    liveUrl: 'https://fundwave-zeta.vercel.app/',
    githubUrl: 'https://github.com/Pravallikadintyala/FundWave',
    featured: true,
  },
  {
    id: 'smartpulse',
    title: 'SmartPulse',
    description:
      'Flask-based web application that analyzes ECG images and classifies cardiovascular conditions using a Random Forest machine learning model.',
    tags: ['Python', 'Machine Learning'],
    techStack: ['Python', 'Flask', 'OpenCV', 'NumPy', 'Scikit-learn', 'Random Forest'],
    metric: { value: '93.01%', label: 'Classification accuracy' },
    liveUrl: 'https://smart-pulse-sable.vercel.app/',
    githubUrl: 'https://github.com/Pravallikadintyala/SmartPulse',
    featured: false,
  },
];
