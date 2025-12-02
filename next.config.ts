import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for OpenNext compatibility
  output: 'standalone',
  
  // Recommended settings for production
  poweredByHeader: false,
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'www.momadica.ro',
      },
    ],
  },
  
  // TypeScript and ESLint settings
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
