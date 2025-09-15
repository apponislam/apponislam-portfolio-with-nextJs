// import React from "react";

// import SkillsCard from "@/components/skills-card";
// import { getSkills } from "./actions/skill-actions";

// const HomeSkills = async () => {
//     let featuredSkills = [];

//     try {
//         const skills = await getSkills();
//         featuredSkills = skills.slice(0, 6);
//     } catch (error) {
//         console.error("Failed to load featured skills:", error);
//     }

//     return (
//         <div className="py-12">
//             <div className="container mx-auto px-4">{featuredSkills.length > 0 ? <SkillsCard skills={featuredSkills} /> : <p className="text-center text-muted-foreground">Check back soon to see my skills showcase</p>}</div>
//         </div>
//     );
// };

// export default HomeSkills;

"use client";

import React from "react";
import SkillsCard from "@/components/skills-card";
import { useGetAllSkillsQuery } from "@/redux/features/skills/skillApi";

export default function HomeSkills() {
    const { data, isLoading, isError } = useGetAllSkillsQuery();
    const featuredSkills = data?.data?.slice(0, 6) || []; // take only 6 skills

    if (isLoading) {
        return (
            <div className="py-12 text-center">
                <p className="text-muted-foreground animate-pulse">Loading skills...</p>
            </div>
        );
    }

    if (isError) {
        return <div className="py-12 text-center text-red-500">Failed to load featured skills</div>;
    }

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">{featuredSkills.length > 0 ? <SkillsCard skills={featuredSkills} /> : <p className="text-center text-muted-foreground">Check back soon to see my skills showcase</p>}</div>
        </div>
    );
}
