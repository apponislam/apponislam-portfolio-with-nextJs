import React from "react";

import SkillsCard from "@/components/skills-card";
import { getSkills } from "./actions/skill-actions";

const HomeSkills = async () => {
    let featuredSkills = [];

    try {
        const skills = await getSkills();
        featuredSkills = skills.slice(0, 6);
    } catch (error) {
        console.error("Failed to load featured skills:", error);
    }

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">My Key Skills</h2>
                {featuredSkills.length > 0 ? <SkillsCard skills={featuredSkills} /> : <p className="text-center text-muted-foreground">Check back soon to see my skills showcase</p>}
            </div>
        </div>
    );
};

export default HomeSkills;
