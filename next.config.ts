import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@juspay/blend-design-system"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
