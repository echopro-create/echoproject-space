// app/api/auth/otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceRoleClient } from '@/lib/supabase.server';
import rateLimit from '@/lib/rateLimit';

// Инициализация rate limiter: 5 запросов в час на IP
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 5, // 5 requests
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'; // IP для Rate Limit
  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // --- 1. Rate Limiting ---
  try {
    await limiter.check(ip);
  } catch (e) {
    return NextResponse.json({ error: 'Too many requests. Try again in an hour.' }, { status: 429 });
  }

  // --- 2. Отправка OTP ---
  try {
    const supabase = createSupabaseServiceRoleClient();
    
    // Используем встроенный метод Supabase (mail_code)
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true, 
      }
    });

    if (error) {
      console.error('OTP Send Error:', error.message);
      // Для безопасности, возвращаем OK, даже если ошибка
      return NextResponse.json({ ok: true }, { status: 200 }); 
    }

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}