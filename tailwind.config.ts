import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{js,jsx,ts,tsx,mdx}", "./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "./ui/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
};
export default config;
