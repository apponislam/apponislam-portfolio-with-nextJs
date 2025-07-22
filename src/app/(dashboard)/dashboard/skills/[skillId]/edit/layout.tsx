import type { Metadata } from "next";
import { getSkillById } from "@/components/actions/skill-actions";

type Params = Promise<{ skillId: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    try {
        const { skillId } = await params;

        const skill = await getSkillById(skillId);

        return {
            title: skill ? `Edit ${skill.name}` : "Edit Skill",
            description: skill ? `Editing ${skill.name} settings` : "Skill editor",
        };
    } catch (error) {
        console.error("Failed to load skill metadata:", error);
        return {
            title: "Edit Skill",
            description: "Skill editor",
        };
    }
}

export default function EditSkillLayout({ children }: { children: React.ReactNode }) {
    return <div className="edit-skill-layout">{children}</div>;
}
