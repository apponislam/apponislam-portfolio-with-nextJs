import { Projects } from "../config/projects";

export async function getProjects() {
    return Projects;
}

export async function getFeaturedProjects() {
    return Projects.slice(0, 3);
}

export async function getProjectById(projectId: string) {
    try {
        const project = Projects.find((p) => p._id === projectId);
        if (!project) {
            throw new Error("Failed to fetch project");
        }
        return project;
    } catch (error) {
        console.error("Error fetching project:", error);
        throw error;
    }
}

