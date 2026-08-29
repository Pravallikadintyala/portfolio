import type { NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Stack', id: 'stack' },
  { label: 'Education', id: 'education' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

export const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  STACK: 'stack',
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  CONTACT: 'contact',
} as const;
