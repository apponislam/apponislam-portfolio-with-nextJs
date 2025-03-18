"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "../icons";
import { useModalStore } from "../hooks/use-modal-store";

const formSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters.")
        .max(50, "Name must not exceed 50 characters.")
        .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),

    email: z.string().email("Please enter a valid email."),

    password: z.string().min(6, "Password must be at least 6 characters.").max(32, "Password must not exceed 32 characters.").regex(/[a-z]/, "Password must contain at least one lowercase letter.").regex(/[A-Z]/, "Password must contain at least one uppercase letter.").regex(/[0-9]/, "Password must contain at least one number."),
    image: z.instanceof(File).refine((file) => file.size > 0, {
        message: "Image is required.",
    }),
});

const RegisterForm = () => {
    const storeModal = useModalStore();

    // const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            image: undefined,
        },
    });

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, onChange: (file: File | undefined) => void) => {
        onChange(event.target.files?.[0]);
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
        } else {
            console.error("No file selected.");
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            console.log(response);

            form.reset();

            if (response.status === 200) {
                storeModal.onOpen({
                    title: "Thankyou!",
                    description: "Your are logged in",
                    icon: Icons.successAnimated,
                });
            }
        } catch (err) {
            console.log("Err!", err);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange } }) => (
                        <FormItem>
                            <FormLabel>Photo</FormLabel>
                            <FormControl>
                                <Input type="file" onChange={(e) => handleUpload(e, onChange)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Register</Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
