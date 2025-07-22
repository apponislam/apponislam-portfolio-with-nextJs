"use server";

export async function getFeaturedProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }

        const response = await res.json();

        return response.data.slice(0, 3);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export async function getProjectById(projectId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${projectId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch project");
        }

        const data = await response.json();
        return data.data; // Assuming your API returns { data: {...} }
    } catch (error) {
        console.error("Error fetching project:", error);
        throw error;
    }
}
