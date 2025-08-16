/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api:4000/api/:path*'
      },
      {
        source: '/img/:path*',
        destination: 'http://api:4000/img/:path*'
      }
    ]
  },
};

export default nextConfig;