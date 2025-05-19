import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SkillAddForm } from "@/components/forms/skill-add-form";

export default function AddSkillPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Add New Skill</h1>
                    <p className="text-muted-foreground">Fill in the details for your new skill</p>
                </div>
                <Link href="/dashboard/skills">
                    <Button variant="outline">Cancel</Button>
                </Link>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm container mx-auto">
                <SkillAddForm />
            </div>
        </div>
    );
}
