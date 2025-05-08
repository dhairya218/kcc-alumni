const path = require('path');

const nextConfig = {
  output: 'export',
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
