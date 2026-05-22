export type ExperienceType = "work" | "internship" | "education" | "project";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface Project {
  title: string;
  description: string;
  tech?: string[];
  link?: string;
  repo?: string;
  image?: string;
}

export interface Experience {
  type: ExperienceType;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Profile {
  name: string;
  role: string;
  location?: string;
  email: string;
  avatar?: string;
  resumeUrl?: string;
  intro: string;
  about: string;
  education?: string;
  skills: string[];
  projects?: Project[];
  experience?: Experience[];
  socials?: SocialLinks;
}

export const experienceTypeLabels: Record<ExperienceType, string> = {
  work: "工作",
  internship: "实习",
  education: "教育",
  project: "项目",
};
