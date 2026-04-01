import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sureedgetax.com",
      },
    ],
  },
};

export default nextConfig;
