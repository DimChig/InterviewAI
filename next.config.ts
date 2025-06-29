import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/signin",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/signin",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/signin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
