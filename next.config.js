/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: only disables ESLint during production builds
    ignoreDuringBuilds: true,
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
