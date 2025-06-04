import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: []
  }
};

export default withBundleAnalyzer(nextConfig);
