"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function getSkills() {
    try {
        const response = await fetch("http://localhost:5000/api/v1/skills", {
            method: "GET",
            next: { tags: ["skills"] },
        });

        // Handle 404 specifically - treat as empty data
        if (response.status === 404) {
            return [];
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result?.data || []; // Safely return data or empty array
    } catch (error) {
        console.error("Error fetching skills:", error);
        return []; // Return empty array instead of throwing
    }
}

export async function getSkillById(skillId: string) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/skills/${skillId}`);
        if (!response.ok) throw new Error("Failed to fetch skill");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching skill:", error);
        throw error;
    }
}

export async function createSkill(formData: FormData) {
    try {
        const rawData = Object.fromEntries(formData.entries());
        const data = {
            ...rawData,
            rating: Number(rawData.rating),
        };

        const response = await fetch("http://localhost:5000/api/v1/skills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        revalidateTag("skills");
        revalidatePath("/dashboard/skills");

        return await response.json();
    } catch (error) {
        console.error("Error creating skill:", error);
        throw error;
    }
}

// Delete Skill Action
export async function deleteSkill(skillId: string) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/skills/${skillId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        revalidateTag("skills");
        revalidatePath("/dashboard/skills");

        return {
            success: true,
            message: "Skill deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting skill:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete skill",
        };
    }
}

// Update Skill Action (PATCH)
export async function updateSkill(skillId: string, formData: FormData) {
    try {
        const rawData = Object.fromEntries(formData.entries());
        const data = {
            ...rawData,
            rating: rawData.rating ? Number(rawData.rating) : undefined,
        };

        const response = await fetch(`http://localhost:5000/api/v1/skills/${skillId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        revalidateTag("skills");
        revalidatePath("/dashboard/skills");

        const result = await response.json();
        return {
            success: true,
            data: result.data,
        };
    } catch (error) {
        console.error("Error updating skill:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update skill",
        };
    }
}
