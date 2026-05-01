import type { NextConfig } from "next";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "https://fortwall-contracting.sterlingcloud.co"

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/erp-solutions/v1/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ]
  },
};

export default nextConfig;
