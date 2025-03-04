/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import { fileURLToPath } from "node:url";

import withBundleAnalyzer from "@next/bundle-analyzer";
import createJiti from "jiti";
import withNextIntl from "next-intl/plugin";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/lib/Env");

const withNextIntlConfig = withNextIntl("./src/lib/i18n.ts");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
export default bundleAnalyzer(
  withNextIntlConfig({
    transpilePackages: ["@heroui/react", "@heroui/theme"],
    swcMinify: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    webpack: (config) => {
      config.resolve.alias.canvas = false;
      // Fixes npm packages that depend on `fs` module
      config.resolve.fallback = { fs: false, child_process: false };

      return config;
    },
    eslint: {
      dirs: ["."],
    },
    poweredByHeader: false,
    reactStrictMode: true,
    experimental: {
      // Related to Pino error with RSC: https://github.com/orgs/vercel/discussions/3150
      serverComponentsExternalPackages: ["pino"],
    },
  })
);
