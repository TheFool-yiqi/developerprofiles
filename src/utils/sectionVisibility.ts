import type { Profile } from "../data/types";

export const hasProjects = (p: Profile) => (p.projects?.length ?? 0) > 0;
export const hasExperience = (p: Profile) => (p.experience?.length ?? 0) > 0;
export const hasSkills = (p: Profile) => (p.skills?.length ?? 0) > 0;
