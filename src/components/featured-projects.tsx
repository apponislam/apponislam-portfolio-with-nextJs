"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import ProjectCard from "./project-card";
import { pagesConfig } from "./config/pages";
import { ProjectsInterface } from "./config/projects";
import { useGetPublicProjectsQuery } from "@/redux/features/projects/projectApi";

export function FeaturedProjects() {
    const { data, isLoading, isError } = useGetPublicProjectsQuery({ page: 1, limit: 3 });
    const featuredProjects: ProjectsInterface[] = data?.data ?? [];

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="border rounded-lg p-4 animate-pulse bg-muted">
                        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
                        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    if (isError || featuredProjects.length === 0) {
        return <p className="text-center text-red-500">No projects found.</p>;
    }

    return (
        <section id="projects" className="md:container space-y-6 dark:bg-transparent py-10 my-14">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{pagesConfig.projects.title}</h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">{pagesConfig.projects.description}</p>
            </div>

            <div className="mx-auto grid justify-center gap-4 md:w-full lg:grid-cols-3 2xl:w-[1200px]">
                {featuredProjects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>

            <Link href="/projects" className="flex justify-center">
                <Button variant="outline" className="rounded-xl">
                    <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                </Button>
            </Link>
        </section>
    );
}
