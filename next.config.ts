import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Handle images properly
  images: {
    domains: ['z-cdn-media.chatglm.cn'],
    unoptimized: true,
  },
  // Only use standalone output in production
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'standalone',
  } : {}),
};

export default nextConfig;
