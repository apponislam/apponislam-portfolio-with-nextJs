import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { pagesConfig } from "@/components/config/pages";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata: Metadata = {
    title: "Projects",
    description: "Examples of cards built using the components.",
};

export default function ProjectsPage() {
    return (
        <>
            <PageHeader title={pagesConfig.projects.title} description={pagesConfig.projects.description} />
            <ProjectsClient />
        </>
    );
}
