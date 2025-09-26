// next.config.mjs
/** @type {import('next').NextConfig} */
import { securityHeaders } from './lib/headers.ts';

const nextConfig = {
  // Установка Edge Runtime по умолчанию
  experimental: {
    runtime: 'edge',
  },
  async headers() {
    return [
      {
        // Применяем заголовки ко всем роутам
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;