"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CalendarDays, Clock, FileText } from "lucide-react";
import { Icons } from "@/components/icons";
import { formatDate } from "@/lib/utils";
import { deleteBlogPost } from "./actions/blog-actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface BlogCardProps {
    blog: {
        _id: string;
        title: string;
        type: "Technical" | "Tutorial" | "Opinion" | "Case Study";
        categories: string[];
        coverImage: string;
        contentDetails: {
            paragraphs: string[];
            keyPoints: string[];
        };
        createdAt: string;
        updatedAt: string;
    };
}

export function BlogCard({ blog }: BlogCardProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleEdit = () => router.push(`/dashboard/blogs/${blog._id}/edit`);

    const handleDeleteConfirmed = async () => {
        const result = await deleteBlogPost(blog._id);
        if (result.success) {
            router.refresh();
        } else {
            console.error(result.error);
        }
        setOpen(false);
    };

    const wordCount = blog.contentDetails.paragraphs.join(" ").split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return (
        <>
            <Card className="h-full flex flex-col p-0 relative hover:shadow-lg transition-shadow">
                {/* Dropdown Actions */}
                <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-950 rounded-full border border-gray-200 dark:border-gray-700">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                <Icons.moreVertical className="h-4 w-4" />
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

                <CardHeader className="p-0">
                    <div className="relative aspect-video w-full">
                        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover rounded-t-lg" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                </CardHeader>

                <CardContent className="flex-grow p-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{blog.type}</Badge>
                        {blog.categories.map((category) => (
                            <Badge key={category} variant="outline">
                                {category}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{blog.contentDetails.paragraphs[0]}</p>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/blogs/${blog._id}`}>
                            <FileText className="h-4 w-4 mr-2" />
                            Read
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete this blog post?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">This action cannot be undone. Are you sure you want to permanently delete “{blog.title}”?</p>
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
