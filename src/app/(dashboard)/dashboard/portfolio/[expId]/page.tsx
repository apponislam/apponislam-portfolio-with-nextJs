import Link from "next/link";
import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDateFromObj } from "@/lib/utils";
import apponislam from "../../../../../../public/apponislam.png";
import ChipContainer from "@/components/chip-container";
import CustomTooltip from "@/components/custom-tooltips";
import ProjectsDescription from "@/components/exp-desc";
import { ProjectsInterface } from "@/components/config/projects";

type Params = Promise<{ expId: string }>;

const githubUsername = "apponislam";

async function getProjectById(expId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${expId}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch project");
    }

    const response = await res.json();
    return response.data;
}

export default async function ProjectsPage({ params }: { params: Params }) {
    const { expId } = await params;

    let exp: ProjectsInterface;

    try {
        exp = await getProjectById(expId);
    } catch (err) {
        console.log(err);
        redirect("/dashboard/portfolio");
    }

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10 mx-auto">
            <Link href="/dashboard/portfolio" className={cn(buttonVariants({ variant: "ghost" }), "absolute left-[-200px] top-14 hidden xl:inline-flex")}>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                All Projects
            </Link>
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
                                    <Icons.externalLink className="w-6 ml-4 text-muted-foreground hover:text-foreground " />
                                </Link>
                            </CustomTooltip>
                        )}
                    </div>
                </h1>
                <ChipContainer textArr={exp.category} />
                <div className="mt-4 flex space-x-4">
                    <Link href={`https://github.com/${githubUsername}`} className="flex items-center space-x-2 text-sm">
                        <Image src={apponislam} alt={"Appon"} width={42} height={42} className="rounded-full bg-white" />

                        <div className="flex-1 text-left leading-tight">
                            <p className="font-medium">{"Appon Islam"}</p>
                            <p className="text-[12px] text-muted-foreground">@{githubUsername}</p>
                        </div>
                    </Link>
                </div>
            </div>

            <Image src={exp.companyLogoImg} alt={exp.companyName} width={720} height={405} className="my-8 rounded-md border bg-muted transition-colors" priority />

            <div className="mb-7 ">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">Tech Stack</h2>
                <ChipContainer textArr={exp.techStack} />
            </div>

            <div className="mb-7 ">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">Description</h2>
                {/* {<exp.descriptionComponent />} */}
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
                                <Image src={img} key={ind} alt={img} width={720} height={405} className="my-4 rounded-md border bg-muted transition-colors" priority />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
                <Link href="/dashboard/portfolio" className={cn(buttonVariants({ variant: "ghost" }))}>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    All Projects
                </Link>
            </div>
        </article>
    );
}
