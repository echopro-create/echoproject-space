import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase.server';
import { cookies } from 'next/headers';

const MessageSchema = z.object({
  recipient_email: z.string().email(),
  content_text: z.string().min(1).max(5000),
  mode: z.enum(['dms','scheduled']),
  delivery_at: z.string().datetime().optional().nullable()
});

// naive in-memory rate limit (demo only)
const lastHit = new Map<string, number>();
const MIN_INTERVAL_MS = 1000;

export async function GET() {
  const supabase = createSupabaseServerClient(cookies());
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user;
  if (!user) return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Не удалось получить сообщения' }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  // Basic rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  const prev = lastHit.get(ip) || 0;
  if (now - prev < MIN_INTERVAL_MS) {
    return NextResponse.json({ error: 'Слишком часто. Подождите секунду.' }, { status: 429 });
  }
  lastHit.set(ip, now);

  const body = await req.json().catch(() => null);
  const parsed = MessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Неверные данные', details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseServerClient(cookies());
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user;
  if (!user) return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });

  const payload = {
    recipient_email: parsed.data.recipient_email,
    content_text: parsed.data.content_text,
    mode: parsed.data.mode,
    delivery_at: parsed.data.mode === 'scheduled' ? parsed.data.delivery_at : null,
    user_id: user.id,
    status: 'draft'
  };

  const { data, error } = await supabase.from('messages').insert(payload).select().single();
  if (error) return NextResponse.json({ error: 'Не удалось сохранить сообщение' }, { status: 500 });
  return NextResponse.json({ ok: true, data }, { status: 201 });
}
