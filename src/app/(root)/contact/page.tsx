import { pagesConfig } from "@/components/config/pages";
import ContactForm from "@/components/forms/contact-form";
import PageHeader from "@/components/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Examples of cards built using the components.",
};
const ContactPage = () => {
    return (
        <div>
            <PageHeader title={pagesConfig.contact.title} description={pagesConfig.contact.description} />
            <div className="flex justify-center min-w-full">
                <div className="flex w-[40rem]">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
