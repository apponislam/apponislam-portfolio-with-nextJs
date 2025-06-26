"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "../icons";
import { useModalStore } from "../hooks/use-modal-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import Image from "next/image";
import { useEffect, useState } from "react";
import { updateProject } from "../actions/portfolio-actions";
import { useRouter } from "next/navigation";

interface CloudinaryUploadResponse {
    secure_url: string;
    public_id?: string;
}

const formSchema = z.object({
    type: z.enum(["Personal Project", "Professional"]),
    companyName: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    category: z.array(z.enum(["Full Stack", "Frontend", "Backend", "Web Dev"])).nonempty({
        message: "Please select at least one category.",
    }),
    shortDescription: z.string().min(10, {
        message: "Short description must be at least 10 characters.",
    }),
    websiteLink: z.string().url().optional().or(z.literal("")),
    githubLink: z.string().url().optional().or(z.literal("")),
    techStack: z.array(z.enum(["Next.js", "React", "GraphQL", "Express.js", "Node.js", "MongoDB", "Firebase", "Typescript", "Javascript", "HTML 5", "CSS 3", "React Native", "Angular", "Redux", "Material UI", "Tailwind CSS", "Bootstrap", "Google Auth", "MySQL", "JWT", "TanStack Query", "react-hook-form", "SurjoPay", "Prisma", "PostgreSQL"])).nonempty({
        message: "Please select at least one technology.",
    }),
    startDate: z.date({
        required_error: "A start date is required.",
    }),
    endDate: z.date().optional(),
    companyLogoImg: z.string().url({
        message: "Please upload a valid company logo.",
    }),
    descriptionDetails: z.object({
        paragraphs: z
            .array(
                z.string().min(10, {
                    message: "Paragraph must be at least 10 characters.",
                })
            )
            .nonempty({
                message: "Please add at least one paragraph.",
            }),
        bullets: z
            .array(
                z.string().min(5, {
                    message: "Bullet point must be at least 5 characters.",
                })
            )
            .optional(),
    }),
    pagesInfoArr: z
        .array(
            z.object({
                title: z.string().min(2, {
                    message: "Page title must be at least 2 characters.",
                }),
                imgArr: z.array(z.string().url()).nonempty({
                    message: "Please add at least one image.",
                }),
                description: z.string().optional(),
            })
        )
        .nonempty({
            message: "Please add at least one page info.",
        }),
});

interface ProjectUpdateFormProps {
    id: string;
    projectId: string;
}

