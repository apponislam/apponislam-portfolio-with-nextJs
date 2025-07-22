import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Manage Blogs",
    description: "Manage all your blog posts from one place.",
};

interface BlogInterface {
    _id: string;
    authorId: string;
    title: string;
    type: "Technical" | "Tutorial" | "Opinion" | "Case Study";
    categories: ("Web Dev" | "Mobile" | "DevOps" | "Career" | "Productivity")[];
    tags: string[];
    coverImage: string;
    contentDetails: {
        paragraphs: string[];
        keyPoints: string[];
        codeSnippets?: {
            language: string;
            code: string;
        }[];
    };
    sections: {
        title: string;
        images: string[];
        content?: string;
        subsections?: {
            title: string;
            text: string;
        }[];
    }[];
    externalLinks?: {
        label: string;
        url: string;
    }[];
    repositoryUrl?: string;
    createdAt: string;
    updatedAt: string;
}

function BlogContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex items-center justify-center mb-4 md:mb-0 [&>div]:w-full", className)} {...props} />;
}

async function getBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog`, {
        next: { revalidate: 2 },
    });
    console.log(res);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const response = await res.json();
    return response.data;
}

const page = async () => {
    const blogs: BlogInterface[] = await getBlogs();

    return (
        <div>
            <div className="flex items-center justify-end mb-4">
                <Link href="/dashboard/blogs/addblogs">
                    <Button>
                        <SquarePlus />
                        Add New Blog
                    </Button>
                </Link>
            </div>
            <h1 className="text-4xl text-center uppercase font-extralight underline">Blog Posts</h1>

            <div className="w-full overflow-hidden">
                <div className="container w-full items-start justify-center gap-6 rounded-lg pt-8 p-0 md:p-8 sm:grid lg:grid-cols-2 xl:grid-cols-3 xl:px:20 2xl:px-40 mx-auto">
                    {blogs.map((blog) => (
                        <BlogContainer key={blog._id} className="h-full">
                            <BlogCard blog={blog} />
                        </BlogContainer>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
