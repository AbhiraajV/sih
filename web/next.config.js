/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    domains: ["uploadthing.com", "utfs.io", "files.edgestore.dev"],
  },
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
};

module.exports = nextConfig;

