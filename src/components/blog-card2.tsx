"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarDays, Clock, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

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

export function BlogCard2({ blog }: BlogCardProps) {
    const wordCount = blog.contentDetails.paragraphs.join(" ").split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return (
        <Card className="h-full flex flex-col p-0 relative hover:shadow-lg transition-shadow gap-0">
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
                    <Link href={`/blogs/${blog._id}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        Read
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
