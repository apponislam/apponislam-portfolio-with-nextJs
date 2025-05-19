import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ExternalLink, Github, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

async function getBlogPost(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/${id}`);
    if (!res.ok) return null;
    return res.json();
}

type Params = Promise<{ blogId: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
    const { blogId } = await params;
    const { data: blog } = await getBlogPost(blogId);

    if (!blog) return notFound();

    // Calculate read time
    const wordCount = blog.contentDetails.paragraphs.join(" ").split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return (
        <div className="container max-w-4xl py-8 mx-auto space-y-6">
            {/* Back Button and Action Buttons */}
            <div className="flex items-center justify-between">
                <Button asChild variant="ghost">
                    <Link href="/dashboard/blogs" className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Blogs
                    </Link>
                </Button>
            </div>

            <Card className="border-0 shadow-none">
                <CardHeader className="p-0 pb-6">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-6">
                        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" priority />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="capitalize">
                            {blog.type}
                        </Badge>
                        {blog.categories.map((category: string) => (
                            <Badge key={category} variant="outline">
                                {category}
                            </Badge>
                        ))}
                    </div>

                    <CardTitle className="text-3xl font-bold tracking-tight">{blog.title}</CardTitle>

                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={blog.authorId.image} />
                                <AvatarFallback>{blog.authorId.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{blog.authorId.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0 py-6 space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Key Points</h2>
                        <ul className="space-y-2 list-disc pl-6">
                            {blog.contentDetails.keyPoints.map((point: string, i: number) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    {blog.contentDetails.paragraphs.map((para: string, i: number) => (
                        <p key={i} className="leading-relaxed">
                            {para}
                        </p>
                    ))}

                    {blog.sections.map((section: any, i: number) => (
                        <div key={i} className="space-y-4">
                            <h3 className="text-xl font-semibold">{section.title}</h3>
                            {section.content && <p className="leading-relaxed">{section.content}</p>}

                            {section.subsections?.map((subsection: any, j: number) => (
                                <div key={j} className="ml-4 space-y-2">
                                    <h4 className="text-lg font-medium">{subsection.title}</h4>
                                    <p className="leading-relaxed">{subsection.text}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </CardContent>

                <CardFooter className="p-0 pt-6 flex flex-wrap gap-2">
                    {blog.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                            #{tag}
                        </Badge>
                    ))}

                    {blog.repositoryUrl && (
                        <Button asChild variant="outline" className="gap-2">
                            <Link href={blog.repositoryUrl} target="_blank">
                                <Github className="h-4 w-4" />
                                View Repository
                            </Link>
                        </Button>
                    )}

                    {blog.externalLinks?.map((link: any) => (
                        <Button key={link.url} asChild variant="outline" className="gap-2">
                            <Link href={link.url} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                                {link.label}
                            </Link>
                        </Button>
                    ))}
                </CardFooter>
            </Card>
        </div>
    );
}
