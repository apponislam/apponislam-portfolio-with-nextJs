import { pagesConfig } from "@/components/config/pages";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";
// import { Projects } from "@/components/config/projects";
import ProjectCard from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsInterface } from "@/components/config/projects";

export const metadata: Metadata = {
    title: "Projects",
    description: "Examples of cards built using the components.",
};

function ProjectContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex items-center justify-center mb-4 md:mb-0 [&>div]:w-full ", className)} {...props} />;
}

async function getProjects() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project`, {
        next: { revalidate: 2 },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    const response = await res.json();
    return response.data; // Extract the array from the response
}

const renderContent = async (tabVal: string) => {
    // let expArr = Projects;
    // console.log(expArr);

    let expArr: ProjectsInterface[] = await getProjects();
    // console.log(expArr);

    if (tabVal === "personal") {
        expArr = expArr.filter((val) => val.type === "Personal Project");
    } else if (tabVal === "professional") {
        expArr = expArr.filter((val) => val.type === "Professional");
    }

    return (
        <div className="container items-start justify-center gap-6 rounded-lg pt-8 p-0 md:p-8 sm:grid md:grid-cols-2 lg:grid-cols-3">
            {expArr.map((exp) => (
                <ProjectContainer key={exp._id}>
                    <ProjectCard project={exp} />
                </ProjectContainer>
            ))}
        </div>
    );
};

const ProjectsPage = () => {
    return (
        <>
            <PageHeader title={pagesConfig.projects.title} description={pagesConfig.projects.description} />
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="conatiner grid max-w-[30rem] grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="professional">Professional</TabsTrigger>
                </TabsList>
                <div className="2xl:w-[1336px] mx-auto">
                    <TabsContent value="all" className="w-full">
                        {renderContent("all")}
                    </TabsContent>
                    <TabsContent value="professional">{renderContent("professional")}</TabsContent>
                    <TabsContent value="personal">{renderContent("personal")}</TabsContent>
                </div>
            </Tabs>
        </>
    );
};

export default ProjectsPage;