const ProjectUpdateForm = ({ id, projectId }: ProjectUpdateFormProps) => {
    const storeModal = useModalStore();
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState<any>(null);
    console.log(initialData);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "Professional",
            companyName: "",
            category: [],
            shortDescription: "",
            websiteLink: "",
            githubLink: "",
            techStack: [],
            endDate: undefined,
            companyLogoImg: "",
            descriptionDetails: {
                paragraphs: [""],
                bullets: [],
            },
            pagesInfoArr: [
                {
                    title: "",
                    imgArr: [""],
                    description: "",
                },
            ],
        },
    });

    // Fetch project data and set form values
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${projectId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch project");
                }
                const data = await response.json();
                setInitialData(data.data);

                // Transform the data to match the form schema
                const transformedData = {
                    ...data.data,
                    startDate: data.data.startDate ? parseISO(data.data.startDate) : new Date(),
                    endDate: data.data.endDate ? parseISO(data.data.endDate) : undefined,
                    descriptionDetails: {
                        paragraphs: data.data.descriptionDetails?.paragraphs || [""],
                        bullets: data.data.descriptionDetails?.bullets || [],
                    },
                    pagesInfoArr: data.data.pagesInfoArr || [
                        {
                            title: "",
                            imgArr: [""],
                            description: "",
                        },
                    ],
                };

                form.reset(transformedData);
            } catch (error) {
                console.error("Error fetching project:", error);
                storeModal.onOpen({
                    title: "Error",
                    description: "Failed to load project data.",
                    icon: Icons.failedAnimated,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectData();
    }, [projectId, form, storeModal]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, onChange: (url: string) => void) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            storeModal.onOpen({
                title: "Invalid File",
                description: "Please upload a JPEG, PNG, or WEBP image.",
                icon: Icons.failedAnimated,
            });
            return;
        }

        if (file.size > maxSize) {
            storeModal.onOpen({
                title: "File Too Large",
                description: "Maximum file size is 5MB.",
                icon: Icons.failedAnimated,
            });
            return;
        }

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "apponislam-portfolio");
        data.append("cloud_name", "dqkx3gcnm");

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/dqkx3gcnm/image/upload`, { method: "POST", body: data });

            if (!res.ok) throw new Error("Upload failed");

            const uploadedImage: CloudinaryUploadResponse = await res.json();
            onChange(uploadedImage.secure_url);
        } catch (error) {
            console.error("Upload error:", error);
            storeModal.onOpen({
                title: "Upload Failed",
                description: "Failed to upload image. Please try again.",
                icon: Icons.failedAnimated,
            });
        } finally {
            event.target.value = "";
        }
    };

    const addParagraph = () => {
        const paragraphs = form.getValues("descriptionDetails.paragraphs");
        form.setValue("descriptionDetails.paragraphs", [...paragraphs, ""]);
    };

    const removeParagraph = (index: number) => {
        const paragraphs = form.getValues("descriptionDetails.paragraphs");
        if (paragraphs.length > 1) {
            const newParagraphs = paragraphs.filter((_, i) => i !== index);
            form.setValue("descriptionDetails.paragraphs", newParagraphs as [string, ...string[]]);
        }
    };

    const addBullet = () => {
        const bullets = form.getValues("descriptionDetails.bullets") || [];
        form.setValue("descriptionDetails.bullets", [...bullets, ""]);
    };

    const removeBullet = (index: number) => {
        const bullets = form.getValues("descriptionDetails.bullets") || [];
        form.setValue(
            "descriptionDetails.bullets",
            bullets.filter((_, i) => i !== index)
        );
    };

    const addPageInfo = () => {
        const pagesInfoArr = form.getValues("pagesInfoArr");
        form.setValue("pagesInfoArr", [...pagesInfoArr, { title: "", imgArr: [""], description: "" }]);
    };

    const removePageInfo = (index: number) => {
        const pagesInfoArr = form.getValues("pagesInfoArr");
        if (pagesInfoArr.length > 1) {
            const newPages = pagesInfoArr.filter((_, i) => i !== index);
            form.setValue("pagesInfoArr", newPages as [(typeof pagesInfoArr)[0], ...typeof pagesInfoArr]);
        }
    };

    const addImageUrl = (pageIndex: number) => {
        const pagesInfoArr = form.getValues("pagesInfoArr");
        const updatedPages = [...pagesInfoArr];
        updatedPages[pageIndex] = {
            ...updatedPages[pageIndex],
            imgArr: [...updatedPages[pageIndex].imgArr, ""] as [string, ...string[]],
        };
        form.setValue("pagesInfoArr", updatedPages as [(typeof pagesInfoArr)[0], ...typeof pagesInfoArr]);
    };

    const removeImageUrl = (pageIndex: number, imgIndex: number) => {
        const pagesInfoArr = form.getValues("pagesInfoArr");
        if (pagesInfoArr[pageIndex].imgArr.length > 1) {
            const updatedPages = [...pagesInfoArr];
            updatedPages[pageIndex] = {
                ...updatedPages[pageIndex],
                imgArr: updatedPages[pageIndex].imgArr.filter((_, i) => i !== imgIndex) as [string, ...string[]],
            };
            form.setValue("pagesInfoArr", updatedPages as [(typeof pagesInfoArr)[0], ...typeof pagesInfoArr]);
        }
    };

    const router = useRouter();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const payload = {
                userId: id,
                ...values,
                startDate: values.startDate.toISOString(),
                endDate: values.endDate?.toISOString(),
            };

            const result = await updateProject(projectId, payload);

            if (result.success) {
                router.refresh();
                storeModal.onOpen({
                    title: "Success!",
                    description: "Project has been updated successfully!",
                    icon: Icons.successAnimated,
                });
                router.push("/dashboard/portfolio");
            } else {
                storeModal.onOpen({
                    title: "Error",
                    description: result.error,
                    icon: Icons.failedAnimated,
                });
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            storeModal.onOpen({
                title: "Error",
                description: "An unexpected error occurred.",
                icon: Icons.failedAnimated,
            });
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-full">
                {/* Project Type */}
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Type</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" value="Professional" checked={field.value === "Professional"} onChange={() => field.onChange("Professional")} className="h-4 w-4 text-primary focus:ring-primary" />
                                        <span>Professional</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" value="Personal Project" checked={field.value === "Personal Project"} onChange={() => field.onChange("Personal Project")} className="h-4 w-4 text-primary focus:ring-primary" />
                                        <span>Personal Project</span>
                                    </label>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Company Name */}
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter company name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Categories */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Categories</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                                            {field.value.length > 0 ? field.value.join(", ") : "Select categories"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search categories..." />
                                        <CommandEmpty>No category found.</CommandEmpty>
                                        <CommandGroup>
                                            {["Full Stack", "Frontend", "Backend", "Web Dev"].map((item) => (
                                                <CommandItem
                                                    value={item}
                                                    key={item}
                                                    onSelect={() => {
                                                        const currentValues = field.value;
                                                        if (currentValues.includes(item as any)) {
                                                            field.onChange(currentValues.filter((value) => value !== item));
                                                        } else {
                                                            field.onChange([...currentValues, item as any]);
                                                        }
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", field.value.includes(item as any) ? "opacity-100" : "opacity-0")} />
                                                    {item}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {field.value.map((value) => (
                                    <Badge key={value} variant="secondary">
                                        {value}
                                    </Badge>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Short Description */}
                <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Brief description of the project" className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Website Link */}
                <FormField
                    control={form.control}
                    name="websiteLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website Link (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* GitHub Link */}
                <FormField
                    control={form.control}
                    name="githubLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>GitHub Link (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://github.com/username/repo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tech Stack */}
                <FormField
                    control={form.control}
                    name="techStack"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Technologies Used</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                                            {field.value.length > 0 ? `${field.value.length} technologies selected` : "Select technologies"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search technologies..." />
                                        <CommandEmpty>No technology found.</CommandEmpty>
                                        <CommandGroup>
                                            {["Next.js", "React", "GraphQL", "Express.js", "Node.js", "MongoDB", "Firebase", "Typescript", "Javascript", "HTML 5", "CSS 3", "React Native", "Angular", "Redux", "Material UI", "Tailwind CSS", "Bootstrap", "Google Auth", "MySQL", "JWT", "TanStack Query", "react-hook-form", "SurjoPay", "Prisma", "PostgreSQL"].map((tech) => (
                                                <CommandItem
                                                    value={tech}
                                                    key={tech}
                                                    onSelect={() => {
                                                        const currentValues = field.value;
                                                        if (currentValues.includes(tech as any)) {
                                                            field.onChange(currentValues.filter((value) => value !== tech));
                                                        } else {
                                                            field.onChange([...currentValues, tech as any]);
                                                        }
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", field.value.includes(tech as any) ? "opacity-100" : "opacity-0")} />
                                                    {tech}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {field.value.map((tech) => (
                                    <Badge key={tech} variant="secondary">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Date */}
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* End Date */}
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date (optional)</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Company Logo Upload */}
                <FormField
                    control={form.control}
                    name="companyLogoImg"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Logo</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-2">
                                    <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field.onChange)} />
                                    {field.value && (
                                        <div className="mt-2">
                                            <Image src={field.value} alt="Company logo preview" width={0} height={0} className="rounded border" style={{ width: "30%", height: "auto" }} />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Description Details</h3>

                    {/* Paragraphs */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Paragraphs</h4>
                        {form.watch("descriptionDetails.paragraphs").map((_, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <FormField
                                    control={form.control}
                                    name={`descriptionDetails.paragraphs.${index}`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Textarea placeholder={`Paragraph ${index + 1}`} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeParagraph(index)} disabled={form.watch("descriptionDetails.paragraphs").length <= 1}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addParagraph}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Paragraph
                        </Button>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Bullet Points (optional)</h4>
                        {(form.watch("descriptionDetails.bullets") || []).map((_, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <FormField
                                    control={form.control}
                                    name={`descriptionDetails.bullets.${index}`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder={`Bullet point ${index + 1}`} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeBullet(index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addBullet}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bullet Point
                        </Button>
                    </div>
                </div>

                {/* Pages Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Pages Information</h3>

                    {form.watch("pagesInfoArr").map((_, pageIndex) => (
                        <div key={pageIndex} className="space-y-4 border p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-medium">Page {pageIndex + 1}</h4>
                                <Button type="button" variant="ghost" size="sm" onClick={() => removePageInfo(pageIndex)} disabled={form.watch("pagesInfoArr").length <= 1}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Page Title */}
                            <FormField
                                control={form.control}
                                name={`pagesInfoArr.${pageIndex}.title`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Page Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Landing Page" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Images */}
                            <div className="space-y-2">
                                <FormLabel>Images</FormLabel>
                                {form.watch(`pagesInfoArr.${pageIndex}.imgArr`).map((_, imgIndex) => (
                                    <div key={imgIndex} className="flex items-center gap-2">
                                        <FormField
                                            control={form.control}
                                            name={`pagesInfoArr.${pageIndex}.imgArr.${imgIndex}`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <div className="flex items-center gap-2">
                                                            <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field.onChange)} />
                                                            {field.value && <Image src={field.value} alt="Preview" width={48} height={0} className="w-[48px] h-auto object-cover rounded border" />}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeImageUrl(pageIndex, imgIndex)} disabled={form.watch(`pagesInfoArr.${pageIndex}.imgArr`).length <= 1}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={() => addImageUrl(pageIndex)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Image
                                </Button>
                            </div>

                            {/* Page Description */}
                            <FormField
                                control={form.control}
                                name={`pagesInfoArr.${pageIndex}.description`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Description of this page" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}

                    <Button type="button" variant="outline" size="sm" onClick={addPageInfo}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Page
                    </Button>
                </div>

                <Button type="submit">Update Project</Button>
            </form>
        </Form>
    );
};

export default ProjectUpdateForm;
