import Image from "next/image";
import apponislam from "../../../public/apponislam.png";
import { Button, buttonVariants } from "../../components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import ScrollButton from "@/components/ScrollButton";
// import SkillsCard from "@/components/skills-card";
import { pagesConfig } from "@/components/config/pages";
// import { featuredSkills } from "@/components/config/skills";
import ProjectCard from "@/components/project-card";
import { featuredProjects } from "@/components/config/projects";
import HomeSkills from "@/components/Home-skills";

export default function Home() {
    return (
        <>
            <div className="container mx-auto">
                <section className="space-y-6 pb-8 pt-6 mb-0 md:pb-12 md:py-20 lg:py-32 h-screen flex items-center justify-center">
                    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center -mt-20 mx-auto">
                        <Image src={apponislam} height={100} width={100} sizes="100vw" className="bg-primary rounded-full mb-0 h-auto md:mb-2 w-[60%] max-w-[16rem] border-8 border-primary dark:border-white dark:bg-white" alt="appon-islam-img" />
                        {/* </div> */}
                        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">Appon Islam</h1>
                        <h3 className="font-heading text-base sm:text-xl md:text-xl lg:text-2xl font-semibold">Full Stack Developer</h3>

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
                <section id="skills" className="md:container space-y-6 bg-slate-50 dark:bg-transparent py-10">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{pagesConfig.skills.title}</h2>
                        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">{pagesConfig.skills.description}</p>
                    </div>
                    {/* <SkillsCard skills={featuredSkills} /> */}
                    <HomeSkills></HomeSkills>
                    <Link href="/skills" className="flex justify-center">
                        <Button variant={"outline"} className="rounded-xl">
                            <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                        </Button>
                    </Link>
                </section>
                <section id="projects" className="md:container space-y-6 dark:bg-transparent py-10 my-14">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{pagesConfig.projects.title}</h2>
                        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">{pagesConfig.projects.description}</p>
                    </div>
                    <div className="mx-auto grid justify-center gap-4  md:w-full lg:grid-cols-3 2xl:w-[1200px]">
                        {featuredProjects.map((exp) => (
                            <ProjectCard key={exp._id} project={exp} />
                        ))}
                    </div>
                    <Link href="/projects" className="flex justify-center">
                        <Button variant={"outline"} className="rounded-xl">
                            <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                        </Button>
                    </Link>
                </section>
            </div>
        </>
    );
}
