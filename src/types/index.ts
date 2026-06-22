// Raw data types (what comes from JSON/API)
export interface RawProject {
  title?: string;
  category?: string;
  tags?: string[];
  description?: string;
  url?: string;
}

export interface RawSkill {
  name?: string;
  level?: string;
}

export interface RawSkillGroup {
  group?: string;
  skills?: RawSkill[];
}

export interface RawTestimonial {
  text?: string;
  author?: {
    name?: string;
    role?: string;
    avatar?: string;
  };
  link?: string;
}

export interface RawCertification {
  title?: string;
  issuer?: string;
  date?: string;
  icon?: string;
  link?: string;
  code?: string;
}

export interface RawExperience {
  company?: string;
  role?: string;
  period?: string;
  description?: string;
  highlights?: string[];
  clients?: RawExperienceClient[];
}

export interface RawExperienceClient {
  name?: string;
  period?: string;
}

// Transformed types (used by UI components)
export interface Project {
  title: string;
  category: string;
  tags: string[];
  description: string;
  url: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface SkillGroup {
  group: string;
  skills: Skill[];
}

export interface Testimonial {
  text: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  link: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: string;
  link: string;
  code: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  clients: ExperienceClient[];
}

export interface ExperienceClient {
  name: string;
  period: string;
}

export type SkillLevel = 'advanced' | 'proficient' | 'intermediate' | 'beginner';
