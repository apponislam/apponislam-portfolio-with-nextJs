import { getProjects } from "@/components/actions/portfolio-actions";
import { ProjectsInterface } from "@/components/config/projects";
import { ProjectCard2 } from "@/components/project-card2";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Portfolio Management",
    description: "Control and update your portfolio items to showcase your work effectively.",
};

function ProjectContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex items-center justify-center mb-4 md:mb-0 [&>div]:w-full", className)} {...props} />;
}

const page = async () => {
    const { success, data: expArr, error } = await getProjects();

    if (!success) {
        return (
            <div className="text-center text-red-500 mt-10">
                <p>⚠️ Failed to load portfolio projects</p>
                <p className="text-sm text-muted-foreground mt-2">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-end mb-4">
                <Link href="/dashboard/portfolio/addproject">
                    <Button>
                        <SquarePlus className="mr-2 h-4 w-4" />
                        Add to portfolio
                    </Button>
                </Link>
            </div>
            <h1 className="text-4xl text-center uppercase font-extralight underline">Portfolio</h1>

            <div className="w-full overflow-hidden">
                <div className="container w-full items-start justify-center gap-6 rounded-lg pt-8 p-0 md:p-8 sm:grid lg:grid-cols-2 xl:grid-cols-3 xl:px-20 2xl:px-40 mx-auto">
                    {expArr.map((exp: ProjectsInterface) => (
                        <ProjectContainer key={exp._id} className="h-full">
                            <ProjectCard2 project={exp} />
                        </ProjectContainer>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
