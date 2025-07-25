// import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";
import { Icons } from "./icons";

interface CustomTooltipProps {
    children: React.ReactNode;
    text: string;
    icon?: any;
}

export default function CustomTooltip({ children, text, icon }: CustomTooltipProps) {
    const IconComponent = icon ? icon : Icons.infoMark;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className="flex items-center text-sm bg-background border text-foreground shadow-md">
                    <IconComponent className="w-4 h-4 mr-2 text-foreground" />
                    <span className="text-foreground">{text}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
