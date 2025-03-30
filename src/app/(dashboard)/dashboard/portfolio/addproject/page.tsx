import ProjectForm from "@/components/forms/project-form";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/utils/authOptions";
import { Undo2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const page = async () => {
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
            <div className="w-1/2 block mx-auto my-4">
                {/* <ProjectForm></ProjectForm> */}
                <ProjectForm id={id ?? ""}></ProjectForm>
            </div>
        </div>
    );
};

export default page;
