import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fkupqytygedxmcwtfmub.supabase.co',
        pathname: '/**',
        
      },
      {
        protocol: 'https',
        hostname: 'www.djmagitalia.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

