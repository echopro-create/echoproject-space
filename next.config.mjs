/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Content-Type', value: 'text/html; charset=utf-8' },
        { key: 'X-Content-Type-Options', value: 'nosniff' }
      ],
    },
  ],
};
export default nextConfig;