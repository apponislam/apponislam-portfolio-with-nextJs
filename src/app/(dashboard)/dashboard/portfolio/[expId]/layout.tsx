import { ReactNode } from "react";
import { Metadata } from "next";
import { store } from "@/redux/store";
import { projectApi } from "@/redux/features/projects/projectApi";

// Use the Promise pattern like in Next.js docs
// type ProjectParams = { expId: string };

export async function generateMetadata({ params }: { params: Promise<{ expId: string }> }): Promise<Metadata> {
    const { expId } = await params;

    try {
        // Fetch project via Redux Toolkit RTK Query on the server
        const result = await store.dispatch(projectApi.endpoints.getProjectById.initiate(expId));
        const project = result.data?.data;

        return {
            title: project ? `${project.companyName} | Project` : "Project",
            description: project ? project.shortDescription : "Project details",
        };
    } catch (error) {
        console.error("Failed to generate project metadata:", error);
        return {
            title: "Project",
            description: "Project details",
        };
    }
}

// Async layout following Next.js docs pattern
export default async function ProjectLayout({ children }: { children: ReactNode }) {
    return <div className="project-layout">{children}</div>;
}
