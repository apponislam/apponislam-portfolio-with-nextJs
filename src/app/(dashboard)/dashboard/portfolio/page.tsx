import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

const page = () => {
    return (
        <div>
            <div className="flex items-center justify-end">
                <Link href="/dashboard/portfolio/addproject">
                    <Button>
                        <SquarePlus />
                        Add to portfolio
                    </Button>
                </Link>
            </div>
            <h1>Portfolio</h1>
        </div>
    );
};

export default page;
