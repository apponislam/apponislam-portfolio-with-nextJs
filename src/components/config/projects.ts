import { projectsData, type Project } from "@/data/projects";

export type ProjectsInterface = Project;

export const Projects: ProjectsInterface[] = projectsData;

export const featuredProjects = Projects.slice(0, 3);

