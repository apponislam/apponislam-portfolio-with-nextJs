import { BlogPostUpdateForm } from "@/components/forms/update-blog-form";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

interface BlogData {
    _id: string;
    title: string;
    type: "Technical" | "Tutorial" | "Opinion" | "Case Study";
    categories: string[];
    tags: string[];
    coverImage: string;
    contentDetails: {
        paragraphs: string[];
        keyPoints: string[];
        codeSnippets: Array<{
            language: string;
            code: string;
        }>;
    };
    sections: Array<{
        title: string;
        images: string[];
        content: string;
        subsections: Array<{
            title: string;
            text: string;
        }>;
    }>;
    externalLinks?: Array<{
        label: string;
        url: string;
    }>;
    repositoryUrl?: string;
}

// interface ApiResponse {
//     success: boolean;
//     message: string;
//     data: BlogData;
// }

export default async function UpdateBlogPage({ params }: { params: Promise<{ blogId: string }> }) {
    let blogData: BlogData | null = null;
    let error = null;
    const session = await getServerSession(authOptions);
    const id = session?.user?._id;
    const { blogId } = await params;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/${blogId}`, {
            next: { tags: [`blog-${blogId}`] },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch blog data");
        }

        const result = await response.json();

        blogData = result.data;
    } catch (err) {
        console.error("Error fetching blog data:", err);
        error = err instanceof Error ? err.message : "Failed to load blog data";
        console.log(error);
    }

    if (!blogData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-muted-foreground">Blog not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <BlogPostUpdateForm authorId={id ?? ""} blogData={blogData} />
        </div>
    );
}
