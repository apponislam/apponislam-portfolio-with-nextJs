"use client";

import { Icons } from "@/components/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetAllMessagesQuery } from "@/redux/features/messages/messageApi";
import Link from "next/link";
import { useState } from "react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MessagesTable = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError, isFetching } = useGetAllMessagesQuery({ page, limit });

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Table>
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
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">
                                    <Skeleton className="h-4 w-4 mx-auto" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-24 rounded-md" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-32 rounded-md" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-full rounded-md" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-24 rounded-md" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="h-5 w-5 rounded-full mx-auto" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (isError) {
        return (
            <Alert variant="destructive" className="w-full">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to load messages. Please try again later.</AlertDescription>
            </Alert>
        );
    }

    const messages = data?.data ?? [];
    const meta = data?.meta ?? { total: 0, page: 1, limit: 10 };
    const totalPages = Math.ceil(meta.total / meta.limit);

    return (
        <div className="space-y-4">
            <Table>
                {/* <TableCaption>List of Messages</TableCaption> */}
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
                        messages.map((msg: any, index: number) => (
                            <TableRow key={msg._id}>
                                <TableCell className="text-center">{(meta.page - 1) * meta.limit + index + 1}</TableCell>
                                <TableCell className="font-medium">{msg.name}</TableCell>
                                <TableCell>{msg.email}</TableCell>
                                <TableCell>{msg.message}</TableCell>
                                <TableCell>{msg.social || "N/A"}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`mailto:${msg.email}`} className="inline-block p-2">
                                        <Icons.gmail className="h-5 w-5" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No messages found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-4">
                    {/* Previous button */}
                    <Button variant="outline" size="sm" disabled={meta.page === 1 || isFetching} onClick={() => setPage((prev) => prev - 1)}>
                        Previous
                    </Button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Button key={pageNum} size="sm" variant={meta.page === pageNum ? "default" : "outline"} onClick={() => setPage(pageNum)}>
                            {pageNum}
                        </Button>
                    ))}

                    {/* Next button */}
                    <Button variant="outline" size="sm" disabled={meta.page === totalPages || isFetching} onClick={() => setPage((prev) => prev + 1)}>
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MessagesTable;
