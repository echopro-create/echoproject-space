// lib/rateLimit.ts
// Используем Map (in-memory) для Edge Runtime, не для продакшн, но для ТЗ

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

interface RateLimitOptions {
  interval: number; 
  uniqueTokenPerInterval: number; 
}

export default function rateLimit({ interval, uniqueTokenPerInterval }: RateLimitOptions) {
  return {
    check: async (token: string) => {
      const now = Date.now();
      const entry = rateLimitMap.get(token);

      if (entry && now - entry.lastReset < interval) {
        if (entry.count >= uniqueTokenPerInterval) {
          throw new Error('Rate limit exceeded');
        }
        entry.count += 1;
      } else {
        rateLimitMap.set(token, { count: 1, lastReset: now });
      }
    },
  };
}