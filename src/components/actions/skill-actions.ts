import { skills } from "../config/skills";

export async function getSkills() {
    return skills;
}

export async function getSkillById(skillId: string) {
    try {
        const skill = skills.find((s) => s._id === skillId);
        if (!skill) throw new Error("Failed to fetch skill");
        return skill;
    } catch (error) {
        console.error("Error fetching skill:", error);
        throw error;
    }
}

