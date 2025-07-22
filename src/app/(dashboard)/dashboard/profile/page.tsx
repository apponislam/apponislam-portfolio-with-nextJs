import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Icons } from "@/components/icons";

export const metadata = {
    title: "Profile",
    description: "View and update your personal profile information from your dashboard.",
};

const ProviderIcons = {
    Email: () => <Icons.gmail className="h-4 w-4" />,
    Google: () => <Icons.google className="h-4 w-4" />,
    Github: () => <Icons.gitHub className="h-4 w-4" />,
};

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        return <div className="flex justify-center py-8">Please sign in to view your profile</div>;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${session.user._id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return <div className="flex justify-center py-8">Error loading profile</div>;
    }

    const { user } = await res.json();
    const ProviderIcon = ProviderIcons[user.provider as keyof typeof ProviderIcons] || ProviderIcons.Email;

    return (
        <div className="container py-8 mx-auto">
            <div className="flex flex-col items-center mb-8">
                <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback>
                        {user.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <ProviderIcon />
                    <span>Signed in with {user.provider}</span>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Member since {format(new Date(user.createdAt), "MMMM yyyy")}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
