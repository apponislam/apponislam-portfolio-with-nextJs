"use client";
import SkillsCard from "@/components/skills-card";
import { useGetAllSkillsQuery } from "@/redux/features/skills/skillApi";

export default function SkillsClient() {
    const { data, error, isLoading } = useGetAllSkillsQuery();
    console.log(data);

    const skills = data?.data ?? [];

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground animate-pulse">Loading skills...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800 max-w-4xl mx-auto">
                <p>Error loading skills</p>
                <p className="text-sm mt-2">Please try refreshing the page or check back later</p>
            </div>
        );
    }

    if (!skills.length) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No skills are currently displayed</p>
            </div>
        );
    }

    return <SkillsCard skills={skills} />;
}
