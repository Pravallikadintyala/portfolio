// ============================================================
// Global TypeScript types for the portfolio
// ============================================================

export interface NavItem {
  label: string;
  id: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'full-time' | 'internship';
  description: string[];
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'proficient' | 'familiar' | 'exploring';
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badgeColor?: string;
}

export interface AnimationConfig {
  reducedMotion: boolean;
}
