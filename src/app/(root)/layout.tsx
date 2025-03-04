import { routesConfig } from "@/components/config/routes";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteFooter } from "@/components/site-footer";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto">
            <div className="mx-3 md:mx-0">
                <header className="container z-50 bg-background mx-auto">
                    <div className="flex h-20 items-center justify-between py-6">
                        <MainNav items={routesConfig.mainNav} />
                        <nav className="flex items-center gap-5">
                            <ModeToggle />
                        </nav>
                    </div>
                </header>
                {children}
                <SiteFooter></SiteFooter>
            </div>
        </div>
    );
}
