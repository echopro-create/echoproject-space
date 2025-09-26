/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "header", key: "Accept", value: ".*text/html.*" }],
        headers: [
          { key: "Content-Type", value: "text/html; charset=utf-8" },
          { key: "X-Content-Type-Options", value: "nosniff" }
        ],
      },
    ];
  },
};
export default nextConfig;