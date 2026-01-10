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
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters.").max(32, "Password must not exceed 32 characters.").regex(/[a-z]/, "Password must contain at least one lowercase letter.").regex(/[A-Z]/, "Password must contain at least one uppercase letter.").regex(/[0-9]/, "Password must contain at least one number."),
});

const LoginForm = () => {
    const storeModal = useModalStore();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            form.reset();

            // Explicit error handling for NextAuth responses
            if (result?.error) {
                let errorMessage = "Login failed";

                // Specific error messages for common cases
                if (result.error === "CredentialsSignin") {
                    errorMessage = "Invalid email or password";
                } else if (result.error.includes("callback")) {
                    errorMessage = "Authentication service error";
                }

                throw new Error(errorMessage);
            }

            // Success case
            storeModal.onOpen({
                title: "Welcome back!",
                description: "You've successfully signed in",
                icon: Icons.successAnimated,
            });
            // 2. Force session update
            // const res = await fetch("/api/auth/session");
            // const session = await res.json();
            // console.log(session);
            router.refresh();

            // 3. Update client-side state (if using useSession)
            // if (typeof window !== "undefined" && window.updateSession) {
            //     window.updateSession(session);
            // }

            // window.location.href = "/";
            setTimeout(() => router.push("/"), 1500);
        } catch (err: any) {
            storeModal.onOpen({
                title: "Oops!",
                description: err.message || "An error occurred during login",
                icon: Icons.failedAnimated,
            });
            // console.error("Login error:", err);
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
                        <div className="border border-primary dark:border-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer" onClick={() => signIn("google", { callbackUrl: "/" })}>
                            <Icons.google className="w-8 h-8" />
                        </div>
                        <div className="border border-primary dark:border-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer" onClick={() => signIn("github", { callbackUrl: "/" })}>
                            <Icons.gitHub className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
