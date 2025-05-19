"use server";

export async function getFeaturedProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project`, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }

        const response = await res.json();
        // Return first 3 projects
        return response.data.slice(0, 3);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return []; // Return empty array on error
    }
}
