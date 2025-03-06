import { ValidPages } from "./constants";

type PagesConfig = {
    [key in ValidPages]: {
        title: string;
        description: string;
    };
};

export const pagesConfig: PagesConfig = {
    skills: {
        title: "Skills",
        description: "Key skills that define my professional identity.",
    },
    projects: {
        title: "Projects",
        description: "Highlighting career journey and impactful projects.",
    },
    contact: {
        title: "Contact",
        description: "Let's connect and explore collaborations.",
    },
    blog: {
        title: "Blog",
        description: "Sharing insights, experiences, and technical stories.",
    },
    login: {
        title: "Login",
        description: "Access your account to manage your profile and content.",
    },
    register: {
        title: "Register",
        description: "Create a new account and join the platform.",
    },
};
