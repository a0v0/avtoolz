// @ts-check
import createNextIntlPlugin from "next-intl/plugin";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["@heroui/react", "@heroui/theme"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
    };

    return config;
  },

  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
