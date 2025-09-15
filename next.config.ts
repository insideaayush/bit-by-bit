import type { NextConfig } from "next";

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath: base,
  assetPrefix: base,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,           // optional but nice for static hosting
  /* config options here */
};

export default nextConfig;
