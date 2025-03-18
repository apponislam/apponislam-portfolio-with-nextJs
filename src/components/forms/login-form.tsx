"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "../icons";
import { useModalStore } from "../hooks/use-modal-store";
import { signIn } from "next-auth/react";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters.").max(32, "Password must not exceed 32 characters.").regex(/[a-z]/, "Password must contain at least one lowercase letter.").regex(/[A-Z]/, "Password must contain at least one uppercase letter.").regex(/[0-9]/, "Password must contain at least one number."),
});

const LoginForm = () => {
    const storeModal = useModalStore();

    // const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
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

                <Button type="submit">Log In</Button>
                <div className="my-4 mt-0 flex items-center justify-center gap-2">
                    <div className="flex items-center gap-4">
                        <div className="border border-primary dark:border-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer" onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}>
                            <Icons.google className="w-8 h-8" />
                        </div>
                        <div className="border border-primary dark:border-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer" onClick={() => signIn("github")}>
                            <Icons.gitHub className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
