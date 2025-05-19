import { Icons } from "@/components/icons";

export const iconMap = {
    nextjs: Icons.nextjs,
    react: Icons.react,
    graphql: Icons.graphql,
    expressjs: Icons.express,
    nodejs: Icons.nodejs,
    mongodb: Icons.mongodb,
    postgresql: Icons.postgres,
    typescript: Icons.typescript,
    javascript: Icons.javascript,
    html5: Icons.html5,
    css3: Icons.css3,
    reactnative: Icons.react,
    redux: Icons.redux,
    mui: Icons.mui,
    tailwindcss: Icons.tailwindcss,
    bootstrap: Icons.bootstrap,
    mysql: Icons.mysql,
    netlify: Icons.netlify,
};

export type IconName = keyof typeof iconMap;

export const availableIcons = Object.keys(iconMap).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " "),
}));
