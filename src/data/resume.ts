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
        organization: "Sparktech Agency",
        duration: "August 2025 - Present",
        description: [
            "Develop modern, responsive web applications using the MERN stack (MongoDB, Express, React, Node.js) and Next.js.",
            "Design and implement secure RESTful APIs, database schemas (MongoDB, PostgreSQL), and role-based authentication systems (JWT, Firebase).",
            "Convert complex Figma/PSD design layouts into clean, semantic, and pixel-perfect React/Tailwind CSS components.",
            "Integrate third-party services, including payment gateways (SurjoPay, SSLCommerz) and state management solutions (Zustand, Redux)."
        ]
    }
];

export const educationData: ResumeItem[] = [
    {
        id: "edu-1",
        title: "B.Sc. in Computer Science & Engineering",
        organization: "Northern University Bangladesh",
        location: "Dhaka, Bangladesh",
        duration: "2025 - Present",
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
