"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/project-card";
import { cn } from "@/lib/utils";
import { useGetPublicProjectsQuery } from "@/redux/features/projects/projectApi";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { File } from "lucide-react";

function ProjectContainer({ className, children }: React.PropsWithChildren<{ className?: string }>) {
    return <div className={cn("flex items-center justify-center mb-4 md:mb-0 [&>div]:w-full", className)}>{children}</div>;
}

// Skeleton loader for tab headers
function TabsSkeleton() {
    return (
        <div className="flex gap-4 mb-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={cn("h-8 w-20 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse")} />
            ))}
        </div>
    );
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

export default function ProjectsClient() {
    const { data: resData, isLoading } = useGetPublicProjectsQuery();

    // access actual projects array
    const projects = resData?.data || [];

    const renderContent = (tabVal: string) => {
        let filtered = projects;

        if (tabVal === "personal") {
            filtered = projects.filter((p: any) => p.type === "Personal Project");
        } else if (tabVal === "professional") {
            filtered = projects.filter((p: any) => p.type === "Professional");
        }

        if (filtered.length === 0) {
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
            <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                {filtered.map((proj: any) => (
                    <ProjectContainer key={proj._id}>
                        <ProjectCard project={proj} />
                    </ProjectContainer>
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div>
                <TabsSkeleton />
                <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ProjectContainer key={i}>
                            <ProjectSkeleton />
                        </ProjectContainer>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList className="container grid max-w-[30rem] grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
            </TabsList>

            <div className="2xl:w-[1336px] mx-auto">
                <TabsContent value="all">{renderContent("all")}</TabsContent>
                <TabsContent value="personal">{renderContent("personal")}</TabsContent>
                <TabsContent value="professional">{renderContent("professional")}</TabsContent>
            </div>
        </Tabs>
    );
}
