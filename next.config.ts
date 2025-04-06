import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignore .js.map files in server build
      config.module.rules.push({
        test: /\.js\.map$/,
        loader: "ignore-loader",
      });

      // Optional: Ignore specific problematic modules if needed
      config.module.rules.push({
        test: /chrome-aws-lambda/,
        loader: "ignore-loader",
      });
    }

    // Ensure client bundles don't include server-only dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      "puppeteer-core": false,
      "chrome-aws-lambda": false,
    };

    return config;
  },
};

export default nextConfig;
