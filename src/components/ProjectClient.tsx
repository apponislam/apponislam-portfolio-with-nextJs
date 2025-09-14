"use client";

import React from "react";
import ProjectsDescription from "@/components/exp-desc";
import ChipContainer from "@/components/chip-container";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDateFromObj } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import apponislam from "../../public/apponislam.png";
import CustomTooltip from "@/components/custom-tooltips";
import { useGetProjectByIdQuery } from "@/redux/features/projects/projectApi";

interface ProjectClientProps {
    expId: string;
}

export default function ProjectClient({ expId }: ProjectClientProps) {
    const { data: response, isLoading, error } = useGetProjectByIdQuery(expId);

    const exp = response?.data;

    console.log(exp);

    if (isLoading) return <p>Loading...</p>;
    if (error || !exp) return <p>Error loading project</p>;

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10 mx-auto">
            {/* Back link */}
            <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }), "absolute left-[-200px] top-14 hidden xl:inline-flex")}>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                All Projects
            </Link>

            {/* Header */}
            <div>
                <time dateTime={Date.now().toString()} className="block text-sm text-muted-foreground">
                    {formatDateFromObj(exp.startDate)}
                </time>
                <h1 className="flex items-center justify-between mt-2 font-heading text-4xl leading-tight lg:text-5xl">
                    {exp.companyName}
                    <div className="flex items-center">
                        {exp.githubLink && (
                            <CustomTooltip text="Link to the source code.">
                                <Link href={exp.githubLink} target="_blank">
                                    <Icons.gitHub className="w-6 ml-4 text-muted-foreground hover:text-foreground" />
                                </Link>
                            </CustomTooltip>
                        )}
                        {exp.websiteLink && (
                            <CustomTooltip text="Please note that some project links may be temporarily unavailable.">
                                <Link href={exp.websiteLink} target="_blank">
                                    <Icons.externalLink className="w-6 ml-4 text-muted-foreground hover:text-foreground" />
                                </Link>
                            </CustomTooltip>
                        )}
                    </div>
                </h1>

                <ChipContainer textArr={exp.category || []} />

                {/* Author */}
                <div className="mt-4 flex space-x-4">
                    <Link href={`https://github.com/apponislam`} className="flex items-center space-x-2 text-sm">
                        <Image src={apponislam} alt="Appon" width={42} height={42} className="rounded-full bg-white" />
                        <div className="flex-1 text-left leading-tight">
                            <p className="font-medium">Appon Islam</p>
                            <p className="text-[12px] text-muted-foreground">@apponislam</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Company Logo */}
            {exp.companyLogoImg && <Image src={exp.companyLogoImg} alt={exp.companyName} width={720} height={405} className="my-8 rounded-md border bg-muted transition-colors" priority />}

            {/* Tech Stack */}
            <div className="mb-7">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">Tech Stack</h2>
                <ChipContainer textArr={exp.techStack || []} />
            </div>

            {/* Description */}
            <div className="mb-7">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">Description</h2>
                <ProjectsDescription paragraphs={exp.descriptionDetails?.paragraphs || []} bullets={exp.descriptionDetails?.bullets || []} />
            </div>

            {/* Page Info */}
            <div className="mb-7">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-5">Page Info</h2>
                {exp.pagesInfoArr?.map((page, ind) => (
                    <div key={ind}>
                        <h3 className="flex items-center font-heading text-xl leading-tight lg:text-xl mt-3">
                            <Icons.star className="h-5 w-5 mr-2" /> {page.title}
                        </h3>
                        <div>
                            <p>{page.description}</p>
                            {page.imgArr?.map((img, idx) => (
                                <Image src={img} key={idx} alt={img} width={720} height={405} className="my-4 rounded-md border bg-muted transition-colors" priority />
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
