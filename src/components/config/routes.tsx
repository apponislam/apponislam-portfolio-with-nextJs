import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function getMainNav() {
    const session = await getServerSession(authOptions);
    // console.log(session);

    const mainNavIfLoggedOut = [
        { title: "Skills", href: "/skills" },
        { title: "Projects", href: "/projects" },
        { title: "Contact", href: "/contact" },
        { title: "Blog", href: "/blog" },
        { title: "Login", href: "/login" },
        { title: "Register", href: "/register" },
    ];

    const mainNavIfLoggedIn = [
        { title: "Skills", href: "/skills" },
        { title: "Projects", href: "/projects" },
        { title: "Contact", href: "/contact" },
        { title: "Blog", href: "/blog" },
    ];

    const mainNav = session ? mainNavIfLoggedIn : mainNavIfLoggedOut;

    return mainNav;
}
