"use client";

import { useGetPublicProjectsQuery } from "@/redux/features/projects/projectApi";
import { ProjectCard2 } from "@/components/project-card2";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { File } from "lucide-react";

function ProjectContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex items-center justify-center mb-4 md:mb-0 [&>div]:w-full", className)} {...props} />;
}

// Skeleton loader for project cards
function ProjectSkeleton() {
    return (
        <div className="relative p-6 max-w-sm bg-gray-200/20 dark:bg-gray-800 border border-gray-300/10 dark:border-gray-700 rounded-lg animate-pulse">
            <div className="w-full h-[200px] bg-gray-300/30 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-300/30 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-300/20 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-300/20 dark:bg-gray-700 rounded"></div>
        </div>
    );
}

export default function ProjectsList() {
    const { data, isLoading, error } = useGetPublicProjectsQuery();
    const projects = data?.data || [];

    if (isLoading) {
        return (
            <div>
                <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ProjectContainer key={i}>
                            <ProjectSkeleton />
                        </ProjectContainer>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-10">
                <p>⚠️ Failed to load portfolio projects</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="container py-12 flex justify-center">
                <Card className="max-w-sm w-full border-dashed border-gray-300 dark:border-gray-700">
                    <CardContent className="text-center space-y-2">
                        <File className="mx-auto h-12 w-12 text-gray-400" />
                        <CardTitle className="text-lg font-semibold leading-snug">No Projects Found</CardTitle>
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">There are no projects in this category at the moment. Please check back later.</CardDescription>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden">
            <div className="container w-full items-start justify-center gap-6 rounded-lg pt-8 p-0 md:p-8 sm:grid lg:grid-cols-2 xl:grid-cols-3 xl:px-20 2xl:px-40 mx-auto">
                {projects.map((proj: any) => (
                    <ProjectContainer key={proj._id} className="h-full">
                        <ProjectCard2 project={proj} />
                    </ProjectContainer>
                ))}
            </div>
        </div>
    );
}
