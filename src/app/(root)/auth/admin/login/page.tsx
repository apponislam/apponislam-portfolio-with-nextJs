import { pagesConfig } from "@/components/config/pages";
import LoginForm from "@/components/forms/login-form";
import PageHeader from "@/components/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Access your account to manage projects, track progress, and explore features.",
};

const LoginPage = () => {
    return (
        <div>
            <PageHeader title={pagesConfig.login.title} description={pagesConfig.login.description} />
            <div className="flex justify-center min-w-full">
                <div className="flex w-[40rem]">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
