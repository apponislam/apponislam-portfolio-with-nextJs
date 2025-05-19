import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSkills } from "@/components/actions/skill-actions";
import SkillsCard2 from "@/components/skills-card2";
import { PlusCircle } from "lucide-react";

const SkillsPage = async () => {
    let skills = [];
    let error = null;

    try {
        skills = await getSkills();
    } catch (err) {
        console.error("Failed to load skills:", err);
        error = err instanceof Error ? err.message : "Failed to load skills";
    }

    const hasSkills = skills.length > 0;

    return (
        <div className="flex flex-col gap-6 p-3 md:p-6">
            {/* Header section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Skills Dashboard</h1>
                    <p className="text-muted-foreground">{hasSkills ? "Manage your technical skills" : "No skills found"}</p>
                </div>
                <Link href="/dashboard/skills/addskill">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Skill
                    </Button>
                </Link>
            </div>

            {/* Divider */}
            <div className="border-b" />

            {/* Error state */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                    <p>Error loading skills: {error}</p>
                    <p className="text-sm mt-2">Please check your API connection and try again</p>
                </div>
            )}

            {/* Skills Card or Empty State */}
            {!error && (
                <>
                    {hasSkills ? (
                        <div className="mt-4">
                            <SkillsCard2 skills={skills} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-medium">No skills available</h3>
                                <p className="text-sm text-muted-foreground">{error ? "Couldn't connect to skills server" : "Get started by adding your first skill"}</p>
                            </div>
                            <Link href="/dashboard/skills/addskill">
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create First Skill
                                </Button>
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SkillsPage;
