/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
          },
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
            pathname: '/**', // Allow all paths under this domain
          },
        ],
      },
};

export default nextConfig;
