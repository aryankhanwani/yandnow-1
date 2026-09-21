import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to be opened from other devices on the LAN.
  allowedDevOrigins: ["192.168.1.2"],
  images: {
    // Source files in /public/img are already build-optimised webp at fixed
    // widths; these are the only qualities the site asks for.
    qualities: [75, 82, 86],
    formats: ["image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
