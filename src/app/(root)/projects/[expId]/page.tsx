import Link from "next/link";
import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate, optimizeCloudinaryUrl } from "@/lib/utils";
import apponislam from "../../../../../public/apponislam.png";
import ChipContainer from "@/components/chip-container";
import CustomTooltip from "@/components/custom-tooltips";
import ProjectsDescription from "@/components/exp-desc";
import { Projects, ProjectsInterface } from "@/components/config/projects";
import { Metadata } from "next";
import ProjectLinksDropdown from "@/components/project-links-dropdown";

type Props = {
    params: Promise<{ expId: string }>;
};

export async function generateStaticParams() {
    return Projects.map((project) => ({
        expId: project._id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { expId } = await params;
    const post = Projects.find((project) => project._id === expId);

    if (!post) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: post.companyName,
        description: post.shortDescription,
    };
}

type Params = Promise<{ expId: string }>;

const githubUsername = "apponislam";

async function getProjectById(expId: string) {
    const project = Projects.find((p) => p._id === expId);
    if (!project) {
        throw new Error("Failed to fetch project");
    }
    return project;
}

export default async function ProjectsPage({ params }: { params: Params }) {
    const { expId } = await params;

    let exp: ProjectsInterface;

    try {
        exp = await getProjectById(expId);
    } catch (err) {
        console.log(err);
        redirect("/projects");
    }

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10 mx-auto">
            <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }), "absolute left-[-200px] top-14 hidden xl:inline-flex")}>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                All Projects
            </Link>
            <div>
                <time dateTime={exp.startDate} className="block text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </time>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                    <h1 className="font-heading text-4xl leading-tight lg:text-5xl">{exp.companyName}</h1>
                    <ProjectLinksDropdown project={exp} />
                </div>

                <div className="mt-4">
                    <ChipContainer textArr={exp.category} />
                </div>

                <div className="mt-5 flex space-x-4 border-t border-muted pt-4">
                    <Link href={`https://github.com/${githubUsername}`} className="flex items-center space-x-2 text-sm">
                        <Image src={apponislam} alt={"Appon"} width={42} height={42} className="rounded-full bg-white" />
                        <div className="flex-1 text-left leading-tight">
                            <p className="font-medium">{"Appon Islam"}</p>
                            <p className="text-[12px] text-muted-foreground">@{githubUsername}</p>
                        </div>
                    </Link>
                </div>
            </div>

            <Image src={optimizeCloudinaryUrl(exp.companyLogoImg, 1000)} alt={exp.companyName} width={720} height={405} className="my-8 rounded-md border bg-muted transition-colors w-full" priority />

            <div className="mb-7 ">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">Tech Stack</h2>
                <ChipContainer textArr={exp.techStack} />
            </div>

            <div className="mb-7 ">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">Description</h2>
                <ProjectsDescription paragraphs={exp.descriptionDetails.paragraphs} bullets={exp.descriptionDetails.bullets} />
            </div>

            <div className="mb-7 ">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-5">Page Info</h2>
                {exp.pagesInfoArr.map((page, ind) => (
                    <div key={ind}>
                        <h3 className="flex items-center font-heading text-xl leading-tight lg:text-xl mt-3">
                            <Icons.star className="h-5 w-5 mr-2" /> {page.title}
                        </h3>
                        <div>
                            <p>{page.description}</p>
                            {page.imgArr.map((img, ind) => (
                                <Image src={optimizeCloudinaryUrl(img, 1000)} key={ind} alt={img} width={720} height={405} className="my-4 rounded-md border bg-muted transition-colors w-full" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
                <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }))}>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    All Projects
                </Link>
            </div>
        </article>
    );
}
