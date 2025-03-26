import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:5000/api/v1/users/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                    });

                    const data = await res.json();
                    if (!data.success) throw new Error(data.message);

                    return {
                        id: data.user._id,
                        email: data.user.email,
                        name: data.user.name,
                        image: data.user.image,
                    };
                } catch (error: any) {
                    throw new Error(error.message || "Login failed");
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            // Normalize provider to have an uppercase first letter

            if (account?.provider === "credentials") return true;

            const provider = account?.provider ? account.provider.charAt(0).toUpperCase() + account.provider.slice(1) : "Email";

            const userInfo = {
                name: user.name,
                email: user.email,
                image: user.image,
                provider, // Set the provider to 'Google' or 'Github'
            };

            // Send the user info to your backend
            const res = await fetch("http://localhost:5000/api/v1/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo),
            });

            if (!res.ok) {
                console.error("Error registering user", await res.text());
                return false;
            }

            console.log(res);

            const data = await res.json();

            user.id = data.user._id;
            console.log(data);

            return true;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user._id = token.sub as string;
                session.user.image = token.image as string; // Add this line
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id as string;
                token.image = user.image; // Add this line
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
    },
};
