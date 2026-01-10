import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            _id: string;
            // id: string;
            name: string;
            email: string;
            image?: string;
        } & DefaultSession["user"];
    }
}
