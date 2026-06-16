import { skillsData, type Skill } from "@/data/skills";

export type skillsInterface = Skill;

export const skillsUnsorted: skillsInterface[] = skillsData;

export const skills = skillsUnsorted.slice().sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);

