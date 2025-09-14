import MessagesTable from "@/components/MessagesTable";

export const metadata = {
    title: "Manage Contact Us Messages",
    description: "Easily view, reply, and manage all inquiries from visitors and customers.",
};

export default async function Page() {
    return <MessagesTable />;
}
