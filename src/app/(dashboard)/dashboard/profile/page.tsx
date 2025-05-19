// app/profile/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Separator } from "@radix-ui/react-separator";
import { Icons } from "@/components/icons";
import { ReactElement } from "react";
import { CalendarIcon } from "lucide-react";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        return <div className="flex justify-center py-8">Please sign in to view your profile</div>;
    }

    // Fetch user data from API route
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${session.user._id}`, {
        cache: "no-store",
    });

    console.log(res);

    if (!res.ok) {
        return <div className="flex justify-center py-8">Error loading profile</div>;
    }

    const { user } = await res.json();

    type Provider = "Email" | "Google" | "Github";

    const providerIcons: Record<Provider, ReactElement> = {
        Email: <Icons.gmail className="h-4 w-4" />,
        Google: <Icons.google className="h-4 w-4" />,
        Github: <Icons.gitHub className="h-4 w-4" />,
    };

    const provider = (user.provider || "Email") as Provider;
    const providerIcon = providerIcons[provider];

    return (
        <div className="container py-8 mx-auto">
            <div className="flex flex-col items-center mb-8">
                <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback>
                        {user.name
                            ?.split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    {providerIcon}
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
                        <Separator />
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Member since {format(new Date(user.createdAt), "MMMM yyyy")}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
