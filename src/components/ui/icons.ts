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
    shadcn: Icons.shadcn,
    antdesign: Icons.antdesign,
    tailwindcss: Icons.tailwindcss,
    bootstrap: Icons.bootstrap,
    mysql: Icons.mysql,
    netlify: Icons.netlify,
    socketio: Icons.socketio,
    sslcommerz: Icons.sslcommerz,
    aws: Icons.aws,
    vps: Icons.vps,
    cicd: Icons.cicd,
    ec2: Icons.ec2,
    s3: Icons.s3,
};

export type IconName = keyof typeof iconMap;

export const availableIcons = Object.keys(iconMap).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " "),
}));
