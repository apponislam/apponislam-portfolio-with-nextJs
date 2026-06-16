import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    transpilePackages: ["react-icons"],
};

export default nextConfig;
