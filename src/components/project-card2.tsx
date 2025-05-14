// components/project-card2.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ProjectsInterface } from "./config/projects";

export function ProjectCard2({ project }: { project: ProjectsInterface }) {
    const router = useRouter();

    const handleEdit = () => router.push(`/dashboard/portfolio/${project._id}/edit`);

    const handleDelete = async () => {
        if (confirm("Permanently delete this project?")) {
            await fetch(`/api/projects/${project._id}`, { method: "DELETE" });
            router.refresh();
        }
    };

    return (
        <Card className="hover:shadow-lg relative transition-shadow overflow-hidden h-full pt-0">
            <div className="relative w-full rounded-2xl p-6 pb-0">
                <div className="relative w-full h-[200px]">
                    <Image className="rounded-lg border border-gray-200  dark:border-gray-700 object-cover" src={project.companyLogoImg} alt="img" fill />
                </div>
                <Badge variant="secondary" className="absolute left-10 top-10">
                    {project.type}
                </Badge>
            </div>

            {/* Card Content */}

            <div className="flex flex-col h-full">
                <div className="flex-1">
                    <CardHeader className="mb-3">
                        <CardTitle className="text-xl">{project.companyName}</CardTitle>
                        <CardDescription className="line-clamp-2">{project.shortDescription}</CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-2 mb-3">
                        <div className="flex flex-wrap gap-2">
                            {project.category.map((cat) => (
                                <Badge key={cat} variant="outline">
                                    {cat}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                            {project.techStack.slice(0, 4).map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </div>
                <div>
                    <CardFooter className="flex justify-between">
                        <Link href={`/dashboard/portfolio/${project._id}`}>
                            <Button variant={"default"} className="mt-2">
                                Read more
                                <Icons.chevronRight className="w-4 ml-1" />
                            </Button>
                        </Link>

                        <div className=" dark:border-gray-700 rounded-full  bg-white border dark:bg-gray-950 border-gray-200  absolute top-8 right-8">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                        <Icons.moreVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleEdit}>
                                        <Icons.edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                                        <Icons.trash className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}
