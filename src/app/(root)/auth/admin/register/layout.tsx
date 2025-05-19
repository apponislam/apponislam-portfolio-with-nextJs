import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }

    return <>{children}</>;
}
