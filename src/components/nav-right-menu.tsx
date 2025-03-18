import { ModeToggle } from "./mode-toggle";
import { CircleUserRound, LayoutDashboard, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Image from "next/image";
import SignOutBtn from "./sign-out-button";
import Link from "next/link";

const NavRightMenu = async () => {
    const session = await getServerSession(authOptions);
    // console.log(session?.user);

    return (
        <nav className="flex items-center gap-4">
            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="flex items-center p-1 rounded-full h-10 w-10">{session?.user?.image ? <Image src={session.user.image} alt={session.user.name ?? "User"} width={32} height={32} className="rounded-full" /> : <CircleUserRound style={{ height: "32px", width: "32px" }} />}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href="/dashboard">
                                <DropdownMenuItem>
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/dashboard/profile">
                                <DropdownMenuItem>
                                    <User />
                                    <span>Profile</span>
                                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                        <SignOutBtn></SignOutBtn>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <></>
            )}
            <ModeToggle />
        </nav>
    );
};

export default NavRightMenu;
