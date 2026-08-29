import type { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React', level: 'proficient' },
      { name: 'TypeScript', level: 'proficient' },
      { name: 'JavaScript', level: 'proficient' },
      { name: 'HTML / CSS', level: 'proficient' },
      { name: 'Tailwind CSS', level: 'familiar' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 'proficient' },
      { name: 'Express.js', level: 'proficient' },
      { name: 'REST APIs', level: 'proficient' },
      { name: 'MongoDB', level: 'proficient' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 'familiar' },
      { name: 'EC2 / S3', level: 'familiar' },
      { name: 'Application Deployment', level: 'proficient' },
      { name: 'Linux', level: 'familiar' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { name: 'Git / GitHub', level: 'proficient' },
      { name: 'Postman', level: 'proficient' },
      { name: 'VS Code', level: 'proficient' },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    skills: [
      { name: 'Cybersecurity Fundamentals', level: 'familiar' },
      { name: 'Network Security', level: 'familiar' },
    ],
  },
];
