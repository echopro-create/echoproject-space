// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase.server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code || typeof email !== 'string' || typeof code !== 'string') {
    return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
  }
  
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'email',
  });

  if (error) {
    console.error('OTP Verification Error:', error.message);
    return NextResponse.json({ error: 'Invalid code or expired session.' }, { status: 401 });
  }

  // Сессия установлена в куки через createSupabaseServerClient
  return NextResponse.json({ ok: true }, { status: 200 });
}