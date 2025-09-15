import type { Metadata } from "next";
import { skillApi } from "@/redux/features/skills/skillApi";
import { store } from "@/redux/store";

type Params = { skillId: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    try {
        const { skillId } = params;

        // Use RTK Query's initiate method to fetch data on the server
        const result = await store.dispatch(skillApi.endpoints.getSkillById.initiate(skillId));

        console.log(result);

        const skill = result.data?.data || null;

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
