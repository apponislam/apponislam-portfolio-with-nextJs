"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import Rating from "./rating";
import { deleteSkill } from "./actions/skill-actions";
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

export default function SkillsCard({ skills }: SkillsCardProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<ISkills | null>(null);

    const handleEdit = (skillId: string) => {
        router.push(`/dashboard/skills/${skillId}/edit`);
    };

    const handleDelete = (skill: ISkills) => {
        setSelectedSkill(skill);
        setOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (!selectedSkill) return;

        const result = await deleteSkill(selectedSkill._id);
        if (result.success) {
            router.refresh();
        } else {
            console.error(result.error);
        }
        setOpen(false);
    };

    return (
        <>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
                {skills.map((skill) => {
                    const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                    return (
                        <div key={skill._id} className="relative overflow-hidden rounded-lg border bg-background p-2 group">
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                            <Icons.moreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(skill._id)}>
                                            <Icons.edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(skill)} className="text-red-600 focus:text-red-600">
                                            <Icons.trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

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

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete this skill?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">This action cannot be undone. Are you sure you want to permanently delete {selectedSkill?.name}?</p>
                    <DialogFooter className="mt-4">
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirmed}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
