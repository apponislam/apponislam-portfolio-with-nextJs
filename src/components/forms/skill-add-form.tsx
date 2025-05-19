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
import { createSkill } from "../actions/skill-actions";
import { useModalStore } from "../hooks/use-modal-store";
import { Icons } from "../icons";
import { availableIcons, iconMap } from "../ui/icons";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Skill name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    rating: z.number().min(1).max(5),
    icon: z.string().min(1, {
        message: "Please select an icon.",
    }),
});

export function SkillAddForm() {
    const router = useRouter();
    const storeModal = useModalStore();
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
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("rating", data.rating.toString());
            formData.append("icon", data.icon);

            await createSkill(formData);
            storeModal.onOpen({
                title: "Success",
                description: "Skill created successfully!",
                icon: Icons.successAnimated,
            });
            router.push("/dashboard/skills");
            router.refresh();
            form.reset();
        } catch (error) {
            console.log(error);

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
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skill Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Next.js" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe the skill..." className="min-h-[100px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Proficiency Rating</FormLabel>
                            <FormControl>
                                <Rating value={field.value} onChange={field.onChange} max={5} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
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
                    <Button type="submit">Add Skill</Button>
                </div>
            </form>
        </Form>
    );
}
