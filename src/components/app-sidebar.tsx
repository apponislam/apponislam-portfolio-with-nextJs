import { GalleryHorizontalEnd, Home, Inbox, Package, Rss, User } from "lucide-react";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Manage Messages",
        url: "/dashboard/message",
        icon: Inbox,
    },
    {
        title: "Manage Portfolios",
        url: "/dashboard/portfolio",
        icon: GalleryHorizontalEnd,
    },
    {
        title: "Manage Blogs",
        url: "/dashboard/blogs",
        icon: Rss,
    },
    {
        title: "Manage Skills",
        url: "/dashboard/skills",
        icon: Package,
    },
    {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <Link href="/">
                        <SidebarGroupLabel>Appon Islam - Portfolio</SidebarGroupLabel>
                    </Link>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
