"use server";

import { revalidatePath } from "next/cache";

export async function updateBlogPost({ id, data }: { id: string; data: any }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to update blog post");
        }

        revalidatePath("/dashboard/blogs");
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}

export async function createBlogPost(data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to create blog post");
        }

        revalidatePath("/dashboard/blogs");
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}

export async function fetchBlogs() {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/blog`, {
            next: { tags: ["blogs"] }, // For cache tagging
            cache: "no-store", // Or your preferred caching strategy
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch blogs",
            data: [], // Return empty array as fallback
        };
    }
}

export async function deleteBlogPost(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete blog post");
        }

        revalidatePath("/dashboard/blogs");
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
