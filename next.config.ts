import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: process.env.SITE_BASE_PATH ?? '',
};

export default nextConfig;
