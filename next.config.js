/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};
const withBundleAnalyzer = require("@next/bundle-analyzer")();

module.exports = process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
