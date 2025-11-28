import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['@features'] = path.resolve(__dirname, 'features');
    config.resolve.alias['@context'] = path.resolve(__dirname, 'context');
    return config;
  },
};

export default nextConfig;
