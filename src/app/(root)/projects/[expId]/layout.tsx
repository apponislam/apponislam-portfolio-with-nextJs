import { ReactNode } from "react";
import { Metadata } from "next";
import { store } from "@/redux/store";
import { projectApi } from "@/redux/features/projects/projectApi";

export async function generateMetadata({ params }: { params: Promise<{ expId: string }> }): Promise<Metadata> {
    const { expId } = await params;

    try {
        const result = await store.dispatch(projectApi.endpoints.getProjectById.initiate(expId));
        const project = result.data?.data; // actual project object

        return {
            title: project ? project.companyName : "Project",
            description: project ? project.shortDescription : "Project details",
        };
    } catch (error) {
        console.error(error);
        return {
            title: "Project",
            description: "Project details",
        };
    }
}

export default function ProjectLayout({ children }: { children: ReactNode }) {
    return <div className="project-layout">{children}</div>;
}
