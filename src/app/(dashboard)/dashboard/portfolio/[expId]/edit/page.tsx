import ProjectUpdateForm from "@/components/forms/update-project-form";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/utils/authOptions";
import { Undo2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Params = Promise<{ expId: string }>;

const Page = async ({ params }: { params: Params }) => {
    const { expId } = await params;
    const session = await getServerSession(authOptions);
    const id = session?.user._id;

    return (
        <div>
            <div className="flex items-center justify-start">
                <Link href="/dashboard/portfolio">
                    <Button>
                        <Undo2 />
                        Back
                    </Button>
                </Link>
            </div>
            <div className="xl:w-1/2 block mx-auto my-4">
                <ProjectUpdateForm id={id ?? ""} projectId={expId} />
            </div>
        </div>
    );
};

export default Page;
