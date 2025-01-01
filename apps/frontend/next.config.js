/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    formats: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skizify-bucket.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },

    ],
  },
  reactStrictMode: false, // Disable strict mode to prevent double rendering
};
