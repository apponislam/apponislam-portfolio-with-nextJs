"use server";

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
