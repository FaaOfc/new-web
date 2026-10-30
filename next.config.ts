import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // scrapr engine vendored di folder /vendor — jangan di-bundle, jalankan via Node runtime
  serverExternalPackages: ["axios", "cheerio"],
  outputFileTracingIncludes: {
    "/api/dl/**": ["./vendor/scrapr/**/*"],
  },
};

export default nextConfig;
