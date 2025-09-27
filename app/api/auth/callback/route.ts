import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase.server";

export const runtime = "nodejs";

function setSessionCookie(res: NextResponse, token: string) {
  const maxAge = 60 * 60 * 24 * 30; // 30 дней
  res.headers.append(
    "Set-Cookie",
    `sb:token=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`
  );
}

export async function POST(req: Request) {
  const { email, code, next } = await req.json().catch(() => ({} as any));
  if (!email || !code) {
    return NextResponse.json({ ok: false, error: "Нужны email и code" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const normEmail = String(email).toLowerCase().trim();
  const normCode = String(code).trim();

  // Берём самый свежий неиспользованный код, который не просрочен
  const { data: rows, error } = await supabase
    .from("otp_codes")
    .select("*")
    .eq("email", normEmail)
    .eq("used", false)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  const row = rows?.[0];
  if (!row || row.code !== normCode) {
    return NextResponse.json({ ok: false, error: "Неверный или просроченный код" }, { status: 400 });
  }

  // Помечаем код использованным
  const { error: updErr } = await supabase
    .from("otp_codes")
    .update({ used: true })
    .eq("id", row.id);
  if (updErr) {
    return NextResponse.json({ ok: false, error: updErr.message }, { status: 500 });
  }

  // Простейшая сессия (MVP): кладём токен-рандомку в куку sb:token
  const token = `echo_${crypto.randomUUID()}`;
  const redirectTo = typeof next === "string" && next.startsWith("/") ? next : "/messages/new";
  const res = NextResponse.redirect(new URL(redirectTo, req.url));
  setSessionCookie(res, token);
  return res;
}