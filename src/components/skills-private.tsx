"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SkillsCard2 from "@/components/skills-card2";
import { useGetAllSkillsQuery } from "@/redux/features/skills/skillApi";
import { PlusCircle } from "lucide-react";

export default function SkillsDashboardClient() {
    const { data, error, isLoading } = useGetAllSkillsQuery();

    const skills = data?.data ?? [];
    const hasSkills = skills.length > 0;

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground animate-pulse">Loading skills...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                <p>Error loading skills</p>
                <p className="text-sm mt-2">Please check your API connection and try again</p>
            </div>
        );
    }

    if (!hasSkills) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-medium">No skills available</h3>
                    <p className="text-sm text-muted-foreground">Get started by adding your first skill</p>
                </div>
                <Link href="/dashboard/skills/addskill">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create First Skill
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <SkillsCard2 skills={skills} />
        </div>
    );
}
