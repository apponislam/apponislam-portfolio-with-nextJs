import ProjectsList from "@/components/ProjectsList";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Portfolio Management",
    description: "Control and update your portfolio items to showcase your work effectively.",
};

export default async function Page() {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-end mb-4">
                <Link href="/dashboard/portfolio/addproject">
                    <Button>
                        <SquarePlus className="mr-2 h-4 w-4" />
                        Add to portfolio
                    </Button>
                </Link>
            </div>

            <h1 className="text-4xl text-center uppercase font-extralight underline">Portfolio</h1>

            {/* Client Component handles fetching & re-fetching */}
            <ProjectsList />
        </div>
    );
}
