"use server";

import { revalidatePath } from "next/cache";

export async function getProjects() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const url = `${baseUrl}/api/v1/project`;

        const res = await fetch(url, {
            next: {
                revalidate: 60, // 60 seconds cache
                tags: ["projects"],
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch projects (Status: ${res.status})`);
        }

        const response = await res.json();

        // Handle cases where response.data might be undefined
        return {
            success: true,
            data: response.data || response || [],
        };
    } catch (error) {
        console.error("Fetch Projects Error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Network error",
            data: [],
        };
    }
}

export async function updateProject(projectId: string, payload: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();

        if (response.ok) {
            revalidatePath("/dashboard/portfolio"); // Adjust path as needed
            return { success: true, data: responseData };
        } else {
            return {
                success: false,
                error: responseData.message || "Failed to update project.",
            };
        }
    } catch (error) {
        console.error("Error updating project:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unexpected error",
        };
    }
}

export async function deleteProjectPage(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete blog post");
        }

        revalidatePath("/dashboard/portfolio");
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
