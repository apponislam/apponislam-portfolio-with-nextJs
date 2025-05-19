import { pagesConfig } from "@/components/config/pages";
import RegisterForm from "@/components/forms/register-form";
import PageHeader from "@/components/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Create your account to start managing blogs, tracking progress, and unlocking all features.",
};

const RegisterPage = () => {
    return (
        <div>
            <PageHeader title={pagesConfig.register.title} description={pagesConfig.register.description} />
            <div className="flex justify-center min-w-full">
                <div className="flex w-[40rem]">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
