import { getProjectById } from "@/components/actions/project-actions";
import type { Metadata } from "next";

type Params = Promise<{ expId: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    try {
        const { expId } = await params;

        const project = await getProjectById(expId);

        return {
            title: project ? `Edit ${project.companyName}` : "Edit Project",
            description: project ? `Editing ${project.companyName} - ${project.type}` : "Project editor",
        };
    } catch (error) {
        console.error("Failed to load project metadata:", error);
        return {
            title: "Edit Project",
            description: "Project editor",
        };
    }
}

export default function EditProjectLayout({ children }: { children: React.ReactNode }) {
    return <div className="edit-project-layout">{children}</div>;
}
