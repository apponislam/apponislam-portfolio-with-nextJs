"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { getSkillById } from "@/components/actions/skill-actions";
import { SkillUpdateForm } from "./update-skill-form";
import Head from "next/head";

export default function SkillEditPage() {
    const params = useParams<{ skillId: string }>();
    const router = useRouter();
    const [skill, setSkill] = useState<{
        _id: string;
        name: string;
        description: string;
        rating: number;
        icon: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                if (!params.skillId) {
                    throw new Error("Skill ID is missing");
                }

                const data = await getSkillById(params.skillId);
                setSkill(data);
            } catch (err) {
                console.error("Error fetching skill:", err);
                setError(err instanceof Error ? err.message : "Failed to load skill");
            } finally {
                setLoading(false);
            }
        };

        fetchSkill();
    }, [params.skillId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 h-64">
                <div className="text-red-500">{error}</div>
                <Button onClick={() => router.push("/dashboard/skills")}>Back to Skills</Button>
            </div>
        );
    }

    if (!skill) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 h-64">
                <div>Skill not found</div>
                <Button onClick={() => router.push("/dashboard/skills")}>Back to Skills</Button>
            </div>
        );
    }
    return (
        <div className="p-6">
            <Head>
                <title>{skill ? `Edit Skill: ${skill.name}` : "Edit Skill"}</title>
                <meta name="description" content={skill ? `Update details for the skill: ${skill.name}` : "Edit skill details"} />
            </Head>
            <h1 className="text-2xl font-bold mb-6">Edit Skill</h1>
            <SkillUpdateForm skill={skill} />
        </div>
    );
}
