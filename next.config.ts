import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only enable static export for production builds
  ...(process.env.NODE_ENV === 'production' && {
    output: "export",
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
  }),
  images: {
    // All project images are local (public/projects/**) — no remote sources needed.
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
