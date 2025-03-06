import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
    title: string;
    imgArr: string[];
    description?: string;
}

interface DescriptionDetailsInterface {
    paragraphs: string[];
    bullets: string[];
}

export interface ProjectsInterface {
    id: string;
    type: ValidExpType;
    companyName: string;
    category: ValidCategory[];
    shortDescription: string;
    websiteLink?: string;
    githubLink?: string;
    techStack: ValidSkills[];
    startDate: Date;
    endDate: Date;
    companyLogoImg: any;
    descriptionDetails: DescriptionDetailsInterface;
    pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectsInterface[] = [
    {
        id: "built-design",
        type: "Professional",
        companyName: "Builtdesign",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Built a modern website for 4000+ users.",
        websiteLink: "https://builtdesign.in",
        techStack: ["Next.js", "React", "Node.js", "MongoDB", "Typescript"],
        startDate: new Date("2021-07-01"),
        endDate: new Date("2022-07-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Landing Page",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Modern landing page design.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Developed a full-stack platform for 4000+ users."],
            bullets: ["Used Next.js, Node.js, and MongoDB.", "Optimized performance and UX."],
        },
    },
    {
        id: "dev-hub",
        type: "Professional",
        companyName: "DevHub",
        category: ["Frontend", "Web Dev"],
        shortDescription: "Built reusable UI components.",
        websiteLink: "https://devhub.com",
        techStack: ["React", "Material UI", "Typescript"],
        startDate: new Date("2020-06-01"),
        endDate: new Date("2020-09-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Component Library",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Reusable design system.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Developed UI kit for internal projects."],
            bullets: ["Ensured accessibility.", "Used Material UI & Typescript."],
        },
    },
    {
        id: "shop-mart",
        type: "Professional",
        companyName: "ShopMart",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "E-commerce website for fashion.",
        websiteLink: "https://shopmart.com",
        techStack: ["Next.js", "MongoDB", "Tailwind CSS"],
        startDate: new Date("2022-08-01"),
        endDate: new Date("2023-06-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Product Listing",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Dynamic product filtering.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Built a full e-commerce platform."],
            bullets: ["Integrated payments.", "Optimized filters & categories."],
        },
    },
    {
        id: "edu-learn",
        type: "Professional",
        companyName: "EduLearn",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Online learning platform.",
        websiteLink: "https://edulearn.com",
        techStack: ["React", "Node.js", "MongoDB"],
        startDate: new Date("2021-01-01"),
        endDate: new Date("2021-06-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Course Dashboard",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Track learning progress.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Developed online course system."],
            bullets: ["Video streaming & progress tracking.", "Secure user auth."],
        },
    },
    {
        id: "travel-go",
        type: "Professional",
        companyName: "TravelGo",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Travel booking platform.",
        websiteLink: "https://travelgo.com",
        techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-12-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Booking Page",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Search & book trips.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Built booking system with filters."],
            bullets: ["Integrated calendar & payments.", "Responsive design."],
        },
    },
    {
        id: "fit-life",
        type: "Professional",
        companyName: "FitLife",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Fitness tracking dashboard.",
        websiteLink: "https://fitlife.com",
        techStack: ["Next.js", "Typescript", "MongoDB"],
        startDate: new Date("2022-03-01"),
        endDate: new Date("2022-12-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Dashboard",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Workout progress tracking.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Built a fitness tracker dashboard."],
            bullets: ["Log workouts.", "Show analytics & trends."],
        },
    },
    {
        id: "blogify",
        type: "Personal Project",
        companyName: "Blogify",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Multi-author blog platform.",
        githubLink: "https://github.com/demo/blogify",
        techStack: ["Next.js", "MongoDB", "Tailwind CSS"],
        startDate: new Date("2021-04-01"),
        endDate: new Date("2021-08-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Blog Listing",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Browse all blogs.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Built blog platform for writers."],
            bullets: ["Multi-author support.", "Markdown-based editor."],
        },
    },
    {
        id: "event-expo",
        type: "Professional",
        companyName: "EventExpo",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Event management system.",
        websiteLink: "https://eventexpo.com",
        techStack: ["React", "Firebase", "Tailwind CSS"],
        startDate: new Date("2023-05-01"),
        endDate: new Date("2023-11-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Event List",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Discover & join events.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Developed event management platform."],
            bullets: ["Ticketing & user registration.", "Dynamic calendar view."],
        },
    },
    {
        id: "foodie-hub",
        type: "Personal Project",
        companyName: "FoodieHub",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Online food delivery platform.",
        githubLink: "https://github.com/demo/foodiehub",
        techStack: ["Next.js", "MongoDB", "Tailwind CSS"],
        startDate: new Date("2020-11-01"),
        endDate: new Date("2021-04-01"),
        companyLogoImg: "https://i.imgur.com/dVdYArw.jpeg",
        pagesInfoArr: [
            {
                title: "Menu Page",
                imgArr: ["https://i.imgur.com/dVdYArw.jpeg"],
                description: "Browse & order food.",
            },
        ],
        descriptionDetails: {
            paragraphs: ["Built online food ordering system."],
            bullets: ["Dynamic menu.", "Order tracking."],
        },
    },
];

export const featuredProjects = Projects.slice(0, 3);
