const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['@features'] = path.resolve(__dirname, 'features');
    config.resolve.alias['@context'] = path.resolve(__dirname, 'context');
    return config;
  },
};

module.exports = nextConfig;
