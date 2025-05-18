import { BlogPostForm } from "@/components/forms/blog-form";
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
                <Link href="/dashboard/blogs">
                    <Button>
                        <Undo2 />
                        Back
                    </Button>
                </Link>
            </div>
            <div className="xl:w-1/2 block mx-auto my-4">
                <BlogPostForm authorId={id ?? ""}></BlogPostForm>
            </div>
        </div>
    );
};

export default page;
