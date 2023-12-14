/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["uploadthing.com", "utfs.io", "files.edgestore.dev"],
  },
};

module.exports = nextConfig;

