export interface ResumeItem {
    id: string;
    title: string;
    organization: string;
    location?: string;
    duration: string;
    description: string[];
}

export const experienceData: ResumeItem[] = [
    {
        id: "exp-1",
        title: "Full Stack Developer",
        organization: "Freelance & Contract",
        location: "Remote",
        duration: "2022 - Present",
        description: [
            "Develop modern, responsive web applications using the MERN stack (MongoDB, Express, React, Node.js) and Next.js.",
            "Design and implement secure RESTful APIs, database schemas (MongoDB, PostgreSQL), and role-based authentication systems (JWT, Firebase).",
            "Convert complex Figma/PSD design layouts into clean, semantic, and pixel-perfect React/Tailwind CSS components.",
            "Integrate third-party services, including payment gateways (SurjoPay, SSLCommerz) and state management solutions (Zustand, Redux)."
        ]
    },
    {
        id: "exp-2",
        title: "Web Developer",
        organization: "Local Clients & Open Source Projects",
        location: "Dhaka, Bangladesh",
        duration: "2020 - 2022",
        description: [
            "Created custom websites for local businesses, focusing on clean user interfaces and optimized user experiences.",
            "Improved website speed and SEO rankings by optimizing assets, implementing modern styling practices, and writing clean HTML/CSS.",
            "Collaborated on open-source web tools and libraries, contributing bug fixes and UI improvements."
        ]
    }
];

export const educationData: ResumeItem[] = [
    {
        id: "edu-1",
        title: "B.Sc. in Computer Science & Engineering",
        organization: "Dhaka Institute of Technology / University",
        location: "Dhaka, Bangladesh",
        duration: "2024 - Present",
        description: [
            "Pursuing a Bachelor of Science degree in Computer Science and Engineering.",
            "Acquiring advanced knowledge in Algorithms, Software Architecture, System Design, and Database Systems."
        ]
    },
    {
        id: "edu-2",
        title: "Diploma in Computer Technology",
        organization: "Dinajpur Polytechnic Institute",
        location: "Dinajpur, Bangladesh",
        duration: "2020 - 2024",
        description: [
            "Graduated with a focus on Computer Technology, Network Administration, and core software engineering concepts.",
            "Engaged in practical projects involving system administration, database creation, and software development."
        ]
    }
];
