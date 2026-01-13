import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://sagafarmann.pages.dev/assets/**')],
  },
};

export default nextConfig;
