import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/bit-by-bit',
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
