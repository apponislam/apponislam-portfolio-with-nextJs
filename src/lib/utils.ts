import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function formatDateFromObj(input: Date): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function optimizeCloudinaryUrl(url: string, width?: number): string {
    if (!url || !url.includes("res.cloudinary.com")) return url;
    
    // If the URL already has transformations, return as is
    if (url.includes("/image/upload/q_") || url.includes("/image/upload/w_") || url.includes("/image/upload/f_")) {
        return url;
    }
    
    const transformation = `q_auto,f_auto${width ? `,w_${width}` : ""}`;
    return url.replace("/image/upload/", `/image/upload/${transformation}/`);
}
