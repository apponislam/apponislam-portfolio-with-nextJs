export interface Project {
    _id: string;
    type: string;
    companyName: string;
    category: string[];
    shortDescription: string;
    websiteLink?: string;
    githubLink?: string;
    githubFrontendLink?: string;
    githubBackendLink?: string;
    liveLink?: string;
    productionLink?: string;
    appLink?: string;
    techStack: string[];
    startDate: string;
    endDate: string;
    companyLogoImg: string;
    images: string[];
    descriptionDetails: {
        paragraphs: string[];
        bullets: string[];
    };
    pagesInfoArr: Array<{
        title: string;
        description: string;
    }>;
}

export const projectsData: Project[] = [
    {
        _id: "1",
        type: "Personal Project",
        companyName: "Sustainability Idea Hub",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "A full-stack platform for sharing and managing sustainability-focused ideas with role-based access, voting, comments, and paid content system.",
        websiteLink: "https://idea-hub-client.vercel.app/",
        githubLink: "https://github.com/apponislam/idea-hub-client",
        githubFrontendLink: "https://github.com/apponislam/idea-hub-client",
        githubBackendLink: "https://github.com/apponislam/idea-hub-server",
        liveLink: "https://idea-hub-client.vercel.app/",
        productionLink: "https://idea-hub-client.vercel.app/",
        appLink: "https://idea-hub-client.vercel.app/",
        techStack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express.js", "Typescript", "PostgreSQL", "Prisma", "JWT"],
        startDate: "2025-03-10",
        endDate: "2025-05-01",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945636/uljmooa6wwmk8nyxoya1.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945645/tbvxsx4gd0oxi1zppiou.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945689/vttlmzd2glycl6ej3en2.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945728/otqcoz6fkoaqd4l2ylmy.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945760/rnrvbemx7rlvr0hlqo37.png"
        ],
        descriptionDetails: {
            paragraphs: [
                "Sustainability Idea Hub is a web application where users can submit, discuss, and vote on eco-friendly ideas. Members can categorize ideas, comment with nested threads, and interact through a Reddit-style voting system.",
                "Admins can review submissions, give feedback, and highlight impactful projects. Additionally, members can monetize their ideas by marking them as 'Paid', which requires payment for access.",
            ],
            bullets: ["JWT-based authentication and role management (Member/Admin)", "Paid/free idea visibility control with SSLCommerz integration", "Nested commenting and voting system like Reddit", "Admin approval/rejection with feedback mechanism", "Search and filter ideas by keyword or category"],
        },
        pagesInfoArr: [
            {
                title: "Home Page",
                description: "Features hero section, search bar, idea highlights, and testimonials.",
            },
            {
                title: "Member Dashboard",
                description: "Members can manage their own ideas, edit drafts, and track approval statuses.",
            },
            {
                title: "Admin Dashboard",
                description: "Admins manage users, approve/reject ideas, and moderate comments.",
            },
            {
                title: "Idea Details Page",
                description: "Shows full idea content, voting buttons, paid access logic, and nested comments.",
            },
        ],
    },
    {
        _id: "2",
        type: "Personal Project",
        companyName: "Bike Shop Application",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "A complete bike e-commerce platform with secure JWT-based authentication, role-based dashboards, product filters, and integrated SurjoPay payment system.",
        websiteLink: "https://peppy-hotteok-65ea2d.netlify.app/",
        githubLink: "https://github.com/apponislam/bike-store-frontend",
        techStack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express.js", "Typescript", "MongoDB", "JWT", "SurjoPay"],
        startDate: "2025-04-01",
        endDate: "2025-06-10",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945838/iihrwdulbus4qb2gel5v.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945841/rgp4xeabeuvswee7imac.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945864/hayfdpeujq8d4gkryzct.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945888/avgeqomzudclaycntwud.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945910/vclcacoupuket5xv5nom.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945987/dctqfpcag7sxnpxnt3bi.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750946015/ghizuld8wtalp8x6dscp.png"
        ],
        descriptionDetails: {
            paragraphs: ["Bike Shop is an online platform that allows customers to browse, search, and filter bikes with ease. Authenticated users can place orders, track status, and manage their profiles securely.", "Admins can manage all users, orders, and product listings with complete control from their dedicated dashboard. SurjoPay is integrated for secure payment transactions."],
            bullets: ["JWT-based role authentication for customers and admins", "Dynamic search, filters, and product detail pages", "SurjoPay integration for secure checkout", "Admin dashboard for user, product, and order management", "Track orders with real-time status updates"],
        },
        pagesInfoArr: [
            {
                title: "Home Page",
                description: "Includes banner, featured bikes, call-to-actions, testimonials, and a stylish footer.",
            },
            {
                title: "All Products Page",
                description: "Displays all bikes with filters (brand, model, category, availability, price) and a search bar.",
            },
            {
                title: "Product Details Page",
                description: "Shows bike images, specifications, pricing, and Buy Now option.",
            },
            {
                title: "Checkout Page",
                description: "Collects order details and processes payment via SurjoPay.",
            },
            {
                title: "Admin Dashboard",
                description: "Admins can manage users, products, and orders. Includes order status update and stock control.",
            },
            {
                title: "User Dashboard",
                description: "Users can view their orders, update profile info, and track deliveries.",
            },
        ],
    },
    {
        _id: "3",
        type: "Personal Project",
        companyName: "AP Classroom",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "A MERN-stack learning-management platform with role-based dashboards for students, teachers, and admins, featuring class creation, enrollment, assignments, payments, and comprehensive analytics.",
        websiteLink: "https://assignmentb9a12.web.app/",
        githubLink: "https://github.com/apponislam/Classrooms-client",
        techStack: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "TanStack Query", "react-hook-form", "SurjoPay"],
        startDate: "2025-05-15",
        endDate: "2025-06-26",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750942876/alwzdx9qsdzhzneplt6g.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750942876/alwzdx9qsdzhzneplt6g.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943047/gfyr0aun4kpxmgepge47.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943494/k1rvltakhcyboljsrawu.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943436/di4hflf7ii8f33jvt5fs.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943466/dyub7fc2zrdb6do2vfxt.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943151/y7zqotr9wmeli7zsa1lf.png"
        ],
        descriptionDetails: {
            paragraphs: [
                "EduManage streamlines class management by connecting institutions, tutors, and students on a single, responsive platform. Users register securely, browse approved classes, and enroll using SurjoPay-powered checkout.",
                "Role-based dashboards empower teachers to add classes and assignments, students to track progress and submit work, and admins to approve content, handle user roles, and monitor site analytics—all with real-time feedback and toast notifications.",
            ],
            bullets: [
                "JWT authentication with secure password hashing",
                "Student, Teacher, and Admin dashboards with protected routes",
                "Teacher request workflow and class approval pipeline",
                "TanStack Query for optimized GET data fetching",
                "Full CRUD on users, classes, orders, and assignments",
                "Nested feedback system displayed on the Home page",
                "SurjoPay integration for paid course enrollment",
                "Responsive UI for mobile, tablet, and desktop",
                "Toast alerts for all CRUD operations and auth events",
                "Environment-secured MongoDB & Firebase credentials",
            ],
        },
        pagesInfoArr: [
            {
                title: "Home Page",
                description: "Banner carousel, partner logos, popular classes slider, user & class stats, teacher recruitment CTA, and feedback carousel.",
            },
            {
                title: "All Classes Page",
                description: "Search and filter classes by category, price, brand, model, and availability with infinite scroll.",
            },
            {
                title: "Class Details / Checkout",
                description: "Shows full class info, Pay Now button, and redirects to SurjoPay gateway.",
            },
            {
                title: "Teacher Dashboard",
                description: "Add classes, update/delete listings, view class progress, create assignments, and monitor enrollment stats.",
            },
            {
                title: "Student Dashboard",
                description: "View enrolled classes, submit assignments, post TER feedback, track orders, and manage profile.",
            },
            {
                title: "Admin Dashboard",
                description: "Approve or reject teacher requests and classes, manage users and roles, oversee orders, and view class feedback.",
            },
        ],
    },
    {
        _id: "4",
        type: "Personal Project",
        companyName: "Appon Assignment Library",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "An online group study platform built with the MERN stack allowing users to create, attempt, and grade assignments collaboratively with secure auth, role-based logic, and PDF preview.",
        websiteLink: "https://assignmentb9a11.web.app/",
        githubLink: "https://github.com/apponislam/assignments-client",
        techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase", "Typescript", "Javascript", "HTML 5", "CSS 3", "Google Auth"],
        startDate: "2025-06-10",
        endDate: "2025-06-26",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943676/btd2rfqpojdayjpuug2q.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943676/btd2rfqpojdayjpuug2q.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959049/rwfagwqiqehoaxfpd596.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959055/jcyozxekp7btgahvey65.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959062/nb8rvtdiirfea4syw1pi.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959084/cdgzpcmj8ouelt3jt8qk.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959086/atoigwjnipll8jh0d99e.png"
        ],
        descriptionDetails: {
            paragraphs: [
                "GroupStudy Hub is a MERN stack web app for students to collaboratively create, take, and evaluate assignments. Each user can post new assignments, attempt others', and grade pending submissions from friends. The system supports file-based submissions, grading workflows, and personalized dashboards.",
                "The platform features a custom design, PDF preview in submitted assignments, JWT-based protected routes, responsive layout, and dark/light mode toggle for better user experience.",
            ],
            bullets: [
                "JWT-based auth with token storage in localStorage for Email/Google login",
                "Create, view, filter, update, and delete assignments (CRUD)",
                "Only the creator can delete an assignment (with secure checks)",
                "Users can submit assignments via link + notes with file preview support",
                "Admins and users can mark assignments and give feedback",
                "Dark/Light theme toggle for accessibility and user preference",
                "PDF preview in iframe on submitted assignments page",
                "Form validation on all forms with `react-hook-form`",
                "Difficulty level filtering using a dropdown menu",
                "Responsive design for desktop, tablet, and mobile devices",
            ],
        },
        pagesInfoArr: [
            {
                title: "Home Page",
                description: "Features a banner, navbar with conditional rendering, a features section with cards, an FAQ section, and a footer with copyright.",
            },
            {
                title: "Create Assignment Page",
                description: "Private page for posting new assignments with fields for title, marks, description, level, image URL, and due date (using react-datepicker).",
            },
            {
                title: "Assignments Page",
                description: "Lists all assignments with filter by difficulty level. Users can view, update, or delete (if creator).",
            },
            {
                title: "Assignment Details Page",
                description: "Private dynamic route with assignment info and a modal to submit assignment via PDF link and notes.",
            },
            {
                title: "Pending Assignments Page",
                description: "Lists all ungraded submissions. Users can mark submissions by giving feedback and marks.",
            },
            {
                title: "Login & Register",
                description: "Firebase auth with Email/Password and Google. Includes client-side validation, error toasts, and token storage.",
            },
        ],
    },
    {
        _id: "5",
        type: "Personal Project",
        companyName: "Appon Painting & Drawing",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Appon Painting & Drawing is a Jute & Wooden-Craft e-commerce platform with secure auth, private dashboards, and fully responsive design.",
        websiteLink: "https://assignmentb9a10.web.app/",
        githubLink: "https://github.com/apponislam/painting-drawing-client",
        techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase", "Typescript", "Javascript", "HTML 5", "CSS 3", "Google Auth"],
        startDate: "2025-06-12",
        endDate: "2025-06-26",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959177/q5uqgngk8eubzpk0nwe3.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959171/wninbrdrznaha0zigbf6.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959201/napz9rqmkh7a4pdikrrm.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959208/tw4rrpapdelf0t8s32wl.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959238/kbjmhli2oryjvsp8hgqh.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959256/mxtpijllql1uym6yakqo.png"
        ],
        descriptionDetails: {
            paragraphs: ["CraftNest lets artists and buyers connect over unique jute and wooden crafts. Users can securely add, update, and manage their own products, while visitors explore curated items by sub-category.", "The site features JWT-protected routes, Google/Firebase authentication, TanStack-Query data fetching, and dark/light theme switching for an engaging shopping experience."],
            bullets: ["Private dashboards for adding, updating, and deleting crafts", "Category & sub-category filtering with responsive UI", "Form validation and toast notifications for all CRUD actions", "Dark / light theme toggle and Lottie animations on the home page", "Fully environment-secured Firebase & MongoDB credentials"],
        },
        pagesInfoArr: [
            {
                title: "Home Page",
                description: "Banner slider, craft highlights, six sub-category cards, extra feature sections, and theme toggle.",
            },
            {
                title: "All Craft Items",
                description: "Table view of every craft in the database with View-Details links.",
            },
            {
                title: "Add Craft Item",
                description: "Protected form for posting new crafts (image URL, name, price, rating, stock, etc.).",
            },
            {
                title: "My Craft List",
                description: "Shows only the logged-in user's crafts with update & delete controls and customization filter.",
            },
            {
                title: "Craft Details",
                description: "Private dynamic route displaying full details of a craft item.",
            },
        ],
    },
];
