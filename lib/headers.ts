// lib/headers.ts

/**
 * HTTP-заголовки безопасности для next.config.mjs
 */
export const securityHeaders = [
  // Только HTTPS, HSTS 1 год
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // Защита от XSS (устаревший, но полезный)
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Запрет на MIME-сниффинг
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Запрет на встраивание в Iframe (уже в CSP, но дублируем)
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Отключение отправки Referer
  {
    key: 'Referrer-Policy',
    value: 'no-referrer',
  },
];
