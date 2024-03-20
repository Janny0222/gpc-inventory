/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: 'http://localhost:3000/api/socket.io/:path*', // Adjust the destination URL according to your WebSocket server setup
      },
    ];
  },
};

export default nextConfig;