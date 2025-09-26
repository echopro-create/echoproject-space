/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["lucide-react"] },
  headers: async () => [
    // HSTS для боевого домена (и www)
    {
      source: "/(.*)",
      has: [{ type: "host", value: "echoproject.space" }],
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }
      ]
    },
    {
      source: "/(.*)",
      has: [{ type: "host", value: "www.echoproject.space" }],
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }
      ]
    },
    // Базовые заголовки для всех
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" }
      ]
    }
  ]
};

export default nextConfig;

