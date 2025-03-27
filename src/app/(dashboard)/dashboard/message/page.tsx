import CustomTooltip from "@/components/custom-tooltips";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface IMessage {
    _id: string;
    name: string;
    email: string;
    message: string;
    social?: string;
}

const fetchMessages = async (): Promise<IMessage[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages`, {
            next: { revalidate: 2 }, // Auto-refetch every 2 seconds
        });
        const data = await res.json();
        return data.success ? data.data : [];
    } catch {
        return [];
    }
};

const Page = async () => {
    const messages = await fetchMessages();

    return (
        <div>
            <Table>
                <TableCaption>List of Messages</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-8 text-center">#</TableHead>
                        <TableHead className="w-36">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Social</TableHead>
                        <TableHead className="text-right">Mail To</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <TableRow key={msg._id}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="font-medium">{msg.name}</TableCell>
                                <TableCell>{msg.email}</TableCell>
                                <TableCell>{msg.message}</TableCell>
                                <TableCell>{msg.social || "N/A"}</TableCell>
                                <TableCell className="text-right">
                                    <CustomTooltip icon={Icons.gmail} text={msg.email}>
                                        <Link
                                            href={msg.email}
                                            target="_blank"
                                            className={cn(
                                                buttonVariants({
                                                    variant: "ghost",
                                                    size: "sm",
                                                }),
                                                "h-10 w-10 p-2"
                                            )}
                                        >
                                            <Icons.gmail className="h-5 w-5" />
                                        </Link>
                                    </CustomTooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No messages found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Page;
