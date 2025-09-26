// lib/csp.ts

/**
 * Генерирует Content Security Policy (CSP) заголовок.
 */
export function getCSP(nonce: string) {
  const isDev = process.env.NODE_ENV !== 'production';
  
  // Базовая политика
  const directives = [
    `default-src 'self'`,
    `script-src 'self' ${isDev ? "'unsafe-eval'" : ''} 'nonce-${nonce}'`,
    `style-src 'self' 'unsafe-inline'`, // Tailwind использует инлайн-стили
    `img-src 'self' data: blob: https://echoproject.space https://*.supabase.co`, // Supabase Storage
    `media-src 'self' blob: https://*.supabase.co`, // MediaRecorder
    `connect-src 'self' https://*.supabase.co ${isDev ? 'ws://localhost:*' : ''}`,
    `frame-ancestors 'none'`, // Запрет на встраивание
    `font-src 'self'`,
    `object-src 'none'`, 
  ];

  return directives.join('; ');
}