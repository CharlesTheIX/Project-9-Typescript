import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  openAnalyzer: true,
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  turbopack: {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  images: {
    remotePatterns: [],
  },
};

export default withBundleAnalyzer(nextConfig);
