import Rating from "./rating";
import { iconMap } from "./ui/icons";

interface ISkills {
    _id: string;
    name: string;
    description: string;
    rating: number;
    icon: string;
    createdAt: string;
    updatedAt: string;
}

interface SkillsCardProps {
    skills: ISkills[];
}

export default function SkillsCard2({ skills }: SkillsCardProps) {
    return (
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
            {skills.map((skill, id) => {
                const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                return (
                    <div key={id} className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[230px] flex-col justify-between rounded-md p-6 sm:h-[230px]">
                            <IconComponent size={50} />
                            <div className="space-y-2">
                                <h3 className="font-bold">{skill.name}</h3>
                                <p className="text-sm text-muted-foreground">{skill.description}</p>
                                <Rating stars={skill.rating} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
