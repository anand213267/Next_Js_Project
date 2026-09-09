/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.25',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
