import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,           // optional but nice for static hosting
  /* config options here */
};

export default nextConfig;
