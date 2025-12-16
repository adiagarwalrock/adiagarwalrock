export enum Page {
  INTRO = 'intro',
  NOW = 'now',
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  points: string[];
}

export interface Project {
  title: string;
  tech: string[];
  description: string[];
  link?: string;
  demo?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
