import React from "react";

import SkillsCard from "@/components/skills-card";
import { getSkills } from "./actions/skill-actions";
import { skillsInterface } from "./config/skills";

const HomeSkills = async () => {
    let featuredSkills: skillsInterface[] = [];

    try {
        const skills = await getSkills();
        featuredSkills = skills.slice(0, 6);
    } catch (error) {
        console.error("Failed to load featured skills:", error);
    }

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">{featuredSkills.length > 0 ? <SkillsCard skills={featuredSkills} /> : <p className="text-center text-muted-foreground">Check back soon to see my skills showcase</p>}</div>
        </div>
    );
};

export default HomeSkills;
