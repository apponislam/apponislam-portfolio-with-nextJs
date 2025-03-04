import Image from "next/image";
import apponislam from "../../../public/apponislam.png";
import { buttonVariants } from "../../components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import ScrollButton from "@/components/ScrollButton";

export default function Home() {
    return (
        <>
            <div className="container mx-auto">
                <section className="space-y-6 pb-8 pt-6 mb-0 md:pb-12 md:py-20 lg:py-32 h-screen flex items-center justify-center">
                    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center -mt-20 mx-auto">
                        <Image src={apponislam} height={100} width={100} sizes="100vw" className="bg-primary rounded-full mb-0 h-auto md:mb-2 w-[60%] max-w-[16rem] border-8 border-primary dark:border-white dark:bg-white" alt="appon-islam-img" />
                        {/* </div> */}
                        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Appon Islam</h1>
                        <h3 className="font-heading text-base sm:text-xl md:text-xl lg:text-2xl">Full Stack Developer</h3>

                        <div className="grid grid-cols-2 mt-10 items-center justify-center sm:flex-row  gap-3">
                            <Link href={"https://github.com/apponislam"} target="_blank" className={cn(buttonVariants({ size: "lg" }), "px-4 md:px-8")}>
                                <Icons.gitHub className="w-4 h-4 mr-2" /> GitHub
                            </Link>
                            <Link
                                href={"https://www.linkedin.com/in/apponislam/"}
                                target="_blank"
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "lg",
                                    }),
                                    "px-4 md:px-8"
                                )}
                            >
                                <Icons.linkedin className="w-4 h-4 mr-2" /> LinkedIn
                            </Link>

                            <Link
                                href={`${process.env.MY_SITE_URL}/apponislam-Resume.pdf`}
                                target="_blank"
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "lg",
                                    }),
                                    "px-4 md:px-8"
                                )}
                            >
                                <Icons.download className="w-4 h-4 mr-2" /> Resume
                            </Link>
                            <Link href={"/contact"} rel="noreferrer" className={cn(buttonVariants({ size: "lg" }), "px-4 md:px-8")}>
                                <Icons.contact className="w-4 h-4 mr-2" /> Contact
                            </Link>
                        </div>
                        {/* <Link href="#skills">
                        <Icons.chevronDown className="h-6 w-6 mt-10 downarrow" />
                    </Link> */}
                        <ScrollButton></ScrollButton>
                    </div>
                </section>
            </div>
        </>
    );
}
