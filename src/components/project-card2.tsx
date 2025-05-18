"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ProjectsInterface } from "./config/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { deleteProjectPage } from "./actions/portfolio-actions";

export function ProjectCard2({ project }: { project: ProjectsInterface }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleEdit = () => router.push(`/dashboard/portfolio/${project._id}/edit`);

    const handleDeleteConfirmed = async () => {
        const result = await deleteProjectPage(project._id);
        if (result.success) {
            router.refresh();
        } else {
            console.error(result.error);
        }
        setOpen(false);
    };

    return (
        <>
            <Card className="hover:shadow-lg relative transition-shadow overflow-hidden h-full pt-0">
                <div className="relative w-full rounded-2xl p-6 pb-0">
                    <div className="relative w-full h-[200px]">
                        <Image className="rounded-lg border border-gray-200 dark:border-gray-700 object-cover" src={project.companyLogoImg} alt="img" fill />
                    </div>
                    <Badge variant="secondary" className="absolute left-10 top-10">
                        {project.type}
                    </Badge>
                </div>

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

                            <div className="dark:border-gray-700 rounded-full bg-white border dark:bg-gray-950 border-gray-200 absolute top-8 right-8">
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
                                        <DropdownMenuItem onClick={() => setOpen(true)} className="text-red-600 focus:text-red-600">
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

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete this project?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">This action cannot be undone. Are you sure you want to permanently delete {project.companyName} project?</p>
                    <DialogFooter className="mt-4">
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirmed}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
