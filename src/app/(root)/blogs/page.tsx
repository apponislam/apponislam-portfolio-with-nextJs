import { BlogCard2 } from "@/components/blog-card2";
import { pagesConfig } from "@/components/config/pages";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

interface BlogInterface {
    _id: string;
    authorId: string; // Missing in your current interface
    title: string;
    type: "Technical" | "Tutorial" | "Opinion" | "Case Study";
    categories: ("Web Dev" | "Mobile" | "DevOps" | "Career" | "Productivity")[];
    tags: string[]; // Missing in your current interface
    coverImage: string;
    contentDetails: {
        paragraphs: string[];
        keyPoints: string[];
        codeSnippets?: {
            // Missing in your current interface
            language: string;
            code: string;
        }[];
    };
    sections: {
        // Missing in your current interface
        title: string;
        images: string[];
        content?: string;
        subsections?: {
            title: string;
            text: string;
        }[];
    }[];
    externalLinks?: {
        // Missing in your current interface
        label: string;
        url: string;
    }[];
    repositoryUrl?: string; // Missing in your current interface
    createdAt: string;
    updatedAt: string;
}

export const metadata: Metadata = {
    title: "Blogs",
    description: "Read insights, tutorials, and case studies crafted by our team.",
};

async function getBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog`, {
        next: { revalidate: 2 },
    });
    console.log(res);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const response = await res.json();
    return response.data;
}

function BlogContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex items-center justify-center mb-4 md:mb-0 [&>div]:w-full", className)} {...props} />;
}

const ContactPage = async () => {
    const blogs: BlogInterface[] = await getBlogs();

    return (
        <div>
            <PageHeader title={pagesConfig.blog.title} description={pagesConfig.blog.description} />
            <div className="flex justify-center min-w-full">
                <div className="w-full overflow-hidden">
                    <div className="container w-full items-start justify-center gap-6 rounded-lg pt-8 p-0 md:p-8 sm:grid lg:grid-cols-2 xl:grid-cols-3 xl:px:20 2xl:px-40 mx-auto">
                        {blogs.map((blog) => (
                            <BlogContainer key={blog._id} className="h-full">
                                <BlogCard2 blog={blog} />
                            </BlogContainer>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
