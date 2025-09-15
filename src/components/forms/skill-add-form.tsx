"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "../ui/rating";
import { useModalStore } from "../hooks/use-modal-store";
import { Icons } from "../icons";
import { availableIcons, iconMap } from "../ui/icons";
import { useCreateSkillMutation } from "@/redux/features/skills/skillApi";

const formSchema = z.object({
    name: z.string().min(2, { message: "Skill name must be at least 2 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    rating: z.number().min(1).max(5),
    icon: z.string().min(1, { message: "Please select an icon." }),
});

export function SkillAddForm() {
    const router = useRouter();
    const storeModal = useModalStore();

    const [createSkill, { isLoading }] = useCreateSkillMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            rating: 3,
            icon: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            await createSkill(data).unwrap();
            storeModal.onOpen({
                title: "Success",
                description: "Skill created successfully!",
                icon: Icons.successAnimated,
            });
            router.push("/dashboard/skills");
            router.refresh();
            form.reset();
        } catch (error) {
            console.error(error);
            storeModal.onOpen({
                title: "Error",
                description: "Failed to create skill",
                icon: Icons.failedAnimated,
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Skill Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="skill-name">Skill Name</FormLabel>
                            <FormControl>
                                <Input id="skill-name" placeholder="e.g. Next.js" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="skill-description">Description</FormLabel>
                            <FormControl>
                                <Textarea id="skill-description" placeholder="Describe the skill..." className="min-h-[100px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Rating */}
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="skill-rating">Proficiency Rating</FormLabel>
                            <FormControl>
                                <Rating value={field.value} onChange={field.onChange} max={5} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Icon */}
                <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="skill-icon">Icon</FormLabel>
                            <div id="skill-icon" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {availableIcons.map((icon) => {
                                    const IconComponent = iconMap[icon.value as keyof typeof iconMap];
                                    return (
                                        <Button key={icon.value} type="button" variant={field.value === icon.value ? "default" : "outline"} className="flex flex-col items-center h-auto p-2" onClick={() => form.setValue("icon", icon.value)}>
                                            <IconComponent className="w-6 h-6 mb-1" />
                                            <span className="text-xs">{icon.label}</span>
                                        </Button>
                                    );
                                })}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Skill"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
