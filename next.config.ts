import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.prod.website-files.com',
      'jnsr.in',
      'static.wixstatic.com'
    ],
  },
};

export default nextConfig;
